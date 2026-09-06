// RevenueCat tells us here when a family's subscription starts, renews,
// lapses or ends, and we write that onto the family's record (fam:CODE),
// found through the hidden billing id (rc:RCID). Every phone in the family
// then reads the plan from api/home.js, and api/text.js checks it once the
// subscription is switched on. api/sos.js never reads it. Hard rule.
//
// Set the same secret in RevenueCat's webhook settings (its Authorization
// header value) and in the env var below. Without the env var this endpoint
// accepts nothing.
//
// Required env vars:
//   KV_REST_API_URL / KV_REST_API_TOKEN   the Family Sync store
//   RC_WEBHOOK_SECRET                     shared secret RevenueCat sends

function kvEnv() {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  return { url, token };
}
async function kvCommand(cmd) {
  const { url, token } = kvEnv();
  const r = await fetch(url, { method: 'POST', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }, body: JSON.stringify(cmd) });
  if (!r.ok) throw new Error('kv_http_' + r.status);
  return r.json();
}
async function kvGet(key) { const j = await kvCommand(['GET', key]); return j && j.result ? j.result : null; }

// Which events mean what. Anything not listed leaves the plan as it was.
const STARTS = ['INITIAL_PURCHASE', 'RENEWAL', 'UNCANCELLATION', 'PRODUCT_CHANGE', 'NON_RENEWING_PURCHASE', 'TRANSFER'];
const ENDS = ['EXPIRATION', 'SUBSCRIPTION_PAUSED'];
const KEEPS = ['CANCELLATION', 'BILLING_ISSUE'];   // still paid until the expiry the store gave

async function findCode(ev) {
  const ids = [ev.app_user_id, ev.original_app_user_id].concat(Array.isArray(ev.aliases) ? ev.aliases : []);
  for (const id of ids) {
    const s = String(id || '');
    if (!s || s.indexOf('$RCAnonymousID') === 0) continue;
    const code = await kvGet('rc:' + s.replace(/[^A-Za-z0-9-]/g, ''));
    if (code) return code;
  }
  return null;
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); return res.status(405).json({ ok: false, error: 'method_not_allowed' }); }
  const secret = process.env.RC_WEBHOOK_SECRET;
  if (!secret) return res.status(503).json({ ok: false, error: 'not_configured' });
  const auth = String(req.headers.authorization || '');
  if (auth !== secret && auth !== 'Bearer ' + secret) return res.status(401).json({ ok: false, error: 'unauthorized' });

  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch (e) { body = {}; } }
  const ev = (body && body.event) || {};
  const type = String(ev.type || '');
  // Non-2xx makes RevenueCat retry; an event that is not ours is answered
  // 200 and left alone.
  try {
    const code = await findCode(ev);
    if (!code) return res.status(200).json({ ok: true, ignored: 'unknown_customer' });
    const raw = await kvGet('fam:' + code);
    if (!raw) return res.status(200).json({ ok: true, ignored: 'unknown_family' });
    let fam = {}; try { fam = JSON.parse(raw) || {}; } catch (e) { fam = {}; }
    const cur = fam.plan || {};
    // A plan we granted ourselves is not the store's to end.
    if (cur.source === 'manual' && cur.active && (!cur.expiresAt || cur.expiresAt > Date.now())) {
      return res.status(200).json({ ok: true, ignored: 'manual_plan' });
    }
    const expiresAt = ev.expiration_at_ms ? Number(ev.expiration_at_ms) : (cur.expiresAt || null);
    let next = null;
    if (STARTS.indexOf(type) >= 0) next = { active: true };
    else if (ENDS.indexOf(type) >= 0) next = { active: false };
    else if (KEEPS.indexOf(type) >= 0) next = { active: !!cur.active };
    if (!next) return res.status(200).json({ ok: true, ignored: type || 'no_type' });
    fam.plan = { ...next, source: 'store', store: String(ev.store || '').slice(0, 24), productId: String(ev.product_id || '').slice(0, 80), expiresAt, lastEvent: type, sandbox: ev.environment === 'SANDBOX', updatedAt: Date.now() };
    await kvCommand(['SET', 'fam:' + code, JSON.stringify(fam)]);
    return res.status(200).json({ ok: true, active: fam.plan.active });
  } catch (e) {
    return res.status(502).json({ ok: false, error: 'storage_error' });
  }
};

// RevenueCat (Frank, 7 Sep 2026: "I am good using RevenueCat") tells us here
// when a family's subscription starts, renews, lapses or ends, for both
// stores; the App Store's own notifications are also accepted, dormant, so
// the direct path from 5 Sep can be switched to later without new code.
// Either way we find the family, write the plan onto its record, and log
// the event for the sales page.
//
// The App Store tells us here when a family's subscription starts, renews,
// lapses, is refunded or ends. We verify that the message really came from
// Apple, find the family it belongs to, write the plan onto the family's
// record (fam:CODE), and keep a log of every event for the sales page.
//
// Every phone in the family then reads the plan from api/home.js, and
// api/text.js checks it before sending a text. api/sos.js never reads it.
// Hard rule.
//
// What this is built on, all read from Apple's own documentation on 5 Sep
// 2026: App Store Server Notifications V2 (a signed JWS payload, POSTed to
// the URL entered in App Store Connect; answer 200 to 206 for success, any
// 40x or 50x makes Apple retry five times over 72 hours), the notification
// types table, and the appAccountToken that the app sets on a purchase and
// Apple returns in every transaction for it. Verification is done by
// Apple's own library for Node (@apple/app-store-server-library), which
// checks the certificate chain against Apple's root certificate, the
// Apple-specific certificate extensions, and the signature.
//
// Env vars (Vercel):
//   KV_REST_API_URL / KV_REST_API_TOKEN   the Family Sync store
//   APPLE_ROOT_CERTS      Apple's root certificate(s) from apple.com/certificateauthority:
//                         base64 of the .cer file (DER), several separated by commas,
//                         or PEM text. Without it nothing verifies and every
//                         notification is answered 500 (Apple retries).
//   APPLE_BUNDLE_ID       com.ezvoxa.app (default)
//   APPLE_APP_ID          the app's numeric Apple ID from App Store Connect.
//                         Required for production notifications (Apple's library
//                         insists); sandbox works without it.
//   APPLE_ONLINE_CHECKS   "0" to skip Apple's certificate revocation check (OCSP).
//                         Default on, as Apple's library recommends.
//   APPLE_IAP_KEY / APPLE_IAP_KEY_ID / APPLE_ISSUER_ID
//                         the In-App Purchase key from App Store Connect (Users
//                         and Access, Integrations, In-App Purchase), for the
//                         "send a test notification" button on the sales page.
//   FAMILY_SYNC_PASSWORD  guards the sales page and the test button.
//   RC_WEBHOOK_SECRET     the Authorization header value set on RevenueCat's
//                         webhook. Without it RevenueCat events are refused.

const { SignedDataVerifier, Environment, AppStoreServerAPIClient } = require('@apple/app-store-server-library');
const { X509Certificate } = require('crypto');

const EVENTS_KEY = 'events:plan';
const EVENTS_MAX = 5000;
const DAY = 86400000;

function kvEnv() {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  return { url, token };
}
async function kv(cmd) {
  const { url, token } = kvEnv();
  const r = await fetch(url, { method: 'POST', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }, body: JSON.stringify(cmd) });
  if (!r.ok) throw new Error('kv_http_' + r.status);
  return r.json();
}
async function kvGet(key) { const j = await kv(['GET', key]); return j && j.result ? j.result : null; }
async function kvGetJson(key) { const s = await kvGet(key); if (!s) return null; try { return JSON.parse(s); } catch (e) { return null; } }

// Apple's root certificate(s), as DER buffers, from the env var.
function rootCerts() {
  const raw = String(process.env.APPLE_ROOT_CERTS || '').trim();
  if (!raw) return [];
  const out = [];
  if (raw.indexOf('-----BEGIN CERTIFICATE-----') >= 0) {
    const re = /-----BEGIN CERTIFICATE-----[\s\S]*?-----END CERTIFICATE-----/g;
    for (const pem of raw.match(re) || []) { try { out.push(new X509Certificate(pem).raw); } catch (e) {} }
  } else {
    for (const part of raw.split(',')) {
      const s = part.trim(); if (!s) continue;
      try { const der = Buffer.from(s, 'base64'); new X509Certificate(der); out.push(der); } catch (e) {}
    }
  }
  return out;
}
function bundleId() { return String(process.env.APPLE_BUNDLE_ID || 'com.ezvoxa.app'); }
function appAppleId() { const n = parseInt(process.env.APPLE_APP_ID || '', 10); return Number.isFinite(n) ? n : undefined; }
function onlineChecks() { return process.env.APPLE_ONLINE_CHECKS !== '0'; }

const verifiers = {};
function verifierFor(envName) {
  const env = envName === 'Production' ? Environment.PRODUCTION : Environment.SANDBOX;
  if (verifiers[env]) return verifiers[env];
  const roots = rootCerts();
  if (!roots.length) throw new Error('no_root_certs');
  if (env === Environment.PRODUCTION && appAppleId() === undefined) throw new Error('no_app_id');
  verifiers[env] = new SignedDataVerifier(roots, onlineChecks(), env, bundleId(), env === Environment.PRODUCTION ? appAppleId() : undefined);
  return verifiers[env];
}
// Read the unverified payload only to learn which environment signed it;
// nothing from it is trusted until the verifier has passed it.
function peekEnvironment(signedPayload) {
  try {
    const p = JSON.parse(Buffer.from(String(signedPayload).split('.')[1], 'base64url').toString('utf8'));
    const d = p.data || p.summary || p.appData || {};
    return d.environment === 'Production' ? 'Production' : 'Sandbox';
  } catch (e) { return 'Sandbox'; }
}

// ---- RevenueCat events (both stores) ----
// Event names read from RevenueCat's own "Event Types and Fields" page on
// 8 Sep 2026. Its rule for a pause: "Don't revoke access on this event.
// Revoke access only on EXPIRATION with expiration reason
// SUBSCRIPTION_PAUSED." So a pause keeps the family paid to the expiry the
// store gave, like a cancellation; only EXPIRATION ends it (Frank's go, 8 Sep).
// The same page: CANCELLATION also covers refunds, with cancel_reason
// CUSTOMER_SUPPORT among its values; the sales page counts those as refunds.
const RC_STARTS = ['INITIAL_PURCHASE', 'RENEWAL', 'UNCANCELLATION', 'PRODUCT_CHANGE', 'NON_RENEWING_PURCHASE', 'TRANSFER', 'SUBSCRIPTION_EXTENDED'];
const RC_ENDS = ['EXPIRATION'];
const RC_KEEPS = ['CANCELLATION', 'BILLING_ISSUE', 'SUBSCRIPTION_PAUSED'];   // still paid until the expiry the store gave
async function rcFindCode(ev) {
  const ids = [ev.app_user_id, ev.original_app_user_id].concat(Array.isArray(ev.aliases) ? ev.aliases : []);
  for (const id of ids) {
    const s = String(id || '');
    if (!s || s.indexOf('$RCAnonymousID') === 0) continue;
    const code = await kvGet('rc:' + s.replace(/[^A-Za-z0-9-]/g, ''));
    if (code) return code;
  }
  return null;
}
async function handleRevenueCat(req, res, body) {
  const secret = process.env.RC_WEBHOOK_SECRET;
  if (!secret) return res.status(503).json({ ok: false, error: 'not_configured' });
  const auth = String(req.headers.authorization || '');
  if (auth !== secret && auth !== 'Bearer ' + secret) return res.status(401).json({ ok: false, error: 'unauthorized' });
  const ev = body.event || {};
  const type = String(ev.type || '');
  const sandbox = ev.environment === 'SANDBOX';
  const evId = String(ev.id || '').replace(/[^0-9A-Za-z-]/g, '');
  // Non-2xx makes RevenueCat retry; an event that is not ours is answered 200.
  try {
    if (evId) {
      const seen = await kv(['SET', 'ntf:rc:' + evId, '1', 'NX', 'EX', 30 * 86400]);
      if (!(seen && seen.result)) return res.status(200).json({ ok: true, duplicate: true });
    }
    const code = await rcFindCode(ev);
    const price = typeof ev.price_in_purchased_currency === 'number' ? Math.round(ev.price_in_purchased_currency * 1000) : (typeof ev.price === 'number' ? Math.round(ev.price * 1000) : null);
    const subtype = String(ev.cancel_reason || ev.expiration_reason || '').slice(0, 32);   // RevenueCat's reason fields, when present
    await logEvent({ at: Date.now(), store: 'revenuecat', via: String(ev.store || '').slice(0, 24), type, subtype, sandbox, code: code ? mask(code) : '', productId: String(ev.product_id || '').slice(0, 80), price, currency: price !== null ? String(ev.currency || 'USD').slice(0, 8) : '', expiresAt: ev.expiration_at_ms ? Number(ev.expiration_at_ms) : null, txn: '', matched: code ? 'token' : 'none', uuid: evId });
    if (type === 'TEST') return res.status(200).json({ ok: true, test: true });
    if (!code) return res.status(200).json({ ok: true, ignored: 'no_family' });
    const fam = await kvGetJson('fam:' + code);
    if (!fam) return res.status(200).json({ ok: true, ignored: 'unknown_family' });
    const cur = fam.plan || {};
    if (cur.source === 'manual' && cur.active && (!cur.expiresAt || cur.expiresAt > Date.now())) {
      return res.status(200).json({ ok: true, ignored: 'manual_plan' });
    }
    const expiresAt = ev.expiration_at_ms ? Number(ev.expiration_at_ms) : (cur.expiresAt || null);
    let next = null;
    if (RC_STARTS.indexOf(type) >= 0) next = { active: true };
    else if (RC_ENDS.indexOf(type) >= 0) next = { active: false };
    else if (RC_KEEPS.indexOf(type) >= 0) next = { active: !!cur.active };
    if (!next) return res.status(200).json({ ok: true, noted: type });
    fam.plan = { ...next, source: 'store', store: 'revenuecat', via: String(ev.store || '').slice(0, 24), productId: String(ev.product_id || '').slice(0, 80), expiresAt, lastEvent: type, sandbox, updatedAt: Date.now() };
    await kv(['SET', 'fam:' + code, JSON.stringify(fam)]);
    const live = fam.plan.active && (!expiresAt || expiresAt + DAY > Date.now());
    await kv([live ? 'SADD' : 'SREM', 'plan:active', code]);
    return res.status(200).json({ ok: true, active: !!fam.plan.active });
  } catch (e) {
    return res.status(502).json({ ok: false, error: 'storage_error' });
  }
}

// ---- what each App Store notification means for the family's plan ----
// From Apple's notificationType table. Anything not listed leaves the plan
// alone and is only logged.
function nextPlan(cur, type, subtype, tx, renewal) {
  const now = Date.now();
  const expiresAt = tx && tx.expiresDate ? Number(tx.expiresDate) : (cur.expiresAt || null);
  const autoRenew = renewal && renewal.autoRenewStatus !== undefined ? renewal.autoRenewStatus === 1 : cur.autoRenew;
  const base = { ...cur, source: 'store', store: 'apple', productId: (tx && tx.productId) || cur.productId || '', originalTransactionId: (tx && tx.originalTransactionId) || cur.originalTransactionId || '', autoRenew, lastEvent: type + (subtype ? '/' + subtype : ''), updatedAt: now };
  switch (type) {
    case 'SUBSCRIBED': case 'DID_RENEW': case 'OFFER_REDEEMED': case 'DID_CHANGE_RENEWAL_PREF': case 'RENEWAL_EXTENDED':
      return { ...base, active: true, expiresAt, revokedAt: null };
    case 'DID_CHANGE_RENEWAL_STATUS': case 'PRICE_INCREASE':
      return { ...base, expiresAt };                       // paid until the date Apple gave; only the renewal choice changed
    case 'DID_FAIL_TO_RENEW': {
      // Billing retry. With a grace period Apple asks us to keep serving
      // until gracePeriodExpiresDate; without one the old expiry stands.
      const grace = renewal && renewal.gracePeriodExpiresDate ? Number(renewal.gracePeriodExpiresDate) : null;
      return grace ? { ...base, active: true, expiresAt: grace } : { ...base, expiresAt };
    }
    case 'GRACE_PERIOD_EXPIRED': case 'EXPIRED':
      return { ...base, active: false, expiresAt };
    case 'REFUND': case 'REVOKE':
      return { ...base, active: false, revokedAt: (tx && tx.revocationDate) ? Number(tx.revocationDate) : now };
    case 'REFUND_REVERSED':
      return { ...base, active: expiresAt ? expiresAt > now : true, revokedAt: null };
    default:
      return null;
  }
}

async function findCode(tx) {
  const tok = tx && tx.appAccountToken ? String(tx.appAccountToken).toLowerCase().replace(/[^0-9a-f-]/g, '') : '';
  if (tok) { const code = await kvGet('rc:' + tok); if (code) return { code, via: 'token' }; }
  const oid = tx && tx.originalTransactionId ? String(tx.originalTransactionId).replace(/[^0-9A-Za-z]/g, '') : '';
  if (oid) { const code = await kvGet('atx:' + oid); if (code) return { code, via: 'transaction' }; }
  return null;
}

async function logEvent(ev) {
  try {
    await kv(['LPUSH', EVENTS_KEY, JSON.stringify(ev)]);
    await kv(['LTRIM', EVENTS_KEY, 0, EVENTS_MAX - 1]);
  } catch (e) {}
}
const mask = (code) => (code ? String(code).slice(0, 7) + '-····' : '');

// ---- the sales page ----
async function dashboard() {
  const j = await kv(['LRANGE', EVENTS_KEY, 0, 999]);
  const events = (j && Array.isArray(j.result) ? j.result : []).map((s) => { try { return JSON.parse(s); } catch (e) { return null; } }).filter(Boolean);
  const active = await kv(['SCARD', 'plan:active']);
  const months = {};
  for (const e of events) {
    const m = new Date(e.at).toISOString().slice(0, 7);
    const row = months[m] || (months[m] = { month: m, new: 0, renewals: 0, cancellations: 0, expirations: 0, refunds: 0, reported: {} });
    if (e.type === 'SUBSCRIBED' || e.type === 'INITIAL_PURCHASE') row.new++;
    else if (e.type === 'DID_RENEW' || e.type === 'RENEWAL') row.renewals++;
    else if (e.type === 'CANCELLATION' && e.subtype === 'CUSTOMER_SUPPORT') row.refunds++;   // RevenueCat: a refund arrives as CANCELLATION with this reason (its page, 8 Sep 2026)
    else if ((e.type === 'DID_CHANGE_RENEWAL_STATUS' && e.subtype === 'AUTO_RENEW_DISABLED') || e.type === 'CANCELLATION') row.cancellations++;
    else if (e.type === 'EXPIRED' || e.type === 'GRACE_PERIOD_EXPIRED' || e.type === 'EXPIRATION') row.expirations++;
    else if (e.type === 'REFUND' || e.type === 'REVOKE') row.refunds++;   // Apple's names
    if ((e.type === 'SUBSCRIBED' || e.type === 'DID_RENEW' || e.type === 'OFFER_REDEEMED' || e.type === 'INITIAL_PURCHASE' || e.type === 'RENEWAL') && typeof e.price === 'number' && e.currency && !e.sandbox) {
      row.reported[e.currency] = (row.reported[e.currency] || 0) + e.price;   // milliunits, as Apple reported them
    }
    if ((e.type === 'REFUND' || (e.type === 'CANCELLATION' && e.subtype === 'CUSTOMER_SUPPORT')) && typeof e.price === 'number' && e.currency && !e.sandbox) {
      row.reported[e.currency] = (row.reported[e.currency] || 0) - e.price;
    }
  }
  return { active: (active && typeof active.result === 'number') ? active.result : 0, months: Object.values(months).sort((a, b) => (a.month < b.month ? 1 : -1)), events: events.slice(0, 300) };
}

function apiClient(envName) {
  const key = String(process.env.APPLE_IAP_KEY || '').trim();
  const keyId = String(process.env.APPLE_IAP_KEY_ID || '').trim();
  const issuer = String(process.env.APPLE_ISSUER_ID || '').trim();
  if (!key || !keyId || !issuer) return null;
  const pem = key.indexOf('-----BEGIN') >= 0 ? key : Buffer.from(key, 'base64').toString('utf8');
  return new AppStoreServerAPIClient(pem, keyId, issuer, bundleId(), envName === 'Production' ? Environment.PRODUCTION : Environment.SANDBOX);
}

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method === 'GET') {
    return res.status(200).json({ ok: true, configured: { storage: Boolean(kvEnv().url && kvEnv().token), roots: rootCerts().length, appId: appAppleId() !== undefined, apiKey: Boolean(process.env.APPLE_IAP_KEY && process.env.APPLE_IAP_KEY_ID && process.env.APPLE_ISSUER_ID), revenuecat: Boolean(process.env.RC_WEBHOOK_SECRET) } });
  }
  if (req.method !== 'POST') { res.setHeader('Allow', 'GET, POST'); return res.status(405).json({ ok: false, error: 'method_not_allowed' }); }
  if (!kvEnv().url || !kvEnv().token) return res.status(500).json({ ok: false, error: 'storage_not_configured' });

  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch (e) { body = {}; } }
  body = body || {};

  // ---- Frank's side: the sales page and the test button ----
  if (body.action) {
    const pw = process.env.FAMILY_SYNC_PASSWORD;
    if (!pw || String(body.password || '') !== String(pw)) return res.status(200).json({ ok: false, error: 'bad_password' });
    try {
      if (body.action === 'dashboard') return res.status(200).json({ ok: true, ...(await dashboard()) });
      if (body.action === 'test') {
        const client = apiClient(body.env === 'production' ? 'Production' : 'Sandbox');
        if (!client) return res.status(200).json({ ok: false, error: 'api_key_not_configured' });
        const r = await client.requestTestNotification();
        return res.status(200).json({ ok: true, token: r && r.testNotificationToken });
      }
      return res.status(400).json({ ok: false, error: 'bad_action' });
    } catch (e) {
      return res.status(200).json({ ok: false, error: 'failed', detail: String((e && e.message) || e).slice(0, 200) });
    }
  }

  // ---- RevenueCat's side: a plain JSON event with a shared secret ----
  if (body.event) return handleRevenueCat(req, res, body);

  // ---- Apple's side (dormant unless App Store Connect points here): a signed notification ----
  const signedPayload = body.signedPayload;
  if (!signedPayload || typeof signedPayload !== 'string') return res.status(400).json({ ok: false, error: 'no_payload' });
  const envName = peekEnvironment(signedPayload);
  let verifier;
  try { verifier = verifierFor(envName); } catch (e) {
    // Our configuration, not Apple's message: 500 so Apple keeps retrying
    // until the env vars are in place.
    return res.status(500).json({ ok: false, error: String(e.message || e) });
  }
  let note, tx = null, renewal = null;
  try {
    note = await verifier.verifyAndDecodeNotification(signedPayload);
    if (note.data && note.data.signedTransactionInfo) tx = await verifier.verifyAndDecodeTransaction(note.data.signedTransactionInfo);
    if (note.data && note.data.signedRenewalInfo) renewal = await verifier.verifyAndDecodeRenewalInfo(note.data.signedRenewalInfo);
  } catch (e) {
    return res.status(401).json({ ok: false, error: 'verification_failed', detail: String((e && e.message) || e).slice(0, 120) });
  }
  const type = String(note.notificationType || '');
  const subtype = note.subtype ? String(note.subtype) : '';
  const sandbox = envName !== 'Production';
  const uuid = String(note.notificationUUID || '').replace(/[^0-9A-Za-z-]/g, '');

  try {
    // Apple retries; the same notification must not be applied twice.
    if (uuid) {
      const seen = await kv(['SET', 'ntf:' + uuid, '1', 'NX', 'EX', 30 * 86400]);
      if (!(seen && seen.result)) return res.status(200).json({ ok: true, duplicate: true });
    }
    const found = tx ? await findCode(tx) : null;
    const ev = { at: Date.now(), store: 'apple', type, subtype, sandbox, code: found ? mask(found.code) : '', productId: tx ? tx.productId || '' : '', price: tx && typeof tx.price === 'number' ? tx.price : null, currency: tx ? tx.currency || '' : '', expiresAt: tx && tx.expiresDate ? Number(tx.expiresDate) : null, txn: tx && tx.originalTransactionId ? String(tx.originalTransactionId).slice(-6) : '', matched: found ? found.via : (tx ? 'none' : ''), uuid };
    await logEvent(ev);
    if (type === 'TEST') return res.status(200).json({ ok: true, test: true });
    if (!found) return res.status(200).json({ ok: true, ignored: 'no_family' });

    const code = found.code;
    if (found.via === 'token' && tx.originalTransactionId) await kv(['SET', 'atx:' + String(tx.originalTransactionId).replace(/[^0-9A-Za-z]/g, ''), code]);
    const fam = await kvGetJson('fam:' + code);
    if (!fam) return res.status(200).json({ ok: true, ignored: 'unknown_family' });
    const cur = fam.plan || {};
    // A plan we granted ourselves (hardship) is not the store's to end.
    if (cur.source === 'manual' && cur.active && (!cur.expiresAt || cur.expiresAt > Date.now())) {
      return res.status(200).json({ ok: true, ignored: 'manual_plan' });
    }
    const next = nextPlan(cur, type, subtype, tx, renewal);
    if (!next) return res.status(200).json({ ok: true, noted: type });
    next.sandbox = sandbox;
    fam.plan = next;
    await kv(['SET', 'fam:' + code, JSON.stringify(fam)]);
    const live = next.active && (!next.expiresAt || next.expiresAt + DAY > Date.now());
    await kv([live ? 'SADD' : 'SREM', 'plan:active', code]);
    return res.status(200).json({ ok: true, active: !!next.active });
  } catch (e) {
    return res.status(502).json({ ok: false, error: 'storage_error' });
  }
};

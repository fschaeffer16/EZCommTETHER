// Frank's Master Hub page, exactly as pasted, behind the family password.
// The page carries prices, so it is never served as a plain file
// (LEDGER rule, 1 Sep 2026: no EZvoxa price published until Frank confirms).
const page = require('./hub-page.json');

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); return res.status(405).json({ ok: false, error: 'method_not_allowed' }); }
  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch (e) { body = {}; } }
  body = body || {};
  const pw = process.env.FAMILY_SYNC_PASSWORD;
  if (!pw || String(body.password || '') !== String(pw)) return res.status(200).json({ ok: false, error: 'bad_password' });
  return res.status(200).json({ ok: true, html: page.html });
};

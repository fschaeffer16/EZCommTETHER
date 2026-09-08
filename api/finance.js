// The finance widget's inputs, behind the family password. The page itself
// carries no prices: nothing about EZvoxa's pricing is published until Frank
// confirms it (LEDGER rule, 1 Sep 2026). The defaults file says where every
// number came from and whether it was verified.
const defaults = require('./finance-defaults.json');
const market = require('./market-defaults.json');   // the market model's inputs, same password

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); return res.status(405).json({ ok: false, error: 'method_not_allowed' }); }
  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch (e) { body = {}; } }
  body = body || {};
  const pw = process.env.FAMILY_SYNC_PASSWORD;
  if (!pw || String(body.password || '') !== String(pw)) return res.status(200).json({ ok: false, error: 'bad_password' });
  return res.status(200).json({ ok: true, inputs: defaults, market });
};

// A reply to one of our texts lands here. Texting out of the app is one way:
// the talker sends, and most of the people who use it cannot read a reply.
// Voice messages inside the app are the way back. So a parent who texts
// back gets one short answer saying that, and the reply itself goes nowhere.
//
// Twilio posts every message our number receives to this address (set it on
// the number in the Twilio Console: Messaging, "A message comes in",
// Webhook, HTTP POST). We answer with TwiML, which only Twilio acts on: a
// forged request to this address gets the same XML back and nothing is
// sent, because only Twilio turns it into a text. Each auto reply costs one
// outbound segment at Twilio's rate.
//
// Never answers the carrier keywords (STOP, HELP and the rest); the carriers
// and Twilio handle those, and answering them would interfere. One answer
// per sender per hour, so two auto replies can never loop at each other.

const KEYWORDS = ['STOP', 'STOPALL', 'UNSUBSCRIBE', 'CANCEL', 'END', 'QUIT', 'START', 'YES', 'UNSTOP', 'HELP', 'INFO'];
const REPLY_WINDOW_S = 3600;

function kvEnv() {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  return { url, token };
}
async function kvCmd(cmd) {
  const { url, token } = kvEnv();
  if (!url || !token) return null;
  const r = await fetch(url, { method: 'POST', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }, body: JSON.stringify(cmd) });
  if (!r.ok) throw new Error('kv_http_' + r.status);
  return r.json();
}
// True the first time a sender writes in an hour, false after that. A broken
// counter means we answer; one extra text is the cheaper mistake.
async function firstThisHour(from) {
  try {
    const key = 'inbound:' + from.replace(/[^0-9+]/g, '');
    const j = await kvCmd(['INCR', key]);
    const n = j && typeof j.result === 'number' ? j.result : 1;
    if (n === 1) await kvCmd(['EXPIRE', key, REPLY_WINDOW_S]);
    return n === 1;
  } catch (e) { return true; }
}

const REPLY = 'This EZvoxa number only sends messages. The person who texted you cannot read a reply here. To answer them, open the EZvoxa app and send a voice message.';

function parseForm(req) {
  let b = req.body;
  if (b && typeof b === 'object') return b;
  const out = {};
  try { for (const [k, v] of new URLSearchParams(String(b || ''))) out[k] = v; } catch (e) {}
  return out;
}
const xml = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
function twiml(res, message) {
  res.setHeader('Content-Type', 'text/xml');
  return res.status(200).send(message ? `<?xml version="1.0" encoding="UTF-8"?><Response><Message>${xml(message)}</Message></Response>` : '<?xml version="1.0" encoding="UTF-8"?><Response></Response>');
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); return res.status(405).json({ ok: false, error: 'method_not_allowed' }); }
  const form = parseForm(req);
  const from = String(form.From || '').trim();
  const body = String(form.Body || '').trim();
  if (!from) return twiml(res, null);
  if (KEYWORDS.indexOf(body.toUpperCase().replace(/[^A-Z]/g, '')) >= 0) return twiml(res, null);
  if (!(await firstThisHour(from))) return twiml(res, null);
  return twiml(res, REPLY);
};

module.exports.REPLY = REPLY;

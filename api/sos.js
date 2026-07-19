// Emergency alert endpoint for the EZCommTETHER app.
//
// When Evan taps the red Emergency button, the app POSTs here. This function
// texts every family recipient (via Twilio) and emails them as a backup (via
// SendGrid), including Evan's live location as a Google Maps link when his
// phone shares it.
//
// SECRETS NEVER LIVE IN THE APP. They are read from environment variables that
// you set in the Vercel dashboard (see SETUP.md). The app itself is public, so
// nothing sensitive — phone numbers, API keys — is ever shipped to the browser.
//
// Required env vars (all set in Vercel → Project → Settings → Environment Variables):
//   TWILIO_ACCOUNT_SID   Twilio Account SID (starts "AC...")
//   TWILIO_AUTH_TOKEN    Twilio Auth Token
//   TWILIO_FROM          Your Twilio phone number, e.g. +18885551234
//   SOS_SMS_TO           Comma-separated recipient numbers, e.g. +1512...,+1737...
// Optional (email backup):
//   SENDGRID_API_KEY     SendGrid API key (starts "SG...")
//   SOS_EMAIL_FROM       A verified SendGrid sender, e.g. alerts@yourdomain.com
//   SOS_EMAIL_TO         Comma-separated recipient emails
// Optional (light abuse protection):
//   ALLOWED_ORIGIN       Your deployed site origin, e.g. https://ezcommtether.vercel.app

const list = (v) => String(v || '').split(',').map((s) => s.trim()).filter(Boolean);

function buildText(payload) {
  const child = payload.child || 'Evan';
  const base = payload.message || `HELP! It's ${child}. I need help!`;
  let loc = 'Location unavailable.';
  if (payload.location && typeof payload.location.lat === 'number') {
    const { lat, lng, acc } = payload.location;
    const map = `https://maps.google.com/?q=${lat},${lng}`;
    loc = `Location: ${map}` + (acc ? ` (within ~${Math.round(acc)}m)` : '');
  }
  const when = payload.ts ? new Date(payload.ts).toLocaleString('en-US') : new Date().toLocaleString('en-US');
  return `${base}\n${loc}\nSent ${when} from ${child}'s phone.`;
}

async function sendSms(to, body) {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_FROM;
  const url = `https://api.twilio.com/2010-04-01/Accounts/${encodeURIComponent(sid)}/Messages.json`;
  const form = new URLSearchParams({ To: to, From: from, Body: body });
  const auth = Buffer.from(`${sid}:${token}`).toString('base64');
  const r = await fetch(url, {
    method: 'POST',
    headers: { Authorization: `Basic ${auth}`, 'Content-Type': 'application/x-www-form-urlencoded' },
    body: form.toString(),
  });
  const ok = r.ok;
  let detail = '';
  if (!ok) { try { detail = (await r.json()).message || ''; } catch (e) {} }
  return { to, ok, detail };
}

async function sendEmail(toList, subject, text) {
  const key = process.env.SENDGRID_API_KEY;
  const from = process.env.SOS_EMAIL_FROM;
  if (!key || !from || !toList.length) return { ok: false, skipped: true };
  const r = await fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      personalizations: [{ to: toList.map((e) => ({ email: e })) }],
      from: { email: from, name: 'EZComm Emergency' },
      subject,
      content: [{ type: 'text/plain', value: text }],
    }),
  });
  return { ok: r.ok };
}

module.exports = async (req, res) => {
  // Health check: lets you confirm the server is configured without sending anything.
  if (req.method === 'GET') {
    return res.status(200).json({
      ok: true,
      configured: {
        sms: Boolean(process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN && process.env.TWILIO_FROM && process.env.SOS_SMS_TO),
        email: Boolean(process.env.SENDGRID_API_KEY && process.env.SOS_EMAIL_FROM && process.env.SOS_EMAIL_TO),
      },
    });
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ ok: false, error: 'method_not_allowed' });
  }

  // Light abuse protection: if you set ALLOWED_ORIGIN, reject requests from
  // anywhere else. Same-origin taps from the installed app always pass.
  const allowed = process.env.ALLOWED_ORIGIN;
  if (allowed) {
    const origin = req.headers.origin || '';
    if (origin && origin !== allowed) {
      return res.status(403).json({ ok: false, error: 'forbidden_origin' });
    }
  }

  let payload = req.body;
  if (typeof payload === 'string') { try { payload = JSON.parse(payload); } catch (e) { payload = {}; } }
  payload = payload || {};

  const smsTo = list(process.env.SOS_SMS_TO);
  const emailTo = list(process.env.SOS_EMAIL_TO);
  const isTest = Boolean(payload.test);
  let text = (isTest ? '[TEST — please ignore] ' : '') + buildText(payload);
  // Private medical note for responders — stored only in the server env var
  // SOS_MEDICAL_NOTE, never in the public app. Included in both text and email.
  const medical = String(process.env.SOS_MEDICAL_NOTE || '').trim();
  if (medical) text += `\n\nMedical: ${medical}`;

  const smsConfigured = Boolean(process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN && process.env.TWILIO_FROM);
  if (!smsConfigured || !smsTo.length) {
    return res.status(500).json({ ok: false, error: 'sms_not_configured' });
  }

  const smsResults = await Promise.all(smsTo.map((to) => sendSms(to, text).catch((e) => ({ to, ok: false, detail: String(e) }))));
  const emailResult = await sendEmail(emailTo, `EMERGENCY: ${payload.child || 'Evan'} needs help`, text).catch(() => ({ ok: false }));

  const anySms = smsResults.some((r) => r.ok);
  return res.status(anySms ? 200 : 502).json({
    ok: anySms,
    test: isTest,
    sms: smsResults,
    email: emailResult,
  });
};

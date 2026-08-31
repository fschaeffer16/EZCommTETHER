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


function allowBrowser(req) {
  const origin = req.headers.origin || '';
  const referer = req.headers.referer || '';
  const env = process.env.ALLOWED_ORIGIN || '';
  const hosts = new Set(['ez-comm-tether.vercel.app', 'ezvoxa.com', 'www.ezvoxa.com', 'myezvoice.com']);
  if (req.headers.host) hosts.add(String(req.headers.host).split(':')[0].toLowerCase());
  if (env) {
    try { hosts.add(new URL(env).host.toLowerCase()); } catch (e) {}
  }
  const ok = (u) => {
    if (!u) return false;
    try { return hosts.has(new URL(u).host.toLowerCase()); } catch (e) { return false; }
  };
  return ok(origin) || ok(referer);
}

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
  let j = {};
  try { j = await r.json(); } catch (e) {}
  return { to, accepted: r.ok, sid: (j && j.sid) || null, status: (j && j.status) || (r.ok ? 'queued' : 'failed'), detail: r.ok ? '' : ((j && j.message) || '') };
}

// Look up a message's current delivery status (delivered / undelivered / failed / ...).
async function fetchStatus(messageSid) {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  const auth = Buffer.from(`${sid}:${token}`).toString('base64');
  const r = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${encodeURIComponent(sid)}/Messages/${messageSid}.json`, { headers: { Authorization: `Basic ${auth}` } });
  const j = await r.json().catch(() => ({}));
  return { status: j.status, errorCode: j.error_code };
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
  if (!allowBrowser(req)) {
    return res.status(403).json({ ok: false, error: 'forbidden_origin' });
  }
  // Health check + diagnostics: confirm configuration and live-test the Twilio
  // credentials, without sending a message or exposing any secret.
  if (req.method === 'GET') {
    const sid = process.env.TWILIO_ACCOUNT_SID, token = process.env.TWILIO_AUTH_TOKEN, from = process.env.TWILIO_FROM;
    const out = {
      ok: true,
      configured: {
        sms: Boolean(sid && token && from && process.env.SOS_SMS_TO),
        email: Boolean(process.env.SENDGRID_API_KEY && process.env.SOS_EMAIL_FROM && process.env.SOS_EMAIL_TO),
      },
      recipients: 0,
      from: null,
    };
    // Live credential check: ask Twilio for the account. 200 = credentials good.
    if (sid && token) {
      try {
        const auth = Buffer.from(`${sid}:${token}`).toString('base64');
        const r = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${encodeURIComponent(sid)}.json`, { headers: { Authorization: `Basic ${auth}` } });
        out.twilioAuth = r.ok ? 'ok' : 'FAILED';
        out.twilioStatus = r.status;
        if (!r.ok) { try { out.twilioError = (await r.json()).message || ''; } catch (e) {} }
      } catch (e) { out.twilioAuth = 'ERROR'; out.twilioError = String(e && e.message || e); }
    }
    return res.status(200).json(out);
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ ok: false, error: 'method_not_allowed' });
  }

  // Light abuse protection: if you set ALLOWED_ORIGIN, reject requests from
  // anywhere else. Same-origin taps from the installed app always pass.
  if (!allowBrowser(req)) {
    return res.status(403).json({ ok: false, error: 'forbidden_origin' });
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

  const emailResult = await sendEmail(emailTo, `EMERGENCY: ${payload.child || 'Evan'} needs help`, text).catch(() => ({ ok: false }));
  const results = await Promise.all(smsTo.map((to) => sendSms(to, text).catch((e) => ({ to, accepted: false, sid: null, status: 'failed', detail: String((e && e.message) || e) }))));

  // Poll each message for a few seconds so we report the REAL delivery outcome
  // (e.g. carrier-blocked / undelivered) instead of just "accepted by Twilio".
  const TERMINAL = ['delivered', 'undelivered', 'failed', 'canceled'];
  const deadline = Date.now() + 6500;
  while (Date.now() < deadline && results.some((r) => r.sid && TERMINAL.indexOf(r.status) === -1)) {
    await new Promise((done) => setTimeout(done, 1200));
    await Promise.all(results.map(async (r) => {
      if (r.sid && TERMINAL.indexOf(r.status) === -1) {
        const s = await fetchStatus(r.sid).catch(() => null);
        if (s && s.status) { r.status = s.status; if (s.errorCode) r.errorCode = s.errorCode; }
      }
    }));
  }

  const delivered = results.filter((r) => r.status === 'delivered').length;
  const failed = results.filter((r) => !r.accepted || r.status === 'undelivered' || r.status === 'failed' || r.status === 'canceled').length;
  const pending = results.length - delivered - failed;
  return res.status(delivered > 0 ? 200 : 502).json({
    ok: delivered > 0,
    delivered,
    failed,
    pending,
    recipients: results.length,
    sms: results.map((r) => ({ last4: String(r.to||'').slice(-4), status: r.status, errorCode: r.errorCode || null, detail: r.detail || '' })),
    email: emailResult,
    test: isTest,
  });
};

# Publishing Evan's Talker — Step-by-Step

This guide gets the app onto Evan's, your, and his mom's iPhones as a real
home-screen app, and turns the red **Emergency** button into live text + email
alerts with Evan's location.

You do **not** need to write any code. You'll create two free accounts
(Twilio for texting, SendGrid for email), connect the app to Vercel (free
hosting), paste in a handful of settings, and add the app to each phone.

Nothing sensitive — phone numbers, keys, or Evan's medical note — ever lives
inside the app. It all lives privately in Vercel's settings.

---

## What you'll end up with

- An app icon on each iPhone that opens fullscreen and works offline.
- Tapping **Emergency** → everyone gets a text **and** an email within seconds,
  including a Google Maps link to where Evan is, plus a short private medical
  note. It also still says the alert out loud on his phone.

---

## Part A — Twilio (sends the texts) · ~15 min

1. Go to **twilio.com** and sign up (free trial).
2. In the Twilio Console home page, find **Account SID** and **Auth Token** —
   you'll paste these into Vercel later. Keep them private.
3. Buy a phone number: **Phone Numbers → Buy a number** (about $1.15/month).
   Pick one that can send **SMS**. Write it down in the form `+1XXXXXXXXXX`.
4. To text numbers freely (not just trial-verified ones), add ~$20 of credit:
   **Billing → Add funds**. Texts cost under a cent each.

> Trial tip: before you add funds, Twilio only texts numbers you've "verified."
> You can verify your family's numbers under **Phone Numbers → Verified Caller
> IDs** to test for free first.

## Part B — SendGrid (email backup) · ~10 min · optional but recommended

1. Go to **sendgrid.com** and sign up (free plan = 100 emails/day).
2. **Settings → API Keys → Create API Key** (Full Access). Copy the key (starts
   with `SG.`) — you only see it once.
3. **Settings → Sender Authentication → Verify a Single Sender**. Use an email
   you control (e.g. your Yahoo address). This becomes the "from" address.

## Part C — Put the app online with Vercel · ~10 min

1. Go to **vercel.com** and sign up with your **GitHub** account.
2. **Add New → Project → Import** the `ezcommtether` repository.
3. When it asks for a branch/settings, just click **Deploy** (no build
   settings needed — it's a plain web app).
4. You'll get a URL like `https://ezcommtether.vercel.app`. That's the app.

## Part D — Enter your private settings in Vercel · ~10 min

In your Vercel project: **Settings → Environment Variables**. Add each of these
(Name on the left, Value on the right), then **redeploy** when done.

| Name | Value | Notes |
|---|---|---|
| `TWILIO_ACCOUNT_SID` | from Twilio | starts `AC…` |
| `TWILIO_AUTH_TOKEN` | from Twilio | keep secret |
| `TWILIO_FROM` | your Twilio number | e.g. `+18885551234` |
| `SOS_SMS_TO` | family mobile numbers | comma-separated, e.g. `+1512…,+1737…,+1210…,+1832…` |
| `SENDGRID_API_KEY` | from SendGrid | starts `SG.` (skip if no email) |
| `SOS_EMAIL_FROM` | your verified sender | e.g. `you@yahoo.com` |
| `SOS_EMAIL_TO` | family emails | comma-separated |
| `SOS_MEDICAL_NOTE` | short medical note | see below |
| `ALLOWED_ORIGIN` | your Vercel URL | e.g. `https://ezcommtether.vercel.app` (optional, blocks outside abuse) |

**Recipients:** put **all four** people (you, mom, both brothers) in
`SOS_SMS_TO` and `SOS_EMAIL_TO`. Use the full `+1` country-code format for phone
numbers.

**Medical note** (`SOS_MEDICAL_NOTE`): one or two sentences a helper or 911
would need. Suggested starting point — edit to fit:

> `Evan is 13, nonverbal/autistic. Possible metabolic condition — low energy,
> may tire or feel unwell quickly. If unresponsive or in distress, call 911 and
> contact Dad first.`

## Part E — Test it (do this before relying on it) · 5 min

1. In a browser, open `https://YOUR-URL/api/sos`. You should see
   `{"ok":true,"configured":{"sms":true,"email":true}}`. If `sms` is `false`,
   a Twilio variable is missing or misspelled.
2. Open the app, tap **Emergency → Yes, send SOS now**. Everyone should get a
   text and email within a few seconds, with a working map link.
3. Check the text on a phone — the map link should open Evan's location.

## Part F — Add to each iPhone home screen · 2 min per phone

On Evan's phone (and yours, and mom's):

1. Open the app URL in **Safari** (must be Safari, not Chrome).
2. Tap the **Share** button (square with an up-arrow).
3. Tap **Add to Home Screen** → **Add**.
4. The app icon appears on the home screen. Open it from there — it runs
   fullscreen, no browser bars, and works offline.
5. The first time Evan taps a talk button, tap **Allow** if it asks about
   sound; the first Emergency will ask permission to use location — tap
   **Allow While Using**.

## Part G — Family Sync (share changes between phones) · ~10 min

This lets you edit on your phone, tap **Save**, and have Mom (or the brothers)
pull your changes onto their phones with **Sync**. It needs a tiny free cloud
store. *(Photos aren't synced — each phone keeps its own — everything else is:
names, phone/email/address/birthday, buttons, wording, and arrangement.)*

1. In **vercel.com** open your project → **Storage** tab → **Create Database**.
   Pick a **Redis / KV** store (Upstash), free plan, and connect it to this
   project. Vercel automatically adds the store's URL and token to your project
   (`KV_REST_API_URL` and `KV_REST_API_TOKEN`) — you don't copy anything.
2. Go to **Settings → Environment Variables** and add:

   | Name | Value |
   |---|---|
   | `FAMILY_SYNC_PASSWORD` | your family password — **use the same value you set in the app**, and make it stronger than `1234` |

3. If you set `ALLOWED_ORIGIN` earlier (Part D), you're done; it also protects
   this. **Redeploy** (Vercel → Deployments → ⋯ → Redeploy).
4. Test: open `https://YOUR-URL/api/settings` in a browser. You should see
   `{"ok":true,"configured":{"storage":true,"password":true}}`. If either is
   `false`, that piece isn't set yet.

**How you'll use it day to day:**
- On your phone: make changes in Settings, enter the family password, tap
  **Save**. It saves on your phone *and* shares with the family automatically.
- On another phone: open **⚙️ Settings → Sync from family**, enter the family
  password, tap **Sync Now**. That phone pulls in your latest changes.

> Keep the in-app family password and `FAMILY_SYNC_PASSWORD` the same. If you
> change one, change the other, or sharing will stop matching.

---

## Good to know

- **Updates are instant.** When the app is improved, the change deploys to the
  same URL — everyone's home-screen app updates automatically (may need one
  reopen).
- **Offline:** the app itself works with no internet. The Emergency alert needs
  a signal to send texts/email — if there's no signal it still speaks aloud and
  shows the alert on screen.
- **Costs:** Vercel free, SendGrid free (100/day), Twilio ~$1/month + pennies
  per text.
- **Privacy:** phone numbers, keys, and the medical note live only in Vercel's
  settings — never in the app's public code.

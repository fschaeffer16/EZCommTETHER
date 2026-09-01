# LEDGER — the running record Claude must not forget

Frank asked for this on 1 Sep 2026 after Claude forgot which domains he owns.
My conversation memory gets condensed over time; this file does not. **Any
standing fact or decision from a conversation gets written here in the same
commit as the work, or it will eventually be forgotten.** Newest facts win;
correct rather than append when something changes.

## Domains (all registered at GoDaddy, one account)

| Domain | Job | Status 1 Sep 2026 |
|---|---|---|
| `ezvoxa.com` | The brand and website. Everything printed or shared points here. | Being connected to Vercel today (was parked at GoDaddy, `13.248.243.5` / `76.223.105.230`) |
| `www.ezvoxa.com` | Same site; apex redirects to www per Vercel's recommendation | Added together with the apex |
| `myezvoice.com` | Second name Frank bought so a misheard name still finds him. **Redirects to ezvoxa.com — never a second brand** (RELEASE.md) | Not yet connected; add to the same Vercel project as a redirect after ezvoxa.com works |
| `app.ezvoxa.com` | Customer app, `release` lane only | Waits until a release is cut (RELEASE.md) |

Email: `frank@ezvoxa.com` forwards to Frank's Gmail via ImprovMX (records
already in GoDaddy DNS — do not delete the ImprovMX MX/TXT records when
editing DNS). Frank's Apple/GoDaddy logins are his; never ask for passwords.

## Business status

- **EZ Voice LLC** exists, Florida, with an EIN. Frank is sole owner/signer.
- **D-U-N-S number: arrived 1 Sep 2026** (email from D&B — Frank keeps it;
  the legal-name spelling in that email is the one to copy everywhere).
- **Apple Developer Program**: enrolling as Organization, $99/yr, when money
  lands Thursday or Friday (4–5 Sep 2026). Then: verification phone call
  within ~a week — answer unknown numbers.
- **Google Play**: $25 one-time org account; needs the D-U-N-S, LLC docs,
  physical address proof, Frank's ID. Org accounts skip the 12-tester rule.
- **Store plan** (audit of 26 Aug): template only, wrapped with Capacitor,
  tracking the `release` lane; v1 free with everything unlocked; ~3–6 weeks
  from Apple enrollment to live. Evan's app never goes to a store.
- **privacy.html**: drafted from the api/ code, live but unlinked, marked
  DRAFT. Not the policy until Frank approves the wording.

## Trial program (decided 31 Aug 2026)

- **5 loaner phones, no more for now**: refurbished iPhone 11 Pro Max
  (~$220 each; 6.5", within 3% of the Pro Max size Evan uses) + rugged case
  (~$25, assumption to verify). ≈ $1,225 one-time, WiFi-only, no plans.
- Families with a spare iPhone trial free on their own device.
- Raniyah's position, adopted: the phone is the product's identity; iPads
  are the district demo, not the pitch.
- Without cellular, SOS location only works on WiFi — tell trial families.

## Subscription principles (agreed 1 Sep 2026, build into licensing)

- Free tier is the talker: boards + device voice **work forever, paid or not**.
- Premium (auto-renewing, store billing): natural voice, cloud texting,
  voice notes, Family Sync. Lapse = graceful downgrade, never silence.
- **The emergency button never gates on payment. Hard rule.**
- No Claude/AI assistant in the app; no web pages in the app (only `tel:`,
  `sms:`, and Call 911 handoffs). Keep it that way — it is a selling point.
- Prices not set yet: needs comparables + per-family server cost, with unit
  counts, folded into the business plan and interactive model together.

## Devices

- Three production phones (Evan, Frank, Raniyah) on `main` via the
  vercel.app address. They do not move to ezvoxa.com without a fresh install,
  and not before backup/restore exists (RELEASE.md).
- **Evan's old iPad Pro 11 (834×1194)**: now the district demo unit, template
  app only. Evan's daily device is his phone.
- **Evan defeats Guided Access** (reboots out, wanders Settings; he set the
  175% zoom himself). His iPhone is currently NOT locked and Frank does not
  know the old Guided Access passcode. Plan when time allows: fresh Guided
  Access with Face ID to end sessions + Screen Time passcode + block app
  deletion. Real lock (Single App Mode) needs a Mac or ABM — no Mac in the
  house; ABM becomes possible now the D-U-N-S exists.
- Opening Statement sections 4 and 8 still overstate the lockdown ("cannot
  leave the app") — replacement wording drafted in chat 1 Sep, awaiting
  Frank's go-ahead. Fix before a district tech person reads it.

## Pages and names

- `hearhim.html` is titled **"EZ's Voice"** (Frank's preference, 1 Sep).
  URL unchanged so shared links keep working.
- `opening-statement.html`: Frank's document, his wording is frozen; visuals
  added around it 31 Aug (screenshots, rate chart, security panels).
- `whatami.html`: device check + live zoom meter. Parent-facing warnings
  belong there, never inside the apps (the zoom banner lesson, 1 Sep).
- Until DNS propagates, working links are on `ez-comm-tether.vercel.app`.

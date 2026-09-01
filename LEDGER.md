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
- **PRICING IS NOT CONFIRMED. Frank, 1 Sep 2026: "remove the pricing. I
  have not confirmed that yet."** All dollar figures ($79.99 once, $12.99/mo,
  $99/student/yr for schools) are stripped from the public website; only
  market comparisons ($3,000-$5,000 devices, $250-$300 iPad apps) remain.
  $79.99 and $12.99 stay as internal working numbers in the revenue model
  only. Do not publish any EZvoxa price anywhere until Frank confirms it.
  His own Opening Statement wording says "a fraction of the cost" and
  mentions the $12.99/mo subscription; his document, his call whether that
  stays. Final pricing session owed: comparables + per-family server cost,
  with unit counts, business plan and interactive model updated together.

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
- **Photos are never drawn larger than the file** (Frank, 1 Sep, angrily and
  rightly: "You cannot stretch everything to fit"). His originals are mostly
  480-720px wide. The story collage is capped at 660px, the beach photo at
  its true 450px. Before shipping any image, compare drawn width to file
  width at every breakpoint.
- **The hero shows the real app**, from Frank's own home-screen screenshot
  (`shot-home.jpg`, neon dark UI) in a phone bezel, with the EZvoxa app icon
  (`app-icon.jpg`, his supplied art) captioning it. Tapping it opens the
  demo. The beach photo now leads Evan's story section.
- **The website's demo widget looks nothing like the real app** (white
  mockup vs the real neon-dark picture-first UI) and Frank called it
  terrible on 1 Sep. Owed: restyle the demo boards to match the real app's
  look, using his screenshot as the reference.
- Hero also carries an email-only waitlist signup (source marked `hero`,
  same list, same api/waitlist).
- Waitlist: public form at the bottom of ezvoxa.com; Frank reads it at
  `/waitlist-admin.html` with the family password. **A signup confirmation
  email is wanted, but Frank must vet the wording before it ever sends
  (his words, 1 Sep). Nothing automated goes out until he approves the
  text.** Draft offered 1 Sep; send via the SendGrid sender the SOS email
  already uses.
- **ezvoxa.com went live 1 Sep 2026** (A @ 216.150.1.1, CNAME www per
  Vercel's card; GoDaddy keeps the ImprovMX email records). The root of
  ezvoxa.com / myezvoice.com serves the website (`ezvoxa.html`) via
  host-scoped rewrites in vercel.json; the vercel.app root still serves
  Evan's app for the three phones. The website's story section carries
  Frank's own wording from EZ's Voice, and links to both documents.

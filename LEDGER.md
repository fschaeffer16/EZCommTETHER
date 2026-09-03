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
| `myezvoice.com` | Second name Frank bought so a misheard name still finds him. **Redirects to ezvoxa.com — never a second brand** (RELEASE.md) | **CONNECTED 2 Sep 2026** — Frank pointed it (A @ 216.150.1.1, www CNAME), DNS verified resolving to Vercel. A session told him it wasn't connected AFTER he did this, because nobody wrote it here. That failure is why this file exists. Update it in the same commit as the work, every time. |
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
- **Store readiness build-out, 1 Sep 2026** (Frank: full focus on a
  legitimate, sellable, updatable app; he handles the website): Android
  shell generated (`native/android/`, permissions, icons, dark splash,
  Codemagic signing); subscription rails built and verified but DORMANT —
  `ezPremium()` gate in demo.html (natural voice only; lapse changes the
  sound, never the ability to talk), Subscription card in Settings that
  exists only when a store build injects `native/billing.js` (RevenueCat,
  fail-open, Restore purchases included), switched on per build with
  EZ_BILLING=1 + RevenueCat keys. Emergency button reads none of it. Both
  Codemagic workflows (TestFlight + Play internal) in codemagic.yaml.
  **APPSTORE.md is the runbook Frank follows from enrollment to on-sale.**
- **Decision Frank owes: SOS for customers.** On customer phones SOS is a
  demonstration today. Recommended: on-device SOS (prefilled Messages to
  the family contacts typed into the app) before v1 ships, so "the
  emergency button always works" is true for customers. Cloud SOS for
  customers is later, premium, needs per-family backend + auth.
- Store listings/subscription copy promise ONLY the natural voice as
  premium until per-family texting/voice-notes/sync exist for customers.
- **privacy.html: APPROVED by Frank 2 Sep 2026 ("The wording is fine").**
  In effect, dated 2 September 2026, live at ezvoxa.com/privacy.html and
  linked from the site footer. This is the URL for both store listings.

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

## Frank's rulings, 2 Sep 2026 (after sessions contradicted each other)

- **The feature is named "SOS Family Alert"** everywhere: app, website,
  store listings, documents. The template's red bar now says it.
- **SOS Family Alert is FREE, FINAL, no more debate.** It is never part of
  the subscription, even though the cloud send costs Twilio money like the
  paid texts do. The cost is absorbed; abuse is handled with rate limiting,
  not a paywall. Any session that suggests making it paid is contradicting
  a settled decision — do not reopen it.
- **What premium texting and voice notes actually are** (do not confuse
  them with SOS, they share plumbing and nothing else):
  - *Cloud texting*: the user sends pre-written texts to family members
    whose phone numbers a parent loaded.
  - *Voice notes*: family members on the same app send voice recordings TO
    the user's phone.
- **Backup & Restore ships. Not optional.** Built 2 Sep in demo.html
  (Settings card: backup to a file via share sheet or download, restore
  with confirm + rescue copy).
- **Hurt is its own button on the Home Screen** on buyer phones, exactly
  like Evan's board — not buried inside Health. Done 2 Sep (layoutRev 18).
- **EVAN'S LIKENESS NEVER SHIPS IN THE PRODUCT. Same rule as his photos.**
  Frank had to catch Claude putting Evan's avatar art (`hurt_tile`) on the
  template's Hurt tile, hours after his brief said his face is not the
  product. Fixed 2 Sep: the template's Hurt tile uses Frank's own neon
  figure (`tile_hurtbody`, supplied 2 Sep, frame stripped per the artwork
  rule); `hurt_tile` and `headache` (both Evan's avatar) are
  replaced with generic art by native/build.js in every store build.
  OWED: a full audit of tether-icons.js for any other likeness art —
  extend EVAN_LIKENESS_KEYS in native/build.js with whatever it finds.
- **Frank supplied the template's Hurt tile art on 2 Sep** (neon figure
  holding a knee). Shipped the same day as `tile_hurtbody`, frame stripped,
  the app drawing the box and caption. Build 2026.09.02.3.
- **Template home order, Frank's, FINAL 2 Sep 2026 (built, layoutRev 19):**
  Family, Food / School, Sentence Build / Fun, Watch / Morning, Night /
  Bathroom, Hurt / Friends, Feelings / Places, Calendar. Off the home
  screen: Health and My Choice (last two tiles inside Feelings), Houses
  (first two tiles inside Places, rooms come back to Places), Colors and
  Numbers (inside School with the Calculator), Time (inside Calendar).
  The red Hurt bar inside Health is gone (Hurt is a home tile). Frank
  approved the placements 2 Sep ("Go on the first one"). APP_MAP.md has
  the table. Do not rearrange without his written order.
- **Pricing: Frank is working on it the week of 2 Sep 2026.** Nothing
  publishes until he confirms; the subscription switch-on waits on it.
- **Privacy policy: draft delivered to Frank as a Word document 2 Sep**
  (`EZvoxa Privacy Policy DRAFT.docx`, generated from privacy.html with
  the SOS Family Alert name and the subscription and backup lines added;
  privacy.html carries the same). Awaiting his wording.
- **The website walkthrough shows real screens** (Frank, 2 Sep: a walkthrough
  that says "show me" must show the actual app). Each of the eight steps in
  the Watch how it works film has its own template screenshot
  (`walk-*.jpg`, taken from the real app at phone size). SOS Family Alert
  name applied in the letter, the film, EZ's Voice's phone, and the app's
  confirm button (no dash).
- **The seven store-readiness code items, Frank's go 2 Sep, done the same
  day** (build 2026.09.02.6, app version 1.0.0): privacy manifest linked
  into the Xcode project; native backup path (Filesystem + Share plugins)
  for store builds; export-compliance key; one version number in
  `native/version.json` stamped onto both stores at build; purpose
  strings reworded (SOS Family Alert, no dashes); Xcode pin waits on the
  first green build by design; full likeness audit of all 253 icons.
- **Likeness audit result (2 Sep):** sixteen keys are Evan or the family's
  homes and are blanked in every store build (list in native/build.js and
  APPSTORE.md). The template never draws them; it has its own neon art.
- **Brand logos: Frank said blank them (2 Sep).** 37 keys are now blanked
  in every store build (Evan's art, the family's houses, and 21 trademark
  icons); a scan of every template board proves none is drawn. Six keys
  are held back because the template's own Food board draws them: the
  McDonald's and Outback restaurant tiles and their item art. Decision
  owed by Frank: keep those boards with the chain names and generic neon
  art (recommended), or drop them from the template.
- **The website is Claude Design's lane (Frank, 2 Sep 2026).** The night of
  1 Sep, ChatGPT deployed the app in place of the website (the exact
  failure WEBSITE_BRIEF.md warns about: never deploy a partial tree, never
  overwrite the HTML apps) and lost its work; Frank undid it by hand and
  handed the website design to Claude Design. No other tool or session
  touches the site files (ezvoxa.html, site.css, site.js, home-hero.css,
  site-assets/, the story/app/families/journal/join pages) without him.
  This session's lane stays the app, the store build, and the documents.
- **VERCEL ROUTING ORDER, learned three times now: headers, then redirects,
  then the filesystem, then rewrites.** index.html (Evan's app) exists at
  the root, so a REWRITE of "/" can never serve the website; the file wins
  and ezvoxa.com opens Evan's app. It happened with Claude's first attempt
  (1 Sep, Frank: "the FREAKING TEMPLATE APP"), with ChatGPT the night of
  1 Sep, and with a website session's "canonical root" commit (8cefb45,
  2 Sep) that also added /home -> / redirects, a loop. The only thing that
  works: host-scoped REDIRECTS of "/" to "/home" plus one rewrite of
  /home to ezvoxa.html. Do not change vercel.json's root routing without
  reading this. A bare ezvoxa.com/ URL needs Edge Middleware, not rewrites.
- **Board anchor (Frank's design, 2 Sep 2026, both apps):** inside every
  child board the top is the same Yes / Home / No row as the home screen,
  with the quick strip under it a little smaller (five across). The old
  Home / Help / Done bar is gone. Settings and the SOS screens keep their
  own headers. Template build 2026.09.02.8, Evan's 2026.09.02.1.
- **Quick strip order (Frank, 3 Sep 2026, both apps):** Help, Question,
  Restroom, Thank you, Good morning, Hello, Bye, I Love You, Good, Bad,
  Now, Later, More, Done, Hot, Cold. I Love You stays (leaving it out was
  an oversight, his words). Hot and Cold are drawn in the app in the set's
  neon style; swap in Frank's art when he sends it.
- **Fun and Places are one board (Frank, 3 Sep 2026, both apps).** The
  Fun tile is gone from home; Places took its spot so his pairs hold
  (template: Places / Watch, Calendar closes the board alone, 13 tiles;
  Evan: Places / TV, 14 tiles, Houses gone from home too). Inside Places,
  three sections in his order: Homes (the two houses), Fun (Pool, Beach,
  Park, Movies, Bike Ride, Trampoline, Soccer Field, Dogs), then Places
  (Doctor's Office, Mall, Grocery Store, Store, Haircut, Hospital, Car,
  Home; Evan's has Mom's Car and Dad's Truck instead of Hospital, Car,
  Home). A house tile opens its room board with the "In every house"
  strip (bathroom, kitchen, living room, outside) at the top, so nothing
  from the old Houses screen was lost. Buttons a family added to Fun show
  under the Fun heading. Layout rev 20 (template) / 17 (Evan) move a saved
  home order without dropping custom tiles.
  **Art owed:** Mall and Grocery Store are drawn in the app (neon
  placeholders) in both apps; in Evan's, Movies is the template's neon
  icon because he has no photo for it. Replace all three when Frank
  supplies pictures. Template build 2026.09.03.1, Evan's 2026.09.03.1.
- **Evan's home, 3 Sep 2026 (later):** Places / TV row above Feelings /
  Bathroom. Order is now Family, Food / School, Sentence Build / Places,
  TV / Feelings, Bathroom / Morning, Night / Hurt, I'm Sick / Calendar,
  My Choice. Layout rev 18 swaps the two rows on a saved phone. Evan's
  build 2026.09.03.2.
- **Template art audit, 3 Sep 2026 (Frank asked for every picture that
  does not fit the neon look).** Crawled all 35 template screens: 172
  distinct pictures, 89 do not match. Sheets sent to Frank. The groups:
  Food board photo renders (Thirsty/Full/Snack chips, the six drinks,
  Hamburger, Sandwich, Soup, Cereal, Eggs, Cookie, Chips, Pretzels,
  Crackers); every restaurant menu item (photos, cartoons, four bare
  emoji: Chinese Place tile, Garlic Bread, Chicken, Egg Roll); the Watch
  board's 28 Netflix posters, 13 Disney posters and 8 sports logos;
  Stuffy Nose and Ice Pack on Health (watercolor); Bathroom, Kitchen and
  Living Room chips in the house rooms (3D cartoon); the Time button on
  Calendar (clock emoji); and the four drawn placeholders (Mall, Grocery
  Store, Hot, Cold). Correction, same day: the store build never carried
  the posters, because native/build.js replaces tether-photos.js with an
  empty stub; only the web demo showed them.
- **Template Watch board (Frank's go, 3 Sep 2026):** four tiles, TV,
  Movies, Sports, Streaming. Each opens the two-line chooser (Can I watch
  TV? / I want to watch TV.). Tablet and Internet tiles gone, and the
  Netflix, Disney and sports boards are no longer reachable on a buyer
  phone, so no posters or logos show anywhere in the template. A family
  adds its own shows with the edit wheel under Watch: TV / Movies /
  Sports / Streaming and they appear under that tile. Sports and
  Streaming tiles are drawn placeholders; art owed from Frank. Evan's
  TV board unchanged. Template build 2026.09.03.2.
- **Frank's neon food art, 3 Sep 2026:** Orange Juice, Sandwich, Soup,
  Hamburger, Lemonade replaced the photo renders (keys drink_orange,
  food_sandwich, food_soup, hamburger_plain, drink_lemonade; 384px JPEG
  from his 1254px originals). Still photo renders on the Food board:
  Water, Milk, Apple Juice, Soda, Cereal, Eggs, Cookie, Chips, Pretzels,
  Crackers, and the Thirsty / Full / Snack chips. Builds 2026.09.03.3.
  Later the same day: Soda, Apple Juice, Milk, Water and the Full chip
  arrived too (drink_soda, drink_applejuice, drink_milk, drink_water,
  hunger_full). Still owed: Cereal, Eggs, Cookie, Chips, Pretzels,
  Crackers, and the Thirsty and Snack chips. Builds 2026.09.03.4.
  Then the Thirsty and Snack chips arrived (hunger_thirsty, hunger_snack),
  so all four hunger chips and all six drinks are his art. Still owed on
  Food: Cereal, Eggs, Cookie, Chips, Pretzels, Crackers. Builds
  2026.09.03.5.
- **Frank's Sports, Streaming and Cold art, 3 Sep 2026:** Sports and
  Streaming replaced the drawn Watch tiles on the template (keys
  watch_sports, watch_streaming; his pictures carry no word, so the tile
  writes it under the picture in the tile's colour, the old Tablet
  treatment). Cold replaced the drawn strip tile in both apps: his glyph
  set inside the strip's own box with the word under it (qn_cold), glyph
  alone for the tablet pills (qng_cold). Placeholders still drawn: Hot,
  Mall, Grocery Store. Builds 2026.09.03.6.
- **Frank's Hot, Mall and Grocery Store art, 3 Sep 2026:** the last
  three drawn placeholders are gone. Hot sits in the strip's box like
  Cold (qn_hot, qng_hot); Mall and Grocery Store are Places scene tiles
  (place_mall, place_grocery, 683x512 like the rest of the set), both
  apps. Nothing drawn by Claude remains in either app. Still photo
  renders on Food: Cereal, Eggs, Cookie, Chips, Pretzels, Crackers.
  Builds 2026.09.03.7.
- **Anchor under a phrase chooser (Frank, 3 Sep 2026, both apps):** the
  Bathroom / My Choice / greeting sheets used to slide up over the whole
  screen and hide the Yes / Home / No row. The sheet now lives inside
  the content region, so the anchor and the quick strip stay on screen
  and usable while a sheet is open. Builds 2026.09.03.8.
- **Frank approves a change BEFORE it is made** (his rule 2 Sep, now in
  CLAUDE.md). Shipping to main stays the default and is not the issue.
  The issue was deciding what to change without him: describe the change
  first, get his go, then build, then ship. Covers everything he did not
  explicitly ask for and every decision inside a task he did ask for that
  he has not made himself. Only broken/unsafe things get fixed first and
  reported after.
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

- **WEBSITE_BRIEF.md is the master brief for the public website** (2 Sep
  2026): Frank's uploaded brief, corrected to match the rulings above and
  the verified state of the app. Any session doing website work reads it
  first. The Word copy Frank hands to builders is generated from it.
- **Internal .md files were publicly served by Vercel** (found 2 Sep:
  ezvoxa.com/LEDGER.md returned 200 to anyone). vercel.json now redirects
  every .md, .yaml, and .docx path to /home. Never commit anything to this
  repo that must stay private even with that block: the repo deploys.

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

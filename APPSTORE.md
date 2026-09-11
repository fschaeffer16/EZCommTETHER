# APPSTORE — from this repo to "for sale" on both stores

*The complete runbook for shipping the EZvoxa template as a real store app,
updating it, and selling the subscription. Rewritten 1 Sep 2026 when the
Android shell and the subscription rails landed. The companion audit is the
"EZvoxa App Store Compliance Audit" document (26 Aug).*

## The one-sentence architecture

`demo.html` stays the single source of truth; `native/build.js` packages it
into `native/www/`, the Capacitor shells in `native/ios/` and
`native/android/` wrap that into real apps, and Codemagic builds, signs, and
publishes both from this repo. Nothing about the web app, Evan's app, or the
deploy lanes changes.

## What is DONE in this repo (1 Sep 2026)

- **iOS shell** (`native/ios/`): purpose strings (location for SOS only,
  microphone for voice notes, camera and photo library for personalizing
  buttons), `PrivacyInfo.xcprivacy` (no tracking, nothing linked to
  identity), portrait-only on iPhone, app icon at 1024 from the real icon
  art, dark splash matching the app.
- **Android shell** (`native/android/`): generated 1 Sep. Manifest
  permissions (location for SOS, microphone for voice notes, Play Billing),
  launcher icons (legacy, round, adaptive) and dark splash from the same
  art, release signing wired to Codemagic's keystore env vars, version code
  from the build number. `play-icon-512.png` in `native/` is the Play
  listing icon.
- **Packaging** (`native/build.js`): strips our family's photos
  (`tether-photos.js` becomes an empty stub), points `/api/...` at the
  customer lane, and injects the billing bridge only when asked (below).
- **Subscription rails, dormant until switched on**:
  - `demo.html` has the entitlement gate (`ezPremium()`): without a billing
    bridge everything is unlocked, exactly as today. With billing on and no
    subscription, the natural voice steps aside and the device voice speaks.
    A lapse changes the sound, never the ability to talk.
  - Settings grows a **Subscription** card only in billing-enabled store
    builds: status, "See subscription options" (the store's own sheet shows
    the price — we never print one), **Restore purchases** (Apple requires
    it), Manage subscription, Privacy Policy and Terms links. Verified
    working against a simulated store 1 Sep.
  - `native/billing.js` implements the bridge with RevenueCat
    (`@revenuecat/purchases-capacitor`, both platforms; Frank, 7 Sep 2026).
    It fails open: if billing can't initialize, the app is simply unlocked.
    The direct StoreKit 2 plugin from 5 Sep is on disk, dormant.
  - **The SOS Family Alert button reads none of this. Hard rule, enforced in
    code comments at every layer.**
- **Codemagic** (`codemagic.yaml`): iOS workflow (signs, TestFlight) and
  Android workflow (signs, Play internal track). Both carry the
  `EZ_BILLING` switch, off by default.
- **Safety**: on any phone that is not stamped as ours, SOS and cloud
  texting are safe demonstrations. A store customer can never ring our
  family. (`sendSos`, `textPerson` in demo.html.)

## The order of operations for Frank

### This week (enrollment lands Thursday or Friday)

1. ~~**Apple Developer Program**, Organization, $99.~~ **DONE 10 Sep 2026.**
   Enrolled and paid, order #W1949990147, one-year membership, Program
   License Agreement accepted the same evening. No phone call was needed.
   Next on the Apple side: App Store Connect access, then Agreements, Tax
   and Banking with the W-9, then the Small Business Program (the 15%
   commission tier, which must be enrolled BEFORE the first sale).
2. **Google Play Console**, organization account, $25 one-time. Needs the
   D-U-N-S, LLC docs, address proof, your ID.
3. **Codemagic**: sign up with the GitHub account, add this repo. Then the
   header comments in `codemagic.yaml` are the exact checklist for each
   store (App Store Connect API key, the "ezvoxa" integration, the Android
   upload keystore, the Play service account).
4. **App Store Connect**: create the app, bundle id `com.ezvoxa.app`.
   **Play Console**: create the app, package `com.ezvoxa.app`.
5. First iOS build to **TestFlight** through Codemagic, on your phone the
   same day. First Android .aab uploaded to Play **internal testing** by
   hand (Play requires the first upload manually; automated after that).

### v1 submission (free, everything unlocked)

This is the fastest path to being ON the stores, and nothing about pricing
has to be decided for it. Review posture: fully offline single-file app,
real assistive function, established AAC category. Budget for one
rejection/fix cycle.

Listing needs from Frank:
- Screenshots: 6.7" and 6.1" iPhone (TestFlight build on your phone,
  screenshots of the home board, Food, a person's phrases, Choose Voice,
  the SOS screen in demo mode). Play wants phone screenshots plus the
  512 icon (`native/play-icon-512.png`) and a 1024x500 feature graphic
  (I can generate it from the icon art when you say go).
- Description: I draft, you approve. No prices in it.
- **Privacy policy: approved by Frank 2 Sep 2026 and live** at
  https://ezvoxa.com/privacy.html (the URL both store forms ask for).
- Support URL and marketing URL: `ezvoxa.com`.
- Age rating questionnaires: everything "none" (no violence, no user
  content, no web browsing, no data collection). EZvoxa is NOT a Kids
  Category app; it is a utility for all ages.

App privacy questionnaire (mirrors privacy.html):
- Data used to track you: **none**.
- Data linked to you: **none**.
- Data not linked to you: **Precise location** (emergency alerts only, app
  functionality), **Audio** (voice notes, app functionality). Nothing else.

Review notes to paste into App Store Connect (avoids the two questions
reviewers always ask):
> EZvoxa is an AAC (augmentative and alternative communication) app for
> nonverbal teenagers and adults. No account is needed; every feature is
> usable immediately. The SOS Family Alert button in this build is a demonstration:
> it shows the alert flow but sends nothing. Location is requested only at
> the moment an alert would be sent. The app is fully functional offline.

### Switching the subscription on (needs two decisions first)

Blocked on: **pricing confirmed by Frank** (LEDGER rule: no price is
published anywhere until then) and **the customer-SOS decision** (below).

**Billing through RevenueCat (Frank, 7 Sep 2026: "I looked into it more and
I am good using RevenueCat"; restored the same day).** The app talks to the
stores through RevenueCat's plugin (`native/billing.js`), RevenueCat tells our
server about every purchase, renewal, cancellation and expiry (`api/plan.js`,
shared secret), and the purchase is filed under the family's hidden billing
id, which the app logs the plugin in with. Both stores, one set of code.
RevenueCat's price, from its own pricing page: nothing up to $2,500 in
monthly tracked revenue, then 1% of what is tracked.

The direct-with-Apple path from 5 Sep stays in the repository, dormant:
`native/ios/App/App/EZStorePlugin.swift` and `EZBridgeViewController.swift`
are on disk but not in the Xcode target, and `api/plan.js` still accepts
Apple's own signed notifications if App Store Connect is ever pointed at
it. Switching later needs no new code.

Then, in order:

1. **RevenueCat account** (its own page: free to $2,500 monthly tracked
   revenue, then 1%): create the project, add the Apple app and the Google
   app, create entitlement **`premium`**, offering **`default`** with the
   packages. Copy the public SDK keys (Apple `appl_...`, Google `goog_...`).
2. **App Store Connect**: Subscriptions → create group "EZvoxa Premium" →
   auto-renewable subscription(s) (suggested ids: `ezvoxa_premium_monthly`,
   optional `ezvoxa_premium_yearly`). Price set HERE, never in code.
   Fill the subscription's own privacy/terms fields. Attach the
   subscription to the app version you submit. RevenueCat also needs the
   App Store Connect In-App Purchase key (Users and Access, Integrations,
   In-App Purchase) uploaded in its dashboard.
3. **Play Console**: Monetize → Subscriptions → same products, same ids.
4. **RevenueCat webhook** (`api/plan.js`): in the RevenueCat project,
   Integrations → Webhooks → add `https://app.ezvoxa.com/api/plan`, and set
   its Authorization header value to a long random secret. Put the same
   secret in Vercel as `RC_WEBHOOK_SECRET`. Without the env var the
   endpoint refuses RevenueCat events. `GET /api/plan` reports
   `revenuecat: true` once it is set.
5. **Codemagic**: set `EZ_BILLING: "1"` and the RevenueCat public SDK keys
   (`EZ_RC_KEY_IOS`, `EZ_RC_KEY_ANDROID`) in the workflow vars, build,
   submit as an update. Apple reviews the IAP with it.
6. **Sandbox test in TestFlight**, with a Sandbox Apple Account: subscribe
   on one phone; the natural voice is on for every phone in the family;
   the sales page shows the purchase marked sandbox; cancel it and the
   voice falls back on expiry everywhere; Restore Purchases works on a
   reinstall; a phone that joins the family after the purchase is premium
   at once.
7. Everyday texting is locked from day one (Frank, 5 Sep 2026): a family
   texts only while its plan is active, from the store or from a hardship
   grant. There is no switch. To test texting on a family before the store
   products exist, grant it a plan (SETUP.md, Part I). SOS Family Alert
   never reads the plan; it is throttled per family instead (10 alerts in
   ten minutes).
8. Before switch-on, open RevenueCat's "Event Types and Fields"
   documentation page and confirm the event names `api/plan.js` handles
   and the refund event's name (not confirmed from the page; refunds are
   not yet counted on the sales page for RevenueCat events).

**The sales page** (`sales.html`, family password): active subscriptions,
and per month new, renewals, cancellations, expirations and refunds, from
RevenueCat's events (and Apple's, if ever enabled) as they arrive,
refreshing every 30 seconds. Dollar
figures are the prices Apple put on each event, before commission, and
Apple says not to use them as the record for money; App Store Connect's
Payments and Financial Reports are the record. Sandbox events show but are
never counted as money.

### Selling on the website (Frank's lane, one hard rule)

A web purchase (Stripe or similar) could be honored in the app later,
because the Family Code is the account it would attach to, and Apple's
guideline 3.1.3(b) allows it as long as the same subscription is also sold
in the app. Not built; the website sells nothing in-app today.

**The hard rule (Apple 3.1.1): the iOS app must never mention, link to, or
hint at buying anywhere but the App Store.** The website may say whatever it
likes about pricing; the app may not point at it. The Subscription card
already complies. Anything Frank writes for the site is fine; nothing about
web pricing goes into demo.html.

## SOS Family Alert for customers (payment question SETTLED 2 Sep 2026)

**Frank's ruling, final: SOS Family Alert is free, always, on every tier.
It is never part of the subscription, even though the cloud send costs
Twilio money like the paid texts do. The cost is absorbed; abuse is
handled with rate limiting, not a paywall. Do not reopen this.**

**Corrected 10 Sep 2026: this is BUILT.** The paragraph here used to say a
customer's alert was only a demonstration because the server knew nobody but
us. That stopped being true on 5 Sep with the Family Code build. `api/sos.js`
reads `fam:CODE:settings` and alerts every person that family marked "Gets
the emergency alert", skips fictional 555 numbers, and never carries our
medical note. A phone with no family is still a demo; a phone in a family is
not. Verified in the code and by the two-phone Playwright run recorded in
LEDGER.
The build path, both stages free to the customer:

- **v1.1, on-device**: the alert opens Messages prefilled with the alert
  text and a location link, addressed to the contacts the parent typed
  into the app. No server, no account, works for every customer, honest.
  One press short of fully automatic (the customer taps send).
- **Later, cloud**: sends by itself like ours, works when the phone is
  locked to the app. Needs per-family server config, authentication, and
  rate limiting. Real engineering; do not rush it, and do not charge for
  it when it lands.

Until one exists, listings must describe the alert flow honestly as a
demonstration, or not feature it. Recommendation: build the on-device
version before v1 ships, so the flagship claim is true on day one.

## Pushing updates

- **Store app**: edit `demo.html` (or the shells), merge, press Build on
  Codemagic (or wire the workflows to a git tag later). iOS: TestFlight
  immediately, App Review for release (usually about a day; expedited
  review exists for broken-app emergencies). Android: internal track
  immediately, production after staged rollout. Native binaries carry the
  web app inside them; customers do not depend on our web hosting to keep
  talking. That is a feature, not a bug.
- **Web/PWA**: unchanged, `main` → the three phones, `release` →
  app.ezvoxa.com when a release is cut.

## Still to do — code (I own these)

- [x] PrivacyInfo.xcprivacy referenced in the Xcode project (file ref, App
      group, Resources phase), 2 Sep. Confirm it lands in the first Codemagic
      build log.
- [x] Native Backup path, 2 Sep: in store builds the backup is written with
      @capacitor/filesystem and handed to the share sheet with @capacitor/share;
      web and PWA keep the download. Verified against a simulated bridge; MUST
      be exercised on TestFlight and Play internal (the one thing a simulator
      cannot prove). Restore via the file picker works on both already.
- [x] `ITSAppUsesNonExemptEncryption = false` in Info.plist, 2 Sep.
- [x] One version number: `native/version.json` (1.0.0) is stamped onto the
      iOS marketing version and Android versionName by build.js, 2 Sep. Bump
      that file for each release; build numbers stay automatic.
- [x] Purpose strings reworded 2 Sep (SOS Family Alert, no dashes); Frank
      approved the wording with the review.
- [ ] Pin `xcode:` in codemagic.yaml after the first green build (noted in
      the yaml; nothing to pin against until a build exists).

- [ ] On-device SOS for customers (awaiting Frank's go, above).
- [ ] `api/speak`: an app token or entitlement check server-side before
      launch scale — today the shared endpoint would give free users the
      natural voice; acceptable for TestFlight, not for scale.
- [ ] Play feature graphic 1024x500 + iPad screenshots if we ship iPad.
- [x] Backup & Restore — built 2 Sep (Settings card in demo.html).
- [ ] Push notifications for family voice notes (Guideline 4.2 "native
      feel" bonus; needs a plugin pass).

- [x] Likeness audit of tether-icons.js done 2 Sep (all 253 icons viewed).
      Sixteen keys are blanked in every store build: Evan's avatar art
      (hurt_tile, headache, sore_throat, cold, cough, fever, stomachache,
      rest, sleep, hamburger, abc_evan, numbers_evan) and photographs of the
      family's homes (houses_tile, houses_tile_alt, house_dad, house_mom).
- [x] Brand logos blanked in store builds too (Frank's call, 2 Sep): 21 more
      keys (Lay's, Fritos, Naked, Gatorade, Canada Dry, Hawaiian Punch, Coke,
      Hillshire, Doritos, SuperPretzel, Rold Gold, MLB, NBA, NFL, ESPN, WWE,
      Raw, SmackDown). 37 keys blanked in all; a scan of every template board
      confirms none of them is ever drawn.
- [ ] **Decision for Frank: the McDonald's and Outback boards.** The template's
      own Food board carries a McDonald's tile and an Outback tile with the
      chains' logos (rest_mcdonalds, rest_outback) and branded item art inside
      (mc_burger, mc_nuggets, mc_fries, mc_punch). Blanking those breaks a
      real screen, so they are held back from the strip list until he
      decides: keep the chain names with generic neon art, or drop the boards.

## Still to do — Frank

- [ ] Thursday/Friday: Apple $99, Play $25, Codemagic signup (order of
      operations above).
- [x] Privacy policy wording approved 2 Sep 2026; live at ezvoxa.com/privacy.html.
- [ ] Confirm pricing (blocks the subscription build only).
- [ ] Decide customer SOS (blocks honest emergency marketing).
- [ ] Screenshots from your phone when the TestFlight build lands.
- [ ] If the icon art exists above 808px resolution, send it; the 1024 icon
      is a slight upscale today and Apple's icon reviewers have eyes.

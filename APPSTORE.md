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
    (`@revenuecat/purchases-capacitor`, installed on both platforms). It
    fails open: if billing can't initialize, the app is simply unlocked.
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

1. **Apple Developer Program**, Organization, $99. Have the D-U-N-S email
   open; copy the legal name exactly as D&B spelled it. Expect the
   verification phone call within about a week; answer unknown numbers.
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
- **privacy.html must be approved and live before submission** (both stores
  require the URL). It is drafted; your call on the wording.
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
Then, in order:

1. **RevenueCat account** (free tier covers us far past launch): create the
   project, add the Apple app and the Google app, create entitlement
   **`premium`**, offering **`default`** with the packages.
2. **App Store Connect**: Subscriptions → create group "EZvoxa Premium" →
   auto-renewable subscription(s) (suggested ids: `ezvoxa_premium_monthly`,
   optional `ezvoxa_premium_yearly`). Price set HERE, never in code.
   Fill the subscription's own privacy/terms fields. Attach the
   subscription to the app version you submit.
3. **Play Console**: Monetize → Subscriptions → same products, same ids.
4. **Codemagic**: set `EZ_BILLING: "1"` and the RevenueCat public SDK keys
   (`EZ_RC_KEY_IOS`, `EZ_RC_KEY_ANDROID`) in the workflow vars, build,
   submit as an update. Apple reviews the IAP with it.
5. Test the whole loop in TestFlight sandbox before release: subscribe,
   natural voice on; cancel in sandbox, voice falls back on expiry; Restore
   purchases works on a reinstall.

What the subscription gates today: the natural voice. Cloud texting, voice
notes, and Family Sync are gated in principle but are demonstrations in the
template until the per-family backend exists, so the store listing and the
subscription description must promise only what is real: **the natural
voice**. Widen the promise as features land.

### Selling on the website (Frank's lane, one hard rule)

RevenueCat Web Billing (Stripe underneath) can sell the same `premium`
entitlement on ezvoxa.com later, and the app can honor it. But note: without
accounts in the app there is nothing to attach a web purchase to on a
phone. Web sales become real when we add some account-lite handle (family
code). Until then the website sells nothing in-app.

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

What still has to be BUILT before we can market it to customers: on our
phones the alert really sends through our server; on a customer's phone it
is a demonstration, because the server only knows our family's numbers.
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
- [ ] **Decision for Frank: brand logos in the icon file.** The set carries
      real trademarks (McDonald's, Outback, Doritos, Lay's, Fritos, Coke,
      Gatorade, Canada Dry, Hawaiian Punch, Hillshire, MLB, NBA, NFL, ESPN,
      WWE). They are Evan's real preferences on his board and the template
      never renders them, but they ship inside the binary. Apple 5.2.1
      (intellectual property) is a rejection risk if a reviewer finds them.
      Recommendation: add them to the strip list for store builds.

## Still to do — Frank

- [ ] Thursday/Friday: Apple $99, Play $25, Codemagic signup (order of
      operations above).
- [ ] Approve privacy.html wording (blocks every submission).
- [ ] Confirm pricing (blocks the subscription build only).
- [ ] Decide customer SOS (blocks honest emergency marketing).
- [ ] Screenshots from your phone when the TestFlight build lands.
- [ ] If the icon art exists above 808px resolution, send it; the 1024 icon
      is a slight upscale today and Apple's icon reviewers have eyes.

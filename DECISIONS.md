# DECISIONS.md: my running record for the EZvoxa store process

Started 6 Sep 2026 on Frank's order: "Create your own running document of
things you MUST remember to do or decisions made from here on out."

How this file is used: I read it at the start of every session, before
LEDGER.md. Every decision Frank makes and every promise I make goes in here
in the same commit as the work. Nothing is removed; a reversed decision gets
a dated line saying it was reversed. Dates are the day it happened.

## The rules (in force always)

1. **No guessing. No assuming.** If I have not checked it, I say "not
   checked" and check it, or I do not say it. Information comes from a
   legitimate source: the company's own documentation, or a government
   body. No forums, no blogs, no chats. The one exception (Frank, 6 Sep
   2026): a support chat that is specifically from the entity being
   researched, such as Apple Support or Google Support, counts as that
   entity speaking. A community thread on that entity's own site does
   not. If a page cannot be opened from this machine, I say so and label
   the claim unverified, then ask Frank to open it and paste what it says.
2. **No execution of a build without Frank's approval.** I describe the
   change first: what, where, why, and a picture if it is visual. I wait
   for his go. "Let's do it", "go", or "build it" is a go; a question, a
   preference, or a decision about direction is not. Approval in one
   conversation does not carry to the next build.
3. I never attribute a statement to Frank that he did not make.
4. Every figure traces to a cited source or is labeled an assumption.
5. Plain punctuation in anything Frank reads. No em dashes.
6. Documents for Frank are Word files. Anything meant to be shown lives on
   our domain, never behind Claude.

## MUST DO (open items, newest first)

- [ ] **First Codemagic build with EZ_BILLING=1** is the first compile of
      `native/ios/App/App/EZStorePlugin.swift`. Watch it; fix anything it
      throws. (5 Sep)
- [ ] **Android billing**: Google Play Billing in Kotlin plus Google's
      notifications through a Cloud Pub/Sub topic into `api/plan.js`.
      After the iPhone version is in TestFlight. Read Google's own
      documentation first. Needs Frank's go. (5 Sep)
- [ ] **Pricing session** with unit counts next to every dollar: Twilio
      figures verified 5 Sep; per-family monthly cost of the natural voice
      still to be measured from our logs and Eleven Labs' own pricing page.
      Nothing publishes until Frank confirms. (5 Sep)
- [ ] **Check `allowBrowser` in api/text.js and api/sos.js against the
      store app's WebView origin** on the first TestFlight build; if it
      returns 403, texting and SOS are broken in the native app. (5 Sep)
- [ ] **Open question for Frank**: the 1 Sep principles list voice messages
      and Family Sync as premium too; only texting is locked today. Do not
      build the other two locks without his answer. (5 Sep)
- [ ] **QR code for the Family Code** is owed. Not built. (5 Sep)
- [ ] **Frank's side, in order** (all in "EZvoxa Subscriptions Direct with
      Apple.docx"): Apple enrollment approval; the subscription product;
      the notification URL; the In-App Purchase key; Apple Root CA G3
      (apple.com is blocked from here); the Vercel env vars; the test
      button on sales.html; the billing build; the sandbox test. (5 Sep)
- [ ] **Frank's side, Twilio**: point the number's "A message comes in"
      webhook at `/api/inbound` so replies get the auto reply. (5 Sep)

## DECISIONS (newest first)

- **6 Sep 2026. Sourcing, refined by Frank:** no chats, unless it is a
  support chat from the specific entity being researched (Apple, Google,
  or whoever it is). Rule 1 updated.
- **6 Sep 2026.** This file exists. Rules 1 and 2 above are its first two
  lines by Frank's order.
- **5 Sep 2026. Go direct with Apple and Google. No RevenueCat.** Frank:
  "I prefer to go direct. I do not see the downside." Then: "let's do it
  direct" and the dashboard request. Built the Apple side the same day.
  RevenueCat removed from the project entirely.
- **5 Sep 2026. Sales dashboard** on our domain (`sales.html`), family
  password, from Apple's notifications as they arrive. Dollar figures are
  Apple's reported prices before commission and are labeled not the record;
  App Store Connect is the record. Sandbox never counted as money.
- **5 Sep 2026. Texting is one way.** The talker sends; nothing comes back
  into the app; voice messages are the way back. A text reply to our
  number gets one auto reply per sender per hour saying so (wording is
  mine, Frank's to change).
- **5 Sep 2026. No three-day slack** on the phone's copy of the plan. The
  plan ends on the store's expiry date. (The server keeps one day of slack
  for a late "expired" message from the store; explained to Frank.)
- **5 Sep 2026. Everyday texting is locked from day one.** A family texts
  only while its plan is active, from the store or from a hardship grant.
  No switch. I shipped it open first and fixed it the same night.
- **5 Sep 2026. SOS Family Alert stays free** and never reads the plan;
  limited to 10 alerts per family per ten minutes; a broken counter never
  blocks an alert. (Frank's 2 Sep ruling, restated.)
- **5 Sep 2026. Editing is not a parent-phone thing.** Any phone in the
  family, the teen's included, unlocks Settings with the password and
  edits. The phone role only decides who plays voice messages and who
  records them.
- **5 Sep 2026. The subscribe button exists on every phone**, not only a
  parent's and not behind the password (Apple guideline 3.1.3(b) read
  from the source). Withdrawn: "parents only" and "behind the password".
- **5 Sep 2026. Price per family, never per phone.** No seat limit beyond
  the 12-phone server cap. The purchase attaches to the Family Code on our
  server; every joined phone reads the plan there; Apple ID never matters.
- **5 Sep 2026. Symbol packs do not exist.** I raised them; Frank never
  did. Do not bring them up.
- **5 Sep 2026. Sourcing rule** (Frank): legitimate entities only. Verified
  that day from the source: Apple's 10-device limit per Apple Account,
  Apple's subscription Family Sharing rule (irreversible once on, kept
  off), Twilio's US SMS prices, RevenueCat's custom user id docs (now
  moot), Apple's review guidelines 3.1.1, 3.1.3(b), 3.1.3(c), and Apple's
  App Store Server Notifications and StoreKit 2 pages.
- **5 Sep 2026. Family Code in v1.** Frank: "No. V1 has to have this. We
  sell customization as a big part of this." Built and live.

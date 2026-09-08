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
7. **Directions that involve a site I cannot reach come with the way in
   and the steps** (Frank, 6 Sep 2026): the exact link, or the exact words
   to search if there is no link I can verify; then step by step, one
   action per step, what to click, what to copy, where to paste it. If a
   step's screen labels come from memory rather than from the site itself,
   the step says so.
8. **When I lack access that Frank can grant, I say so and give him the
   way to grant it** (Frank, 6 Sep 2026): the link, then the steps, the
   same way as rule 7. This covers sites blocked by the environment,
   GitHub repositories or permissions, and any account or service I can
   see exists but cannot reach. Never work around a missing access
   silently, and never ask for a password; access is granted, not
   shared.

## MUST DO (open items, newest first)

- [ ] **Frank's ruling from the Master Hub (8 Sep):** how the Core Talker
      is sold (paid app or free app with a one-time purchase). Until then
      NON_RENEWING_PURCHASE turns the family plan on. Clinics are
      answered: therapists, at the school rate.
- [ ] **Frank's side (8 Sep):** the independent AI's research report or
      its source list, so the Master Hub's figures can each be tied to a
      source.
- [ ] **Frank's side, read what I could not (8 Sep):** the FDLRS center
      list on fldoe.org, FAAST's device loan program on faast.org, the
      micro-purchase threshold in 2 CFR 200.1 on ecfr.gov, and RevenueCat's
      "webhook event types and fields" page. Paste what each says and I
      put the roadmap and the webhook right. The way in for each is on
      hub.html, Roadmap and Webhooks tabs.

- [ ] **Frank's side, run the voice dub once** (7 Sep): open
      https://ez-comm-tether.vercel.app/dub.html on a computer or phone,
      type the family password, tap "Start the dub", leave the page open
      until it says Done. It speaks every phrase in Evan's app into the
      server's memory. Run it again after adding buttons or changing the
      voice. Cost: the phrase list is about 990 phrases and 13,000
      characters; the credit cost depends on the ElevenLabs plan, which I
      cannot read from here. Frank's ElevenLabs account page shows the
      per-character rate and remaining credits.

- [x] ~~First Codemagic build compiles EZStorePlugin.swift~~ Not needed
      while billing runs through RevenueCat; the file is out of the Xcode
      target (7 Sep). Comes back only if the direct path is switched on.
- [x] ~~Android billing direct~~ Covered by RevenueCat (7 Sep). Only needed
      if the direct path is ever switched on.
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
- [ ] **Frank's side, network access for this cloud environment** (asked
      6 Sep): claude.ai/code, cloud icon above the message box, settings
      icon on the environment, Network access = Custom, Allowed domains:
      twilio.com, *.twilio.com, apple.com, *.apple.com, capacitorjs.com,
      *.capacitorjs.com, with "Also include default list of common package
      managers" ticked. Source: code.claude.com/docs/en/cloud-environments
      (Anthropic's own page). Reason: the environment is at Trusted, an
      allowlist only, which is why twilio.com, apple.com, support.apple.com,
      help.apple.com and capacitorjs.com were refused on 5 Sep. When it is
      in place: re-verify the Twilio console steps from twilio.com, fetch
      Apple Root CA G3 from apple.com so Frank does not have to, and read
      the App Store Connect help pages that were marked unreachable.
- [ ] **Frank's side, Twilio**: make replies to our number reach
      `/api/inbound` so they get the auto reply. Link: https://console.twilio.com
      (twilio.com is blocked from here, so the screen labels below are from
      memory, not verified). Steps: 1. Sign in. 2. Open Phone Numbers, then
      Manage, then Active numbers. 3. Tap our number. 4. Find the Messaging
      section and the field for what happens when a message comes in.
      5. Choose Webhook, paste `https://ez-comm-tether.vercel.app/api/inbound`,
      method HTTP POST. 6. Save. 7. Text the number from your own phone; the
      auto reply should come back within a few seconds. If the labels differ,
      search "Twilio configure incoming message webhook phone number" on
      twilio.com and paste me what the page says. (5 Sep)

## DECISIONS (newest first)

- **8 Sep 2026. Frank's Master Hub goes up as written; my rebuild was
  a rule 2 breach.** Frank: "Why did you change it?" The page was the
  work of an independent AI he had research the market after it reviewed
  the product screenshots and the demo HTML (that is what those were
  for). It found areas we missed, sized saturation its own way, and split
  individual sales from school sales and clinical sales, where clinical
  means therapists. I had replaced its bottom line with the model's,
  restyled it, and swapped its webhook sketch for the code's behavior,
  none of which he asked for. Fixed on his "In a widget right?": his page
  is served as pasted by `api/hub.js` behind the family password and
  opens at `hub.html`; the one edit is the removal of the citation stubs
  the paste left behind. My version moved to `hub-model.html` and is
  labeled as the model's view. Its sources are not in hand; every figure
  from it is labeled "independent AI research, sources not seen" until
  Frank pastes the report or its source list. Lesson recorded: when
  Frank hands me a finished piece, it goes up as his; my checks go beside
  it, never over it.

- **8 Sep 2026. Master Hub widget built from the page Frank pasted.** Frank
  pasted an "EZvoxa Executive Master Hub" page written by another AI (tabs:
  a national five-year ramp, a three-phase rollout roadmap, a cost
  schedule, a RevenueCat webhook sketch) and asked "Can you turn this code
  into a widget for me?" Built `hub.html` on our domain, family password,
  four tabs. Choices I made, stated here because he did not make them:
  (a) the Projections tab is computed by `finance-model.js`, not typed
  in, so a "National" case was added to `api/finance-defaults.json` with
  the page's buyers, subscribers, district seat totals and a new clinics
  line; the model now takes a year's seat count outright and clinic
  seats, priced like school seats until Frank says who the clinics are;
  (b) the page's "OpEx and RC" column bundled RevenueCat, which the model
  computes itself, so operating is that column minus 1% of the page's own
  gross, which leaves round figures ($34,500 to $147,700), checked
  arithmetic, not a guess; the model lands at $6,911,806 against the
  page's $8,058,740 and the tab says why; (c) every roadmap claim carries
  its standing: Apple School Manager's 50% discount at 20 or more copies
  verified from developer.apple.com/education; FDLRS, FAAST, the 2 CFR
  200.1 micro-purchase threshold, ATIA and CEC unverified because
  fldoe.org, fdlrs.org, faast.org, ecfr.gov, atia.org and
  exceptionalchildren.org all refused a connection from here, each with
  the way in; "classroom data from Cynthia Puentes" marked not in hand
  (nothing in the repository or ledger); (d) the Webhooks tab shows what
  `api/plan.js` does, not the sketch, and lists the four places the sketch
  differs: SOS never locks; the server grants no lifetime talker; no
  refund branch and no `cancel_reason` until RevenueCat's page is read;
  the live endpoint is the family lane's. The plan document gained the
  National case and the roadmap section from the same generator. Nothing
  published; no price outside the password.
  Two new questions for Frank, not built either way: how the Core Talker
  is sold (paid app, or free app with a one-time purchase; it decides
  what NON_RENEWING_PURCHASE must do), and who the clinics are.
  Apple's discount is on copies of the app itself, so a school seat priced
  above the consumer app needs its own listing or a custom app; flagged.

- **7 Sep 2026. Finance widget and the plan rebuilt from Frank's document.**
  Frank pasted a business plan page written by another AI (Core Talker
  $99.99 one-time; Connected Family Tether $9.99/mo or $99.99/yr per
  family; EZvoxa Pro $249.99 list / $124.99 at 20+ seats through Apple
  School Manager and Google Play; a cost schedule; RevenueCat lifecycle;
  three five-year cases) and asked for "a widget for finances and
  projections" and to "update the business plan and everything with it."
  Built on that ask: `finance-model.js` (one set of formulas),
  `api/finance-defaults.json` (every input with its provenance: verified /
  from Frank's document / assumption), `api/finance.js` (defaults served
  only with the family password, so no price is published), `finance.html`
  (the widget: every input editable, three cases live, unit counts beside
  every dollar), and the plan document regenerated from the same formulas.
  Prices are NOT confirmed; they are the document's working numbers and
  replace the 15 Aug $79.99 / $12.99. Three disagreements with standing
  rules flagged for Frank, not baked in: the document puts SOS in the paid
  tier (SOS stays free, Frank's 2 Sep final ruling); "two-way" voice notes
  (one way); 14-day trial vs 30. The document's cost figures for 10DLC
  ($4 + $15), Vercel ($20/mo), Codemagic (free 500 min) and the Apple
  School Manager 50% rule are marked "from Frank's document, not verified
  from the page." My tables come out lower than the document's because
  they also take out RevenueCat, refunds, cloud, fixed and acquisition
  costs. model-ezvoxa.html (the 15 Aug market build) stays as is; the
  widget is now the finance model the plan follows.

- **7 Sep 2026. Business plan document created.** Frank asked for "all the
  business plan and projections we have so far." Fact: no business plan
  document had ever existed in the repository; the only projections
  artifact is model-ezvoxa.html (last changed 15 Aug). Wrote "EZvoxa
  Business Plan and Projections.docx" from the model's own tables (run on
  7 Sep: Floor $480,151, Mid $1,526,416, Ceiling $4,756,230 five-year net,
  with unit counts), its labeled assumptions and sources, and every
  decision since. Flagged under the 6 Sep sourcing rule: the AssistiveWare
  blog survey, RevenueCat benchmarks, Business of Apps churn, and Statista
  populations do not stand and must be re-sourced or relabeled. The
  model still runs on the unconfirmed $79.99 and $12.99 working numbers
  and counts buyers per copy, not per family; the pricing session and a
  family-shaped rebuild of the model are owed, model and document
  updated together (CLAUDE.md rule).
- **7 Sep 2026. RevenueCat path RESTORED on Frank's go ("ok restore it").**
  native/billing.js, build.js, native/package.json and package-lock,
  Package.swift, the Xcode project, storyboard, SceneDelegate and
  codemagic.yaml are back to their 5 Sep state; the plugin is installed
  again. api/plan.js now takes RevenueCat events (shared secret) AND
  Apple's signed notifications (dormant); the sales page knows both sets
  of names. The Swift store plugin stays on disk, out of the Xcode target,
  so it cannot break a build. Verified: the RevenueCat path with a fake
  store (no secret 503, wrong secret 401, purchase, retry ignored,
  cancel keeps, expiry locks texting, renewal, grant kept, unknown family
  ignored, TEST, dashboard counts), the Apple path still passing its own
  test, and the built store shell against a fake RevenueCat plugin. Still
  to confirm from RevenueCat's own page before switch-on: the event
  names and the refund event's name. Frank's steps are in "EZvoxa
  Subscriptions with RevenueCat.docx", replacing the Apple document's
  steps (that document stays as the record of the dormant path).
- **7 Sep 2026. RevenueCat's cost, from RevenueCat's own pricing page**
  (Frank's screenshot): free up to $2,500 in monthly tracked revenue, then
  1% of what is tracked. Against the model's working prices: Floor $7,528
  over five years (1.6% of net), Mid $19,773 (1.3%), Ceiling $48,431
  (1.0%). Read as 1% of all tracked revenue once over the line. School
  licenses are invoiced by us, not tracked. In the plan document, sections
  6 and 7.
- **7 Sep 2026. RevenueCat is back on the table, by Frank:** "By the way, I
  looked into it more and I am good using RevenueCat." This reverses the
  5 Sep "go direct" decision, which stays on record below. Not yet a build
  order; described to him what restoring the RevenueCat path entails (the
  5 Sep bridge and webhook from history, Android covered by it, the Swift
  store plugin unused, the sales page fed by RevenueCat events). His fee
  figure is his own reading; not read from RevenueCat's page here.
  Awaiting his go.
- **7 Sep 2026. First business plan document.** Frank asked for "all the
  business plan and projections we have so far." None existed in the
  repository, ever; the only projections were the interactive model
  (model-ezvoxa.html, last changed 15 Aug). Wrote "EZvoxa Business Plan
  and Projections.docx" from the model's three cases (read by running the
  page), its labeled assumptions and sources, and the decisions since.
  Flagged under the sourcing rule: the 65% touch-reachable share and the
  device split rest on a competitor's blog survey; the 15% subscribe and
  35% churn on a vendor report and an aggregator; some populations on
  Statista. The model still counts one buyer per copy; it has not been
  rebuilt around one subscription per family. Owed: the pricing session
  with the model and the document updated together.
- **7 Sep 2026. A slip to not repeat:** I told Frank "shipping: commit and
  push" and had run neither; the deploy never appeared and I found it
  eleven minutes later. Rule for myself: say "pushed" only after the push
  command has returned, and check `git status` before claiming it.
- **7 Sep 2026. The voice is remembered on the server.** Frank: "ElevenLabs
  is using up all my credits every time Evan uses his device. When are you
  going to dub the voice so that does not happen?" No date had ever been
  promised; the design kept each clip only on the phone. Built on his go:
  api/speak.js keeps every clip it makes in the Family Sync store, keyed
  by voice, pace and the exact words, so a phrase costs ElevenLabs once,
  ever, across every phone and reinstall; a dub action (family password)
  speaks a list ahead of time; dub.html on our domain reads the phrase
  list from Evan's app itself (dubPhrases() in index.html, walking the
  boards' own lists: about 990 phrases). Not covered by the dub: the
  spoken clock (a new sentence every minute) and words spelled letter by
  letter; each still costs once when first said, then is remembered.
  Verified with a fake store and fake ElevenLabs: first call costs,
  repeats are free, a new voice re-makes, the dub skips stored phrases,
  and without a store the voice still works. Not verified: why the
  phone's own cache was not holding; Apple's documentation on that was
  not read. Evan's build 2026.09.07.1. Note: builds stamped 2026.09.06.x
  earlier today were made on 6 Sep local time by the commit log; the
  calendar screenshot said Monday 7 Sep because the capture ran after
  midnight UTC.

- **6 Sep 2026. The hand-and-set and bubble-and-set pictures replace the
  emoji pair on every WATCHING pair**, both apps: every show under Watch
  (template and Evan's), every sport (template), and the TV, Movies and
  Streaming cards (template, done 5 Sep). Not applied to the food, places
  and fun pairs, because the art shows a television; those keep the emoji
  until Frank sends a hand and a bubble without the set. Evan's app's
  chooser pictures were drawing at 50 and 58 px, under the 96 px floor;
  now 66 px at three across and the card's width at two across, same as
  the template. Builds 2026.09.06.1 in both apps.
- **6 Sep 2026. The TV pair of pictures** (raised hand with a set for the
  question, speech bubble with a set for the statement) goes on EVERY
  watching pair: TV, Movies, Streaming, every sport, every show, in both
  apps. Frank had to say it three times; the third time was "movies and
  streaming get the same two icons as TV." Done, template build
  2026.09.06.2. Food, places and fun pairs keep the emoji until he sends
  art for them (the set in the picture would be wrong there); if he says
  otherwise, use the same two.
- **6 Sep 2026. Missing access** (Frank): "if you don't have access to
  something that I can give you access to let me know how." Rule 8. As of
  today GitHub access is complete for this repository (read, push, and
  the GitHub tools); the only gaps are the blocked sites listed in the
  network item above.
- **6 Sep 2026. Directions for blocked sites** (Frank): always a link or
  search words, then step by step. Rule 7. Applied the same day to the
  root certificate step in the Apple document and the Twilio reply step
  below.
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

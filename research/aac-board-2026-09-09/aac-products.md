# AAC Incumbent Product Verification — Research Findings

Researched 2026-09-09. Every claim carries a source URL and a **VERIFIED** (documented behavior with URL) or **UNVERIFIED/UNCLEAR** tag. Central question: does any incumbent do "the word the child just picked opens/links to the screen where the next word probably lives" (next-word NAVIGATION, not just a prediction bar)?

> **Headline finding up front:** the "nobody else does it" claim is **REFUTED**. WordPower (PRC-Saltillo / Smartbox) has done rule-based next-word navigation for years — documented as "Intelligent Jumps" and "logical next words." What nobody does is an **adaptive/learned** version of it (navigation driven by the individual child's usage patterns). Details in §4 and the final summary.

---

## 1. Proloquo2Go (AssistiveWare)

**a) Prediction / next-word features**
- Word prediction exists only when **typing** (keyboard), via "PolyPredix™ word prediction" — a typing-effort reducer, not symbol-button next-word navigation. **VERIFIED** — https://www.assistiveware.com/products/proloquo2go (feature list; "reduces typing efforts by 50% out-of-the-box" claim surfaced in product materials via search of the same page)
- No auto-navigation to a related screen after picking a symbol word. Navigation is manual (folders/links). **VERIFIED by absence** in the v4 manual and support docs — https://orin.com/access/docs/Proloquo2Go-4-Manual.pdf
- **VocaPriority™**: not prediction — it's a per-page word-priority system: "Primary level... words the individual uses often; Secondary level... sometimes; Storage level... unlikely to use. Words in the first level are always visible, words in the secondary level are accessible by pressing a More button, storage hidden except in Edit mode." **VERIFIED** — https://www.assistiveware.com/blog/vocapriority

**b) Grammar support**
- "Fully configurable grammar support for nouns, pronouns, verbs and adjectives." Uses Ultralingua's ULAPI engine "to conjugate any verb, noun, pronoun or adjective," including user-added words. A **grammar popup** appears on tap-and-hold: "a single tap inserts the root form... a tap and hold provides access to the word's inflections"; selecting a pronoun in the popup auto-updates the verb conjugation choices. Full tense range (past, present, future, perfect, conditional); configurable per word-kind or off. **VERIFIED** — https://www.assistiveware.com/blog/grammar-support ; https://www.assistiveware.com/support/proloquo2go/vocabulary-grammar/grammar-support-popups ; https://www.assistiveware.com/support/proloquo2go/basics/pop-up

**c) Navigation**
- Crescendo™ core-word home page + links to fringe folders: "high frequency core verbs (e.g., have, get, put), pronouns and little words on the HOME page with links to fringe vocabulary." **VERIFIED** — https://medium.com/@AssistiveWare/proloquo2go-4-0-goes-deeper-into-the-core-of-communication-with-crescendo-940ccde3b964
- Some folders "pop back to the previous page immediately after selecting" a button; this is configurable per button/folder (button actions). **VERIFIED** — https://www.assistiveware.com/support/proloquo2go/organize/buttons/buttons-actions ; demo: https://www.youtube.com/watch?v=lPWZiEE4N_8

**d) Dates**
- Launched 2009 (app id 308368164; the 2012 Speak-for-Yourself patent dispute era coverage treats it as the 2009 incumbent). **UNVERIFIED exact date** (widely reported as April 2009). Major redesigns: v2.0 with new core-word vocabulary June 2012 — **VERIFIED** https://medium.com/@AssistiveWare/proloquo2go-4-0-goes-deeper-into-the-core-of-communication-with-crescendo-940ccde3b964 (also documents v4.0 Crescendo overhaul); no full redesign since Crescendo (AssistiveWare's redesign energy went into the separate Proloquo app, §2).

**e) Price/platform**
- $249.99 on US App Store (littlewords.ai price check Aug 2026); AssistiveWare site lists USD 299.99. iOS/iPadOS/macOS, one-time purchase. **VERIFIED** — https://apps.apple.com/us/app/proloquo2go-aac/id308368164 ; https://littlewords.ai/blog/proloquo2go-aac-device

**Sync story**
- No live cloud sync. Automatic **daily backup to iCloud** (one backup per user per device); vocabulary/buttons shared between devices manually via AirDrop, Dropbox, iTunes File Sharing, Google Drive, OneDrive. **VERIFIED** — https://www.assistiveware.com/support/proloquo2go/protect-share/automatic-backup-icloud ; https://www.assistiveware.com/support/proloquo2go/protect-share/share-buttons-folders-devices

---

## 2. Proloquo (the NEWER AssistiveWare app) — Related Words™ (deep dive)

**What Related Words actually is**
- Crescendo Evolution™ vocabulary: Home page of core words + 7 word-kind tabs + fringe tab, "shallow hierarchy." **VERIFIED** — https://www.assistiveware.com/blog/how-is-the-vocabulary-in-proloquo-organized
- "Many buttons with symbols offer quick access to conceptually related words shown as **text-only Related Words**." Example: "the word **go** on the Home page... Its Related Words offer a quick way to be more specific, such as **drive, explore, fly, ride, walk**." Words too low-frequency for their own button "can be found as a Related Word of a more common word." **VERIFIED** — same URL.
- **Where they appear / what happens on selection:** "Less essential words are available through a rich set of text-only Related Words™ **displayed on the side** and associated with a primary concept. Grammatical forms are **always available on the side of the display** and can be explored at any time." I.e., picking/focusing a word populates a **side panel** with that word's related words and inflections — the screen does **not** navigate away. **VERIFIED** — https://www.assistiveware.com/blog/proloquo-4-grows-with-users
- It doubles as "a built-in thesaurus" that "supports writing, as students consider synonyms"; even non-readers can explore by listening ("learn to use these words by listening to the auditory feedback... and learning their motor plan"). **VERIFIED** — https://www.assistiveware.com/blog/how-does-proloquo-promote-literacy ; https://www.assistiveware.com/blog/proloquo-4-grows-with-users
- Related Words are **hand-curated (static), not adaptive**; users/parents can add their own to a button (e.g., "Aunt Ava" under *aunt*). **VERIFIED** — https://www.assistiveware.com/support/proloquo/customization/adding-related-words ; https://www.assistiveware.com/blog/teaching-school-curriculum-with-proloquo
- AssistiveWare's explicit philosophy: "AssistiveWare has always focussed on **generative rather than predictive** vocabularies" — they deliberately avoid next-word prediction for symbol communication so users learn syntax. **VERIFIED** — https://www.assistiveware.com/blog/proloquo-4-grows-with-users

**Relevance to your design:** Related Words is *semantic refinement of the word just picked* (more specific alternatives: go→drive/fly/walk), shown in a persistent sidebar. It is **not** next-word-of-the-sentence navigation (it won't take you from "I want" to things you might want). Closest AssistiveWare gets, and it's static.

**b) Grammar:** grammatical forms always on the side of the display (see above); auto-capitalization after sentence punctuation. **VERIFIED** — https://www.assistiveware.com/blog/proloquo-4-grows-with-users ; https://apps.apple.com/us/app/proloquo/id1521978238
**c) Navigation:** Home + word-kind tabs, motor-plan-consistent; no auto-jumping. **VERIFIED** — https://www.assistiveware.com/blog/how-is-the-vocabulary-in-proloquo-organized
**d) Dates:** launched publicly Nov 2021 (**UNVERIFIED exact**; App Store record ambiguous, "regular updates since its 2019 launch" per App Store scrape — treat launch year as 2021 marketing/2019 soft entry, UNCLEAR); major vocabulary expansion v4.0 Feb 2024; current v5.8 Aug 2026. **VERIFIED (versions)** — https://apps.apple.com/us/app/proloquo/id1521978238
**e) Price/platform:** Free download + subscription $9.99/mo or $99.99/yr, 1-month free trial; iOS/iPadOS 18+. **VERIFIED** — https://apps.apple.com/us/app/proloquo/id1521978238

**Sync story**
- Subscription covers all devices on the same Apple ID; "Vocabulary, settings, and profiles **sync across devices via iCloud**... automatically across all shared devices, so the user always has access to the same words whether at home, school, or in the community." Same-Apple-ID only — no separate editor accounts. **VERIFIED** — https://www.assistivetech.com.au/pages/assistiveware-aac-apps ; https://www.assistiveware.com/products/proloquo

---

## 3. TD Snap (Tobii Dynavox) — Core First

**a) Prediction**
- Word prediction lives in the **keyboards** ("Keyboards in TD Snap offer word prediction"), i.e., spelling support with a prediction bar — not symbol-button navigation. It **learns**: "Spelling common words helps build up your word prediction bank," and it can be reset (Settings → User → Preferences → Prediction → Reset Word prediction, v1.31+). **VERIFIED** — https://us.tobiidynavox.com/blogs/support-articles/how-do-i-reset-the-word-prediction-in-td-snap%C2%AE ; https://us.tobiidynavox.com/pages/td-snap-text
- No auto-navigation on symbol selection; Core First navigation is Topics/Word Lists/core page. **VERIFIED by absence** — https://us.tobiidynavox.com/pages/td-snap-core-first
- (Adjacent product: TD Talk, their text-to-speech app for literate users, uses SwiftKey-style learned word/phrase prediction — https://www.tobiidynavox.com/blogs/product-discovery/td-talk-talk-faster-with-word-and-phrase-prediction — **VERIFIED**, but TD Talk is not a symbol AAC for children.)

**b) Grammar**
- Core First has a **Word Forms page** ("Word Forms button, lower right in grid sizes 5x5 and larger, contains additional tenses and forms"); "Inflector buttons... can change the form of a word which was previously inserted into the Message Window." **VERIFIED** — https://www.tobiidynavox.com/blogs/support-articles/why-does-auto-inflection-auto-morphology-seem-inconsistent-at-times-in-td-snap
- **Auto-morphology**: "many words are inflected automatically... verb tenses or forms of pronouns change to the correct form as you write your sentence"; setting "Automatically inflect Grammar buttons" changes grammar-button labels "based on the previous word, or two, in the Message Window" (can be turned off). This is context-adaptive *button relabeling* — notable prior art for context-reactive UI, though not navigation. **VERIFIED** — https://www.tobiidynavox.com/blogs/support-articles/how-can-i-turn-off-morphology-in-td-snap

**c) Navigation**
- Core words "carefully placed and ordered for easier recall"; "Core First takes advantage of motor learning by introducing new vocabulary methodically... users can scale up or down and always know where to find vocabulary" (grid sizes grow without relocating learned words). Topics, QuickFires, Word Lists for fringe. **VERIFIED** — https://us.tobiidynavox.com/pages/td-snap-core-first ; manual index: https://download.mytobiidynavox.com/Snap/documents/TD_Snap_UsersManual_v1-17_en-US_12005874_WEB.pdf (proxy-blocked here; listed for the team)
- Also sells a dedicated **TD Snap Motor Plan page set** (LAMP-style consistent motor patterns). **VERIFIED** — https://download.mytobiidynavox.com/Snap/documents/Training%20Cards/TDSnapMotorPlan_TrainingCards_en-US_1000235.pdf

**d) Dates:** Launched as "Snap + Core First" (~2016, **UNVERIFIED exact**), renamed TD Snap ~2021 (**UNVERIFIED exact**; rebrand visible in 2021-dated support content — https://www.tobiidynavox.com/blogs/support-articles/core-first-books-and-lessons-td-snap-set-6). Continuous point releases since (v1.40.2, Aug 2026 — **VERIFIED** App Store).

**e) Price/platform:** Free app + subscriptions: "Speaking Upgrade Monthly $9.99," Gateway/PODD/Metacom page sets $4.99/mo each; 1-month free trial. iPad (iPadOS 13+), Windows, and TD dedicated devices. **VERIFIED** — https://apps.apple.com/us/app/td-snap/id1072799231 ; https://us.tobiidynavox.com/products/td-snap (a legacy $49.99 perpetual "Snap Core First Full" SKU also exists — https://www.mytobiidynavox.com/Store/SnapCoreFirstPerpetual, **UNVERIFIED current price**)

**Sync story**
- Pageset sync via **myTobiiDynavox** account: "The synced page set stored on MyTD will be the master version that gets updated when changes are made and synced when the page set needs to be updated on a device"; other devices log into the same MyTD account and pull. Explicit Sync button (not silent real-time). Synced pagesets can also be shared to others. **VERIFIED** — https://us.tobiidynavox.com/blogs/support-articles/how-do-i-sync-a-pageset-in-td-snap-on-multiple-devices ; https://us.tobiidynavox.com/blogs/support-articles/how-do-i-share-a-synced-pageset-in-td-snap ; overview: https://us.tobiidynavox.com/blogs/product-discovery/td-snap-saving-sharing-and-syncing
- Usage data tracking viewable on mytobiidynavox.com. **VERIFIED** — https://www.tobiidynavox.com/blogs/support-articles/how-to-use-data-tracking-and-access-the-data-tracking-for-td-snap-on-mytobiidynavox-com

---

## 4. TouchChat with WordPower (PRC-Saltillo) — ★ the key prior art

**a) Prediction / next-word: BOTH spelling prediction AND next-word navigation**
- Official quick reference (touchchatapp.com): "As a sentence is being built, you often find that **the next word you want to say can be spoken with one or two button presses**"; "**Predictive design** that uses high frequency core words to facilitate quick and easy sentence generation"; "A spelling/word prediction page is used to spell words not included in the vocabulary." **VERIFIED** — https://touchchatapp.com/assets/uploads/19784v1_02-WordPower_Vocab_QRG.pdf (text extracted from PDF)
- **Auto-return navigation**: "To speed up communication by reducing button hits, **many pages connected to the main page are programmed to go back to the main page once a selection has been made**. If more time needs to be spent on a single page, the 'lock page' button can be used." **VERIFIED** — same QRG PDF.
- **Intelligent Jumps** (Smartbox's documentation of the same Inman WordPower vocabulary, in Grid): "WordPower has been designed to give users access to vocabulary as they need it, so at times **when a cell is selected this will automatically jump to another grid with additional related vocabulary**. For example... if you create the sentence 'I want to drink…' you can jump straight to the drinks grid... **In WordPower 25, you will automatically be jumped to the Drinks grid without even needing to select it.**" **VERIFIED** — https://hub.thinksmartbox.com/knowledgebase/features-of-wordpower/
- **Logical next words** (same page): "In WordPower 100 and 60, **prediction cells appear under the chat area and change each time you select a word**, providing some suggested next words and word endings. If you select the word 'my', some common next words are 'favourite', 'turn' and the suffix '-self'... if you select 'I can', the prediction cells offer logical next words like 'know', 'look', 'call' and 'give'. **In WordPower 25, the user is automatically taken to a new grid, full of associated language, based on the user's selections.**" **VERIFIED** — https://hub.thinksmartbox.com/knowledgebase/features-of-wordpower/
- PRC-Saltillo's own 2025 marketing confirms it's a core identity: "WordPower® is known for **logical next words and word completion**" — with hand-placed examples like "it again" after "do", "the door"/"the book" after "open". **VERIFIED** — https://prc-saltillo.com/blog/app-release-2025-3 ; https://prc-saltillo.com/vocabularies/wordpower
- **Static/rule-based, NOT adaptive**: the jumps and next-word cells are hand-authored by SLP Nancy Inman and updated by releases (e.g., June 4 2025 vocabulary refresh), not learned from the child. **VERIFIED** — https://prc-saltillo.com/blog/app-release-2025-3

**b) Grammar:** "grammar function that provides verb conjugation, gender and number agreement," "grammar supports generating morphological endings," suffix cells (-self, -s, -ed, -ing). **VERIFIED** — https://touchchatapp.com/touchchat-hd-aac-with-wordpower ; https://hub.thinksmartbox.com/knowledgebase/features-of-wordpower/ (Smart Grammar section applies to Grid version)

**c) Navigation:** Fitzgerald-key color-coded main page (pronouns left, verbs middle, function words right), category pages (GROUPS, ACTIONS, DESCRIBE with A-Z sub-pages), auto-return-to-main after selection + lock page; "Motor planning is built into much of the file so that the same word can be found in the same position but on a different page." **VERIFIED** — https://touchchatapp.com/assets/uploads/19784v1_02-WordPower_Vocab_QRG.pdf

**d) Dates:** TouchChat app circa 2011 (**UNVERIFIED exact**); WordPower vocabulary © 2001-2022 Inman Innovations (QRG PDF, **VERIFIED** the copyright range); latest major WordPower vocabulary release June 4, 2025 (**VERIFIED** — https://prc-saltillo.com/blog/app-release-2025-3).

**e) Price/platform:** TouchChat HD with WordPower $299.99; TouchChat HD alone $149.99. iPad/iPhone (one-time purchase); WordPower also ships on NovaChat/Accent dedicated devices and in Grid. **VERIFIED** — https://touchchatapp.com/touchchat-hd-aac-with-wordpower ; https://apps.apple.com/us/app/touchchat-hd-aac-w-wordpower/id412351574

**Sync story:** No live sync. **iShare** subscription "to store custom files for safe keeping" + import/export "through AirDrop, email, iTunes file sharing, DropBox or Google Drive." **VERIFIED** — https://touchchatapp.com/touchchat-hd-aac-with-wordpower

---

## 5. LAMP Words for Life (PRC-Saltillo)

**a) Prediction:** Philosophically the anti-prediction product for symbols. Words are reached by **fixed 1-3 button motor sequences** (pressing a home icon opens its linked page deterministically — always the same page, regardless of sentence context): "1-Hit: 84 early words that speak immediately upon selection; Transition: ~200 words requiring two key selections; Full: thousands of words typically requiring three key selections or less." Word prediction exists **only on the QWERTY keyboard**: "core words, fringe words, and a QWERTY keyboard with word prediction." **VERIFIED** — https://lampwflapp.com/features/vocab-levels ; https://www.liberator.co.uk/resources/vocabulary/lamp-words-for-life

**b) Grammar:** Unity-derived icon-sequence morphology (word endings via sequences); no auto-conjugation engine documented. **UNVERIFIED/UNCLEAR** beyond vocabulary workbook: https://aaclanguagelab.com/materials/LAMP_WFL_vocabulary_workbook_US2.pdf

**c) Navigation/motor planning:** "The primary principle of the LAMP approach is that **the motor plan to say a word... is consistent across time and unique from other words**"; "Each word is produced by a unique motor movement that remains consistent whether there are 10 words or all words showing"; Vocabulary Builder™ hides words without changing the motor plan; Word Finder™ shows the path to a word. **VERIFIED** — https://lampwflapp.com/about ; https://support.ablenetinc.com/speech-app/lamp/ ; https://lampwflapp.com/apps/lamp-app

**d) Dates:** app id 551215116, launched 2012 (**UNVERIFIED exact**); no major redesign since (redesigns would break motor plans by definition); new free-trial companion "LAMP Words For Life Discover" app released ~2025 (**VERIFIED** — https://apps.apple.com/us/app/lamp-words-for-life-discover/id6739362942).

**e) Price/platform:** $299.99 one-time, iPad; also on PRC Accent devices. **VERIFIED** — https://apps.apple.com/us/app/lamp-words-for-life/id551215116

**Sync story:** No cloud sync of vocab; iTunes/AirDrop-style file transfer and PRC's Realize Language for data logging. **UNVERIFIED/UNCLEAR** (no support doc located in this pass).

---

## 6. Grid 3 / Grid for iPad (Smartbox)

**a) Prediction:** Text word prediction in keyboard grids; symbol next-word behavior comes from vocabularies (WordPower's Intelligent Jumps run inside Grid — see §4; Super Core is Smartbox's own consistent-layout child vocabulary). **VERIFIED** — https://hub.thinksmartbox.com/knowledgebase/features-of-wordpower/

**b) Smart Grammar (what it actually does):**
- "Grid has grammar features which can **automatically conjugate verbs depending on the recently written words**. For example, after you write 'I', the infinitive 'be' changes to 'am'." **VERIFIED** — https://hub.thinksmartbox.com/knowledgebase/how-do-i-use-grids-grammar-features/
- "If you want to say 'I am going to go now', the verb 'go' will change to 'going'... The suffix '-ing' will also appear in the word prediction cell... selecting 'easy' and '-ly' will give you 'easily'... you can add '-s' to make words plural and this will automatically correct if needed." **VERIFIED** — https://hub.thinksmartbox.com/knowledgebase/features-of-wordpower/
- Commands can mass-set verb cells to a form (root, infinitive, gerund, participles, or specific person/number/tense). Auto-changing can be disabled. **VERIFIED** — https://hub.thinksmartbox.com/knowledgebase/grid-command-library-chat-and-writing/ ; https://hub.thinksmartbox.com/knowledgebase/how-can-i-stop-words-from-automatically-changing-in-grid-3
- So Smart Grammar = **in-place button morphing based on sentence context** (buttons change form; the screen does not navigate). Important prior art for context-reactive buttons.

**c) Navigation:** grid sets = linked grids ("jump" cells); vocab-dependent (Super Core keeps consistent cell positions). **VERIFIED (general)** — https://hub.thinksmartbox.com/knowledgebase/features-of-wordpower/

**d) Dates:** Grid 3 released ~Nov 2015 (successor to The Grid 2) — **UNVERIFIED exact** (release-notes archive: https://hub.thinksmartbox.com/knowledgebase/grid-release-notes/); Grid for iPad ~2019 **UNVERIFIED exact**.

**e) Price/platform:** Grid 3 (Windows) £550 ex VAT; Grid for iPad $349 one-time or $10.99/mo, 30-day free trial. **VERIFIED** — https://www.inclusive.com/products/grid-3-from-smartbox ; https://www.inclusive.com/products/grid-for-ipad ; https://thinksmartbox.com/app/uploads/2026/09/Smartbox-UK-Price-list-September-2026.pdf

**Sync story (strong):**
- "If you sign into your Smartbox and Dropbox accounts on another device or Grid 3, **your grid sets and settings will be automatically synced from device to device**." **VERIFIED** — https://hub.thinksmartbox.com/knowledgebase/how-do-i-connect-my-grid-3-user-to-dropbox/
- **Remote editing**: the user nominates editors by email (Smartbox account); the editor opens Grid 3 (no license needed) → Remote editing → sees "a list of users who have given you permission to edit their grids," edits, and saves sync back to the user's device. Not available *from* Grid for iPad as the editing machine. **VERIFIED** — https://hub.thinksmartbox.com/knowledgebase/what-is-remote-editing-and-how-do-i-set-it-up-in-grid-3/ ; https://hub.thinksmartbox.com/knowledgebase/can-i-use-remote-editing-with-grid-for-ipad/

---

## 7. Avaz AAC

**a) Prediction/AI:**
- Keyboard mode: "the most sophisticated prediction in the AAC world. Keyboard prediction corrects for spelling mistakes, and can be set up so that predictions only appear after a few seconds... Plus, pictures!" — **Picture Prediction** puts picture prompts in the text-mode prediction bar (bridges picture→text users). Prediction bar, not navigation. **VERIFIED** — https://info.avazapp.com/features/ ; https://buzz.avazapp.com/blog/avaz-aac-features-supporting-transition-from-picture-to-text-based-aac/
- AI features (2023-24): **Expressive Tones** — "infuses emotions into AAC voices using AI," tones like excitement/anger/sarcasm/sadness (**VERIFIED** — https://avazapp.com/blog/expressive-tones-hear-me-out/); **SwiftSpeak** — AI experiment, "a quick communication tool and smart keyboard" with sentence expansion (**VERIFIED as announced experiment** — https://www.avazapp.com/blog/avazs-journey-into-2024/); myth-busting AI post — https://www.avazapp.com/blog/ai-in-aac-lets-bust-some-myths/. No AI next-word navigation for symbol buttons. **VERIFIED by absence.**

**b) Grammar:** No auto-conjugation engine documented. **UNVERIFIED/UNCLEAR.**
**c) Navigation:** category-based picture vocabulary, "3 grades of core word based vocabulary, with consistent layout and motor patterns across grades." **VERIFIED** — https://info.avazapp.com/features/
**d) Dates:** Originated ~2010 in India (**UNVERIFIED exact**); continuous updates, AI features 2023-24 (**VERIFIED** — blog posts above).
**e) Price/platform:** iOS + Android; Lifetime Edition $299.99 one-time, plus monthly/yearly subscription plans; 14-day free trial. **VERIFIED** — https://apps.apple.com/my/app/avaz-aac-lifetime-edition/id558161781 ; https://play.google.com/store/apps/details?id=com.avazapp.international.lite&hl=en_US

**Sync story:** "Link Avaz to Dropbox to keep your vocabulary safe and synced across the devices your child uses. You can also use the import and export feature to share pages with other Avaz users." **VERIFIED** — https://info.avazapp.com/features/

---

## 8. CoughDrop AAC

**a) Prediction:** Keyboard boards have "Show word completion suggestions" — "While spelling the user will also see word completion suggestions... trying to guess what word they're starting to spell." Spelling completion only; no symbol next-word navigation. **VERIFIED** — https://coughdrop.zendesk.com/hc/en-us/articles/201366909-How-do-I-create-my-own-keyboard-in-CoughDrop
**b) Grammar:** No auto-conjugation engine documented. **UNVERIFIED/UNCLEAR.**
**c) Navigation:** conventional linked boards (folder taxonomy), fully user-editable; unique: ASL sign **GIFs from GIPHY** available as button images when editing. **VERIFIED** — https://omazingkidsllc.com/tag/asl-gifs/ (site proxy-blocked here; claim from indexed excerpt) — tag page: https://omazingkidsllc.com/tag/aac-apps-with-asl-videos/
**d) Dates:** beta opened 2015; open-source cross-platform release Jan 2016; merged with Forbes AAC 2023. **VERIFIED** — https://blog.mycoughdrop.com/coughdrop-beta-is-now-open/ ; https://www.prweb.com/releases/coughdrop_releases_open_source_cross_platform_aac_app_for_struggling_communicators/prweb13170346.htm ; https://www.forbesaac.com/coughdrop
**e) Price/platform:** $9/mo or $295 lifetime (incl. 5 yrs Cloud Extras); 2-month free trial. Web/iOS/Android/Windows (web-first). **VERIFIED** — https://coughdrop.zendesk.com/hc/en-us/articles/201366609-How-much-does-CoughDrop-cost ; https://www.coughdrop.com/index.html

**Sync story (state of the art):**
- "Unlike most other AAC apps, which are installed and live on a single device, **CoughDrop is cloud-based, and syncs edits across multiple devices automatically**. Speech boards are saved securely in the cloud and ready to go on any device," with offline support. **VERIFIED** — https://www.prweb.com/releases/coughdrop_releases_open_source_cross_platform_aac_app_for_struggling_communicators/prweb13170346.htm
- Account model: priced **per communicator**; "parents, therapists, and teachers supporting a communicator can all sign up for a **free** modeling account when... connected as a **supervisor**." "Supervisors can see usage reports and logs, **modify a user's boards and access preferences from their own devices**." **VERIFIED** — https://coughdrop.zendesk.com/hc/en-us/articles/201366609-How-much-does-CoughDrop-cost ; https://coughdrop.zendesk.com/hc/en-us/articles/201366849-What-is-a-supervisor-in-CoughDrop

---

## 9. Speak for Yourself

**a) Prediction:** None. Every word in ≤2 touches from the main screen (119 core words on main screen; up to ~13,000 words, all two-hit). **VERIFIED** — https://speakforyourself.org/features/
**b) Grammar:** No conjugation engine documented. **UNVERIFIED/UNCLEAR.**
**c) Navigation/motor planning/Babble:** "The first word the user learns never changes position." **Babble** "lets users explore available words by opening every button simultaneously" (toggle between the child's curated set and everything open) — modeled on infant babbling; Search "highlights navigation paths... the app will open the buttons you need to say the word." **VERIFIED** — https://speakforyourself.org/features/ ; https://support.ablenetinc.com/speech-app/speak-for-yourself/ (proxy-blocked here; corroborating excerpt via search)
**d) Dates:** released 2011-2012 (copyright 2011-2025; famous 2012 patent dispute coverage: https://techland.time.com/2012/06/12/ipad-app-that-helps-a-little-girl-speak-pulled-from-app-store/). Price raised to $299.99 with v2.6 in 2016. **VERIFIED** — https://speakforyourself.org/home/app-store/ ; https://apps.apple.com/us/app/speak-for-yourself/id482508198
**e) Price/platform:** $299.99 one-time, iOS. **VERIFIED** — https://apps.apple.com/us/app/speak-for-yourself/id482508198
**Sync story:** none (single-device app; multi-user profiles on one device). **VERIFIED (multi-user)** — https://speakforyourself.org/speak-for-yourself-aac-app-now-has-multi-user-capability/ ; sync **VERIFIED by absence** on features page.

---

## 10. AI-powered newcomers (2024-2026)

- **TalkR** (indie, dad-built): "a small AI layer that turns fragments like 'cold blanket' into a complete, natural sentence — spoken aloud instantly." Free tier; Pro $4.99/mo, $39.99/yr, $89.99 lifetime; cloud backup + cross-device sync; web + apps. Sentence *expansion*, not next-word navigation. **VERIFIED** — https://www.trytalkr.com/ ; https://play.google.com/store/apps/details?id=com.pixelpappa.talkr
- **Predictable (Therapy Box)** — text-based AAC for literate users: prediction "learns from each user's patterns over time," plus **ChatGPT integration** in the message window. **VERIFIED** — https://www.therapybox.co.uk/predictable-english ; https://apps.apple.com/us/app/predictable/id404445007
- **TD Talk (Tobii Dynavox)** — AI word/phrase prediction for text users (eye gaze). **VERIFIED** — https://www.tobiidynavox.com/blogs/product-discovery/td-talk-talk-faster-with-word-and-phrase-prediction
- **Avaz SwiftSpeak** — see §7.
- Academic: LLMs for AAC text entry (character/word prediction, up to 30.4 WPM in studies; users "enthusiastic but cautious... concerns that LLMs could undermine autonomy"). **VERIFIED** — https://arxiv.org/pdf/2501.10582 ; https://arxiv.org/pdf/2404.17730
- **No shipped product found that uses AI/LLMs to drive symbol-button next-word NAVIGATION for children.** **VERIFIED by absence** across all searches (searched "AI AAC app sentence prediction," "LLM AAC symbol prediction," etc.).

---

## SECOND QUESTION: sign-language video on button press

**Bottom line: NO mainstream AAC app ships a built-in feature that automatically plays an ASL/BSL/Makaton sign clip when a communication button is pressed alongside speaking the word.** What exists is workarounds and adjacent features (the definitive SLP roundup is OMazing Kids, "Sign Language Symbols, Videos & GIFs in AAC Apps," updated 5/2/25 — https://omazingkidsllc.com/2023/02/01/sign-language-symbols-videos-gifs-in-aac-apps/):

- **TD Snap**: "Neither version of TD Snap offers a way to link a button to play an ASL video saved on that device" (OMazing Kids, above — **VERIFIED excerpt**, note: domain proxy-blocked for direct fetch here). TD Snap 1.35.1+/1.36 added a "Play YouTube Video" button action (streams a YouTube video, i.e., could hack a sign clip via YouTube) — **VERIFIED** — https://www.tobiidynavox.com/blogs/support-articles/how-to-create-a-you-tube-button-for-td-snap-version-1-36-or-higher ; demo: https://www.youtube.com/watch?v=ZytE3afL5bM. An "Eli's ASL Pageset" exists for TD Snap. **UNVERIFIED detail** — via OMazing Kids excerpt.
- **Communicator 5 (Tobii Dynavox, Windows)**: buttons CAN play a local video (AVI/MPEG/MPG/MPE), "on the button itself or on the entire screen" — the closest documented "press button → video plays" mechanic. **VERIFIED** — https://us.tobiidynavox.com/blogs/support-articles/how-do-i-add-a-video-onto-a-button
- **Grid 3**: has a video-playing command and a Music & Videos grid set, but per OMazing Kids it's not established that a symbol-grid button can pop up a video and return; no BSL-video-on-button feature documented. Grid does offer BSL/sign *symbols* via SymbolStix libraries. **VERIFIED excerpt** — https://omazingkidsllc.com/2023/02/01/sign-language-symbols-videos-gifs-in-aac-apps/
- **TouchChat**: option to link a button to play a video stored on the device (workaround for sign clips). **UNVERIFIED detail** — via OMazing Kids excerpt (https://omazingkidsllc.com/tag/aac-apps-with-asl-videos/).
- **GoTalk Now (Attainment)**: "you can program the button to play a video stored on that iPad, which would allow you to link buttons to sign language video clips." **VERIFIED excerpt** — https://omazingkidsllc.com/tag/gotalk-now/
- **Verbal Me**: "offers several different premade sign language boards within the app plus the option to create custom pages that can include short videos." **VERIFIED excerpt** — https://omazingkidsllc.com/2023/02/01/sign-language-symbols-videos-gifs-in-aac-apps/
- **CoughDrop**: "unique built-in option to include GIPHY **ASL sign GIFs** when searching for symbols while editing" — animated sign as the button image (plays as animation, not a video clip w/ speech). **VERIFIED excerpt** — https://omazingkidsllc.com/tag/asl-gifs/
- **MyChoicePad 2 (Insane Logic / Makaton Charity)**: Makaton learning & choice-board app, 4000+ Makaton symbols/signs; users can "record their own signing videos and insert videos in the place of symbols" and "create their own personalised signing video library." It is a Makaton support tool more than a full AAC grammar system. **VERIFIED** — https://www.mychoicepad.com/ ; https://www.mychoicepad.com/read-our-stories/mychoicepad2-a-new-fresh-app-for-2021-10-year-anniversary/
- Conclusion: **an out-of-the-box "every button shows/plays its sign when pressed" feature is open space** — everything today requires manual per-button video authoring or is a symbol/GIF substitute.

---

## THIRD QUESTION: home↔school sync — state of the art

| Product | Sync model | Who owns/edits | Tag |
|---|---|---|---|
| CoughDrop | True cloud-native: boards live in cloud, auto-sync all devices, offline cache | Communicator account; unlimited FREE supervisor accounts (parents/SLP/teachers) edit boards & see usage logs from their own devices | **VERIFIED** (§8) |
| Grid 3 | Dropbox-backed auto device-to-device sync + **Remote editing** by invited editors from any licensed-or-not Grid 3 PC | User's Smartbox+Dropbox accounts; nominated editors by email | **VERIFIED** (§6) |
| TD Snap | myTobiiDynavox cloud "master" pageset; manual Sync button per device; share to other accounts; data tracking portal | One MyTD account across devices | **VERIFIED** (§3) |
| Proloquo (new) | Automatic iCloud sync of vocab/settings across devices on same Apple ID | Same Apple ID only; no third-party editor accounts | **VERIFIED** (§2) |
| Avaz | Dropbox-linked backup/sync + page import/export | Family's Dropbox | **VERIFIED** (§7) |
| Proloquo2Go | iCloud auto-backup (restore, not sync) + manual AirDrop/Dropbox sharing | Per-device | **VERIFIED** (§1) |
| TouchChat / LAMP | iShare file storage / manual file transfer | Per-device | **VERIFIED/UNCLEAR** (§4-5) |
| Speak for Yourself | None | Per-device | **VERIFIED by absence** (§9) |

**State of the art = CoughDrop's model** (cloud account, free supporter roles, edit-from-anywhere, usage reporting), with Grid 3's remote-editing-by-invitation the best implementation among the "big" incumbents. The Apple-ID-locked (Proloquo) and file-shuffling (P2G/TouchChat/LAMP) models leave the home↔school workflow painful — SLPs routinely maintain edits by hand across devices.

---

## FINAL SUMMARY

### (1) Does anyone do next-word screen navigation like our design?
**Yes — the "nobody else does it" claim is FALSE as stated.** WordPower (on TouchChat, NovaChat, Accent, and Grid) has shipped exactly this interaction pattern for years:
- "Intelligent Jumps": selecting a cell "will automatically jump to another grid with additional related vocabulary"; in WordPower 25 "the user is automatically taken to a new grid, full of associated language, based on the user's selections" (https://hub.thinksmartbox.com/knowledgebase/features-of-wordpower/).
- "Logical next words": prediction cells that "change each time you select a word" (same URL), and page programming where fringe pages auto-return to the main page after one selection (https://touchchatapp.com/assets/uploads/19784v1_02-WordPower_Vocab_QRG.pdf).
- Proloquo's Related Words is a weaker cousin: tap a word → curated related words appear in a side panel (no navigation, semantic refinement not sentence continuation) (https://www.assistiveware.com/blog/proloquo-4-grows-with-users).
- TD Snap auto-inflects grammar buttons based on the last 1-2 words in the message window (button morphing, not navigation) (https://www.tobiidynavox.com/blogs/support-articles/how-can-i-turn-off-morphology-in-td-snap).

**What remains genuinely unclaimed:** all of the above is **hand-authored and static**. Nobody does *adaptive* next-word navigation that learns the individual child's transition patterns, and nobody applies AI/LLM sequence models to symbol-screen routing (AI in AAC today = sentence expansion for text users: TalkR, Predictable+ChatGPT, TD Talk, Avaz SwiftSpeak). Note the design-tension prior art: AssistiveWare explicitly rejects prediction for symbol AAC ("generative rather than predictive") on language-development grounds, and the LAMP/SFY school holds that anything that moves targets breaks motor planning — an adaptive-navigation product must answer both objections (e.g., WordPower's own mitigation is the "lock page" button).

### (2) Does anyone play sign clips on buttons?
**No product ships this as a built-in, default behavior.** Closest: Communicator 5 and GoTalk Now (and reportedly TouchChat) let you manually attach a local video to a button; TD Snap 1.36+ can only stream YouTube from a button; Verbal Me supports videos on custom sign pages; CoughDrop offers ASL GIFs as button images; MyChoicePad has a 4000-item Makaton sign library and user-recorded sign videos but is not a full AAC grammar system; TD Snap cannot play local video from a button at all. A speak-plus-sign-clip-on-every-button AAC board would be first of its kind among mainstream products. (Roundup source: https://omazingkidsllc.com/2023/02/01/sign-language-symbols-videos-gifs-in-aac-apps/)

### (3) Best sync story?
**CoughDrop**: cloud-native boards, automatic multi-device sync with offline cache, per-communicator pricing with **free** supervisor accounts for parents/SLPs/teachers who can edit boards and view usage logs from their own devices ($9/mo or $295 lifetime). Runner-up: **Grid 3** remote editing (invited editors modify a user's grids from another PC; Dropbox auto-sync between the user's devices). TD Snap requires a manual sync action against a MyTD master copy; Proloquo syncs only within one Apple ID; Proloquo2Go, TouchChat, LAMP, and SFY are still file-copy/backup workflows. Benchmark to beat: CoughDrop's account model + Grid's invited-editor flow, with real-time (no sync button) propagation.

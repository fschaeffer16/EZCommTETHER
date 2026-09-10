# The Standard: an AAC board that grows with a nonverbal child, ages 3–12

Synthesis of the four working files in this folder (`aac-products.md`, `aac-outcomes.md`,
`aac-design-research.md`, `aac-growth.md`), compiled 2026-09-09. Every design principle below
carries an evidence grade and points back to the working file that holds the citations.

**Status: research and recommendations only. Nothing here is approved for build.** Per Frank's
two rules: no guessing or assuming (everything below is tagged verified/unverified), and no
build without his approval. This document closes the "What is NOT verified" items in the
10 Sep 2026 handoff and extends the scope from ages 5–9 to ages 3–12 as requested.

---

## Part 1 — The handoff's open verification items, now closed

### 1.1 "Nobody else does it" (quicker sentences via next-word navigation) — FALSE as stated; TRUE in a sharper form

**What was checked** (the handoff flagged this unchecked): Proloquo Related Words, TD Snap,
WordPower prediction, Grid Smart Grammar, Avaz — plus LAMP, CoughDrop, Speak for Yourself,
and the 2024–2026 AI newcomers. Full per-product findings with URLs: `aac-products.md`.

**The refutation.** WordPower (Nancy Inman's vocabulary, shipped on TouchChat, NovaChat,
Accent devices, and Grid) has done rule-based next-word navigation for years, documented
verbatim by Smartbox and PRC-Saltillo:

- **"Intelligent Jumps"** — "when a cell is selected this will automatically jump to another
  grid with additional related vocabulary… In WordPower 25, you will automatically be jumped
  to the Drinks grid without even needing to select it."
- **"Logical next words"** — prediction cells "change each time you select a word" (pick "I
  can" → cells offer "know," "look," "call," "give").
- **Auto-return pages** — fringe pages "are programmed to go back to the main page once a
  selection has been made," with a "lock page" escape hatch.

Weaker cousins: **Proloquo's Related Words** is a *side panel* of hand-curated, text-only
semantic refinements of the word just picked (go → drive/fly/walk) — a thesaurus, not
sentence continuation; the screen never navigates. **TD Snap auto-morphology** and **Grid
Smart Grammar** morph grammar buttons in place based on the last words in the message window
(conjugation, not navigation).

**What remains genuinely unclaimed — the sharper true claim:**

> Every incumbent's next-word behavior is **hand-authored and static**. Nobody ships
> navigation that **learns the individual child's own transition patterns**, and no symbol
> AAC uses AI/sequence models for screen routing. (AI in AAC today = sentence expansion for
> literate text users: TalkR, Predictable+ChatGPT, TD Talk, Avaz SwiftSpeak.) VERIFIED by
> documented absence across all products checked — `aac-products.md` §10 and final summary.

The handoff's two-table design (general children's-speech transitions seeded once + this
child's actual transitions, on-device) is exactly the unclaimed territory. The claim to use
publicly is: **"the board learns where your child goes next — nobody else's does."** Never
claim next-word navigation itself is novel; WordPower's documentation refutes that in one
search.

**Two documented objections the design must answer** (both are incumbents' stated
philosophies, so they will be raised):

1. **AssistiveWare:** "generative rather than predictive" — prediction can short-circuit
   language learning. *Answer built into Frank's direction already:* the child still picks
   every word; the system moves the *screen*, never inserts the word. Log and publish
   taps-per-sentence AND vocabulary diversity so the language-learning question is measured,
   not argued.
2. **LAMP/Speak-for-Yourself school:** moving targets break motor planning. *Answer:* within
   any screen, positions stay fixed forever (evidence-backed, §2.4 below); adaptive routing
   changes *which screen appears*, not where any word lives on it. Provide WordPower's own
   mitigation (a lock/stay control) from day one.

**Evidence caution:** word-prediction benefit for young, preliterate, symbol-based
communicators is **evidence-ABSENT** — all rate-enhancement research is adults typing
(`aac-outcomes.md` §9). The nearest analog (Griffen et al. 2026, context-aware response
options for autistic children) is promising but single-case. So taps-per-sentence
measurement from day one is not a nice-to-have; it is the study that doesn't exist yet.

### 1.2 Sign clips on buttons — NO product ships it; first-of-its-kind confirmed

The handoff asked whether any product plays a sign clip on a button. Answer: **no mainstream
AAC app has a built-in "press the button → speak the word + play its ASL/BSL/Makaton sign
clip" behavior.** What exists is workarounds: Communicator 5 and GoTalk Now (and reportedly
TouchChat) let an adult manually attach a local video per button; TD Snap can only stream
YouTube from a button (cannot play local video); CoughDrop offers ASL GIFs as button images;
MyChoicePad is a Makaton tool, not a full AAC system. Sources and per-product detail:
`aac-products.md` sign-language section (anchor roundup: OMazing Kids, updated May 2025).

Frank's one-button/three-cues idea (picture + spoken word + two-second sign clip) remains
**untested by anyone** — and the evidence context is favorable: children acquire tablets
faster than sign alone and prefer devices (Lorah 2015: 93% acquired SGD requesting; 16/19
preferred the device — `aac-outcomes.md` §10), so sign-as-a-cue-on-the-device unifies the
two without betting on sign as the system. Still Frank's open decision: yes, no, or test it.

### 1.3 Sync — the benchmark to beat is now known

- **CoughDrop** is the state of the art: cloud-native boards, automatic multi-device sync
  with offline cache, per-communicator pricing with **free supervisor accounts** — parents,
  SLPs and teachers edit boards and view usage logs from their own devices.
- **Grid 3** is the runner-up: Dropbox-backed device sync plus invited "remote editors."
- The big incumbents are behind: TD Snap needs a manual Sync action against a cloud master;
  the new Proloquo syncs only within one Apple ID (no editor roles); Proloquo2Go, TouchChat,
  LAMP and Speak for Yourself are still file-copy/backup workflows.

The handoff's Family-Code structure (family owns the board, classroom tablet joins it, no
student data on the district account) maps onto the CoughDrop supervisor model and beats it
on the data-ownership promise. Target: real-time propagation (no sync button), free
supporter roles, and edit-from-anywhere. Table with URLs: `aac-products.md` §third question.

---

## Part 2 — What the study base actually supports (ages 3–12)

Full citations, sample sizes and quality flags: `aac-outcomes.md` and
`aac-design-research.md`. The load-bearing findings:

### 2.1 The device helps speech — the #1 parent fear is answerable with numbers (STRONG)

Across two systematic reviews (~125 participants) and three RCT datasets (~170 children):
zero credible cases of AAC suppressing speech; consistent modest gains. The RCT evidence is
stronger than "doesn't hurt": Romski & Sevcik's toddler RCT (N=62) found augmented-condition
children **2.9x and 4.8x more likely to produce spoken target words** than speech-only;
Kasari 2014's device arm produced *more* novel spoken words. This belongs in the parent
onboarding, with citations, as a first-run screen.

### 2.2 Start the device early; the device beats more therapy hours (STRONG, one anchor trial)

Kasari/Almirall SMART (N=61, minimally verbal autism, ages 5–8): starting intervention WITH
the speech-generating device beat spoken-only (~22 more spontaneous communicative utterances
at week 24), and for slow responders *adding the device* beat *adding therapy hours*. The
under-reported caveat: in the no-treatment follow-up the advantage collapsed from ~22 to ~7
utterances. **Gains fade when support stops.** Product translation: sustained scaffolding of
the adults is the durability mechanism — the board must keep coaching the team, not just
serve the child (see 2.6). No trial since has replicated at scale; the 2025 N=194 community
trial dropped the device arm and found only modest gains — the field's evidence engine has
stalled, which is the research-partnership opening (`aac-outcomes.md` §1, §12).

### 2.3 Aided language modeling is the most replicated active ingredient (STRONG)

Three syntheses converge (Sennott 2016; O'Neill/Light/Pope 2018 — mean Tau-U 0.83 across
~190 participants; Biggs 2018 — 48 studies, 267 participants): adults modeling on the
device during natural interaction works. Kent-Walsh's partner-instruction meta-analysis
(IRD .83–.98) is the largest documented effect in the child AAC literature. Frank's
requirement of a sentence strip "big enough for an adult to model on from across the table"
sits directly on the field's best evidence. Modeling must be a first-class mode, not a
side effect.

### 2.4 The visual-cue rules, verified with precision (STRONG–MODERATE)

The handoff's shorthand survives verification, sharpened (details: `aac-design-research.md`):

| Rule | Precision added by the sources | Grade |
|---|---|---|
| Personalized photos first | Photos of the child's own familiar people/activities (Light/McNaughton/Caron 2019 review); photos > line drawings for people with ID (Mirenda & Locke 1989, N=40 disabled); child-derived symbols beat PCS (Worah 2015, N=40 toddlers, RCT) | STRONG for entry stage |
| PCS is unguessable | 2.8–11.1% iconic (Haupt & Alant 2002); 12.5% (Basson & Alant 2005) — both TD, non-US; generalize as "largely not guessable," not exact rates | STRONG for the fact |
| Cluster by color | By the symbols' **internal** color / word class — NOT background color, which gives no benefit ≤16–24 cells and can erase the clustering gain (Wilkinson 2008/2011/2013; Thistle & Wilkinson 2017, N=52, 4×4) — includes Down-syndrome and ASD samples with eye-tracking mechanism | STRONG |
| Plain backgrounds | White backgrounds for young children in small arrays; effect may reverse for older users / 64+ arrays | MODERATE-STRONG |
| Fixed positions forever | Thistle 2018 (N=24): no difference session 1, ~2x faster (6.0→3.3 s) by session 5 — TD preschoolers only, never replicated with AAC users | MODERATE |
| Humans in photos | Capture gaze within ~1.5 s across TD/ASD/DS (Wilkinson & Light 2014) | STRONG (attention) |
| Spacing / no crowding | Crowding costs search efficiency, esp. Down syndrome (Wilkinson 2022) | MODERATE |
| Animate verbs | Animated verb symbols identified better, incl. children with ASD 3–7 (Schlosser 2019); no evidence for nouns; keep on-demand | MODERATE |
| Schematic, not taxonomic | Preschoolers organize by event/activity, not category (Fallon 2003; Drager 2003) — supports the handoff's "a scene for home and a scene for school" | MODERATE (TD only) |

New since the handoff, and directly on the "teachable cues + grows with them" asks:

- **Visual Scene Displays (VSDs) for entry:** now an evidence-based practice by CEC
  standards for children 3–8 with ASD/IDD (Patenaude 2024/25 synthesis: 37/42 participants
  positive, 0 negative). Personalized photo scenes with hotspots are the evidence-backed
  front door for the youngest/earliest-stage children — the grid comes after.
- **T2L (transition to literacy):** on symbol selection, animate the written word to
  prominence + speak it. Nine single-case studies, 89% of 37 disabled participants gained
  sight words from exposure alone, mean Tau-U ≈ .80. The single best-evidenced "grows with
  the child" feature in the literature — it turns every tap into a reading lesson without
  costing the child anything.
- **Just-in-time programming:** fewer programming steps → more vocabulary added live → more
  child communication turns (Caron 2016; Drager 2019, all 9 participants increased symbolic
  turns). This is the evidence behind the "photo to button in under a minute" requirement —
  and it should be seconds, mid-interaction, not minutes.

**Still untested anywhere (the handoff's grid-size instinct confirmed, slightly refined):**
child studies go up to 16–24 cells (a few search studies did include DS/ASD children, but
as visual-search tasks); 64-cell arrays were tested only on nondisabled adults; no study
parametrically varies grid size with actual AAC users; navigation depth ("how many taps")
has never been quantified for children; and the few-large→many-small transition without
breaking motor patterns has **never** been experimentally tested — masking/progressive
reveal is logical extrapolation. The discovery classroom would be generating evidence that
does not exist, which is fundable (see the funding constraints section of the handoff and
`docs/research-funding.md` in this repo).

### 2.5 Growth is the industry's broken axis — and the core of "better than anyone" (VERIFIED per product)

Every incumbent solved one axis of growth and broke another (`aac-growth.md` Parts 1 and
implications):

- **TD Snap:** grid grows 1×1→8×10, but repositioned buttons must be re-repositioned **at
  every grid size** (per-grid "saved states"), and custom-topic links break crossing the
  2×3→4×4 boundary.
- **TouchChat/WordPower:** sizes are separate files; switching means **re-customizing
  everything**.
- **Proloquo (new):** one fixed grid for life — motor-plan purity bought by making
  preprogrammed words immovable and unremovable. Customization sacrificed.
- **LAMP:** "motor plans can grow but not change" (82 → 205 → 4,000+ words) with reserved
  personal-word slots — the right instinct, but abstract Minspeak icons and a steep partner
  learning curve (vendor now ships an easier "Discover" on-ramp as a concession).
- **Proloquo2Go:** best incumbent pattern — customizations carry across 23 grid sizes, and
  VocaPriority grows vocabulary by *promoting* pre-staged words (Storage→Secondary→Primary)
  instead of creating buttons.

**The standard to set:** store each word's *identity and motor path* independently of the
current rendering, so every customization survives every density/level change with zero
rework; grow by disclosure and promotion, never by file migration; no "graduation" cliff
between age 3 and age 12. No incumbent documents delivering this. Professional consensus
(ASHA, PrAACtical AAC, AssistiveWare: "no prerequisites to robust AAC") supports shipping
the full vocabulary and scaffolding the *teaching*, with the ASHA Leader caution that robust
must not mean inoperable now — fewer *active* targets, same positions.

The target the system chases: ~23 core words (toddler) → ~330 (preschool) → 800–900 new
words/year in school age. That volume cannot be hand-programmed button-by-button — it needs
JIT capture, bulk add, and pre-staged libraries that promote.

**The 8–12 turn, which no incumbent serves:** literacy (T2L), peer register (slang, humor,
texting abbreviations — documented identity/belonging needs for AAC users), and an interface
that stops looking like a preschool toy **without moving a single learned word** — register
packs and visual skins on top of a frozen motor plan. This is how "ages 5–9" becomes
"ages 3–12" without becoming two products.

### 2.6 Abandonment is the enemy, and nobody measures it (WEAK data, big opening)

SLPs estimated only ~39% of AAC users continue past one year (Johnson 2006 — clinician
report, 2006-era devices); "failure to maintain and alter the system," untrained partners,
and ineffective home-school teaming are the named killers; parents describe programming as
"stressful, time-consuming, overwhelming." **No modern usage-log study of child device
abandonment exists** — which the handoff's plan step 2 (count devices in daily use at one
and three years in a partner district) and the product's own instrumentation would remedy.
The Kasari fade (2.2) says the same thing from the trial side: support that stops is gains
that stop. The board must make maintaining it nearly effortless and make the adults better —
that, not any single feature, is what "a voice that grows with them" means operationally.

---

## Part 3 — The standard, in one table

| The ask | The evidence-backed answer | Grade | Who else does it |
|---|---|---|---|
| Meets them where they are | Personalized photo VSDs with hotspots as the front door; robust vocabulary underneath from day one, scaffolded by disclosure, not size | STRONG (VSD EBP; consensus) | Nobody ships VSD-entry → grid-growth in one system |
| Recognizable/teachable cues | Child's own photos → child-derived art (tested in the discovery classroom, children's taps choose); internal-color clustering, white backgrounds, fixed positions, spacing, animated verbs; optional sign clip per button | STRONG–MODERATE per rule | Sign-clip-on-every-button: first of its kind |
| Customizable | Photo→button in seconds (JIT), by any adult, from any device, synced to the whole team; growth by promoting pre-staged words; reserved slots for personal/heritage words | MODERATE-STRONG (JIT studies; abandonment lit) | CoughDrop has the account model; nobody has the seconds-fast JIT flow |
| Grows with them | Word identity/motor path stored independently of rendering; disclosure/promotion, never migration; T2L text animation on every tap; 8–12 register packs + skins on a frozen motor plan | T2L STRONG; transition mechanics UNTESTED (evidence to be generated) | Every incumbent breaks an axis (§2.5) |
| Quicker sentences | Adaptive next-word *navigation* — the picked word opens the screen where this child's likely next word lives; child picks every word; positions never move within screens; lock control; taps-per-sentence measured from day one | UNTESTED for children (the study doesn't exist — we'd run it) | WordPower does it static; nobody does it adaptive |
| A voice, not a product cycle | Model-first sentence strip; parent-facing speech-fear numbers; partner coaching in-product; usage instrumentation that doubles as the missing longitudinal evidence | STRONG (modeling/partner-instruction effects) | Proloquo Coach gestures at it; nobody integrates it |

---

## Part 4 — Corrections and cautions for DECISIONS.md / LEDGER.md

1. **Correct the record:** "Nobody else does it" is false as stated; the defensible claim is
   adaptive/learned next-word navigation (§1.1). Any pitch, filing, or public claim must use
   the sharp version.
2. **Sign clips:** confirmed open space (§1.2). Frank's decision stands open: yes/no/test.
3. **Sync benchmark:** CoughDrop's supervisor model + Grid 3's remote editors are the bar;
   the Family-Code structure clears it on ownership if propagation is real-time (§1.3).
4. **The 2019/2015/2002-2005 symbol citations in the handoff** are now pinned to their
   sources with exact figures and honest caveats (§2.4 table) — the "3 to 12 percent" spans
   two non-US TD samples and should be quoted as "largely unguessable," not as universal rates.
5. **Thistle 2018 verified** (24 TD preschoolers, ~2x faster by session five) — but never
   replicated with children who use AAC; the discovery classroom can be that replication.
6. **Age range:** this research covers 3–12 (per Frank, 9 Sep direction to meet kids where
   they are, and the current request). The handoff's 5–9 framing holds for go-to-market
   (school SLP as influencer, district buyer under IDEA); 3–5 entry (VSD stage) and 8–12
   (literacy/identity stage) define the growth envelope the architecture must plan for.
7. **Still not verified / not done:** whether a district will host the discovery classroom
   (not asked); everything in "My recommendations" of the handoff remains unapproved;
   nothing in this folder authorizes a build.

# APP_MAP — where everything lives in Evan's app and the template

*The canonical map of every board, tile, and route in `index.html` (Evan) and
`demo.html` (EZvoxa template). Audited 24 Aug 2026. Keep this current: when a
board, tile, or route is added/moved/removed, update this file in the same commit.*

## The one fact that explains everything

`index.html` and `demo.html` are separate files but **currently share an
identical structure** — the same tile ids and the same 31 board screens. They
have **not diverged yet**. What differs at runtime is a single flag:

- **`mine = this.isEvanProfile()`** (true when `data().profile === 'evan'`).
- Evan's three phones run `index.html` with `mine = true`.
- The template/demo runs with `mine = false` (forced in `demo.html`; also any
  buyer domain — see RELEASE.md).

Tiles are written `...(mine ? [EvanVariant] : [TemplateVariant])`. So one map
below covers both apps; "Evan" = the `mine:true` rendering, "Template" =
`mine:false`. When the two files finally diverge, split this section.

**Icon-key convention:** Evan's tiles pull `X_tile` / specific keys
(e.g. `sentbuild_tile`, `school_123`); the template pulls `tile_X`
(e.g. `tile_numbers`, `tile_school`). All resolve through `iconUri(key)` against
`window.TETHER_ICONS` in `tether-icons.js`.

## Two kinds of tile

1. **Board tile** → `setState({ screen: 'X' })` → a full-screen board gated by an
   `isX` flag (e.g. Food, School, Calendar).
2. **Phrase-chooser tile** → `openPhraseChooser(...)` → a modal overlay of
   sentence buttons; **no dedicated screen** (e.g. My Choice, Overstimmed,
   Bathroom, the greeting choosers). Don't look for an `isChoice` screen — there
   isn't one.

## HOME BOARD (`screen === 'board'`)

| Tile (id) | Label | Evan | Template | Opens |
|---|---|:---:|:---:|---|
| family | Family | ✓ | ✓ | board `family` (people) |
| food | Food | ✓ | ✓ | board `food` |
| hurtbody | Hurt | ✓ | — | board `hurtbody` (body map) |
| hurt | I'm Sick / Health | ✓ | ✓ | board `hurt` |
| school | School | ✓ | ✓ | board `school` (hub) |
| friends | Friends | — | ✓ | board `family` (friends people) |
| morning | Morning | ✓ | ✓ | board `morning` |
| night | Night | ✓ | ✓ | board `night` |
| fun | Fun | ✓ | ✓ | board `fun` |
| watch | TV (Evan) / Watch | ✓ | ✓ | board `watch` |
| feelings | Feelings | ✓ | ✓ | board `feelings` |
| bathroom | Bathroom | ✓ | ✓ | **phrase chooser** |
| sentbuild | Sentence Build | ✓ | ✓ | board `buildmenu` (chooser) |
| calendar | Calendar | ✓ | ✓ | board `calendar` |
| places | Places | ✓ | ✓ | board `places` |
| houses | Houses | ✓ | ✓ | board `houses` |
| choice | My Choice | ✓ | ✓ | **phrase chooser** |
| regulate | Overstimmed | — | ✓ | **phrase chooser** |
| colors | Colors | — | ✓ | board `colors` |
| numbers | Numbers | — | ✓ | board `numbers` |
| clock | Time | — | ✓ | board `clock` |

### Where Evan reaches the tiles he does NOT have on home
Evan's home is intentionally leaner; these live one level in:
- **Numbers** → School → **123** button (`openNumbers` → `numbers`). The neon
  1‑2‑3‑4‑5 art is the `school_123` icon. *(Evan has no Numbers home tile — this
  tripped up a past session; it is NOT a home tile.)*
- **Colors** → School → **Colors** (`openColorsSchool` → `colors`).
- **Time** → Calendar shows the live current time inline (tap → board `clock`,
  which speaks it).
- **Friends** → School people categories (friends is a school category).
- **ABC** → School → **ABC**, and Sentence Build → **ABC Word Speller** (`abc`).

## ALL BOARDS (screens) AND HOW YOU REACH THEM

Home is `screen: 'board'`. Emergency and Settings excluded from the slim-bar
"open to the top" behavior (see below).

- **family** — Family people board. (Home → Family; Friends tile → same board, friends set)
- **food** — Food board. Sub-boards: **drinks**, **snacks**, **restaurants** →
  **restaurant** (mcdonalds / popeyes / chinese / outback).
- **school** — School hub. Buttons: **abc**; **123 → numbers**;
  **Calculator → calc**; **Colors → colors**; plus people categories →
  **schoolpeople**. Evan's categories: **Teachers/Staff** (people board — add
  people, name/photo via edit wheel) and **Friends**. Template's categories:
  Teachers / Office Staff / Aides / Speech-OT / Bus Driver. School category
  icons are shared keys: school_teachers, school_staff, school_office,
  school_calc (neutral neon art; no faces).
- **buildmenu** — Sentence Build chooser → **words** (Sentence Builder) and
  **abc** (ABC Word Speller).
- **watch** — TV/Watch. Sub-boards: **netflix**, **disney**, **sports**
  (plus tv / tablet / movies / internet tiles).
- **houses** — Houses → **houserooms** (bathroom / kitchen / living room / outside).
- **hurt** — "I'm Sick" symptom board. **hurtbody** — neon body map
  (head/neck/chest/belly, both arms/hands/legs/feet). Evan uses hurtbody.
- **calendar** — month grid + inline live **Time** (tap → **clock**).
- **morning**, **night**, **fun**, **feelings**, **places**, **colors**,
  **numbers**, **clock** — standalone boards.
- **settings** — gear (⚙️) on the home header; family setup, phone role, Sync.
- **sos** / **sosSent** — Emergency. Reached from the red SOS bar, which is
  **anchored flush to the very bottom** of the content region (full-width,
  top-rounded, `bottom:0`, safe-area-bottom padding) rather than floating as a
  pill. The scroll region **stops at the top of the bar** (`bottom:calc(56px +
  safe-area)`, not `inset:0`) so tiles sit **above** the bar, never behind it.
  Combined with a tightened home-grid **row-gap (14→6px)** and picture-to-caption
  gap (8→5px), this lets the home grid show **six full tiles (pictures +
  captions) without scrolling** on standard iPhones while keeping the pictures
  large (column-gap stays 14px). Excluded from the slim-bar behavior.
- **voicenote** — parent voice-note recorder (poll/playback via `api/voice.js`).

## TOP-BAR BEHAVIOR

### The neon top panel (shipped 24 Aug 2026, both apps)
The home-screen top stack (`showTopStack`) is a **dark neon control band**
(`#0a0a0f`, rounded bottom) holding three parts:
- **Header** — owner photo/name (white), `✕ Close`, dark gear (⚙️ → Settings).
- **Yes · Home · No** in one row (was a 2×2 Yes/No/Help/Bathroom grid). Home is
  the blue circle tucked between Yes and No (`goHome`). Yes/No speak; Home →
  home + scroll top.
- **10 neon quick tiles**, a **single horizontal row that scrolls, four
  visible at a time** (`display:flex; overflow-x:auto`, each tile
  `width:calc(25% - 6px)`, scroll-snap), driven by the `neonTiles` prop. Five
  across was too small; four larger tiles on one scrolling line replaced it.
  Each tile is a **full image** (neon box + picture + caption baked in), so the
  row renders the image only — no separate text label. Order (left→right,
  scrolls right):
  **Help · Good · Bad · Restroom · Thank you · Good morning · Hi · Bye · More ·
  Done**. Icon keys are shared `qn_*` in `tether-icons.js` (`qn_help`,
  `qn_restroom`, `qn_good`, `qn_bad`, `qn_more`, `qn_goodmorning`, `qn_hi`,
  `qn_bye`, `qn_thankyou`, `qn_done`). Help/Restroom **moved here** from the old
  big top buttons and keep the same spoken phrases ("I need help." / "I need to
  use the bathroom."). "Bathroom" is captioned **Restroom** here.
- The old `quickNeeds`/`starterQuick` emoji-pill strip and the `quickScrolls`/
  `quickGrid` flags are no longer rendered on the home screen (props remain but
  are unused by the DOM).
- Both apps default to the **dark** theme (`bg #15120F`), so the panel blends
  into the app; boards below are unchanged.

### Slim bar inside boards
- **Every non-home, non-emergency board** collapses the top stack and shows a
  slim **🏠 Home · 🙋 Help · ✓ Done** bar so the board fills the screen from the
  top. Flag: `inBoard`. Home/Done → home; Help speaks "I need help"; back + the
  board's name come from the board's own `‹` header.
- Emergency screens (`sos`/`sosSent`) keep `showTopStack` but are covered by
  their own overlay; left untouched by the neon-panel styling.
- Applies to both apps.

## GOTCHAS / LESSONS
- **Numbers is a School button, not a home tile** (for Evan). Verify a "tile"
  actually exists before adding one.
- **Per-child personalization — the icons are NOT shared, only the structure is.**
  The *layout and navigation* are common to both apps; the *artwork* is not. The
  template ships neutral, personalizable art (e.g. neon `school_123` /
  `school_abc`), and **every family personalizes it with their own child's
  photo** — that's the product (selling to kids everywhere). Evan is simply the
  first personalized instance: his School Numbers/ABC icons use profile-keyed art
  `numbers_evan` / `abc_evan` selected via `isEvanProfile()`, so his photo shows
  on his phones while the template stays neutral for the next family.
  `tether-icons.js` holds every key in one file, but Evan's keys and the
  template's are **different keys, not a shared one**.
- **PRODUCT TODO:** customers need their own way to drop their child's photo onto
  these personalizable icons (Numbers, ABC, and others) the way Evan's were set —
  today Evan's are hardcoded keys; a buyer has no path to personalize them yet.
- Mine tiles reference `assets/*.jpg` paths that are **not** in the repo; those
  default photos fall back — Evan's real photos come from saved state/overrides.
  Reliable art goes through `iconUri()` data-URIs in `tether-icons.js`.
- Boards render as `position:absolute; inset:0` overlays inside a `flex:1`
  content region below the top stack; the home grid stays in the DOM behind them.

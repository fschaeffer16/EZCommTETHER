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
| hurtbody | Hurt | ✓ | ✓ | board `hurtbody` (body map) |
| hurt | I'm Sick / Health | — (symptoms sit under the body map on `hurtbody`) | — (the nine sick faces are tiles on the Feelings board) | board `hurt` (no longer reachable in either app) |
| school | School | ✓ | ✓ | board `school` (hub) |
| friends | Friends | — | ✓ | board `family` (friends people) |
| morning | Morning | ✓ | ✓ | board `morning` |
| night | Night | ✓ | ✓ | board `night` |
| fun | Fun | — (Fun section inside Places) | — (Fun section inside Places) | board `fun` (no longer reachable) |
| watch | TV (Evan) / Watch | ✓ | ✓ | board `watch` |
| feelings | Feelings | ✓ | ✓ | board `feelings` |
| bathroom | Bathroom | ✓ | ✓ | **phrase chooser** |
| sentbuild | Sentence Build | ✓ | ✓ | board `buildmenu` (chooser) |
| calendar | Calendar | ✓ | ✓ | board `calendar` |
| places | Places | ✓ | ✓ | board `places` |
| houses | Houses | — (first tiles inside Places) | — (first tiles inside Places) | board `houserooms` (the `houses` screen is no longer reachable) |
| choice | My Choice | — (inside Feelings) | — (inside Feelings) | **phrase chooser** |
| regulate | Overstimmed | — | — | gone 3 Sep 2026; its twelve phrases are tiles on the Feelings board in both apps |
| colors | Colors | — | — (inside School) | board `colors` |
| numbers | Numbers | — | — (inside School) | board `numbers` |
| clock | Time | — | — (inside Calendar) | board `clock` |


**Template home order (Frank, 2 and 3 Sep 2026, `templateHomeOrder()`, layoutRev 20):**
Family, Food / School, Sentence Build / Places, Watch / Morning, Night / Bathroom, Hurt /
Friends, Feelings / Calendar. Thirteen tiles. Fun folded into Places on 3 Sep and Places
took its spot. Inside Feelings: the six feeling faces, the seven sick faces (Frank's 2 Sep
note "put health icons inside feelings" meant the faces, not a Health button), the twelve
Overstimmed phrases, then My Choice last. Home One and Home Two are the first two tiles
inside Places; Colors, Numbers and the Calculator are inside School; Time is inside Calendar.

**Evan's home order (`evanHomeOrder()`, layoutRev 19):** Family, Food / School, Sentence
Build / Places, TV / Feelings, Bathroom / Morning, Night / Hurt, Calendar. Twelve tiles.
3 Sep 2026: Fun and Houses folded into Places; Places / TV moved above Feelings / Bathroom;
I'm Sick folded into the Hurt board (body map first, symptoms under it, back goes home);
My Choice moved inside Feelings after Overstimmed.

### Where Evan reaches the tiles he does NOT have on home
Evan's home is intentionally leaner; these live one level in:
- **Numbers** → School → **123** button (`openNumbers` → `numbers`). The neon
  1‑2‑3‑4‑5 art is the `school_123` icon. *(Evan has no Numbers home tile — this
  tripped up a past session; it is NOT a home tile.)*
- **Colors** → School → **Colors** (`openColorsSchool` → `colors`).
- **Time** → Calendar shows the live current time inline (tap → board `clock`,
  which speaks it).
- **Friends** → School people categories (friends is a school category).
- **ABC** → Sentence Build → **ABC Word Speller** (`abc`). Not on School.

## ALL BOARDS (screens) AND HOW YOU REACH THEM

Home is `screen: 'board'`. Emergency and Settings excluded from the slim-bar
"open to the top" behavior (see below).

- **family** — Family people board. (Home → Family; Friends tile → same board, friends set)
- **food** — Food board. **One board with the same four sections in both apps,
  in this order: Drinks, Food, Snacks, Restaurants**, under the hunger chips
  (Hungry / Thirsty / Full / Snack). Evan's items differ from the template's;
  the organization does not. Tapping a restaurant opens **restaurant**
  (mcdonalds / popeyes / chinese / outback), and its back arrow returns to the
  Food board. Evan's old menu of three tiles (My Foods / My Drinks / Favorite
  Restaurants) and the standalone `restaurants` list screen are both gone;
  Restaurants had never been reachable at all in the template before this.
  **drinks** and **snacks** still exist as their own boards, reached from home
  tiles, not from the Food board.
- **school** — School hub. Buttons: **123 → numbers**;
  **Calculator → calc**; **Colors → colors**; plus people categories →
  **schoolpeople**. Evan's categories: **Teachers/Staff**, **Speech/OT** and
  **Bus Driver** (people boards — add people, name/photo via edit wheel) and
  **Friends** (phrase chooser). Template's categories: Teachers / Office Staff /
  Speech-OT / Bus Driver. **Aides is gone in both apps** (the wrench icon read
  as a repairman, not an aide): aides belong on the Teachers board, and anyone
  previously saved under Aides (person `cat` or `school:aides` customs) is
  folded into Teachers by `activePeopleList` so nobody vanishes; the
  add-person section picker no longer offers School — Aides. School category
  icons are shared keys: school_teachers / school_teachers_staff,
  school_office, school_speech, ph_bus, school_calc (neutral neon art; no
  faces), all rendered full-cell (~125px at 430w) like the Food board.
- **buildmenu** — Sentence Build chooser → **words** (Sentence Builder) and
  **abc** (ABC Word Speller). **The speller is reached from here and nowhere
  else.** It used to sit on the School board as well, which meant two tiles,
  two different pictures, one board. Removed from School 28 Aug 2026; `abcBack`
  returns to this menu.
- **watch** — Evan: TV, with sub-boards **netflix**, **disney**, **sports** (his real
  shows). Template (3 Sep 2026): four tiles, TV, Movies, Sports, Streaming, each a
  two-line chooser; no posters, no sub-boards. A family's own shows are custom buttons
  in sections `watch:tv` / `watch:movies` / `watch:sports` / `watch:streaming` and show
  under that tile's heading. Sports and Streaming art is drawn in the app until Frank
  supplies pictures.
- **places** — one board, three sections (Frank, 3 Sep 2026): **Homes** (the two
  houses → **houserooms**, back arrow returns to Places), **Fun** (Pool, Beach, Park,
  Movies, Bike Ride, Trampoline, Soccer Field, Dogs, plus any custom Fun buttons) and
  **Places** (Doctor's Office, Mall, Grocery Store, Store, Haircut, then Hospital / Car /
  Home in the template or Mom's Car / Dad's Truck in Evan's). Every tile opens the
  two-line chooser (the question, the statement); Pool adds the pool noodle lines.
  Mall and Grocery Store are drawn in the app until Frank supplies art.
- **houserooms** — a house's rooms, with the "In every house" strip (bathroom /
  kitchen / living room / outside) at the top. The old **houses** screen is unreachable.
- **hurtbody** — Evan's one Hurt board: the neon body map (head/neck/chest/belly, both
  arms/hands/legs/feet) with the I'm Sick symptoms under it; back arrow goes home.
  **hurt** — the template's Health symptom board (inside Feelings). In Evan's app the
  `hurt` screen is no longer reachable.
- **calendar** — month grid + inline live **Time** (tap → **clock**).
- **morning**, **night**, **feelings**, **colors**, **numbers**, **clock** —
  standalone boards. (**fun** still exists as a screen but nothing opens it.)
- **settings** — gear (⚙️) on the home header; family setup, phone role, Sync.
- **sos** / **sosSent** — Emergency. Reached from the red SOS bar, which is
  **anchored flush to the very bottom** of the content region (full-width,
  top-rounded, `bottom:0`, safe-area-bottom padding) rather than floating as a
  pill. The scroll region **stops at the top of the bar** (`bottom:calc(56px +
  safe-area)`, not `inset:0`) so tiles sit **above** the bar, never behind it.
  Combined with a tightened home-grid **row-gap (14→6px)** and picture-to-caption
  gap (8→5px), this lets the home grid show **six full tiles (pictures +
  captions) without scrolling** on standard iPhones while keeping the pictures
  large (column-gap stays 14px). The bar itself is a **compact single line**
  (SOS badge + "Emergency" + one-line subtitle + ›) with
  `padding-bottom: calc(8px + safe-area)` so its red fills the home-indicator
  zone; keeping it to one line is what lets a full third row of tiles clear it.
  Excluded from the slim-bar behavior.
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

## TABLET AND LAPTOP LAYOUT (rebuilt 28 Aug 2026, both apps)

Built for function, not for looks. The left rail that shipped earlier the same
day is **gone** — it was a suggestion, not the design. What replaced it follows
Frank's own mockups: two-level navigation with a clear back path, one toolbar
that never leaves, and his most-used words always on screen.

Everything is one `wide` state flag plus width-driven CSS on the **same**
markup. A phone renders exactly what it always did (verified pixel-identical).

### The `wide` flag
- `isWideScreen()` — **measures the window as if it were not zoomed**:
  `innerWidth * scale >= 740 && innerHeight * scale >= 600`, where `scale` is
  `visualViewport.scale`. Safari page zoom shrinks the window and leaves the
  screen alone, so an iPad Pro at 175% reports 682x419 — in CSS terms smaller
  than an iPhone held sideways. Nothing in the window tells those apart; the
  zoom factor is the only thing that does.
- `applyWideClass()` stamps `ez-wide` / `ez-wider` / `ez-short` / `ez-vshort` on
  `<html>` from that same measurement, because CSS media queries read the
  shrunken window and would otherwise paint phone styling onto tablet markup.
  Both wide tiers are mirrored onto `html.ez-wide` / `html.ez-wider`; the media
  queries are untouched, so an unzoomed device never reaches the class rules.
- **Height is spent according to what there is.** The quick phrases panel is a
  fixed 300px and will eat a short window whole (at 682x419 it took 300 and left
  the boards 14px). `ez-short` (under 700px) drops it to 196px; `ez-vshort`
  (under 560px) hides it and gives the boards the whole column.
  Read in the constructor so the first paint is already right; `watchWidth()`
  re-reads it on rotation. Height is in the test so a phone held sideways stays
  a phone (an iPhone 15 Pro Max on its side is 932×430, and 430 < 600).
  **740px, not 760px:** an iPad mini in portrait is 744pt wide and was falling
  through to the phone layout. Verified tablet at 744×1133, 1133×744, 820×1180,
  834×1194, 1024×1366 and 1366×1024; still phone at 430×932, 932×430, 375×667.

### Level one: home
- **Toolbar** (`wideTop`), two rows, always on screen. Identity: photo, name
  with a verified tick, gear, Close. Actions: **Yes · No · (Home) · Help ·
  Bathroom**, with Home its own circle in the middle of the five.
  `showTopStack` and `inBoard` are both forced false when `wide`, so the
  phone's tall neon stack and its slim Home/Help/Done bar never render on a
  tablet. Yes and No no longer vanish when a board opens. Built from Frank's
  own mockup, 28 Aug 2026.
- **Boards grid** — the ordinary home tiles, 3 across at 740px, 4 at 1100px.
- **Quick Phrases** (`#ez-quick`, shown on `wideHome`) — all **14 `neonTiles`**
  pinned above the emergency bar and never scrolled away, as labelled pills:
  the drawing on the left, the word beside it. 4 across at 740px (4 rows), 5
  across at 1100px (3 rows). The pill art is a separate set of **glyph-only
  transparent PNGs, `qng_*`**, lifted out of the `qn_*` tiles by stripping the
  painted frame and the baked caption; each `neonTiles` entry carries `gl` (the
  glyph) and `c` (its own colour, sampled from the drawing). The square `qn_*`
  tiles are still what the phone's scrolling strip uses.
- `wideHome` = wide, `screen === 'board'`, **not** `editMode`. In edit mode the
  quick block hides and the grid gets the full height back, because that is
  where tiles are rearranged.
- `homeScrollCss` moves the scroller's floor to clear the quick block
  (`bottom: safe + 358px`; `#ez-homescroll` overrides it to `+294px` at 1100px).
  **If the quick block's height changes, both numbers change together.**

### Level two: a board
A board overlay covers the grid and the quick words, exactly as on a phone.
The toolbar stays. The board's own `‹` returns home. Nothing else to learn.

### The word bank on a tablet (`#ez-words`, `#ez-wordtop`)
Sentence Build is a keyboard, not a picture board, so it packs rather than
grows. The **groups flow into columns** (`#ez-wordcols`): two at 740px, three at
1100px, each group kept whole with `break-inside:avoid`. The columns live on an
inner wrapper, never on `#ez-words` itself, because a multi-column box that is
also the scroller spills sideways instead of down. Inside the narrower columns
the two-across groups take three; everything else keeps the four it has on a
phone. Group order is Frank's, 28 Aug 2026: Quick phrases, Starters, Little
words, Question words, Verbs, Adjectives, Pronouns, Prepositions, Social, then
Articles, Nouns, Adverbs, and Numbers last.
The sentence strip and the word finder, which stack on a phone only because it
is narrow, sit side by side. Scoped by the `#ez-words` id so the rules cannot
reach the quick-phrase pills, which use the same `repeat(4, 1fr)` string.

### Column growth
`min-width:740px` and `min-width:1100px` are the two tiers. Home 3 → 4; the
two-across item boards 3 → 4; the three-across boards (School, colours, night,
feelings) go to **4 and stay there**, matching the mockup; people boards 4 → 5.
`#tether-root` is capped at 1280px. Selectors match React's **normalised**
inline styles (`gap: 4px 14px`, spaces after colons), not the source.

### Known, pre-existing
A board overlay paints over the red SOS bar (it is earlier in the content
region), on phone and tablet alike. The bar is on screen at home and in
Settings. Not changed here.

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

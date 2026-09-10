# Handoff: the younger-children product (ages 5 to 9)

Written 10 September 2026 for a new thread dedicated to this project.
Read this, then CLAUDE.md, DECISIONS.md and LEDGER.md as usual. Frank's
two unbreakable rules apply here as everywhere: no guessing, no assuming;
no build without his approval.

## What this is

A second product from EZ Voice LLC, for nonverbal and minimally verbal
children aged 5 to 9, given to them at school or through speech-language
pathologists. Not a version of EZvoxa. A ground-up product built on the
EZvoxa engine. No name yet. No build has started. Nothing is approved
except the directions below.

## Frank's directions (his words, 10 Sep 2026)

1. Tablet first: "this one needs to be designed with a tablet in mind, not
   a phone."
2. "Customization is key. Whether it is the teacher or the family, the
   freedom to add, move, change buttons is critical to a child's
   development."
3. "Even building sentences has to be quicker. It cannot be in and out of
   a dozen screens. There should be a way to get from the noun you just
   picked to the verb through AI or predictive text. Don't give the child
   the next word, but instead of making them start over on the home
   screen, let the word they just picked bring a link to the next screen
   where the next word they want likely lives."
4. "The boards MUST sync if the student is not taking the same tablet to
   school and home, which would be ideal."
5. "Quicker sentences is the key to the entire thing. Nobody else does it
   which means we can do it best."
6. He asked whether to combine sign language and a talking device
   (question, not a ruling).
7. Earlier the same night: he wants the ILP (individual learning program)
   for regular curriculum and IEP curriculum; and "MEET THESE KIDS WHERE
   THEY ARE" (9 Sep).

## My recommendations (mine, offered and not objected to; not approved)

- Phrases stay as the daily layer (what works for Evan and what the
  incumbents lack). A picture-first sentence builder that the adult can
  model on is the core for this age, because a five-year-old is still
  acquiring language and phrase buttons alone do not build it.
- Software on district iPads before any dedicated device. A dedicated
  device puts the product in the Medicaid DME pipeline (prescription,
  prior authorization, one per five years). Software is bought by the
  district under IDEA; the school SLP is the influencer.
- The look of the visual cues comes from the children: the child's own
  photos first (the 2019 state-of-the-science review's one firm finding
  for young children is personalized photos of familiar people in real
  activities; a 2015 Penn State study found child-derived symbols beat
  PCS with 40 toddlers; child recognition of PCS measured 3 to 12 percent
  in 2002 and 2005). For words with no photo, Frank's neon art tested
  against two other styles in the discovery classroom; the children's
  taps choose. Do not license PCS or SymbolStix.
- Two layout rules with evidence: cluster symbols by their own colour;
  keep backgrounds plain; keep each picture in the same place forever
  (Thistle 2018, 24 preschoolers, consistent location faster by session
  five).
- Starting hypothesis for a 10.9-inch iPad in landscape: six to eight
  pictures per screen, about 200px each, a scene for home and a scene for
  school rather than a grid of everything, a sentence strip across the
  top big enough for an adult to model on from across the table. Child
  studies never went past 16 cells and used typically developing
  preschoolers; anything denser is a guess.
- Sign language: not two systems. One button that shows the picture,
  speaks the word, and plays a two-second clip of the sign, so teacher,
  parent and tablet give the same three cues. Untested by anyone.
  Evidence on sign alone: Lorah 2015 review (PMID 25413144, abstract):
  tablets were acquired faster than sign or picture exchange and most
  children preferred the device.
- Quicker sentences, the design: the word just picked opens the screen
  where the next word probably is. Two tables: what usually follows a
  word in children's speech (seeded once, AI may seed it), and what this
  child actually said next (lives on the tablet, never leaves it). The
  child still picks every word. Measure taps per sentence from day one.
- Sync, the design: the board belongs to the family's code (Family Code
  machinery that exists) and the classroom tablet joins it, so the school
  edition's promise of no student data on the district's account holds
  while home and school edit the same board. Adding a button from a photo
  must take a teacher under a minute. Frank has not ruled on this
  structure; he has ruled that sync is mandatory.
- Plan, in order: (1) land a district on EZvoxa Pro; (2) with that
  district, count how many issued devices are in daily use at one year
  and three years, by grade, and why the rest are not (no such count
  exists in the literature); (3) a year of watching three to five
  children aged 5 to 8 in one classroom with one SLP partner, parents
  consenting, the engine as a sketchpad; (4) design the product from what
  they showed, build it on the EZvoxa engine with new content and a real
  parent side. The ILP curriculum sits on step 3, not before it.

## What is verified (sources in research/aac-elementary-2026-09-10/)

The deep dive of 10 Sep 2026, "EZvoxa Elementary AAC Deep Dive.docx",
with four working files (products, design research, outcomes, funding),
one URL per fact. Headlines: the incumbent apps date from 2009 to 2012
and their 2026 updates are voices, AI helpers and word lists; the design
basis is 1982 to 2003 and the makers cite no studies; the only tests of
the layouts on children used typically developing preschoolers; no
study sets symbol size, count or navigation depth for children; the one
strong device trial (Kasari 2014, 61 children) showed a moderate effect
that faded; Cochrane rated the randomized evidence very low; nobody
measures abandonment of school-issued devices; Medicare Florida allowable
for a device is $9,645.69, Florida Medicaid $6,240.51, tablets excluded,
and the district buys software under IDEA.

## Update, 10 Sep 2026 (later)

The items below were checked by the younger-product thread; its files are
in research/aac-board-2026-09-09/ (aac-standard.md first). "Nobody else
does it" is false as stated: WordPower ships hand-authored next-word
navigation ("Intelligent Jumps"). The defensible claim is navigation that
learns the individual child's transitions, which nobody ships. Sign clips
on buttons: nobody ships them. Sync benchmark: CoughDrop supervisors and
Grid 3 remote editors. Still not done: asking a district to host the
discovery classroom. Nothing is approved for build.

## What is NOT verified (as written before that update)

- "Nobody else does it" (the picked word linking to the next likely
  screen). Not checked. The makers' pages say only "predictive features"
  (WordPower) and "grammar support" (Proloquo2Go); Proloquo advertises
  "Related Words". An attempt to read the App Store descriptions for
  prediction features failed to parse and was not repeated. Check the
  incumbents' actual behaviour (Proloquo Related Words, TD Snap,
  WordPower prediction, Grid Smart Grammar, Avaz) before claiming
  uniqueness anywhere.
- Whether any product plays a sign clip on a button. Not checked.
- Whether a district will host a discovery classroom. Not asked.
- Everything in "My recommendations" above.

## What carries over from EZvoxa

The rule (the picture is the button, one tap says a whole thing, no
reading), the engine (index.html architecture, tether-icons.js, the
Vercel api/*.js backend, Family Code, backup and restore, the
organization licensing design approved in section 8 of the direct sales
design), the business (EZ Voice LLC, trademark and copyright filing
guide, ezvoxa.com corporate section, the district relationship to come),
and the method (watch the child, cite the source).

What does not: the content (Evan's boards, teen phrases, icons made for
his life), the assumption that we know the user, and the phone-first
layout.

## Constraints from the funding research

Florida Medicaid Rule 59G-4.072 excludes "computers, tablets,
smartphones, or other general computing devices". The evaluating SLP may
not have a financial relationship with the supplier (Medicare LCD
L33739; Florida school-match handbook). A software product on district
iPads is outside the Medicaid pipeline; the buyer is the district under
34 CFR 300.105 ("at public expense ... without charge").

## Open decisions for Frank

1. The name and whether it is an EZvoxa product or its own brand.
2. Sync structure: family code owns the board and the classroom joins it
   (my recommendation), or the district account holds it.
3. Whether to run the discovery year before designing, and where.
4. Sign clips on buttons: yes, no, or test it.
5. Whether the phrase layer, the builder, or both lead the first screen.

## Files

- EZvoxa Elementary AAC Deep Dive.docx (repository root)
- research/aac-elementary-2026-09-10/aac-products.md, aac-design-research.md,
  aac-outcomes.md, aac-funding.md
- EZvoxa Pro Direct Sales and Distribution Design.docx (section 5, the
  license system, and section 8, approved)
- DECISIONS.md entries dated 9 and 10 Sep 2026; LEDGER.md sections
  "Elementary AAC deep dive" and "Sign versus device".

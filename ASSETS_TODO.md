# What is left — the accurate list

Counted out of the code on 14 August 2026, not from memory. Every number below
was produced by resolving each button's image key against what is actually
stored in the build.

---

## Where it stands

| | Buttons |
|---|---|
| Have their final artwork | **42** |
| Need new artwork — nothing there today | **69** |
| Have artwork but the wrong artwork | **9** |
| Must be deleted rather than redrawn | **41** |
| Evan's own board, separate job | **9** |

---

## 1. Two things that are live right now and shouldn't be

**1.1 — There is a picture of Evan inside a McDonald's on the template's Food board.**
The `Hamburger` button uses `hamburger`, which is a painting of him standing under the
golden arches. It is on a buyer's phone today. This is the single most urgent image on
the list.

**1.2 — The Watch board serves Disney and Netflix artwork, and speaks the titles.**
Twenty-eight Netflix images and thirteen Disney images are hardcoded, not stored per
phone, so the template shows them. Tapping one speaks *"Moana"*, *"Zootopia 2"*,
*"The Lion King"* — the titles are trademarks too.

**Recommendation, unchanged:** ship the template's Watch board with eight empty slots and
a line telling the parent to add their own. Removes all 41 images and all 41 titles, costs
nothing, and it is the better feature. Evan's board keeps his.

---

## 2. Need new artwork — 69

Nothing exists for these today. They render as an emoji.

| Board | Count | Buttons |
|---|---|---|
| **Bathroom** | 9 | I need to pee · I need to poop · Can I take my shower · Do I need a shower · I took my shower · Can I brush my teeth · I brushed my teeth · I need to wash my hands · All done |
| **Places** | 7 | Playground · Beach · Pool · Soccer Field · Trampoline Park · Home · Car |
| **School** | 7 | Teachers · Support Staff · Front Office · Friends · ABC · 123 · Calculator |
| **Food** | 6 | Sandwich · Soup · Cereal · Eggs · Apple · Cookie |
| **Morning** | 6 | Good Morning · Shower · Brush Teeth · Get Dressed · Breakfast · Help |
| **Night** | 6 | Good Night · Shower · Brush Teeth · Pajamas · Goodnight Hugs · Help |
| **Feelings** | 6 | I'm happy · I'm sad · I'm angry · I'm frustrated · I'm tired · I don't feel good |
| **Houses** | 6 | Home One · Home Two · Bathroom · Kitchen · Living Room · Outside |
| **Drinks** | 5 | Water · Milk · Orange Juice · Lemonade · Soda |
| **Snacks** | 4 | Chips · Popcorn · Pretzels · Crackers |
| **Hunger strip** | 4 | Hungry · Thirsty · Full · Snack |
| **Watch** | 3 | Shows · Movies · Sports |

---

## 3. Have artwork, but the wrong artwork — 9

These already show a picture. It is a painted photograph, which clashes with the neon set,
and one of them is the McDonald's problem above.

**Food — 8:** Pizza · Chicken Fingers · **Hamburger** · Hot Dogs · Spaghetti · Bananas ·
Grapes · Strawberries

**Drinks — 1:** Apple Juice

---

## 4. Delete rather than redraw — 41

Twenty-eight Netflix images, thirteen Disney images. Section 1.2.

---

## 5. Evan's own board — 9

Painted style, matching the eleven he has. Nothing to do with the template.

`talk` · `sentbuild` · `colors` · `numbers` · `clock` · `calendar` · `houses` ·
`choice` · `regulate`

---

## 6. Done — 42

**Home tiles — 20.** All of them, including Places, which landed tonight.

**Health symptoms — 9.** Headache · Sore Throat · Cold · Cough · Fever · Stomachache ·
Rest, plus Stuffy Nose and Ice Pack, which were already objects with no face.

**Fun — 6.** Pool · Beach · Trampoline · Bicycle · Dogs · Soccer.

**Places — 5.** Haircut · Store · Doctor's Office · Hospital · Movie Theater.

**Night — 1.** Sleep.  **Emergency bar — 1.**

---

## 7. Fixed along the way

| What | Why it mattered |
|---|---|
| The template pulled the family's **real phone numbers** from the server onto its Family board, matching on the ids `mom` and `dad` | A stranger's demo phone displayed Frank's and Raniyah's actual numbers |
| Tapping **Text** in the demo sent a real message to a real person | `/api/text` resolves the number server-side from the person id, so it worked even though the client never saw a number |
| **Emergency** in the demo transmitted a real alert | Now walks through the whole flow and sends nothing |
| **Voice-note polling** ran in the demo | A demonstration could have played back a real message from Evan's mother |
| `iconUri()` fell back to a path that does not exist | Every not-yet-drawn icon rendered as a **broken image** rather than a blank |
| Sky Zone | A trademarked business. Now Trampoline Park |
| Mom's Car / Dad's Truck, Mom's House / Dad's House | Collapsed to one Car and one Home — a buyer may have one of each |

---

## 8. Still waiting on a decision

| Question | My recommendation |
|---|---|
| **Watch board** — 41 branded images and 41 spoken titles | Ship the slots empty |
| **Hurt screen** — rebuild as the segmented neon body you mocked up? | Yes. The current tap zones are 43 × 38 points and invisible |
| **The 128 sentence buttons** — Talk, My Choice, Overstimmed, Time, the word bank | Leave as glyphs. They are sentences, not objects |
| **Pocket-press filter** — deleted months ago, the call site still does nothing | Say if you want it back |
| **"More"** — I made it speak the word | Leave it |

---

## 9. Word changes I still owe you

1. **Night · Goodnight Hugs** still says *"Good night Egypt and CJ"* and *"Good night Chad."*
2. **Houses** still has *"The Office"* as a room.
3. **Settings** still offers Light / Dark although we committed to dark only.

These are code, not artwork. They go in the next pass.

---

## 10. Format, every time

One file per icon · **1024 × 1024** · square · black background · no text baked in ·
no brands · same prompt across a batch · named exactly as listed · zipped.

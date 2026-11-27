# Changelog

## 6.1.4 (2026-11-26)

- **The summary counts wrong tries you corrected.** A finished word that was another word than the
  text's and was then retyped, a word bubble or phrase put in the wrong place and then moved, and
  a block erased or retried with a wrong word in it each count one. Typos ("teh", "Shakspeare")
  don't count, and neither does a word fixed before its space. The total sits with the other
  numbers, and each block in the review says how many it had. The new strings are machine
  translated and marked unchecked.

## 6.1.3 (2026-11-26)

- **Q & A reads the ways people write questions and answers.** "Q1 …" with "A …" under it,
  "Question 1 … Answer …" on one line, "Q: … / A: …", "Ans.", a list number before "Q", and the
  words in Tiny's languages ("Frage / Antwort", "Вопрос / Ответ", "问 / 答"). Before, several of
  these gave no blocks at all. A text with no markers reads each line ending in "?" as a question
  and the lines under it as its answer.

## 6.1.2 (2026-11-21)

- **Opening a share card fills both boxes:** the text above and the blocks below. Before, only
  the blocks changed and the last text stayed above, which was confusing. A card now carries its
  reference text as well as its blocks; a card made before this fills both boxes with its blocks.
- **Fixed:** an open card from the full app put its whole text, unsplit, into the blocks box. It
  is now split as the sender chose.

## 6.1.1 (2026-11-21)

- **Open cards from the full Verbatim app open here.** A card made there without a code shows its
  title and blocks, ready to practise. A card protected with a code says to open it in the full
  app, instead of saying no passage was found.
- **Word bubbles come in phrases sized by level:** Easy 4–7 words, Medium 2–5, Hard 1–3.
- **Extra phrases for Scrambled,** off by default: a few phrases from the text's other lines join
  the tray.

## 6.1.0 (2026-11-20)

- **The full Verbatim app comes first.** Under the text box and at the top of the footer, a line
  says what the full app adds and links to its download page (`get.html`, now on this site).
  Feedback (the Tally form) comes second, Ko-fi third; the privacy and source lines follow.
- **The install dialog says plainly** that an installed web app is still this page: it keeps
  nothing once closed, has no library and cannot protect texts as the full app's vault does.
- **Word bubbles: Up and Down go a row at a time,** to the nearest gap or word above or below,
  so a long phrase's second row is one key away. Left and Right still walk a line.
- **The summary names the way a block was done:** "Word bubbles · first time right 80%", or
  "Scrambled · …".
- **Fixed:** at phone width, after Next, a press on a cue button (Key words, Scrambled…) did
  nothing: leaving the typing box closed the docked layout and moved the button away.
- For reviewers: `rowNeighbour()`; a `mousedown` guard on `#cueModes`; six new strings per
  language, marked unchecked; `sw.js` answers page visits with Tiny only for `/` and
  `/index.html`, so `get.html` loads as itself (before, it would have shown Tiny).

## 6.0.4 (2026-11-20)

- **The burn dialog's confirm button is plain text** ("Burn it"), without the colour 🔥, in
  every language, so nothing on the burn path is in colour. For reviewers: the leading
  emoji was removed from `fireGo` in all 14 language blocks and from the button's HTML.

## 6.0.3 (2026-11-20)

- **The burn button is monochrome:** a drawn flame in the same gold as the buttons beside it,
  in both themes, instead of the full-colour 🔥 emoji. For reviewers: an inline SVG in
  `currentColor` inside `#btnFire`, which loses the button's padding so the SVG is not squeezed
  to 4 px. The tooltip and spoken name are unchanged. The 🔥 in the confirm button's text and
  in the what's-new note is unchanged.

## 6.0.2 (2026-11-20)

Two bugs found on verbatim.run.

### For people using Verbatim

- **A missing space now costs one character.** Typing "besidestill" for "beside still"
  used to mark the following words wrong and the line came out near 65%. Now only the
  missing space is marked (98.6% on that line). A space typed inside a word ("be side") is
  likewise one extra space.
- **With word bubbles, the line above matches the bubbles.** A bubble takes the small
  words before the hidden word ("me beside still waters"), and the line above now hides
  those words too, so the two lines agree after every Reshuffle.

### For reviewers

- `wordAlign` and `wordAlignPrefix` gained two moves, at the cost of one near-typo word:
  *join* (two target words and their space typed as one word, case aside; while typing,
  the word may be a start of them once it is past the first word) and *split* (a word
  typed with a space inside). `computeDiff` grades each half against its own word. The
  backtrace is shared (`wordBacktrace`). The same change is in the full app's
  `core/src/engine/align.ts` and `diff.ts`. `tiny_e2e/parity.spec.ts` now also checks
  that committed grades match the core's, mark for mark. Shortcut: a typo inside a joined
  word ("besidestil") is not joined; it grades as before.
- `shownCue(i)` is the cue the line above draws: in bubble mode it also hides each gap's
  range. Bubbles and cues themselves are unchanged.
- Version 6.0.2 (header comment, `app-version` meta, `APP_VERSION`, `sw.js`).

## 6.0.1 (2026-11-20)

From a click-through of 6.0.0 on verbatim.run.

### For people using Verbatim

- **⚙ Settings looks like the other dialogs:** the text-size label is a small uppercase
  label like the Share dialog's, and the checkbox is gold, not the browser's blue.
- **"Practise this again, another way"** shows its label on its own line, so the six ways
  stay on one row instead of one dropping to a line alone.

### For reviewers

- CSS only, plus the version: `.dlg .lbl` shares `.dlg label`'s style;
  `.dlg input[type="checkbox"]` takes `accent-color: var(--gold)`; `.again-row .hint`
  takes the full row. 6.0.1 in the header comment, the `app-version` meta, `APP_VERSION`
  and `sw.js`'s `CACHE_VERSION`, so installed copies update. The what's-new note still
  shows only to people coming from 5.x.
- Checked in the browser: bubbles (place, wrong shown red, Cmd+Z, first time right),
  Scrambled, Reshuffle, a refresh mid-session, the summary's row, the title, 🔥 with Enter,
  the estimate setting and all four text sizes (A++ scales the reading area, typing box,
  bubbles and both text boxes by 1.3). Not tested by hand: the old-library notice and the
  what's-new note (they need a 5.x visitor's storage; the Playwright checks cover both).

## 6.0.0 (2026-11-20)

A major version: the on-device library is gone. Everything else is additive.

### For people using Verbatim

- **The library is removed.** A web page cannot truly protect what it stores, so Tiny
  Verbatim now keeps nothing once the tab is closed. To keep texts, use the full Verbatim
  app. A library saved by an earlier version is **not deleted**: if one is found, a notice
  says where it is and offers *Export as text*, *Download backup* (the full app imports it)
  and *Delete from this browser…* (asks first).
- **🔥 Burn this session** (left of Tour): one confirm, and Enter confirms.
- **The title** now starts a new session with the same text, like *Start a new session*
  (it used to reload the page and clear everything; that is 🔥 now).
- **Word bubbles** (beside the key-word levels) and **Scrambled** (a cue mode): place
  the hidden words or the shuffled phrases instead of typing. Mouse, touch or keyboard:
  arrows move along a line, Tab steps between the line and the words, Space or Enter
  places; Cmd/Ctrl+Z undoes a move. The summary shows "first time right" per block.
- **Reshuffle**, for key words and Scrambled: a new arrangement, so the order of the cues
  is not what gets learned.
- **A refresh keeps the session**; closing the tab still clears it.
- **Practise this again, another way**: a row on the summary.
- **⚙ Settings**: the word count and rough time under the blocks box (on by default), and
  the text size of the reading and typing areas.
- **Key words in more languages**: filler-word lists for 12 more languages, plus words
  common through the text itself.
- A one-time note for returning visitors says what changed.

### For reviewers: what changed in the code

All in `index.html` unless named.

- **Removed (about 1,600 lines):** the IndexedDB library and its drawer, folders,
  drag-and-drop, save/edit dialog, unlock/lock, PBKDF2/AES-GCM crypto, backup export and
  import, the sync file, duplicate protection, "Enable library", their CSS, and 144
  translation keys nothing used any more (checked: every remaining string in every
  locale is byte-for-byte unchanged). The head script no longer decides app vs web mode;
  the install hint hides in standalone display mode by CSS. A dropped backup `.json`
  now only says to use the full app.
- **Kept on purpose:** the IndexedDB database `verbatim-db` itself. `readOldLibrary()`
  opens it read-only and aborts the open if it does not exist, so the check never creates
  one. Delete happens only from the notice, after `confirm()`.
- **New storage keys.** sessionStorage: `verbatim-session` (the session snapshot, written
  on `pagehide` and when the tab is hidden; removed by 🔥), `verbatim-oldlib-hidden`.
  localStorage: `verbatim-estimate`, `verbatim-textsize`, `verbatim-seen-version`.
  Nothing is sent anywhere; no new requests.
- **Ported from the full app** (`core/src/engine/bubbles.ts`, `language.ts`): `gapsOf`,
  `withFillers`, `bubbleSet`, `scrambleSet`, `fillGaps`, `detectTextLang`. Keep the two
  copies in step until the shared core is built into Tiny.
- **Filler lists:** `CUE_FILLER_OTHER` (12 languages, ~13 KB), compiled from stopwords-iso
  1.1.0 (MIT) and checked by an LLM, not yet by native readers. The same lists now ship in
  the full app. `textFiller()` adds words found in at least half of the blocks (at least
  three, from four blocks).
- **Behaviour changes to know:** the title no longer reloads; `beginPractice()` and
  `restartSession()` replace inline handlers; `cueFor()` takes the filler set as its
  sixth argument; Retry clears a block's bubbles.
- **Strings:** every new string in all 14 full languages (plus en-GB and pt-BR
  variants), marked `unchecked` in a comment on each block until a native reader reads them.
- **Tests:** none live in this repository. Playwright checks are in the main Verbatim
  repo at `tiny_e2e/` (`npm run e2e:tiny`; Chromium and WebKit; 7 stories, plus a
  check that the page requests nothing outside its own files). Two `console.assert`
  self-checks run in the page.
- **Version:** 6.0.0 in the header comment, the `app-version` meta, `APP_VERSION` and
  `sw.js`'s `CACHE_VERSION`.

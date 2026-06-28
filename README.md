# Verbatim

**A memorization and typing-accuracy trainer that lives in a single HTML file and forgets everything the moment you close it.**

Verbatim helps you commit text to memory by making you actually *type it out* — and then telling you, character by character, exactly where you went wrong. Scripture, poetry, song lyrics, speeches, study notes, that one quote you keep almost-but-not-quite getting right: paste it in, break it into bite-sized chunks, and drill until it sticks.

No app store. No login. No "create an account to continue." It's one file. You open it. It works.

---

## Why this exists

Rote memorization is tedious, and most tools either over-complicate it or quietly try to become a subscription. Verbatim does one thing: it shows you a passage, hides it, makes you reproduce it, and then grades you honestly. The honesty is the point — it scores at the character level, so it'll happily notice that you swapped a comma for a semicolon or capitalized a word that shouldn't have been.

It's built as a single self-contained HTML file on purpose. You can save it to a USB stick, email it to yourself, throw it on a static host, or open it from your downloads folder on a plane with no Wi-Fi. It doesn't care.

---

## Features

- **Flexible text splitting** — break your material into practice blocks by lines, sentences, verse markers, or question-and-answer format.
- **Character-level accuracy scoring** — catches case errors, punctuation slips, substitutions, and missing or extra words. It doesn't grade on a curve.
- **Colored diff review** — a full session summary that shows exactly what you typed versus what you should have typed, in color.
- **Verse mode and Q&A mode** — robust parsers for structured material, including bare "Answer" labels.
- **Countdown timer with overtime penalty** — for when you want to add a little pressure.
- **AFK time tracking** — steps away from the keyboard don't get counted as "thinking time."
- **Smart character normalization** — curly quotes, em-dashes, and other typographic gremlins get handled so they don't cause false errors.
- **Per-box wrap/scroll toggle** and a **sticky header** for comfortable use on mobile.
- **Light/dark theme** that defaults to whatever your OS prefers.
- **PNG export** — save a clean image of your session summary, or copy it to the clipboard.
- **Keyboard shortcuts** that work properly across platforms (yes, including the Mac Option key).

---

## How to use it

1. **Open the file.** You have the option to run it directly as hosted on Github, or download `verbatim.html` and open it in any modern browser, or use the hosted version (link below). That's the install step. There is no other install step.
2. **Paste your text** into the input area.
3. **Pick how to split it** — lines, sentences, verses, or Q&A — depending on what you're memorizing.
4. **Start typing.** Verbatim shows each block, then hides it and waits for you to reproduce it.
5. **Read your results.** The summary shows your accuracy and a colored diff of every mistake.
6. **Export if you like** — grab a PNG of your session for your records, a study group, or bragging rights.

---

## Privacy (or: the shortest privacy policy you'll ever read)

Verbatim does not collect your data, because Verbatim has no way to collect your data and no place to put it.

Everything happens inside your own browser, on your own device. Nothing you type, paste, or score is ever sent anywhere. There are no servers, no analytics, no trackers, no cookies, no "anonymized telemetry," no third parties, and no mysterious background phone-home. The page doesn't even know you exist, which can honestly be a nice feeling in today's era of users becoming products.

And here's the kicker: **nothing is saved.** Not on a server, not on your device. When you refresh the page or close the tab, your session is gone — text, scores, diffs, all of it. That's not a bug; it's the whole design. If you're practicing something personal, sensitive, or just embarrassingly difficult, that's between you and your keyboard. If you want a record, that's exactly what the PNG export is for. Save it before you close, or it vanishes like it never happened.

Treat it like a whiteboard, not a notebook.

---

## Support

If Verbatim saved you some sanity and you'd like to say thanks, you can buy me a coffee on **[Ko-fi](https://ko-fi.com/y144cafe)**. Entirely optional, deeply appreciated, and it keeps the lights on for future tinkering.

---

## Requests, ideas, and bug reports

Got a feature idea, a bug to report, or a strong opinion about how verse parsing *should* work?

- Send it through the **[Tally feedback form](https://tally.so/r/0QlL59)** or,
- Open an **[Issue on GitHub](https://github.com/yuriy144/verbatim/issues)**.

Every suggestion gets read — genuinely, all of them. Not every suggestion gets built, because scope creep is how nice simple tools turn into bloated messes. But good ideas have a real shot, and "no" is usually just "not yet" or "not the right fit," not "I ignored you."

---

## License & intellectual property

The full source is right here, open for anyone to read, study, learn from, and tinker with. That's intentional — I think people should be able to see how their tools work.

**To be clear about what that does and doesn't mean:** the code is mine. It's released under the **PolyForm Noncommercial License 1.0.0**, which in plain terms says:

- ✅ You can use it, read it, modify it, and share it freely for **noncommercial** purposes.
- ✅ You can build your own non-commercial tools on top of it or inspired by it — if it helps people, wonderful.
- ❌ You **cannot** repackage, sell, or otherwise use it (or substantial copies of it) for commercial gain.

In other words: learn from it, use it, improve on it, share it around — please do. Just don't clone it wholesale and try to make money off my work. If you have a legitimate commercial use in mind, reach out and we can talk.

See the [`LICENSE`](./LICENSE) file for the full text.

---

*Made with care, and a slightly excessive concern for whether you typed the right kind of punctuation.*

# React Ninja Alignment Spec

The shared tone system that aligns the React module (`reactJS/`) with the **Ninja Front-End Development Journey**. Every React gate, manual, and exercise in this folder follows the rules below so students move through the module like a single story.

> This file is the rulebook. The manuals are the story. When a manual and this spec disagree, this spec wins — and the manual gets fixed.

---

## 1. The World

Students are **ninjas** training inside the **Front-End Temple**. Each training session is a **gate** — one clear skill the ninja must master before moving on. The course as a whole is the **quest map**: a chain of gates that ends in building the React News App.

| Term | Meaning in the course |
|------|----------------------|
| Ninja | The student |
| Temple | The front-end course / classroom |
| Gate | A single training day or module with one mastering goal |
| Quest Map | The opening diagram showing how today's gate connects to the past and the future |
| Staircase | The closing recap showing what the ninja could not do in the morning and can do by evening |
| Scroll | A reference/handbook-style document |
| Temple rule | The one sentence every tool obeys: "Every new tool answers an old question." |

---

## 2. The Temple Rule

> **Every new tool answers an old question.**

Every concept, library, and command introduced in these manuals exists because an earlier tool left a question unanswered. The manuals must state that question before introducing the answer:

```text
Old tool → its limitation → the pain it caused → the new tool → the question it answers
```

Example used across the module:

```text
Writing DOM updates by hand is painful → React introduces components
React components contain JSX → browsers do not read JSX → Vite compiles it
One big React file gets unreadable → props and components split it up
```

---

## 3. The Gate Skeleton

Every Day manual opens and closes with the same structure.

### Opening block

```text
# Web Development Using React JS
# Day N Student Manual
# <The <X> Gate> — <subtitle>

> **Project:** React News App
> **Gate:** The <X> Gate
> **Beginner question:** <one sentence a beginner would ask>
> **Day N focus:** <what the ninja masters>
> **Learning style:** Need → Try → Fail → Observe → Explain → Fix → Apply
```

### Quest Map (new, after the opening block)

A short code-diagram showing (1) the gates the ninja already passed, (2) today's gate, and (3) the skill chain built inside today. Ends with the temple rule restated for the day.

### Closing block

The final summary section is reframed as a **staircase**:

- What the ninja could not do at the start of the day (pain).
- What the ninja can do now (the new skills, listed as stairs).
- The tagline of the day.
- The next gate one line forward ("Tomorrow: the Data Gate — data arrives from the outside.").

---

## 4. The Learning Rhythm

Manuals follow the cycle: **Need → Try → Fail → Observe → Explain → Fix → Refactor → Apply**.

When a new concept is introduced, use the mini-pattern:

```text
Beginner question → the pain it solves → "the temple reveals" (the concept)
→ a tiny example → explanation of the code → practice → next question
```

Rules:
- The **question comes first**. Never dump a concept before the student has felt the need for it.
- Explanations are short and concrete, one idea per step.
- Every major section ends with a **tagline** — one memorable sentence in bold that the ninja can carry out of the class.

---

## 5. The Tagline Bank

Reusable closing lines. Marked in the manuals with `>` blocks.

| Concept | Tagline |
|---------|---------|
| Components | Components turn a crowd of code into a team of small, clear units. |
| JSX | JSX is the picture of the interface, written inside JavaScript. |
| Props | Props are the answers a parent sends to a child. |
| `key` | React needs a name tag for each item, not for decoration. |
| State | State is the memory of the interface. |
| Events | Events turn static content into interaction. |
| Lists | A list is one template, repeated many times — never many copies. |
| `useEffect` | The effect asks for data; the dependency array says when to ask again. |
| Fetch | Fetch is how the app asks the outside world a question. |
| `useParams` | The URL is the address of the page; the param is the part that changes. |
| Routing | The router turns the URL into a state you can read. |
| Context | Context is how a distant relative asks a question without shouting across the room. |
| Architecture | A good React app is a clear conversation between small, single-purpose pieces. |

---

## 6. Voice Rules

- Write to the **student**, never to the instructor. No "I would tell students…", "Give students this table…", "Don't make Day 2 a vocabulary exam." Convert every such line to the ninja voice.
- No AI artifacts: no `filecite` tokens (`turn4file0`, `turn5file6`, …), no "Absolutely." openings, no chat-echo prose.
- Metaphors serve the code, never replace it. If a metaphor does not make the code clearer, cut it.
- Do not cram ninja words into every sentence. The framing lives in the opening, the quest map, the section taglines, and the closing — the body stays plain and clear.
- Keep every existing learning artifact: labs, trails, quizzes, checkpoints, code blocks, common-mistakes tables, and history notes. Alignment adds framing; it never deletes machinery.

---

## 7. Title Consistency

All five files use a unified title block:

```text
# <H1 for the file>
## <Subtitle>
```

- Day manuals: `# Day N Student Manual` then `# The <X> Gate — <subtitle>` (the gate line is the visible lesson title).
- The Introduction file: `# The React Gate — How We Got to React`.
- No em-dash/hyphen split inside a heading hierarchy: gate line is always the third line of the block.

---

## 8. AI-Guidance Block

Each Day manual contains one short "Using AI at the <X> Gate" section (before the day's summary). Content:

- AI is a sparring partner, not a substitute.
- A **good prompt** example that asks for hints and explanations.
- A **bad prompt** example that asks AI to write the code.
- The rule: "You learn by explaining the fix yourself."

---

## 9. The React-Module Gate Map

| File | Gate | Beginner question |
|------|------|-------------------|
| `Introduction_To_ReactJS.md` | The React Gate | How did we get to React? Why do I need Node.js, npm, and Vite? |
| `React_News_App_Day_1_Student_Manual.md` | The Components Gate | How do I stop UI chaos from multiplying? |
| `React_News_App_Day_2_Student_Manual.md` | The Data Gate | How does my app get data from the outside world? |
| `React_News_App_Day_3_Student_Manual.md` | The Flow Gate | How does the URL become a page, and a page become navigation? |
| `React_News_App_Day_4_Student_Manual.md` | The Architecture Gate | How do I keep a growing app clean and share state sanely? |

---

## 10. Consistency Checklist

Before a manual ships, it must pass:

- [ ] Zero `filecite` tokens and no instructor-note voice.
- [ ] Opening block follows the gate skeleton (§3).
- [ ] Quest Map present at the top.
- [ ] Learning rhythm respected: question → pain → reveal → example → practice.
- [ ] At least one tagline from the bank per major concept.
- [ ] Closing block is a staircase recap + next-gate hook.
- [ ] AI-guidance block present.
- [ ] Every original lab, trail, quiz, checkpoint, and code block preserved.

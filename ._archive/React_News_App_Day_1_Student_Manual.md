# Web Development Using React JS
# Day 1 Student Manual
## React Changes How We Build UI

> **Project:** React News App  
> **Day 1 focus:** React mental model, development environment, JSX, components, props, lists, state, and events  
> **Learning style:** Build → try → fail → observe → explain → fix → apply

---

## 1. Welcome to the React Project

Today you will begin building a small **News App**.

The final project will eventually grow to include features such as:

- News articles
- Search
- Categories
- Article details
- Favorites
- Loading and error states
- Routing
- API data

You will **not** build all of those today.

Today, your goal is to build the foundation:

```text
News App
│
├── Header
├── Navigation
├── News List
│   └── News Card
└── Footer
```

By the end of Day 1, your News App should display multiple news cards using reusable React components and data.

---

# 2. What You Will Learn Today

By the end of this manual, you should be able to:

1. Explain the basic idea behind React.
2. Explain why component-based development is useful.
3. Create and run a React project.
4. Create a functional React component.
5. Write basic JSX.
6. Use JavaScript expressions inside JSX.
7. Pass data from a parent component to a child using props.
8. Render an array using `.map()`.
9. Understand why React lists need keys.
10. Explain the difference between normal variables and React state.
11. Use `useState`.
12. Respond to user actions with event handlers.
13. Use browser errors and React warnings as debugging information.
14. Build the first working version of the News App.

---

# 3. Before React: What You Already Know

You have already worked with front-end technologies.

The basic front-end model is:

```text
HTML
  ↓
Structure

CSS
  ↓
Presentation

JavaScript
  ↓
Behavior and interactivity
```

A browser receives resources from a server and processes them to display a web page.

A simplified request/response flow is:

```text
Browser
   │
   │ HTTP/S Request
   ▼
Server
   │
   │ Response
   ▼
Browser
   │
   ▼
HTML + CSS + JavaScript
   │
   ▼
Rendered UI
```

The course material describes front-end development as client-side development using HTML, CSS, and JavaScript, and explains that the browser parses HTML/CSS and executes JavaScript to create an interactive web experience.

---

# 4. The Problem We Want to Solve

Imagine that we want to build this:

```text
┌──────────────────────────────────────┐
│              NEWS APP                │
├──────────────────────────────────────┤
│ Home | Technology | Sports | Business│
├──────────────────────────────────────┤
│                                      │
│ ┌──────────────┐  ┌──────────────┐  │
│ │    Image     │  │    Image     │  │
│ │              │  │              │  │
│ ├──────────────┤  ├──────────────┤  │
│ │ Article 1    │  │ Article 2    │  │
│ │ Description  │  │ Description  │  │
│ └──────────────┘  └──────────────┘  │
│                                      │
└──────────────────────────────────────┘
```

Using normal JavaScript, we could create elements, change their content, add event listeners, and manipulate the DOM.

That works.

But as the application becomes larger, the UI can contain many repeated elements and many relationships between data and the DOM.

React gives us another way to think:

> **Describe the UI using components and data, and let React update the UI when the application's state changes.**

Do not memorize this sentence yet.

You will understand it by building the application.

---

# 5. React Mental Model

## 5.1 What is React?

The course curriculum introduces React.js as a library used to implement functional single-page applications.

For this course, think about React as a tool that helps you build user interfaces from **components**.

Instead of thinking:

```text
Find this element
Change its text
Create another element
Append it
Remove another element
Update another element
```

we will increasingly think:

```text
Data
 ↓
Components
 ↓
UI
```

When the data or state changes, React can render the appropriate UI again.

---

# 6. Components: The Basic Building Blocks

A component is a reusable part of the user interface.

For our News App, we can divide the page into components:

```text
App
│
├── Header
├── Navbar
├── NewsList
│   └── NewsCard
└── Footer
```

Each component has a responsibility.

For example:

- `Header` → application heading/branding
- `Navbar` → navigation
- `NewsList` → collection of news cards
- `NewsCard` → one article
- `Footer` → footer content
- `App` → combines the major parts

This is called **component-based development**.

---

# 7. Your Development Environment

You will need:

- A code editor
- A terminal
- A browser
- Browser DevTools
- Node.js and npm for the React development environment
- Git for source control

The course material emphasizes the development environment, text editors, terminal usage, Git, and Chrome DevTools as important front-end development tools.

If your instructor has already prepared the project, use the provided starter project.

If you are creating the project yourself, follow the setup command provided by your instructor.

For a Vite-based React project, the usual flow is:

```bash
npm create vite@latest react-news-app
```

Choose:

```text
React
JavaScript
```

Then:

```bash
cd react-news-app
npm install
npm run dev
```

Open the local address displayed in the terminal.

> **Important:** Do not worry about memorizing the setup commands. Your important goal today is understanding what happens inside the React application.

---

# 8. First Look at the Project

A typical React project contains files and folders similar to:

```text
react-news-app/
│
├── public/
├── src/
│   ├── assets/
│   ├── App.jsx
│   ├── main.jsx
│   └── ...
│
├── package.json
└── ...
```

The exact structure may vary depending on the project setup.

For today, focus mainly on:

```text
src/
   ↓
Your application source code
```

and:

```text
App.jsx
   ↓
Main application component
```

---

# 9. Your First Component

Start with the smallest possible component.

```jsx
function App() {
  return <h1>News App</h1>;
}

export default App;
```

Read it carefully.

```jsx
function App() {
```

This creates a JavaScript function named `App`.

```jsx
return <h1>News App</h1>;
```

The function returns JSX describing what should appear in the UI.

```jsx
export default App;
```

This makes the component available to other files.

---

# 10. JSX Is Not HTML

JSX looks similar to HTML:

```jsx
<h1>News App</h1>
```

But JSX is written inside JavaScript code.

It follows JSX rules.

For example, this is not valid JSX:

```jsx
function App() {
  return (
    <h1>News App</h1>
    <p>Latest articles</p>
  );
}
```

There are two sibling elements at the top level.

One solution is to wrap them:

```jsx
function App() {
  return (
    <div>
      <h1>News App</h1>
      <p>Latest articles</p>
    </div>
  );
}
```

Another common solution is a Fragment:

```jsx
function App() {
  return (
    <>
      <h1>News App</h1>
      <p>Latest articles</p>
    </>
  );
}
```

---

# 11. JSX Rules You Need Today

## Rule 1: Return one JSX structure

Correct:

```jsx
return (
  <div>
    <h1>News App</h1>
    <p>Latest news</p>
  </div>
);
```

---

## Rule 2: Use `className`

HTML:

```html
<div class="card">
```

JSX:

```jsx
<div className="card">
```

---

## Rule 3: Close elements correctly

Correct:

```jsx
<img src="image.jpg" alt="News" />
```

Incorrect:

```jsx
<img src="image.jpg">
```

---

## Rule 4: JavaScript expressions use `{}`

Example:

```jsx
const title = "React News";

function App() {
  return <h1>{title}</h1>;
}
```

The `{}` tells JSX:

> Evaluate this JavaScript expression here.

---

# 12. Trail #1 — Break JSX Intentionally

Try this:

```jsx
function App() {
  return (
    <h1>News App</h1>
    <p>Welcome</p>
  );
}
```

Do not immediately ask someone for the answer.

Use this process:

```text
Observe
   ↓
Read the error
   ↓
Ask what JSX expected
   ↓
Identify the invalid structure
   ↓
Make the smallest fix
   ↓
Run again
```

### Questions

1. What did you expect to happen?
2. What actually happened?
3. What does the error message tell you?
4. How many top-level elements did you return?
5. What is the smallest change that fixes the problem?

---

# 13. Building the News App Structure

Now create the application structure.

We want:

```text
App
│
├── Header
├── Navbar
├── NewsList
│   └── NewsCard
└── Footer
```

A simple version can start like this:

```jsx
function Header() {
  return <header>News App</header>;
}

function Navbar() {
  return <nav>Home | Technology | Sports | Business</nav>;
}

function NewsList() {
  return <main>News will appear here.</main>;
}

function Footer() {
  return <footer>News App Footer</footer>;
}

function App() {
  return (
    <>
      <Header />
      <Navbar />
      <NewsList />
      <Footer />
    </>
  );
}

export default App;
```

Run the application.

You have now created a component tree.

---

# 14. The Component Tree

Your application can be visualized as:

```text
App
│
├── Header
├── Navbar
├── NewsList
└── Footer
```

Later:

```text
App
│
├── Header
├── Navbar
├── NewsList
│   │
│   ├── NewsCard
│   ├── NewsCard
│   └── NewsCard
│
└── Footer
```

This tree becomes very important as applications grow.

---

# 15. Component Naming

React components should be written using a component naming style that clearly identifies them as components.

Use:

```jsx
function NewsCard() {
  return <article>News</article>;
}
```

Avoid:

```jsx
function newsCard() {
  return <article>News</article>;
}
```

When React sees:

```jsx
<NewsCard />
```

it can recognize it as a user-defined component.

---

# 16. Import and Export

As the project grows, components should normally be placed in separate files.

Example:

```text
src/
│
├── components/
│   ├── Header.jsx
│   ├── Navbar.jsx
│   ├── NewsCard.jsx
│   └── NewsList.jsx
│
└── App.jsx
```

Example `Header.jsx`:

```jsx
function Header() {
  return <header>News App</header>;
}

export default Header;
```

Then in `App.jsx`:

```jsx
import Header from "./components/Header";
```

And use it:

```jsx
function App() {
  return <Header />;
}
```

The exact file extension and import style may vary with your project configuration.

---

# 17. Lab 1 — Build the Component Tree

## Goal

Create the initial News App structure.

## Requirements

Create:

- `Header`
- `Navbar`
- `NewsList`
- `NewsCard`
- `Footer`

Your application should look approximately like:

```text
News App
Home | Technology | Sports | Business

News

[News Card]
[News Card]
[News Card]

Footer
```

## Rules

- Use functional components.
- Use meaningful component names.
- Keep each component simple.
- Do not copy a large solution from another source.
- Test the application after creating each component.

---

# 18. NewsCard: Our First Reusable Component

Create a simple card:

```jsx
function NewsCard() {
  return (
    <article>
      <img
        src="https://via.placeholder.com/300x180"
        alt="News"
      />

      <h2>React Changes How We Build UI</h2>

      <p>
        This is a sample news article for our React project.
      </p>
    </article>
  );
}

export default NewsCard;
```

The important idea is not the styling.

The important idea is:

> **One component can represent one news article.**

---

# 19. The Repetition Problem

Suppose we want three articles.

We could write:

```jsx
<NewsCard />
<NewsCard />
<NewsCard />
```

This reuses the component.

But all three cards currently contain the same information.

We need a way to give each card different data.

This is where **props** become useful.

---

# 20. Props

Props allow a parent component to pass data to a child component.

Think of props as:

```text
Parent
  │
  │ data
  ▼
Child
```

For example:

```jsx
<NewsCard
  title="React Changes How We Build UI"
  description="A new way to build interfaces."
/>
```

The `NewsCard` component receives the data.

---

# 21. Reading Props

A component can receive props as a function parameter.

```jsx
function NewsCard(props) {
  return (
    <article>
      <h2>{props.title}</h2>
      <p>{props.description}</p>
    </article>
  );
}
```

Then:

```jsx
<NewsCard
  title="React Changes How We Build UI"
  description="A new way to build interfaces."
/>
```

The values travel:

```text
App
 │
 │ title
 │ description
 ▼
NewsCard
 │
 ▼
UI
```

---

# 22. Destructuring Props

Because you already learned modern JavaScript, you can also destructure props.

Instead of:

```jsx
function NewsCard(props) {
  return <h2>{props.title}</h2>;
}
```

you can write:

```jsx
function NewsCard({ title, description }) {
  return (
    <article>
      <h2>{title}</h2>
      <p>{description}</p>
    </article>
  );
}
```

Both approaches access the same data.

---

# 23. Building a Data-Driven NewsCard

Try this:

```jsx
function NewsCard({ title, description, image }) {
  return (
    <article>
      <img src={image} alt={title} />

      <h2>{title}</h2>

      <p>{description}</p>
    </article>
  );
}
```

Now the component does not contain a specific article.

It describes the **structure** of an article.

---

# 24. Three Cards, One Component

You can now write:

```jsx
<NewsCard
  title="React Components"
  description="Learn how reusable UI components work."
  image="https://via.placeholder.com/300x180"
/>

<NewsCard
  title="JavaScript and React"
  description="Use your JavaScript knowledge inside React."
  image="https://via.placeholder.com/300x180"
/>

<NewsCard
  title="Building a News App"
  description="Learn React by building a real project."
  image="https://via.placeholder.com/300x180"
/>
```

Notice:

```text
1 component
+
different data
=
different UI
```

You did not create three different components.

---

# 25. Trail #2 — Undefined Data

Try using a variable that does not exist:

```jsx
<NewsCard title={article.title} />
```

If `article` has not been defined, you will get an error.

Do not simply replace it with another value.

Investigate.

### Ask yourself:

- Where should `article` come from?
- Does the variable exist?
- What is its scope?
- What value does it contain?
- Is the parent responsible for creating the data?

This is an important JavaScript skill that will become even more important when we work with APIs.

---

# 26. Arrays: Preparing for Real News Data

Real news applications do not normally contain one article.

They contain a collection of articles.

JavaScript represents collections using arrays.

Example:

```jsx
const articles = [
  {
    id: 1,
    title: "React Components",
    description: "Learn reusable UI components."
  },
  {
    id: 2,
    title: "Modern JavaScript",
    description: "Use modern JavaScript features."
  },
  {
    id: 3,
    title: "Building a News App",
    description: "Practice React through a project."
  }
];
```

---

# 27. Rendering Arrays with `.map()`

You already know JavaScript arrays and functions.

Use `.map()` to transform each article into a `NewsCard`.

Example:

```jsx
function NewsList() {
  const articles = [
    {
      id: 1,
      title: "React Components",
      description: "Learn reusable UI components."
    },
    {
      id: 2,
      title: "Modern JavaScript",
      description: "Use modern JavaScript features."
    },
    {
      id: 3,
      title: "Building a News App",
      description: "Practice React through a project."
    }
  ];

  return (
    <main>
      {articles.map((article) => (
        <NewsCard
          title={article.title}
          description={article.description}
        />
      ))}
    </main>
  );
}
```

The important transformation is:

```text
Array
  ↓
.map()
  ↓
React elements
  ↓
UI
```

---

# 28. A More Compact Version

You can pass the whole article object using the spread operator:

```jsx
{articles.map((article) => (
  <NewsCard key={article.id} {...article} />
))}
```

This uses modern JavaScript knowledge.

But do not use the shortcut until you understand the longer version.

First understand:

```jsx
title={article.title}
description={article.description}
```

Then understand:

```jsx
{...article}
```

---

# 29. Why Does React Need `key`?

When you render a list, React needs a way to identify individual items.

Use:

```jsx
key={article.id}
```

Example:

```jsx
{articles.map((article) => (
  <NewsCard
    key={article.id}
    title={article.title}
    description={article.description}
  />
))}
```

The key should identify the item within the list.

A stable identifier such as an article ID is a good choice.

---

# 30. Trail #3 — Remove the Key

Temporarily remove:

```jsx
key={article.id}
```

Run the application.

You may see a React warning.

This is an important distinction:

> A warning is not always the same thing as a syntax error.

React is telling you that your list is missing information it needs for reliable list handling.

### Investigation questions

1. Does the page still appear?
2. What does the Console say?
3. Is this a syntax error?
4. Why might React need to identify each item?
5. What value could uniquely identify each article?

Then add the key back.

---

# 31. Lab 2 — Build the News List

## Goal

Render multiple news cards from an array.

## Requirements

Create:

```jsx
const articles = [
  ...
];
```

Your array should contain at least **three** articles.

Each article should have:

- `id`
- `title`
- `description`
- `image`

Render the cards using:

```jsx
.map()
```

Each rendered component must have a suitable `key`.

---

# 32. State: The Next Problem

Our News App is currently displaying data.

But applications are interactive.

Suppose we want:

```text
[♡ Favorite]
```

When the user clicks it:

```text
[♥ Favorited]
```

Something changed.

Where should we store that information?

---

# 33. First Attempt: A Normal Variable

You might try:

```jsx
let favorite = false;
```

Then:

```jsx
function handleFavorite() {
  favorite = !favorite;
}
```

The variable changes.

But the UI may not update as you expect.

Why?

Because changing a normal JavaScript variable does not tell React:

> “Please render the UI again because this value changed.”

This is the problem that leads us to **state**.

---

# 34. State

State is information that belongs to a component and can change over time.

When state changes, React can re-render the component so the UI reflects the new state.

The React curriculum specifically includes reading and updating state elements and React Hooks.

The Hook we use today is:

```jsx
useState
```

---

# 35. `useState`

A basic example:

```jsx
import { useState } from "react";

function NewsCard() {
  const [favorite, setFavorite] = useState(false);

  return (
    <article>
      <h2>React Components</h2>

      <button>
        Favorite
      </button>
    </article>
  );
}
```

The important part is:

```jsx
const [favorite, setFavorite] = useState(false);
```

Think of it as two related things:

```text
favorite
   ↓
current state value

setFavorite
   ↓
function used to update the state
```

The initial value is:

```jsx
false
```

---

# 36. State and Re-rendering

Imagine:

```text
Initial state
favorite = false
        ↓
User clicks button
        ↓
setFavorite(true)
        ↓
React knows state changed
        ↓
Component renders again
        ↓
UI reflects the new state
```

This is the key idea.

---

# 37. Events

We need to respond to user actions.

For a button click, React uses:

```jsx
onClick
```

Example:

```jsx
<button onClick={handleFavorite}>
  Favorite
</button>
```

The value of `onClick` should be a function that React can call when the event happens.

---

# 38. Event Handler

Example:

```jsx
function NewsCard() {
  const [favorite, setFavorite] = useState(false);

  function handleFavorite() {
    setFavorite(!favorite);
  }

  return (
    <article>
      <h2>React Components</h2>

      <button onClick={handleFavorite}>
        {favorite ? "♥ Favorited" : "♡ Favorite"}
      </button>
    </article>
  );
}
```

Now the UI depends on state.

```text
favorite === false
        ↓
♡ Favorite

favorite === true
        ↓
♥ Favorited
```

---

# 39. Conditional Output with the Ternary Operator

You already learned the JavaScript ternary operator.

The pattern is:

```jsx
condition ? valueIfTrue : valueIfFalse
```

In JSX:

```jsx
{favorite ? "♥ Favorited" : "♡ Favorite"}
```

Read it as:

> If `favorite` is true, show "♥ Favorited"; otherwise show "♡ Favorite".

---

# 40. Trail #4 — The Function Executes Too Early

Try this:

```jsx
<button onClick={handleFavorite()}>
  Favorite
</button>
```

Observe what happens.

Compare it with:

```jsx
<button onClick={handleFavorite}>
  Favorite
</button>
```

The difference is extremely important.

### First version

```jsx
handleFavorite()
```

means:

> Call the function now.

### Second version

```jsx
handleFavorite
```

means:

> Give React the function so it can call it when the click happens.

---

# 41. Why Events Matter

The flow is:

```text
User action
    ↓
Event handler
    ↓
State update
    ↓
React re-render
    ↓
Updated UI
```

This is one of the most important React patterns you will use.

---

# 42. Lab 3 — Favorite a News Article

Modify your `NewsCard`.

Requirements:

- Add a Favorite button.
- Store the favorite status in state.
- Change the button text when clicked.
- Clicking again should remove the favorite status.

Expected behavior:

```text
Initial:

♡ Favorite


After click:

♥ Favorited


After second click:

♡ Favorite
```

---

# 43. A Complete Day 1 Example

Your final structure can look like this:

```text
src/
│
├── components/
│   ├── Header.jsx
│   ├── Navbar.jsx
│   ├── NewsCard.jsx
│   ├── NewsList.jsx
│   └── Footer.jsx
│
├── App.jsx
└── main.jsx
```

## `NewsCard.jsx`

```jsx
import { useState } from "react";

function NewsCard({ title, description, image }) {
  const [favorite, setFavorite] = useState(false);

  function handleFavorite() {
    setFavorite(!favorite);
  }

  return (
    <article>
      <img src={image} alt={title} />

      <h2>{title}</h2>

      <p>{description}</p>

      <button onClick={handleFavorite}>
        {favorite ? "♥ Favorited" : "♡ Favorite"}
      </button>
    </article>
  );
}

export default NewsCard;
```

## `NewsList.jsx`

```jsx
import NewsCard from "./NewsCard";

function NewsList() {
  const articles = [
    {
      id: 1,
      title: "React Components",
      description: "Learn how reusable UI components work.",
      image: "https://via.placeholder.com/300x180"
    },
    {
      id: 2,
      title: "Modern JavaScript",
      description: "Use JavaScript knowledge inside React.",
      image: "https://via.placeholder.com/300x180"
    },
    {
      id: 3,
      title: "Building a News App",
      description: "Practice React by building a real project.",
      image: "https://via.placeholder.com/300x180"
    }
  ];

  return (
    <main>
      {articles.map((article) => (
        <NewsCard
          key={article.id}
          title={article.title}
          description={article.description}
          image={article.image}
        />
      ))}
    </main>
  );
}

export default NewsList;
```

## `App.jsx`

```jsx
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import NewsList from "./components/NewsList";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Header />
      <Navbar />
      <NewsList />
      <Footer />
    </>
  );
}

export default App;
```

---

# 44. Do Not Just Copy the Example

The example above is a reference.

After reading it:

1. Close the example.
2. Rebuild the same idea yourself.
3. Change the article data.
4. Add another article.
5. Change the card content.
6. Test the Favorite button.
7. Break something intentionally.
8. Debug it.

Your goal is not:

> “I have the same code.”

Your goal is:

> “I understand why the code works.”

---

# 45. Day 1 Debugging Method

Whenever your application breaks, follow this process.

## Step 1 — Observe

Do not change five things immediately.

Look at the application.

What exactly is wrong?

---

## Step 2 — Read the error

Check:

- Browser page
- Console
- Terminal
- Editor error messages

---

## Step 3 — State the expectation

Say:

> “I expected the news cards to appear.”

or:

> “I expected the button to change after clicking.”

---

## Step 4 — Compare expectation with reality

Ask:

> Where did the expected behavior stop happening?

---

## Step 5 — Form a hypothesis

Example:

> “I think `articles` is not available in this component.”

---

## Step 6 — Test the hypothesis

Use:

- `console.log`
- Browser DevTools
- React warnings
- Reading the code
- Checking variables

---

## Step 7 — Make the smallest fix

Do not rewrite the entire application.

Fix the actual cause.

---

## Step 8 — Explain the fix

You should be able to say:

> “The problem happened because ________. I fixed it by ________ because ________.”

---

# 46. Common Mistakes Today

## Mistake 1 — Treating JSX exactly like HTML

Remember:

```jsx
className
```

instead of:

```jsx
class
```

---

## Mistake 2 — Returning multiple top-level JSX elements

Use a wrapper or Fragment:

```jsx
<>
  <h1>Title</h1>
  <p>Description</p>
</>
```

---

## Mistake 3 — Component names are unclear

Prefer:

```jsx
NewsCard
NewsList
Header
```

---

## Mistake 4 — Forgetting to export a component

Example:

```jsx
export default NewsCard;
```

---

## Mistake 5 — Forgetting to import a component

Example:

```jsx
import NewsCard from "./components/NewsCard";
```

---

## Mistake 6 — Using undefined data

Before using:

```jsx
article.title
```

ask:

> Does `article` exist here?

---

## Mistake 7 — Forgetting a list key

Use:

```jsx
key={article.id}
```

---

## Mistake 8 — Expecting normal variables to update the UI

Changing:

```jsx
let favorite = false;
```

does not provide React with the state mechanism it needs.

Use:

```jsx
useState
```

for changing component state.

---

## Mistake 9 — Calling an event handler immediately

Incorrect:

```jsx
onClick={handleFavorite()}
```

Usually correct:

```jsx
onClick={handleFavorite}
```

---

# 47. Checkpoint: Can You Explain These?

Before continuing, try to answer each question without looking at the previous sections.

### Question 1

What is a React component?

### Question 2

Why might we divide a News App into components?

### Question 3

What is JSX?

### Question 4

How is JSX different from normal HTML?

### Question 5

What are props?

### Question 6

Which direction do props normally travel?

```text
Parent → Child
```

or:

```text
Child → Parent
```

### Question 7

Why do we use `.map()` for a list of articles?

### Question 8

Why does a rendered list need a key?

### Question 9

What is state?

### Question 10

Why isn't a normal variable enough for React state?

### Question 11

What does `setFavorite` do?

### Question 12

What is the difference between:

```jsx
onClick={handleFavorite}
```

and:

```jsx
onClick={handleFavorite()}
```

---

# 48. Mini Quiz

## 1. Which one is a React component?

A.

```jsx
<div>News</div>
```

B.

```jsx
function NewsCard() {
  return <article>News</article>;
}
```

C.

```css
.news-card {}
```

D.

```text
News Card
```

**Answer:** B

---

## 2. Which syntax is correct for a JSX CSS class?

A.

```jsx
class="card"
```

B.

```jsx
className="card"
```

C.

```jsx
cssClass="card"
```

D.

```jsx
class-name="card"
```

**Answer:** B

---

## 3. What is the main purpose of props?

A. Store CSS

B. Pass data between components

C. Start the development server

D. Create an API

**Answer:** B

---

## 4. Which method is commonly used to render an array of articles?

A. `filter()`

B. `find()`

C. `map()`

D. `sort()`

**Answer:** C

---

## 5. Why is `key` used when rendering lists?

A. To style the item

B. To identify list items to React

C. To make the item clickable

D. To store passwords

**Answer:** B

---

## 6. Which Hook is used today for component state?

A. `useAPI`

B. `useEffect`

C. `useState`

D. `useComponent`

**Answer:** C

---

## 7. What happens when state is updated?

A. Nothing changes

B. React can re-render the component

C. The browser closes

D. The server automatically changes

**Answer:** B

---

## 8. Which event prop handles a click?

A. `onPress`

B. `click`

C. `onClick`

D. `handleClick`

**Answer:** C

---

## 9. Which is usually correct?

A.

```jsx
<button onClick={handleFavorite()}>
```

B.

```jsx
<button onClick={handleFavorite}>
```

**Answer:** B

---

## 10. What should you do first when you encounter an error?

A. Delete the project

B. Rewrite everything

C. Observe and read the error

D. Ask someone to fix it

**Answer:** C

---

# 49. Independent Challenge

## Challenge: Improve the NewsCard

You have learned:

- Components
- JSX
- Props
- Arrays
- `.map()`
- Keys
- State
- Events

Now build something yourself.

Add at least **two** of the following:

### Option A — Source

Add:

```text
Source: BBC
```

using props.

### Option B — Date

Add:

```text
August 8, 2026
```

using props.

### Option C — Category

Add:

```text
Technology
```

using props.

### Option D — Read button

Add a button:

```text
Read Article
```

You do not need routing yet.

### Option E — Favorite count

Add a visible indication that the article is favorited.

---

# 50. Stretch Challenge

Create a category badge.

Example:

```text
[ TECHNOLOGY ]

React Components

Learn how reusable components work.
```

The category should come from props:

```jsx
<NewsCard category="Technology" />
```

Do not hard-code the category inside the component.

---

# 51. Git Checkpoint

Git is a source control manager that tracks changes in your work.

At the end of a meaningful piece of work, create a commit according to your class Git workflow.

A suitable Day 1 commit message is:

```text
feat: build initial React news UI
```

If your instructor has provided a different Git workflow, follow that workflow.

Your repository should contain the Day 1 application.

---

# 52. Day 1 Final Checklist

Before finishing Day 1, confirm:

## React

- [ ] I can explain what React is at a basic level.
- [ ] I understand the idea of components.
- [ ] I can create a functional component.
- [ ] I can use JSX.
- [ ] I know basic JSX rules.

## Components

- [ ] I created `Header`.
- [ ] I created `Navbar`.
- [ ] I created `NewsList`.
- [ ] I created `NewsCard`.
- [ ] I created `Footer`.
- [ ] I understand the component tree.

## Props

- [ ] I can pass data to a child component.
- [ ] I can read props.
- [ ] I understand parent → child data flow.

## Lists

- [ ] I can use `.map()`.
- [ ] I understand why a key is needed.
- [ ] I can render multiple `NewsCard` components.

## State

- [ ] I understand the problem with a normal variable.
- [ ] I can use `useState`.
- [ ] I can update state.

## Events

- [ ] I can handle a click with `onClick`.
- [ ] I understand why a handler should normally be passed without `()`.

## Debugging

- [ ] I can read a Console error.
- [ ] I can read a React warning.
- [ ] I can form a debugging hypothesis.
- [ ] I can test the hypothesis.
- [ ] I can explain why my fix works.

---

# 53. What You Built Today

Your application has moved through this evolution:

```text
Empty React Project
        ↓
First Component
        ↓
Component Tree
        ↓
NewsCard
        ↓
Props
        ↓
Array of Articles
        ↓
.map()
        ↓
Multiple NewsCards
        ↓
State
        ↓
Favorite Button
```

Your mental model should now be:

```text
Data
  ↓
Components
  ↓
Props
  ↓
UI
  ↑
State
  ↑
Events
```

---

# 54. What Comes Next

Today we used **local sample data**.

That is intentional.

Before working with a real API, you need to understand how React represents data in the UI.

Next, the News App will become more realistic.

We will move toward:

```text
User
 ↓
Search
 ↓
HTTP Request
 ↓
News API
 ↓
JSON Response
 ↓
React State
 ↓
News Cards
```

You will then need to handle:

- Forms
- Validation
- `fetch`
- Promises
- `async/await`
- `useEffect`
- Loading state
- Error state
- Empty state

The official React curriculum includes forms and validation, routing, one-way data flow, HTTP services/API data, Hooks, custom Hooks, and Context API. Day 1 is the foundation for those later topics.

---

# 55. Homework

## Required

Rebuild the Day 1 News App **without copying the final example**.

Your application must contain:

```text
App
│
├── Header
├── Navbar
├── NewsList
│   ├── NewsCard
│   ├── NewsCard
│   └── NewsCard
└── Footer
```

Each article must have:

- ID
- Title
- Description
- Image
- Category

Each card must have:

- Article image
- Title
- Description
- Category
- Favorite button

The Favorite button must use React state.

---

## Debugging Homework

Intentionally create these three problems, then fix them:

### Problem 1

Remove a list `key`.

### Problem 2

Use an undefined article variable.

### Problem 3

Change:

```jsx
onClick={handleFavorite}
```

to:

```jsx
onClick={handleFavorite()}
```

For each problem, write one or two sentences explaining:

1. What happened?
2. Why did it happen?
3. How did you fix it?

---

# 56. Exit Ticket

Before you leave Day 1, answer these questions in your own words:

### 1. Why do we use components?

### 2. What is the difference between props and state?

### 3. Why does `.map()` help us build the News List?

### 4. Why does React need a key for list items?

### 5. Why doesn't changing a normal variable automatically update the React UI?

### 6. What happens after this code runs?

```jsx
setFavorite(true);
```

### 7. What is the relationship between an event, state, and UI?

### 8. What was one bug you experienced today?

### 9. How did you diagnose it?

### 10. Explain React in one sentence.

---

# Day 1 Golden Rule

> **Do not memorize React syntax without understanding the problem it solves.**

When something breaks:

```text
Don't panic.
Don't immediately copy a fix.

Observe.
Read.
Think.
Test.
Fix.
Explain.
```

That is how you become a developer.

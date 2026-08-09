# Day 3 — Turn It Into an Application

## Student Manual

### Course Project: React News App

---

## 1. Day 3 Overview

Yesterday, the News App became a real React application.

You worked with:

- Components
- JSX
- Props
- Lists and `.map()`
- State
- Events
- Forms
- Validation
- `fetch()`
- `async/await`
- `useEffect`
- API data
- Loading and error states

Today, we move from individual React features to **application architecture**.

The official React course outline includes React basics, reusable components, forms and validation, React Router, one-way data flow, HTTP/API calls, Hooks, custom Hooks, and Context API. This day focuses especially on **one-way data flow, routing, route parameters, article details, custom Hooks, and refactoring**. fileciteturn4file0

The News App remains our laboratory: each new concept solves a real problem.

---

# 2. Learning Outcomes

By the end of Day 3, you should be able to:

1. Explain one-way data flow in a React component tree.
2. Decide where application state should live.
3. Pass data from parent components to child components.
4. Send information from child components back to parents using callback functions.
5. Explain lifting state up.
6. Build multiple pages using React Router.
7. Create navigation links.
8. Create dynamic routes such as `/article/:id`.
9. Read route parameters.
10. Build an article-details page.
11. Recognize duplicated stateful logic.
12. Extract reusable logic into a custom Hook.
13. Organize a growing React application more clearly.
14. Diagnose common routing and data-flow problems.

---

# 3. Today's Big Question

Yesterday we asked:

> **How do I make this React feature work?**

Today we ask:

> **How should the pieces of my application communicate?**

Consider:

```text
                    App
                     |
       +-------------+-------------+
       |             |             |
    Header        Search       CategoryNav
                     |
                  NewsList
                     |
                 NewsCard
```

As the application grows, we need to answer:

- Where does the news data live?
- Who owns the search state?
- How does `NewsCard` tell the parent that the user clicked Favorite?
- How does the application move from Home to Article Details?
- How does Article Details know which article to display?
- What happens when several components need the same API logic?

These are **application architecture questions**.

---

# 4. The Learning Cycle

Continue using:

```text
Need
  ↓
Try
  ↓
Fail
  ↓
Observe
  ↓
Explain
  ↓
Fix
  ↓
Refactor
  ↓
Apply
```

When something breaks, ask:

1. What happened?
2. What did I expect?
3. Where did the expectation break?
4. What does the error tell me?
5. Can I prove my hypothesis?
6. What is the smallest change that fixes the problem?

---

# 5. Part 1 — Start With a Broken Application

## Goal

Use debugging to review Day 2 before introducing new concepts.

Possible problems:

- News does not appear.
- Search does not update.
- API requests repeat.
- Loading state never disappears.
- An article contains `undefined`.
- A component receives the wrong data.

Do not immediately fix the application.

Record:

| Question | Your answer |
|---|---|
| What did I expect? | |
| What actually happened? | |
| What evidence do I have? | |
| Where is the problem? | |
| What is my hypothesis? | |
| What is the smallest fix? | |

---

# 6. Part 2 — One-Way Data Flow

React applications commonly organize data so that information flows from parent components toward child components.

```text
App
 |
 v
NewsList
 |
 v
NewsCard
```

A parent can provide data through props:

```jsx
<NewsCard
  title={article.title}
  description={article.description}
/>
```

The basic mental model is:

```text
Parent
   |
   | props
   v
Child
```

---

# 7. Props Are Data Passed Into Components

Example:

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

The parent provides the values:

```jsx
<NewsCard
  title="React becomes popular"
  description="A short article description"
/>
```

Think:

```text
Parent
  |
  | title, description
  v
NewsCard
```

---

# 8. When a Child Needs to Cause a Change

Imagine:

> When the user clicks Favorite inside `NewsCard`, the parent should update the favorites list.

The child should not directly reach into the parent's local state.

A common pattern is:

```text
Parent
  |
  | passes callback
  v
Child
  |
  | calls callback
  v
Parent
```

The parent gives the child a function.

---

# 9. Callback Props

Example:

```jsx
function App() {
  function handleFavorite(article) {
    console.log("Favorite:", article);
  }

  return (
    <NewsCard
      article={article}
      onFavorite={handleFavorite}
    />
  );
}
```

The child calls the function:

```jsx
function NewsCard({ article, onFavorite }) {
  return (
    <article>
      <h2>{article.title}</h2>

      <button onClick={() => onFavorite(article)}>
        Favorite
      </button>
    </article>
  );
}
```

Mental model:

```text
App
 |
 | onFavorite={handleFavorite}
 v
NewsCard
 |
 | onFavorite(article)
 v
App
```

---

# 10. Guided Lab — Favorite an Article

## Goal

Allow the user to favorite an article.

You already have:

- `NewsCard`
- article data
- React state

Implement:

```text
NewsCard
   |
   | click Favorite
   v
Parent handler
   |
   v
favorites state
   |
   v
UI updates
```

## Checkpoint

Answer:

> Where does the favorites state live?

> Which component changes it?

> Which component triggers the change?

> How does the child communicate with the parent?

---

# 11. Failure Challenge — Direct State Access

Try to make the child directly access a state variable that belongs to the parent.

Observe what happens.

Then ask:

- Does the child own that state?
- Who owns the state?
- How can the child request a change?
- Why is a callback useful?

The lesson:

> Components communicate through React's data-flow mechanisms rather than directly reaching into another component's local state.

---

# 12. Part 3 — Lifting State Up

Sometimes multiple components need the same information.

For example:

```text
SearchBar
NewsList
```

Both may depend on the current search term.

If the state belongs only to `SearchBar`, `NewsList` cannot directly access it.

A common solution is to move the shared state to their nearest appropriate common parent.

This is called:

> **Lifting state up**

---

# 13. Search State Example

Instead of:

```text
SearchBar
  |
  └── search state
```

you might have:

```text
App
 |
 +---- search state
 |
 +---- SearchBar
 |
 +---- NewsList
```

The flow becomes:

```text
SearchBar
   |
   | user changes search
   v
App
   |
   | search
   v
NewsList
```

The parent becomes the owner of shared information.

---

# 14. Guided Lab — Categories

Add categories to the News App:

- Technology
- Sports
- Business
- Science
- Entertainment

Create a category navigation area:

```text
[All] [Technology] [Sports] [Business] [Science]
```

Before coding, ask:

> Who should know the selected category?

A reasonable answer may be `App`, because multiple parts of the application may depend on the selected category.

---

# 15. Category Flow

One possible design:

```text
CategoryNav
     |
     | user selects category
     v
    App
     |
     | selectedCategory
     v
 NewsList
```

The important principle is:

> **Put shared state in an appropriate owner.**

---

# 16. Checkpoint — State Ownership

Decide where each piece of information should live.

| Information | Possible owner |
|---|---|
| Search text | |
| Selected category | |
| News articles | |
| Loading state | |
| Error state | |
| Favorite articles | |
| Current article | |

Be ready to explain your decisions.

There is not always one universal answer.

Ask:

> Which components need this information?

---

# 17. Part 4 — Why Do We Need Routing?

Our application now needs multiple views:

```text
Home
Search
Category
Favorites
Article Details
```

We want URLs such as:

```text
/
/search
/category/technology
/favorites
/article/123
```

The course curriculum specifically includes implementing routing with React Router. fileciteturn4file3

---

# 18. React Router Mental Model

Think of routing as:

```text
URL
 |
 v
Router
 |
 v
Matching route
 |
 v
React component
```

For example:

```text
/article/123
      |
      v
Article route
      |
      v
ArticleDetails component
```

---

# 19. Install React Router

If your project does not already contain React Router:

```bash
npm install react-router-dom
```

Remember:

```text
npm
 |
 +---- installs package
 |
 v
react-router-dom
```

---

# 20. Basic Router Structure

A simple application can define routes like:

```jsx
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </BrowserRouter>
  );
}
```

Understand the structure rather than memorizing it:

```text
BrowserRouter
   |
   v
Routes
   |
   +---- Route → Home
   |
   +---- Route → Favorites
```

---

# 21. Navigation With Links

React Router provides navigation components.

```jsx
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/favorites">Favorites</Link>
    </nav>
  );
}
```

Mental model:

```text
User clicks Link
      ↓
URL changes
      ↓
Router finds matching route
      ↓
React renders the matching component
```

---

# 22. Guided Lab — Create Application Pages

Create:

```text
/
 /search
 /favorites
```

Suggested structure:

```text
src/
├── App.jsx
├── main.jsx
└── pages/
    ├── Home.jsx
    ├── Search.jsx
    └── Favorites.jsx
```

The goal is to understand routing, not to create a perfect folder structure.

---

# 23. Failure Challenge — Broken Route

Create a deliberate mismatch:

```jsx
<Route path="/favorite" element={<Favorites />} />
```

but:

```jsx
<Link to="/favorites">Favorites</Link>
```

Observe the result.

Ask:

1. What URL did you request?
2. What route was defined?
3. Do they match?
4. What does the router render?

Lesson:

> Routing problems are often path-matching problems.

---

# 24. Part 5 — Dynamic Routes

A News App cannot have a manually written route for every article.

We need a dynamic route.

For example:

```text
/article/1
/article/2
/article/3
/article/4
```

Instead of four routes, define:

```text
/article/:id
```

The `:id` is a route parameter.

---

# 25. Route Parameter Mental Model

```text
/article/123
        |
        v
      id = 123
```

Another URL:

```text
/article/987
        |
        v
      id = 987
```

The route pattern stays the same.

Only the parameter changes.

---

# 26. Define the Article Route

```jsx
<Route
  path="/article/:id"
  element={<ArticleDetails />}
/>
```

These URLs can now match:

```text
/article/1
/article/25
/article/100
```

---

# 27. Read the Route Parameter

React Router provides `useParams()`.

```jsx
import { useParams } from "react-router-dom";

function ArticleDetails() {
  const { id } = useParams();

  return <h1>Article ID: {id}</h1>;
}
```

For:

```text
/article/25
```

the value of `id` is:

```text
"25"
```

---

# 28. Guided Lab — Article Details

Create:

```text
ArticleDetails.jsx
```

Add:

```text
/article/:id
```

Then add a link to each `NewsCard`.

Conceptually:

```jsx
<Link to={`/article/${article.id}`}>
  Read article
</Link>
```

The flow:

```text
NewsCard
   |
   | click
   v
/article/123
   |
   v
ArticleDetails
   |
   | useParams()
   v
id = "123"
```

---

# 29. Failure Challenge — `undefined` Article ID

Common causes:

```jsx
article.articleId
```

when the actual data contains:

```js
article.id
```

Or:

```text
/article/:articleId
```

while the component reads:

```js
const { id } = useParams();
```

Debug using:

1. Inspect the URL.
2. Inspect the route.
3. Inspect the parameter name.
4. Inspect the article object.
5. Compare names carefully.

---

# 30. Article Details — Two Strategies

When you reach the article page, there are different possible designs.

### Strategy A — Use existing article data

```text
route id
   ↓
find article
   ↓
display article
```

### Strategy B — Fetch article data

```text
route id
   ↓
API request
   ↓
article data
   ↓
display article
```

The appropriate choice depends on the API and application design.

The important point is:

> The route parameter gives the page an identifier.

---

# 31. Integration Challenge — Article Details

Your article page should display useful information such as:

- Title
- Image
- Description
- Source
- Date
- Content or summary
- Link to the original article when appropriate
- Back navigation

Consider UI states:

```text
Loading
   ↓
Success
```

or:

```text
Loading
   ↓
Error
```

or:

```text
Success
   ↓
Article not found
```

---

# 32. Part 6 — The Application Is Growing

You may now notice duplicated API logic.

Several components might contain:

```text
fetch()
useEffect()
loading
error
data
```

For example:

```text
Home
  └── fetch news

Search
  └── fetch news

Category
  └── fetch news
```

Ask:

> Why are we writing almost the same logic multiple times?

---

# 33. Duplication Before Abstraction

Imagine:

```jsx
function Home() {
  // fetch
  // loading
  // error
  // useEffect
}
```

and:

```jsx
function Search() {
  // fetch
  // loading
  // error
  // useEffect
}
```

The code may work.

But the logic is duplicated.

That creates maintenance problems.

---

# 34. What Should Be Reused?

Separate:

### UI

```text
What should the user see?
```

from:

### Stateful logic

```text
How do we load the data?
How do we track loading?
How do we track errors?
```

A custom Hook can help reuse the second category.

---

# 35. Custom Hooks

A custom Hook is a reusable function for sharing React-related logic.

Custom Hooks conventionally begin with:

```text
use...
```

Examples:

```text
useNews()
useSearch()
useFavorites()
```

For this project, we might create:

```text
useNews()
```

---

# 36. Before the Custom Hook

You might have:

```text
Home
 |
 +-- useEffect
 +-- fetch
 +-- loading
 +-- error
 +-- articles
```

and:

```text
Search
 |
 +-- useEffect
 +-- fetch
 +-- loading
 +-- error
 +-- articles
```

---

# 37. After the Custom Hook

Aim for:

```text
Home
 |
 +-- useNews()
```

and:

```text
Search
 |
 +-- useNews()
```

The shared logic moves into:

```text
useNews()
```

---

# 38. Simple Custom Hook Example

A simplified example:

```jsx
import { useEffect, useState } from "react";

function useNews(url) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadNews() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Failed to load news");
        }

        const data = await response.json();

        setArticles(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    loadNews();
  }, [url]);

  return {
    articles,
    loading,
    error
  };
}

export default useNews;
```

The exact implementation depends on the API response structure.

The important idea is:

```text
useNews()
   |
   +-- data
   +-- loading
   +-- error
```

---

# 39. Using the Custom Hook

A component can use:

```jsx
function Home() {
  const {
    articles,
    loading,
    error
  } = useNews(url);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Something went wrong.</p>;
  }

  return <NewsList articles={articles} />;
}
```

The component can focus more on UI while the Hook contains reusable stateful logic.

---

# 40. Custom Hook Rule

A custom Hook is **not automatically better**.

Use one when:

- logic is duplicated
- the logic is reusable
- the logic involves React state/effects or other Hooks
- extraction makes components easier to understand

Do not create:

```text
useEverything()
```

just to make the project look advanced.

Good architecture solves real problems.

---

# 41. Guided Refactoring Lab

Inspect your current News App.

Search for repeated code.

| Duplicated logic | Where? | Candidate for extraction? |
|---|---|---|
| API request | | |
| Loading state | | |
| Error state | | |
| Search logic | | |
| Formatting | | |

Choose **one** repeated stateful pattern and consider extracting it into a custom Hook.

---

# 42. Part 7 — Organizing the Application

As projects grow, one giant `App.jsx` becomes difficult to maintain.

A possible structure:

```text
src/
├── components/
│   ├── Header.jsx
│   ├── Navbar.jsx
│   ├── SearchBar.jsx
│   ├── CategoryNav.jsx
│   ├── NewsList.jsx
│   └── NewsCard.jsx
│
├── pages/
│   ├── Home.jsx
│   ├── Search.jsx
│   ├── Favorites.jsx
│   └── ArticleDetails.jsx
│
├── hooks/
│   └── useNews.js
│
├── App.jsx
└── main.jsx
```

This is one possible organization, not a universal rule.

---

# 43. Components vs Pages

A useful beginner distinction:

### Components

Reusable UI pieces:

```text
Header
NewsCard
SearchBar
Button
NewsList
```

### Pages

Larger route-level views:

```text
Home
Search
Favorites
ArticleDetails
```

Think:

```text
Route
  ↓
Page
  ↓
Components
```

For example:

```text
/article/123
     |
     v
ArticleDetails
     |
     +-- Header
     +-- Article
     +-- RelatedArticles
```

---

# 44. Refactoring Checkpoint

Review your application.

### Component responsibility

Does each component have a clear purpose?

### Naming

Can another developer understand the name?

### Data flow

Is it clear where the data comes from?

### State

Is state stored in an appropriate place?

### API logic

Is duplicated logic being extracted?

### Routing

Are pages and routes understandable?

### Files

Can you find code without opening one huge file?

---

# 45. Git Checkpoint

Commit your progress.

```bash
git status
```

Then:

```bash
git add .
```

Then:

```bash
git commit -m "Add routing and article details"
```

Then:

```bash
git push
```

Good milestone commits might be:

```text
Add one-way data flow
Add category navigation
Add React Router
Add article details
Add useNews custom hook
Refactor application structure
```

---

# 46. Mini Debugging Lab

## Bug 1 — Route Does Not Match

Symptoms:

```text
Click Favorites
↓
Expected page does not appear
```

Investigate:

- Link path
- Route path
- Spelling
- Browser URL

---

## Bug 2 — Parameter Is Undefined

Symptoms:

```text
Article ID: undefined
```

Investigate:

- `:id`
- `useParams()`
- URL
- property names

---

## Bug 3 — Article Data Is Undefined

Symptoms:

```text
Cannot read properties of undefined
```

Investigate:

- Does the article exist?
- Has data loaded?
- Is the ID correct?
- Does the API response contain the expected property?

---

## Bug 4 — Duplicate API Logic

Symptoms:

The same fetch logic exists in multiple components.

Ask:

> Is this a runtime bug or a design problem?

It may not be a runtime bug.

It is a maintainability/design problem.

This is why refactoring matters.

---

# 47. Independent Challenge

Now stop following the instructor step by step.

Choose **one** feature:

- Add a category page.
- Add a "Read More" article link.
- Add a back button.
- Add article sorting.
- Add a refresh button.
- Add a "Read Later" list.
- Add a search-results page.
- Add a "No results" state.
- Add a related articles section.

## Required Process

Do not begin by copying a complete solution.

Use:

```text
Plan
 ↓
Try
 ↓
Observe
 ↓
Debug
 ↓
Improve
```

---

# 48. Challenge Planning Sheet

### Feature

```text
____________________________________
```

### User action

```text
____________________________________
```

### State

What information must the application remember?

```text
____________________________________
```

### Component

Which component should handle the UI?

```text
____________________________________
```

### Data flow

Where does the data come from?

```text
____________________________________
```

### Route

Does this feature need a route?

```text
Yes / No
```

### API

Does it need an API request?

```text
Yes / No
```

---

# 49. End-of-Day Architecture

Your News App should now be moving toward:

```text
                    App
                     |
        +------------+-------------+
        |            |             |
      Header      Navigation      Routes
                                   |
                  +----------------+----------------+
                  |                |                |
                 Home            Search          Favorites
                  |                |
               NewsList         NewsList
                  |
              NewsCard
                  |
            Article Details
                  |
             /article/:id
```

Reusable logic:

```text
             useNews()
                |
       +--------+--------+
       |        |        |
      Home    Search   Category
```

---

# 50. Day 3 Checkpoint

## Question 1

What is one-way data flow?

```text
Your answer:

____________________________________
____________________________________
```

## Question 2

How can a child component cause a parent to update state?

```text
Your answer:

____________________________________
____________________________________
```

## Question 3

What does "lifting state up" mean?

```text
Your answer:

____________________________________
____________________________________
```

## Question 4

Why do we need routing?

```text
Your answer:

____________________________________
____________________________________
```

## Question 5

What does `:id` mean in:

```text
/article/:id
```

```text
Your answer:

____________________________________
```

## Question 6

How can a component read the route parameter?

```text
Your answer:

____________________________________
```

## Question 7

When would a custom Hook be useful?

```text
Your answer:

____________________________________
```

---

# 51. Quick Quiz

## Question 1

In a typical React data flow, props move primarily:

A. Child → Parent  
B. Parent → Child  
C. Browser → Component  
D. API → CSS

---

## Question 2

What is a callback prop commonly used for?

A. Styling a component  
B. Allowing a child to trigger behavior defined by a parent  
C. Installing npm packages  
D. Creating a route

---

## Question 3

What does this route represent?

```jsx
<Route path="/article/:id" element={<ArticleDetails />} />
```

A. Only `/article/id`  
B. Any article route with a dynamic parameter  
C. A CSS selector  
D. An API endpoint

---

## Question 4

Which Hook can be used to read route parameters with React Router?

A. `useState`  
B. `useEffect`  
C. `useParams`  
D. `useRouteData`

---

## Question 5

Why might we create a custom Hook?

A. To make every component longer  
B. To reuse stateful React logic  
C. To replace JSX  
D. To replace HTML

---

## Question 6

Which is the better reason to extract `useNews()`?

A. Because advanced React developers always create Hooks.  
B. Because several components contain reusable news-fetching logic.  
C. Because Vite requires it.  
D. Because JSX cannot fetch data.

---

# 52. Quiz Answers

1. **B** — Parent → Child is the normal direction for passing props.
2. **B** — A callback lets a child trigger behavior owned by a parent.
3. **B** — `:id` is a dynamic route parameter.
4. **C** — `useParams`.
5. **B** — Custom Hooks help reuse stateful React logic.
6. **B** — The real reason is duplicated/reusable logic.

---

# 53. Common Mistakes

## Mistake 1 — Putting all state in `App`

Not every piece of state belongs at the top.

Ask:

> Which components actually need this information?

---

## Mistake 2 — Expecting a child to directly change parent state

Use a callback supplied by the parent.

```text
Parent
  ↓ callback
Child
```

---

## Mistake 3 — Route and Link paths don't match

Check:

```text
Link → "/favorites"
Route → "/favorite"
```

These are different paths.

---

## Mistake 4 — Wrong route parameter name

Route:

```text
/article/:id
```

Component:

```js
const { articleId } = useParams();
```

The names do not match.

---

## Mistake 5 — Assuming route parameters are numbers

URL parameters are received as strings.

If you need a number, convert it intentionally.

---

## Mistake 6 — Creating custom Hooks too early

First identify repeated logic.

Then abstract it.

---

## Mistake 7 — Making one giant component

If `App.jsx` contains:

- all routing
- all API calls
- all forms
- all cards
- all state
- all event handlers

then it is time to consider decomposition.

---

# 54. Final Day 3 Lab

Bring today's concepts together.

Your News App should include:

### Navigation

- Home
- Search
- Favorites

### Categories

- Technology
- Sports
- Business
- Science
- Entertainment

### News List

- Display articles
- Reusable `NewsCard`
- Article link

### Article Details

```text
/article/:id
```

### Data Flow

- Parent → child props
- Child → parent callback where needed
- Shared state lifted to an appropriate owner

### Custom Hook

At least one repeated stateful logic pattern should be reviewed for extraction.

---

# 55. Submission Checklist

```text
[ ] Application starts successfully
[ ] Home page works
[ ] Navigation works
[ ] Search page exists
[ ] Favorites page exists
[ ] Category selection works
[ ] News cards are reusable
[ ] Article links work
[ ] Dynamic article route works
[ ] Article ID is read correctly
[ ] Loading state works
[ ] Error state works
[ ] Empty state is considered
[ ] Data flow is understandable
[ ] Repeated logic has been reviewed
[ ] Custom Hook is used where appropriate
[ ] Project is committed to Git
[ ] Changes are pushed to GitHub
```

---

# 56. Reflection

### What concept became clearer today?

```text
____________________________________
```

### What was the hardest problem?

```text
____________________________________
```

### What bug did you diagnose?

```text
____________________________________
```

### How did you find the cause?

```text
____________________________________
```

### What would you refactor if you had another hour?

```text
____________________________________
```

---

# 57. Exit Ticket

Explain this diagram in your own words:

```text
                    App
                     |
          +----------+----------+
          |                     |
       Search                NewsList
          |                     |
          |                  NewsCard
          |                     |
          +------ state --------+
                     |
                  Router
                     |
          +----------+----------+
          |                     |
        /search             /article/:id
                                |
                         ArticleDetails
                                |
                             useParams()
```

Then answer:

> **If someone tells you "React is just HTML inside JavaScript," how would you correct them after Day 3?**

Write your explanation:

```text
____________________________________
____________________________________
____________________________________
```

---

# 58. Day 3 Summary

Today you moved from individual React features toward application architecture.

You learned:

```text
Props
  ↓
One-way data flow
  ↓
Callbacks
  ↓
Lifting state
  ↓
Routing
  ↓
Dynamic routes
  ↓
Route parameters
  ↓
Article details
  ↓
Repeated stateful logic
  ↓
Custom Hooks
  ↓
Refactoring
```

The most important lesson is not a particular React API.

It is this:

> **As an application grows, the developer must deliberately decide where data lives, how components communicate, how pages are organized, and which logic should be reused.**

Tomorrow, the application will move toward shared application state and a more complete project architecture.

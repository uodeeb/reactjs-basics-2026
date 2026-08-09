# Web Development Using React JS
# Day 4 Student Manual
# The Architecture Gate — From React Learner to React Developer

> **Project:** React News App
> **Gate:** The Architecture Gate
> **Beginner question:** How do I keep a growing app clean and share state sanely?
> **Day 4 focus:** Prop drilling, Context API, shared favorites state, deliberate debugging, refactoring, and independent development
> **Learning cycle:** Need → Try → Fail → Observe → Explain → Fix → Refactor → Apply

---

## Your Quest Map for Day 4

The Flow Gate delivered routing and shared data flow. Now the ninja faces the last gate of the React module:

> "I have to pass the same props through five components just to reach one that needs them — is that really the way?"

Today you cross the **Architecture Gate**. By the end of the day you should control this chain:

```text
Prop drilling (the pain)
   ↓
Context API (the answer)
   ↓
Favorites become shared state
   ↓
Favorite count + Favorites page
   ↓
When Context is appropriate (and when props win)
   ↓
Deliberate debugging
   ↓
Independent feature challenge
   ↓
Refactoring checkpoint
   ↓
Final News App architecture
```

Every tool today answers a question left by the previous step — the temple rule:

> **Every new tool answers an old question.**

---

# 1. Day 4 Overview

Day 3 moved the News App from individual React features into a multi-page application.

You now have experience with:

- Components
- JSX
- Props
- Lists
- State
- Events
- Forms and validation
- `fetch()` and `async/await`
- `useEffect`
- Loading, error, and empty states
- One-way data flow
- Lifting state
- React Router
- Route parameters
- Article details
- Custom Hooks

Today is about **shared state, debugging, refactoring, and independent development**.

The Day 4 outline specifies Context API, favorites, deliberate debugging, an independent feature challenge, code review, and final presentation.

The official React curriculum includes Context API alongside React basics, reusable components, forms/validation, routing, one-way data flow, HTTP/API calls, Hooks, and custom Hooks.

---

# 2. Learning Outcomes

By the end of today, you should be able to:

1. Explain prop drilling.
2. Explain when Context can be useful.
3. Create and provide a React Context.
4. Read Context with `useContext`.
5. Build shared favorites state.
6. Add and remove favorite articles.
7. Display a favorites count.
8. Build a Favorites page.
9. Diagnose common React application bugs.
10. Refactor duplicated or poorly organized code.
11. Review state ownership and component responsibilities.
12. Implement a small feature independently.
13. Explain the architecture of your application and the reasons behind it.

---

# 3. Today's Big Question

Yesterday:

> **How should the pieces of our application communicate?**

Today:

> **What happens when many parts of the application need the same state?**

Imagine:

```text
                    App
                     |
                  Router
                     |
              +------+------+
              |             |
             Home       Favorites
              |
          NewsList
              |
          NewsCard
```

Suppose these components need favorites:

```text
Navbar
NewsCard
ArticleDetails
Favorites
```

Passing the same information through many intermediate components can become uncomfortable.

Today we will experience that problem first.

Then we will introduce Context.

---

# 4. Day 4 Learning Cycle

Use:

```text
Problem
   ↓
Attempt
   ↓
Failure
   ↓
Investigation
   ↓
Concept
   ↓
Implementation
   ↓
Refactoring
```

When something breaks:

```text
What happened?
      ↓
What did I expect?
      ↓
Where did the expectation break?
      ↓
What evidence do I have?
      ↓
What is my hypothesis?
      ↓
How can I test it?
      ↓
What is the smallest fix?
```

The course outline explicitly emphasizes diagnosing bugs rather than simply receiving fixes.

---

# 5. Part 1 — Retrieval Challenge

Before learning anything new, explain yesterday's architecture.

## Question 1

Where should the articles live?

```text
____________________________________
```

## Question 2

Where should search text live?

```text
____________________________________
```

## Question 3

Where should selected category live?

```text
____________________________________
```

## Question 4

Where should favorites live?

```text
____________________________________
```

## Question 5

Complete:

```text
Parent
   |
   | __________
   v
Child
```

and:

```text
Child
   |
   | __________
   v
Parent
```

---

# 6. Part 2 — The Prop Drilling Problem

Suppose `App` owns:

```jsx
const [favorites, setFavorites] = useState([]);
```

But `NewsCard` needs access to favorites.

We might pass the data through:

```text
App
 ↓
Home
 ↓
NewsList
 ↓
NewsCard
```

The intermediate components may not actually need favorites.

They are only forwarding the data.

This is commonly called:

> **Prop drilling**

---

# 7. Guided Experiment — Build Prop Drilling

Create:

```text
App
 |
 +---- Home
       |
       +---- NewsList
              |
              +---- NewsCard
```

Pass:

```text
favorites
onFavorite
```

through each level.

Then ask:

- Which component actually needs favorites?
- Which components are only forwarding them?
- How many files must change if the data changes?
- Is the component interface becoming harder to understand?

---

# 8. Checkpoint

Complete:

> Prop drilling happens when...

```text
____________________________________
____________________________________
```

Important:

> Prop drilling does **not** mean props are bad.

Props are appropriate when:

- A parent owns data.
- A child directly needs the data.
- The relationship is simple.
- The data flow is easy to understand.

---

# 9. Part 3 — Context API

Context provides another way for components to access shared information.

Mental model:

```text
                Favorites Context
                       |
              +--------+--------+
              |        |        |
           Navbar   NewsCard  Favorites
```

Instead of repeatedly passing:

```text
App
 ↓
Page
 ↓
List
 ↓
Card
```

the shared information can be provided through Context.

The official course curriculum specifically requires Context API.

---

# 10. Context Mental Model

Think:

```text
Context
   ↓
Provider
   ↓
Components
```

A component can consume the shared value using:

```jsx
useContext()
```

The basic flow:

```text
Provider
   |
   | shared value
   v
Component
   |
   | useContext()
   v
Shared data
```

> **Tagline:** Context is how a distant relative asks a question without shouting across the room.

---

# 11. Create a Favorites Context

Create:

```text
src/
└── context/
    └── FavoritesContext.jsx
```

Start with:

```jsx
import { createContext } from "react";

const FavoritesContext = createContext(null);

export default FavoritesContext;
```

Do not rush to build the complete solution.

First understand:

> We have created a shared communication channel.

---

# 12. Create the Provider

The Provider will own the favorites state.

Conceptually:

```text
FavoritesProvider
       |
       +---- favorites
       +---- addFavorite
       +---- removeFavorite
```

A simplified version:

```jsx
function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  return (
    <FavoritesContext.Provider
      value={{
        favorites
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}
```

The `value` is the information exposed to components inside the Provider.

---

# 13. Provider Mental Model

Think:

```text
<FavoritesProvider>
    <App />
</FavoritesProvider>
```

Inside the Provider:

```text
FavoritesProvider
        |
        +---- App
              |
              +---- Home
              |     |
              |     +---- NewsCard
              |
              +---- Favorites
              |
              +---- Navbar
```

These components can consume the Context.

---

# 14. Reading Context

A component can use:

```jsx
const {
  favorites
} = useContext(FavoritesContext);
```

Mental model:

```text
Component
    |
    | useContext()
    v
Favorites Context
    |
    v
favorites
```

---

# 15. Guided Lab — Connect the Provider

Tasks:

1. Create `FavoritesContext`.
2. Create `FavoritesProvider`.
3. Put the Provider around the application.
4. Store favorites inside the Provider.
5. Expose favorites through Context.
6. Read favorites from `Navbar`.
7. Read favorites from `Favorites`.

Build one piece at a time.

---

# 16. Failure Challenge — Provider Boundary

Try consuming the Context from a component that is outside the Provider.

Ask:

> Is this component inside the Context boundary?

Compare:

```text
Provider
 |
 +---- Component A
 |
 +---- Component B
```

with:

```text
Provider
 |
 +---- Component A

Component B
```

The second component cannot consume that Provider's Context.

---

# 17. Part 4 — Favorites Become a Real Feature

The News App should support:

```text
Add favorite
Remove favorite
View favorites
Favorite count
```

These are explicitly part of the Day 4 project outline.

---

# 18. Design the Favorites State

A simple model:

```jsx
const [favorites, setFavorites] = useState([]);
```

Before coding, decide:

> What exactly are we storing?

Possible approaches:

```text
Entire article
```

or:

```text
Article IDs
```

For this project, choose one approach and use it consistently.

---

# 19. Add Favorite

Create a function such as:

```jsx
function addFavorite(article) {
  // update favorites
}
```

Flow:

```text
NewsCard
   |
   | click Favorite
   v
addFavorite(article)
   |
   v
Favorites Context
   |
   v
favorites state
   |
   v
UI updates
```

---

# 20. Remove Favorite

Create:

```jsx
function removeFavorite(articleId) {
  // update favorites
}
```

Flow:

```text
Favorites
   |
   | click Remove
   v
removeFavorite(id)
   |
   v
Context state
   |
   v
UI updates
```

---

# 21. Do Not Mutate State Directly

Avoid:

```jsx
favorites.push(article);
```

Instead, create a new array:

```jsx
setFavorites([
  ...favorites,
  article
]);
```

The important principle:

> Update React state through its setter rather than directly mutating the state value.

---

# 22. Prevent Duplicate Favorites

Ask:

> What should happen if the user clicks Favorite twice?

A reasonable rule:

```text
Already favorite
      ↓
Do not add again
```

This is an application rule.

You must deliberately decide and implement it.

---

# 23. Guided Lab — Favorite Button

Update `NewsCard`.

Possible UI:

```text
[ Favorite ]
```

or:

```text
[ Remove Favorite ]
```

depending on the current state.

Flow:

```text
NewsCard
   |
   | useContext()
   v
Favorites Context
   |
   +---- favorites
   +---- addFavorite
   +---- removeFavorite
```

---

# 24. Part 5 — Favorite Count

Update the Navbar:

```text
Home
Search
Favorites (3)
```

The Navbar can consume Context directly.

Mental model:

```text
FavoritesProvider
       |
       +---- Navbar
       |      |
       |      +---- count
       |
       +---- NewsCard
       |
       +---- Favorites
```

---

# 25. Guided Lab — Favorite Count

Add:

```text
Favorites (number)
```

The number should update when:

- an article is added
- an article is removed

Checkpoint:

> What causes the Navbar to update?

Reasoning:

```text
favorites changes
      ↓
Context value changes
      ↓
Context consumers update
```

---

# 26. Part 6 — Favorites Page

Create:

```text
pages/
└── Favorites.jsx
```

If favorites exist:

```text
Your Favorites

[Article]
[Article]
[Article]
```

If there are no favorites:

```text
You haven't saved any articles yet.
```

This reinforces conditional rendering and application state.

---

# 27. Empty State

Do not ignore the empty case.

Your application has:

```text
Favorites
   |
   +---- Has favorites
   |
   +---- Empty
```

The earlier project outline emphasizes that UI should represent the current state of the application, including loading, success, error, and empty states.

---

# 28. Failure Challenge — Favorites Disappear

Imagine:

```text
Add favorite
     ↓
Favorite appears
     ↓
Navigate
     ↓
Favorite disappears
```

Investigate:

> Who owns favorites?

Compare:

```text
Home
  └── local favorites state
```

with:

```text
FavoritesProvider
       |
       +---- Home
       +---- Search
       +---- Favorites
```

This is an architecture problem.

---

# 29. Part 7 — When Context Is Appropriate

Context can be useful when:

- many components need the same data
- passing props through many layers becomes inconvenient
- the information has application-level scope

Examples:

```text
Favorites
Theme
Language
User/session information
```

But:

> Context should not automatically hold everything.

---

# 30. When Props Are Better

If only one direct child needs:

```text
article
```

then:

```jsx
<NewsCard article={article} />
```

is perfectly reasonable.

Do not create Context just because Context exists.

---

# 31. Context Decision Checkpoint

Choose:

```text
Props / Context
```

### Article data from NewsList to NewsCard

```text
________________
```

### Favorites needed by Navbar, NewsCard, and Favorites Page

```text
________________
```

### A button label used by one child

```text
________________
```

### Theme used across many application areas

```text
________________
```

Explain your decisions.

### The Decision Rule, in One Flowchart

When you are not sure, run the decision chain:

```text
Does only one component need this data?
        │
        ├── Yes ──► Pass it as props. Done.
        │
        └── No  ──► Does the data have to travel through
                    several levels to reach it?
                         │
                         ├── No ──► Pass it as props. Done.
                         │
                         └── Yes ──► Is the data application-level
                                     (many unrelated components
                                      need the same thing)?
                                          │
                                          ├── Yes ──► Context is worth it.
                                          │
                                          └── No  ──► Lift the state to a
                                                      shared parent and
                                                      keep passing props.
```

In one sentence:

> **Props are the default. Context is the answer to a specific pain — many components, deep in the tree, needing the same application-level data.**

That rule is why Article data (one card) stays in props while Favorites (everywhere) earn Context.

> **Tagline:** Context is how a distant relative asks a question without shouting across the room.

---

# 32. Part 8 — Deliberate Debugging Lab

This is the most important practical section of Day 4.

The course outline recommends deliberate bugs such as failed API requests, repeated API calls, broken search, disappearing favorites, broken routes, and `undefined` values.

Your process:

```text
Observe
   ↓
Read error
   ↓
Form hypothesis
   ↓
Test hypothesis
   ↓
Locate cause
   ↓
Fix
   ↓
Explain
```

A successful fix is not enough.

You should be able to answer:

> Why did the bug happen?

and:

> Why does the fix work?

---

# 33. Bug #1 — API Does Not Return Data

### Symptoms

```text
No articles
```

or:

```text
Failed to load news
```

Investigate:

1. Did the request happen?
2. What URL was requested?
3. What status code was returned?
4. What does Network show?
5. What does the response contain?
6. Is the response shape what your code expects?

Use DevTools Network.

The course materials identify the Network tab as a place to inspect requests and responses.

---

# 34. Bug #2 — Infinite API Requests

### Symptoms

```text
request
request
request
request
...
```

Do not immediately change the code.

Ask:

> What causes the component to render?

> What causes the effect to run?

> What is inside the dependency array?

Draw:

```text
Render
  ↓
Effect
  ↓
State update
  ↓
Render
  ↓
Effect
  ↓
...
```

Your job is to find the cycle.

---

# 35. Bug #3 — Search Does Not Work

Investigate:

- Is the input controlled?
- Is `value` connected to state?
- Does `onChange` update state?
- Is the submitted value correct?
- Is the API request using the expected value?
- Is the response correct?

Use Console and Network.

---

# 36. Bug #4 — Favorites Disappear

Symptoms:

```text
Add favorite
↓
Navigate
↓
Favorite disappears
```

Investigate:

```text
Who owns favorites?
```

Ask:

> Does the component owning the state remain mounted?

If favorites are application-level shared state, Context may be a more appropriate owner.

---

# 37. Bug #5 — Article Route Is Broken

Inspect:

```text
Link
 ↓
URL
 ↓
Route
 ↓
Parameter
 ↓
ArticleDetails
```

Compare:

```jsx
<Link to={`/article/${article.id}`}>
```

with:

```jsx
<Route
  path="/article/:id"
  element={<ArticleDetails />}
/>
```

---

# 38. Bug #6 — `undefined` Appears

Symptoms:

```text
Title: undefined
```

or:

```text
Cannot read properties of undefined
```

Investigate:

```text
What object do we have?
```

Then:

```text
What property are we reading?
```

Then:

```text
Does the API actually contain that property?
```

Inspect the real data.

Do not guess.

---

# 39. Bug #7 — Component Does Not Render

Check:

- import
- export
- component name
- JSX syntax
- route
- runtime errors
- return value

Use the Console.

---

# 40. Debugging Investigation Sheet

### Bug

```text
____________________________________
```

### Expected

```text
____________________________________
```

### Actual

```text
____________________________________
```

### Evidence

```text
____________________________________
```

### Hypothesis

```text
____________________________________
```

### Test

```text
____________________________________
```

### Root cause

```text
____________________________________
```

### Fix

```text
____________________________________
```

### Why the fix works

```text
____________________________________
```

---

# 41. Part 9 — Independent Feature Challenge

Now the instructor stops driving.

Choose one feature.

Possible challenges:

- Dark mode
- Bookmark count
- Sort by date
- Search history
- Refresh button
- Pagination
- Read Later
- Related articles
- Category filter

---

# 42. Feature Planning Before Coding

## Feature

```text
____________________________________
```

## User action

```text
____________________________________
```

## Expected result

```text
____________________________________
```

## Required state

```text
____________________________________
```

## Component

```text
____________________________________
```

## Data source

```text
____________________________________
```

## Route

```text
Yes / No
```

## Context

```text
Yes / No
```

Why?

```text
____________________________________
```

---

# 43. Independent Challenge Rules

You may:

- Read your previous code.
- Read documentation.
- Inspect errors.
- Use DevTools.
- Ask conceptual questions.
- Search for explanations.

You should not:

- Copy a complete solution without understanding it.
- Paste code and hope it works.
- Ignore errors.
- Ask someone else to build the feature for you.

Your objective is:

> **Understand how you solved the problem.**

---

# 44. Part 10 — Refactoring Checkpoint

The application works.

Now stop adding features.

Review the code.

The refactoring review walks through component responsibilities, naming, duplicated code, state location, API logic, custom Hooks, Context, accessibility, responsive design, error handling, and Git commits.

---

# 45. Component Responsibilities

Ask:

> Does each component have a clear job?

If `App.jsx` contains:

- routing
- API calls
- search
- favorites
- forms
- article rendering
- categories
- navigation

consider separating responsibilities.

Possible direction:

```text
App
 |
 +---- Pages
       |
       +---- Components
```

Do not create dozens of files just for the sake of it.

The goal is clarity.

---

# 46. Naming Review

Compare:

```text
Data.jsx
Helper.jsx
Thing.jsx
Comp.jsx
```

with:

```text
NewsCard.jsx
SearchBar.jsx
ArticleDetails.jsx
Favorites.jsx
useNews.js
```

Ask:

> Can another developer guess what this file does?

---

# 47. State Location Review

For every state variable ask:

```text
Who needs this?
```

Then:

```text
Can it live closer to those components?
```

Or:

```text
Do many parts of the application need it?
```

Then decide:

```text
Local state
     or
Shared state
     or
Context
```

---

# 48. API Logic Review

Ask:

- Is API logic duplicated?
- Is `useEffect` used appropriately?
- Are loading states handled?
- Are errors handled?
- Are empty results handled?
- Is the API response understood?
- Are secrets exposed in frontend code?

Never put sensitive secrets directly into frontend code.

---

# 49. Custom Hook Review

If you created:

```text
useNews()
```

ask:

> What logic does it actually reuse?

A good custom Hook has a clear purpose.

Avoid creating:

```text
useEverything()
```

just to make the application look advanced.

---

# 50. Context Review

Ask:

> Why does this state need Context?

A weak answer:

> Because Context is a React feature.

A stronger answer:

> Favorites are needed by several distant components, and passing the state through every intermediate component would create unnecessary prop drilling.

---

# 51. Accessibility Review

Check:

```text
[ ] Buttons are real <button> elements
[ ] Links are real navigation links
[ ] Images have appropriate alt text
[ ] Form controls have labels
[ ] Keyboard interaction works
[ ] Heading levels make sense
[ ] Error messages are understandable
```

Accessibility is part of building usable web applications.

---

# 52. Responsive Design Review

Test:

```text
Desktop
Tablet
Mobile
```

Look for:

- horizontal overflow
- unreadable text
- crowded buttons
- broken images
- unusable navigation
- cards that are too wide or narrow

---

# 53. Error Handling Review

Test deliberately:

### No Internet

```text
What happens?
```

### Invalid API

```text
What happens?
```

### Empty results

```text
What happens?
```

### Invalid article

```text
What happens?
```

### Broken route

```text
What happens?
```

A professional application should not simply crash or display a confusing blank screen.

---

# 54. Git Review

Check:

```bash
git status
```

Then:

```bash
git log --oneline
```

The course material includes `git status` and `git log` as part of the development workflow.

Good commits tell a story:

```text
Add React Router
Add article details
Extract useNews hook
Add Favorites Context
Add favorites page
Fix API loading state
Refactor NewsCard
```

Avoid:

```text
stuff
test
aaa
finalfinal2
```

---

# 55. Final Application Architecture

Your News App should now be moving toward:

```text
                         NEWS API
                            |
                            v
                    React Application
                            |
          +-----------------+-----------------+
          |                                   |
       Router                             Context
          |                                   |
          |                              Favorites
          |                                   |
    +-----+------+                +-----------+-----------+
    |     |      |                |           |           |
   Home Search Favorites        Navbar     NewsCard   Article
    |     |
    |     +---- NewsList
    |
    +---- NewsList
             |
          NewsCard
             |
        /article/:id
             |
       ArticleDetails
```

The exact folder structure can differ.

What matters is that you can explain:

> **Why does each piece exist?**

---

# 56. Full News App Flow

A user might:

```text
Open application
       ↓
Home
       ↓
News API request
       ↓
Loading
       ↓
Articles
       ↓
Click Favorite
       ↓
Favorites Context
       ↓
Favorite count updates
       ↓
Click article
       ↓
/article/:id
       ↓
Article Details
       ↓
Return to Favorites
       ↓
Favorite still exists
```

You should be able to explain every transition.

---

# 57. Final Integration Challenge

Start with:

```text
NEWS API
   |
   v
React App
```

Complete:

```text
API
 ↓
________________
 ↓
________________
 ↓
________________
 ↓
________________
 ↓
User interface
```

Then answer:

> Where does the state live?

```text
____________________________________
```

> Why is `useEffect` used?

```text
____________________________________
```

> Why is React Router used?

```text
____________________________________
```

> Why is `useNews()` useful?

```text
____________________________________
```

> Why is Context useful?

```text
____________________________________
```

---

# 58. Final Project Requirements

Your News App should contain:

## Pages

```text
/
/search
/category/:category
/favorites
/article/:id
```

## Reusable Components

Examples:

```text
Header
Navbar
SearchBar
CategoryNav
NewsList
NewsCard
```

## React Features

```text
JSX
Components
Props
Lists
State
Events
Conditional rendering
Forms
Validation
API calls
useEffect
React Router
Route parameters
Custom Hook
Context API
```

These topics align with the official React course requirements.

---

# 59. Final Submission Checklist

```text
[ ] Application starts successfully
[ ] Home route works
[ ] Search route works
[ ] Category route works
[ ] Favorites route works
[ ] Article route works
[ ] Navigation works
[ ] News API works
[ ] Loading state works
[ ] Error state works
[ ] Empty state works
[ ] Search works
[ ] Search validation works
[ ] Categories work
[ ] Article details work
[ ] Favorites can be added
[ ] Favorites can be removed
[ ] Favorite count updates
[ ] Favorites survive navigation
[ ] Context is used appropriately
[ ] Custom Hook is meaningful
[ ] Components have clear responsibilities
[ ] No unnecessary prop drilling
[ ] Responsive layout works
[ ] Basic accessibility is considered
[ ] Git history is meaningful
[ ] Code is pushed to GitHub
```

---

# 60. Final Code Review

| Area | Question | Status |
|---|---|---|
| Components | Are responsibilities clear? | |
| JSX | Is JSX readable and valid? | |
| Props | Are props used appropriately? | |
| State | Is state stored in the right place? | |
| Events | Are event handlers correct? | |
| Forms | Are inputs controlled correctly? | |
| Validation | Are invalid inputs handled? | |
| API | Are requests and responses understood? | |
| `useEffect` | Are effects used appropriately? | |
| Loading | Is loading represented? | |
| Error | Are errors represented? | |
| Empty | Are empty results represented? | |
| Routing | Do routes work? | |
| Parameters | Are route parameters handled? | |
| Custom Hook | Is duplicated logic reduced? | |
| Context | Is shared state justified? | |
| Accessibility | Can users interact effectively? | |
| Responsive | Does it work on smaller screens? | |
| Git | Is the history understandable? | |

---

# 61. Final Presentation

The final presentation is not only a demonstration.

It is an explanation of your engineering decisions.

Your presentation explains:

1. What the app does.
2. Component structure.
3. Where state lives.
4. How API calls work.
5. Why `useEffect` is used.
6. Why the custom Hook was created.
7. Why Context is used.
8. One bug encountered.
9. How that bug was diagnosed.

---

# 62. Presentation Script

## 1. What did we build?

```text
Our application is...
```

## 2. What are the main pages?

```text
Our main routes are...
```

## 3. How is the application structured?

```text
Our main components are...
```

## 4. Where does state live?

```text
We keep ______ in local state because...
We keep ______ in Context because...
```

## 5. How does the API work?

```text
The application sends...
The response contains...
We store...
```

## 6. Why use `useEffect`?

```text
We use it because...
```

## 7. Why use a custom Hook?

```text
We extracted...
because...
```

## 8. Why use Context?

```text
Favorites are needed by...
Passing them through...
would create...
```

## 9. What bug did you encounter?

```text
The problem was...
```

## 10. How did you diagnose it?

```text
First we observed...
Then we checked...
Our hypothesis was...
We tested...
The root cause was...
```

---

# 63. Final Reflection

### What React concept do you understand best now?

```text
____________________________________
```

### What concept still feels difficult?

```text
____________________________________
```

### What bug taught you the most?

```text
____________________________________
```

### What did you learn from failing?

```text
____________________________________
```

### What part of your code would you improve next?

```text
____________________________________
```

---

# 64. Final Exit Ticket

Explain this architecture:

```text
                    React App
                       |
          +------------+------------+
          |                         |
        Router                   Context
          |                         |
     +----+----+                    |
     |    |    |                    |
   Home Search Favorites        favorites
     |                              |
  NewsList                           |
     |                               |
  NewsCard <-------------------------+
     |
     v
/article/:id
     |
     v
ArticleDetails
     |
     v
useNews()
     |
     v
News API
```

Then answer:

> **Why is this architecture better than putting everything inside `App.jsx`?**

```text
____________________________________
____________________________________
____________________________________
```

---

# 65. The Most Important Lesson

You did not spend four days learning a list of React APIs.

You learned a development process:

```text
Problem
   ↓
Break it down
   ↓
Build a small piece
   ↓
Observe
   ↓
Fail
   ↓
Debug
   ↓
Understand
   ↓
Refactor
   ↓
Build again
```

The project outline deliberately uses failures such as JSX errors, missing keys, incorrect event handlers, controlled-input problems, wrong API endpoints, repeated effects, broken routes, duplicated logic, and prop drilling as learning opportunities.

That is the transition from:

```text
React learner
```

to:

```text
React developer
```

---

# 66. Four-Day React Sprint — Final Picture

```text
DAY 1
React mental model
      ↓
Components
      ↓
JSX
      ↓
Props
      ↓
Lists
      ↓
State
      ↓
Events

DAY 2
Forms
      ↓
Validation
      ↓
HTTP/API
      ↓
fetch
      ↓
async/await
      ↓
useEffect
      ↓
Loading/Error/Empty

DAY 3
One-way data flow
      ↓
Lifting state
      ↓
React Router
      ↓
Route parameters
      ↓
Article Details
      ↓
Custom Hooks
      ↓
Refactoring

DAY 4
Prop drilling
      ↓
Context API
      ↓
Favorites
      ↓
Debugging
      ↓
Independent Feature
      ↓
Code Review
      ↓
Final Project
```

Look at how each day answers the pain left by the previous one — the temple rule made visible:

```text
Day 1 pain:  chaos of many UI pieces     → Components
Day 2 pain:  where does data come from?  → fetch + API states
Day 3 pain:  one screen isn't an app     → Routing + data flow
Day 4 pain:  everyone needs the same data → Context + architecture
```

> **Tagline:** A good React app is a clear conversation between small, single-purpose pieces.

---

# Using AI at the Architecture Gate

By Day 4, AI is most useful for *review*, not for writing. Ask it to challenge your architecture.

**Good prompt:**

> "Here is my App component tree and where favorites state lives. Is Context justified here, or should props win? Ask me questions to help me decide."

**Bad prompt:**

> "Refactor my whole app with Context."

The rule of the temple:

> **You learn by explaining the fix yourself.** You have walked four gates — by now, you should be the one explaining.

## Next Quests: Beyond the React Module

The Architecture Gate closes the four-day sprint — but the temple has more gates ahead. When you are ready, these are the natural next quests for a React ninja:

```text
TypeScript Gate      → add types to your News App
Modern Architecture  → components, data fetching, and state libraries
AI in Development    → using AI tools without losing understanding
```

The staircase keeps climbing. Every new tool answers an old question.

---

# 67. Congratulations

You have completed the four-day React project sprint.

The final goal is not that you can recite:

```text
useState
useEffect
useContext
useParams
```

The goal is that when you face a new problem, you can ask:

> **What is the problem?**

> **What data does the UI need?**

> **Who should own that data?**

> **How should components communicate?**

> **Is this local state or shared state?**

> **Does this need an API?**

> **Does this need an effect?**

> **Is this logic duplicated?**

> **Should it become a custom Hook?**

> **Is Context actually justified?**

> **What does the error tell me?**

That is the beginning of professional React development.

> **Tagline:** Four gates climbed — from React learner to React developer. The temple's next doors are yours to choose.



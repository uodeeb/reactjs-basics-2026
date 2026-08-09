# Web Development Using React JS
# Day 2 Student Manual
# The Data Gate — Now Make It Real: Forms, APIs, Fetch, useEffect, and UI States

> **Project:** React News App  
> **Gate:** The Data Gate
> **Beginner question:** How does my app get data from the outside world?
> **Day 2 focus:** Forms → validation → HTTP/API investigation → `fetch()` → `async/await` → `useEffect` → loading/error/empty states  
> **Learning cycle:** Need → Try → Fail → Observe → Explain → Fix → Refactor → Apply

---

## Your Quest Map for Day 2

The Components Gate taught you to render data the app already had. Now the ninja asks the natural next question:

> "Where does the data come from?"

Today you cross the **Data Gate**. By the end of the day you should control this chain:

```text
User search
   ↓
Form + validation
   ↓
fetch() request
   ↓
News API
   ↓
JSON response
   ↓
useEffect
   ↓
React state
   ↓
Loading / Error / Empty / Success states
```

Every tool today answers a question left by the previous step — the temple rule:

> **Every new tool answers an old question.**

---

# 1. Welcome Back

On Day 1, the News App moved from a simple React page to a reusable, data-driven UI.

You built:

```text
App
│
├── Header
├── Navbar
├── NewsList
│   └── NewsCard
└── Footer
```

You also learned:

- JSX
- Components
- Props
- Arrays
- `.map()`
- Keys
- State
- Events

Your Day 1 application used **local sample data**.

Today we make the application more realistic.

The main transformation is:

```text
Day 1

Local JavaScript data
        ↓
React state
        ↓
NewsCard


Day 2

User search
        ↓
HTTP request
        ↓
News API
        ↓
JSON response
        ↓
React state
        ↓
NewsCard
```

The React learning outline deliberately places forms, API investigation, `fetch`, `async/await`, `useEffect`, and API states on Day 2. The official course curriculum also includes forms and validation, HTTP/API calls, and React Hooks.

---

# 2. Day 2 Learning Outcomes

By the end of today, you should be able to:

1. Build a controlled React input.
2. Read and update input state.
3. Submit a React form.
4. Prevent the browser's default form submission.
5. Validate user input.
6. Explain the basic HTTP request/response cycle.
7. Inspect an API request using browser DevTools.
8. Use `fetch()` to make an HTTP request.
9. Use `async/await` with asynchronous JavaScript.
10. Convert an HTTP response into JSON.
11. Store API data in React state.
12. Use `useEffect` for an API request triggered by rendering/lifecycle conditions.
13. Represent loading, success, empty, and error states.
14. Diagnose common API and React problems using DevTools.
15. Extend the News App from fake data toward real API data.

---

# 3. Day 2 Roadmap

Today's path:

```text
Retrieval
   ↓
Forms
   ↓
Controlled Inputs
   ↓
Validation
   ↓
HTTP/API Investigation
   ↓
fetch()
   ↓
async/await
   ↓
JSON
   ↓
React State
   ↓
useEffect
   ↓
Loading / Success / Empty / Error
   ↓
Debugging
```

The important idea is:

> We are not learning these features because they are isolated React topics. We need them because the News App has a real problem to solve.

---

# 4. Retrieval Practice

Before writing new code, close your notes.

Try to answer these questions.

## Question 1

What is a component?

## Question 2

What is the difference between props and state?

## Question 3

What does `.map()` help us do?

## Question 4

Why does a rendered list need a `key`?

## Question 5

What happens when state changes?

## Question 6

Why do we write:

```jsx
onClick={handleFavorite}
```

instead of:

```jsx
onClick={handleFavorite()}
```

## Question 7

Complete the flow:

```text
User action
    ↓
__________
    ↓
State update
    ↓
__________
    ↓
Updated UI
```

### Suggested answer

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

---

# 5. The New Problem: Search

Imagine the News App has hundreds or thousands of articles.

Displaying everything is not useful.

We need:

```text
┌────────────────────────────────────┐
│ Search: [ React            ] 🔍    │
└────────────────────────────────────┘
```

The user should be able to:

1. Type a search term.
2. Submit the form.
3. Validate the input.
4. Send the search term to the API.
5. Receive news.
6. Display the results.

This gives us our first Day 2 feature:

> **Search News**

---

# 6. Start With the Simplest Input

Before React state, look at a normal HTML input:

```html
<input type="text">
```

The browser can display it.

The user can type into it.

But React needs to know:

> What is currently inside this input?

That leads us to state.

---

# 7. Controlled Inputs

A controlled input is an input whose value is controlled by React state.

Start with:

```jsx
import { useState } from "react";

function SearchBar() {
  const [search, setSearch] = useState("");

  return (
    <input
      type="text"
      value={search}
      onChange={(event) => setSearch(event.target.value)}
    />
  );
}
```

There are three important pieces:

```jsx
value={search}
```

The input displays the current state.

```jsx
onChange={...}
```

React responds when the user types.

```jsx
setSearch(...)
```

React updates the state.

The mental model is:

```text
User types
    ↓
onChange
    ↓
setSearch()
    ↓
search state changes
    ↓
React renders
    ↓
input displays new value
```

> **Tagline:** A controlled input is the one source of truth for what the box says.

---

# 8. Why `event.target.value`?

When the user types, React gives the event handler information about the event.

The event contains a target.

For an input event:

```text
event
  ↓
target
  ↓
input element
  ↓
value
  ↓
text currently inside input
```

So:

```jsx
event.target.value
```

means:

> Give me the current value of the input that triggered this event.

---

# 9. Trail #1 — Make the Input Impossible to Type In

Try this:

```jsx
function SearchBar() {
  const [search, setSearch] = useState("");

  return (
    <input
      type="text"
      value={search}
    />
  );
}
```

Try typing.

What happens?

You may discover that the input does not behave normally.

Do not immediately fix it.

Ask:

1. Where does the input's value come from?
2. What is `search` initially?
3. What changes `search`?
4. Do we have an `onChange` handler?
5. What should happen when the user types?

The missing connection is:

```text
User types
    ↓
onChange
    ↓
setSearch()
```

---

# 10. Lab 1 — Build SearchBar

## Goal

Create a reusable `SearchBar` component.

## Requirements

The component must:

- contain an input
- store its value in state
- update the state when the user types
- display the current input value
- contain a Search button

Start with:

```text
Search: [________________] [Search]
```

Do not connect it to an API yet.

First make the input work correctly.

---

# 11. From Input to Form

A search box is normally part of a form.

Example:

```jsx
<form>
  <input
    type="text"
    value={search}
    onChange={(event) => setSearch(event.target.value)}
  />

  <button type="submit">
    Search
  </button>
</form>
```

Now we need to handle submission.

---

# 12. Form Submission

Create a function:

```jsx
function handleSubmit(event) {
  event.preventDefault();

  console.log(search);
}
```

Then:

```jsx
<form onSubmit={handleSubmit}>
```

The flow becomes:

```text
User submits form
       ↓
onSubmit
       ↓
handleSubmit
       ↓
preventDefault()
       ↓
read search state
```

---

# 13. Why `preventDefault()`?

Browsers have default behavior for HTML forms.

A normal form submission can cause browser navigation/reloading behavior.

In a React application, we usually want React to handle the submission.

So:

```jsx
event.preventDefault();
```

means:

> Stop the browser's default form-submission behavior.

This lets us control what happens next.

---

# 14. Trail #2 — Forget `preventDefault()`

Temporarily remove:

```jsx
event.preventDefault();
```

Submit the form.

Observe the browser.

Ask:

1. Did the page behave as expected?
2. Did the browser perform its normal form behavior?
3. Why might that be undesirable for our SPA?
4. What does `preventDefault()` change?

Then add it back.

---

# 15. Complete SearchBar So Far

A simple version:

```jsx
import { useState } from "react";

function SearchBar() {
  const [search, setSearch] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    console.log(search);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Search news..."
      />

      <button type="submit">
        Search
      </button>
    </form>
  );
}

export default SearchBar;
```

At this point:

```text
Input
 ↓
State
 ↓
Submit
 ↓
Console
```

We are not calling an API yet.

---

# 16. Validation

What happens if the user clicks Search without entering anything?

We should not automatically send an empty search request.

The application should validate the input.

Think:

```text
User input
    ↓
Validation
    ↓
Valid? ───── No ───→ Show message
  │
 Yes
  ↓
Search
```

---

# 17. First Validation Rule

For Day 2, start with one simple rule:

> The search term must not be empty.

Example:

```jsx
function handleSubmit(event) {
  event.preventDefault();

  if (search.trim() === "") {
    console.log("Please enter a search term.");
    return;
  }

  console.log(search);
}
```

Why use:

```jsx
trim()
```

instead of only:

```jsx
search === ""
```

Because this:

```text
"     "
```

contains spaces but does not represent a useful search term.

---

# 18. Better Validation Feedback

Instead of only using `console.log`, create state:

```jsx
const [error, setError] = useState("");
```

Then:

```jsx
function handleSubmit(event) {
  event.preventDefault();

  if (search.trim() === "") {
    setError("Please enter a search term.");
    return;
  }

  setError("");
  console.log(search);
}
```

Display it:

```jsx
{error && <p>{error}</p>}
```

Now the UI responds to validation state.

---

# 19. The UI Now Has State

Your SearchBar has:

```text
search
  ↓
what the user typed

error
  ↓
what went wrong with the input
```

This is a preview of a larger idea:

> A UI represents the current state of the application.

> **Tagline:** Validation is the input asking the user a question before the app asks the API.

Later, the News App will have:

```text
loading
error
articles
search
category
favorites
```

---

# 20. Lab 2 — Search Validation

## Requirements

Your SearchBar should:

- reject an empty search
- reject a search containing only spaces
- show an error message
- clear the error when valid input is submitted
- log the valid search term

### Bonus

Add a minimum length rule:

```text
Search must contain at least 2 characters.
```

---

# 21. API: What Are We Actually Calling?

Now we need real data.

Before writing `fetch()`, stop.

Ask:

> What is an API?

An API allows software systems to communicate through defined interfaces.

For our News App:

```text
React App
    │
    │ HTTP request
    ▼
News API
    │
    │ HTTP response
    ▼
React App
```

The broader course material introduces HTTP/S, browser/server communication, and request/response behavior. The front-end material also emphasizes using browser DevTools to inspect network activity.

---

# 22. API Investigation Before Coding

Do not start by copying a `fetch()` example.

First investigate the API.

You need to understand:

- Endpoint
- HTTP method
- Query parameters
- Response status
- Response body
- JSON structure

Your browser DevTools can help you inspect requests and responses.

---

# 23. Open Browser DevTools

Open your browser DevTools.

Find:

```text
Network
```

The Network panel allows you to inspect network activity.

Your investigation flow:

```text
Trigger request
      ↓
Open Network
      ↓
Find request
      ↓
Inspect URL
      ↓
Inspect status
      ↓
Inspect response
```

---

# 24. HTTP Request Mental Model

For a news search, imagine:

```text
GET /news?q=react
```

The server receives the request.

It processes it.

Then sends a response.

```text
Request
   ↓
Server
   ↓
Response
```

The response might contain JSON.

Example shape:

```json
{
  "articles": [
    {
      "id": 1,
      "title": "React Components",
      "description": "..."
    }
  ]
}
```

Your actual API response may have a different structure.

**Do not assume the property is called `articles`.**

Inspect the real response.

---

# 25. Important Rule: Read the API Response

Never write:

```jsx
data.articles.map(...)
```

just because another example used it.

First ask:

> What does this API actually return?

Possible structures include:

```json
{
  "articles": []
}
```

or:

```json
{
  "data": []
}
```

or:

```json
{
  "results": []
}
```

or another structure.

The response is the source of truth for the code that consumes it.

---

# 26. `fetch()`

JavaScript provides `fetch()` for making HTTP requests.

A basic example:

```jsx
fetch(url);
```

`fetch()` works asynchronously.

That means the result is not immediately available as a normal value.

This connects to your previous JavaScript knowledge of Promises and asynchronous development.

---

# 27. First `fetch()` Experiment

Try:

```jsx
fetch("YOUR_API_URL");
```

Then:

```jsx
console.log("Request started");
```

You will need to understand that the request happens asynchronously.

A simplified mental model:

```text
JavaScript starts request
        ↓
continues running
        ↓
server responds later
        ↓
response becomes available
```

---

# 28. Promise Mental Model

A Promise represents the result of an asynchronous operation.

Think:

```text
Promise
  │
  ├── Pending
  │
  ├── Fulfilled
  │
  └── Rejected
```

For today's News App:

```text
API request
    ↓
Pending
    ↓
Success OR Failure
```

This naturally leads to loading and error states later.

> **Tagline:** Fetch is how the app asks the outside world a question.

---

# 29. `async` and `await`

You already encountered these in modern JavaScript.

Example:

```jsx
async function getNews() {
  const response = await fetch(url);

  console.log(response);
}
```

The `await` keyword lets us write asynchronous code in a sequential-looking style.

Read this:

```jsx
const response = await fetch(url);
```

as:

> Wait for the fetch operation to produce its response before continuing this function.

---

# 30. Getting JSON

A `fetch()` response is not automatically the JavaScript object you want to render.

We normally parse JSON:

```jsx
const response = await fetch(url);
const data = await response.json();
```

Now:

```text
HTTP response
      ↓
response.json()
      ↓
JavaScript data
```

Then inspect:

```jsx
console.log(data);
```

Do this before trying to render it.

---

# 31. A Simple API Function

A starting pattern:

```jsx
async function getNews() {
  const response = await fetch(url);

  const data = await response.json();

  console.log(data);
}
```

This is deliberately incomplete.

It does not yet handle:

- invalid URLs
- failed requests
- loading
- errors
- empty results
- React state

We will add those step by step.

---

# 32. Trail #3 — Wrong API URL

Use an incorrect URL intentionally.

Run the request.

Then investigate.

Ask:

1. Did a request happen?
2. What does the Network tab show?
3. What status did the server return?
4. Did `fetch()` give us a response?
5. What does the Console show?
6. What should our application display to the user?

Do not immediately replace the URL.

Practice diagnosis first.

---

# 33. Trail #4 — Forget `response.json()`

Try:

```jsx
const response = await fetch(url);

console.log(response);
```

Then compare with:

```jsx
const response = await fetch(url);
const data = await response.json();

console.log(data);
```

Ask:

> What is the difference between the HTTP response object and the parsed JSON data?

This distinction becomes extremely important.

---

# 34. Trail #5 — Assume the Wrong Data Shape

Suppose the API returns:

```json
{
  "results": []
}
```

but you write:

```jsx
data.articles.map(...)
```

The application fails.

Do not guess.

Use:

```jsx
console.log(data);
```

Then inspect the actual structure.

The debugging rule:

> **Inspect data before consuming data.**

---

# 35. Connecting API Data to React State

Now we have a new problem.

Suppose we do:

```jsx
let articles = [];
```

Then later:

```jsx
articles = data.results;
```

Will React automatically know that the UI needs to update?

No.

This is the same lesson from Day 1.

React needs state.

So:

```jsx
const [articles, setArticles] = useState([]);
```

Then:

```jsx
setArticles(data.results);
```

Now the flow becomes:

```text
API response
    ↓
setArticles(...)
    ↓
React state changes
    ↓
component re-renders
    ↓
NewsList displays new data
```

---

# 36. The New Application Flow

Our News App is becoming:

```text
Search input
      ↓
Search state
      ↓
Submit
      ↓
API request
      ↓
JSON response
      ↓
Articles state
      ↓
NewsList
      ↓
NewsCard
```

This is a major milestone.

---

# 37. Why Do We Need `useEffect`?

Now we have a new requirement:

> Load news when the component needs to perform the API request.

You might try:

```jsx
function NewsList() {
  const [articles, setArticles] = useState([]);

  fetch(url);

  return (...);
}
```

This is a problem.

Why?

A React component function can run again when state changes.

If the API request is directly inside the component body, you risk:

```text
Render
 ↓
fetch
 ↓
setState
 ↓
Render
 ↓
fetch
 ↓
setState
 ↓
Render
 ↓
fetch
 ↓
...
```

This is the repeated-request problem.

---

# 38. The Repeated API Call Experiment

If appropriate for your local project, intentionally place a request directly inside the component.

Open:

```text
DevTools
  ↓
Network
```

Observe the requests.

Then ask:

> What caused the request?

> What caused the render?

> What caused the next request?

> Why might this continue?

This is one of the most important debugging experiences of Day 2.

---

# 39. `useEffect`

React provides the `useEffect` Hook for side effects.

A network request is a side effect.

A basic pattern is:

```jsx
import { useEffect, useState } from "react";

function NewsList() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    // API request
  }, []);

  return (...);
}
```

The dependency array:

```jsx
[]
```

is significant.

For today's first example, it expresses that the effect does not depend on changing values and should run after the initial render.

Do not memorize this without understanding the problem it solves.

---

# 40. Mental Model for `useEffect`

Think:

```text
Component renders
       ↓
React commits UI
       ↓
Effect runs
       ↓
API request
       ↓
Data arrives
       ↓
setArticles()
       ↓
Component renders again
```

The important distinction is:

```text
Rendering UI
```

versus:

```text
Performing a side effect
```

The API request belongs to the second category.

### Deeper: The Dependency Array, in Plain Terms

The second argument of `useEffect` — the dependency array — is the list of values the effect "watches."

```jsx
useEffect(effect, dependencies)
                 │
                 └── "re-run the effect when any of these change"
```

There are three cases you will meet all day:

```text
NO array            → runs after every render
[]                  → runs after the first render only
[url] / [search]    → runs after the first render,
                      and again whenever that value changes
```

How React decides, between renders:

```text
Render #1
   ↓
Effect runs
   ↓
State changes → Render #2
   ↓
React compares the dependency values
   ↓
Changed?  → effect runs again
Same?     → effect is skipped
```

That is the mental model behind every "why did my request repeat forever?" bug you will hit today.

> **Tagline:** The effect asks for data; the dependency array says when to ask again.

---

# 41. A Basic API Effect

A simplified example:

```jsx
useEffect(() => {
  async function getNews() {
    const response = await fetch(url);
    const data = await response.json();

    setArticles(data.results);
  }

  getNews();
}, []);
```

Notice the structure:

```text
useEffect
   ↓
async function
   ↓
fetch
   ↓
json
   ↓
setArticles
```

---

# 42. Why Define the Async Function Inside?

You may see:

```jsx
useEffect(() => {
  async function getNews() {
    ...
  }

  getNews();
}, []);
```

This keeps the asynchronous operation inside the effect.

For this course, focus first on understanding:

```text
Effect
 ↓
Run async work
 ↓
Update state
```

Do not overcomplicate the pattern.

---

# 43. Lab 3 — Load News

## Goal

Replace your local article array with API data.

## Requirements

Your `NewsList` should:

1. Store articles in state.
2. Use `useEffect`.
3. Make an API request.
4. Parse the JSON response.
5. Store the relevant array in state.
6. Render the resulting articles.
7. Continue using `NewsCard`.

The architecture should remain:

```text
NewsList
   ↓
NewsCard
```

Only the data source changes.

---

# 44. The Four UI States

An API-driven application is not simply:

```text
Data
```

It can be:

```text
LOADING
SUCCESS
EMPTY
ERROR
```

Your News App should represent these states clearly.

---

# 45. Loading State

Create:

```jsx
const [loading, setLoading] = useState(true);
```

Then:

```jsx
setLoading(false);
```

after the request completes.

Conceptually:

```text
Request starts
    ↓
loading = true
    ↓
Show "Loading..."
    ↓
Response arrives
    ↓
loading = false
```

---

# 46. Error State

Create:

```jsx
const [error, setError] = useState(null);
```

If the request fails:

```jsx
setError("Unable to load news.");
```

Now the UI can show:

```text
Something went wrong.
Please try again.
```

---

# 47. `try` / `catch`

A common asynchronous pattern:

```jsx
try {
  const response = await fetch(url);
  const data = await response.json();

  setArticles(data.results);
} catch (error) {
  setError("Unable to load news.");
}
```

This allows the application to respond to an asynchronous failure.

---

# 48. Important: HTTP Errors

Do not assume that:

```jsx
fetch()
```

automatically rejects for every HTTP error status.

You should inspect the response.

A common pattern is:

```jsx
if (!response.ok) {
  throw new Error("Request failed");
}
```

Then:

```jsx
try {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Request failed");
  }

  const data = await response.json();

  setArticles(data.results);
} catch (error) {
  setError("Unable to load news.");
}
```

This gives the application an explicit failure path.

---

# 49. Empty State

A successful request can still return no articles.

That is not necessarily an API error.

It is an **empty state**.

Example:

```text
No news found.
Try another search.
```

The distinction is:

```text
ERROR
Request failed.

EMPTY
Request succeeded, but no useful results were returned.
```

This distinction matters in real applications.

---

# 50. Conditional Rendering

Now the UI depends on state.

Conceptually:

```jsx
if (loading) {
  return <p>Loading...</p>;
}

if (error) {
  return <p>{error}</p>;
}

if (articles.length === 0) {
  return <p>No news found.</p>;
}
```

Then:

```jsx
return (
  <main>
    {articles.map((article) => (
      <NewsCard
        key={article.id}
        {...article}
      />
    ))}
  </main>
);
```

Your actual object fields may differ from this example.

Always adapt the component to the real API response.

---

# 51. The Full State Model

Your NewsList is beginning to manage:

```text
articles
loading
error
```

You can think of the application as:

```text
                 ┌──────────────┐
                 │   Loading    │
                 └──────┬───────┘
                        │
                  API response
                   ┌────┴────┐
                   │         │
                Success     Error
                   │         │
              ┌────┴───┐     │
              │        │     │
           Results   Empty   Error UI
              │        │
              ▼        ▼
            News UI  Empty UI
```

> **Tagline:** Every view on screen is one of the four states — loading, error, empty, success.

---

# 52. Trail #6 — Incorrect Loading Logic

Try creating a bug where:

```jsx
setLoading(false);
```

is forgotten.

What happens?

The application may remain stuck on:

```text
Loading...
```

Ask:

1. What state changed?
2. Which state did not change?
3. When should loading become false?
4. Should loading become false after success?
5. Should loading become false after failure?

This trains you to reason about state transitions.

---

# 53. Trail #7 — Error Without Reset

Imagine:

```text
First request
    ↓
Error
    ↓
error = "Unable to load news."
```

Then the user tries again successfully.

If you forget:

```jsx
setError(null);
```

the old error can remain visible.

Ask:

> When should the error state be cleared?

A good rule is:

```text
New request
    ↓
Clear previous error
    ↓
Try again
```

---

# 54. Search + API

Now connect the form to the API.

The desired flow:

```text
User types
   ↓
search state
   ↓
Submit
   ↓
Validate
   ↓
Build API URL
   ↓
Request news
   ↓
Receive JSON
   ↓
setArticles
   ↓
Render cards
```

This is the main Day 2 feature.

---

# 55. Where Should Search State Live?

At this point, you may have:

```text
SearchBar
NewsList
```

Ask:

> Which component needs the search value?

If `SearchBar` owns the search state but `NewsList` needs it to perform the request, we have a data-flow problem to solve.

This prepares you for Day 3's deeper lesson about one-way data flow and lifting state.

For Day 2, keep the architecture simple and follow the structure established by your instructor's starter project.

---

# 56. A Possible Architecture

One possible structure is:

```text
App
│
├── Header
├── SearchBar
├── NewsList
│     └── NewsCard
└── Footer
```

Later, Day 3 can evolve this into a richer application architecture.

---

# 57. API Security Reminder

If an API requires an API key:

> Do not commit a private API key directly into your public GitHub repository.

Never write:

```jsx
const API_KEY = "my-secret-key";
```

and commit it to a public repository.

Follow the instructor's project setup for environment variables and API credentials.

The goal today is to understand the API flow, not to expose credentials.

---

# 58. Lab 4 — Make the News App Real

## Goal

Replace the static data with API-driven data.

## Required behavior

### Search

```text
[ React ] [Search]
```

### Loading

```text
Loading news...
```

### Success

Display news cards.

### Empty

```text
No news found.
```

### Error

```text
Unable to load news.
```

---

# 59. Required State

Your solution will likely need state similar to:

```jsx
const [articles, setArticles] = useState([]);
const [search, setSearch] = useState("");
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);
```

Do not treat this as a mandatory copy-paste solution.

The exact state structure depends on your application design.

The important question is:

> What information does the UI need to know?

---

# 60. Debugging Workflow for API Problems

Use this every time an API feature fails.

```text
1. Observe
      ↓
2. Read the error
      ↓
3. Open Network
      ↓
4. Find the request
      ↓
5. Check URL
      ↓
6. Check status
      ↓
7. Inspect response
      ↓
8. Inspect JavaScript data
      ↓
9. Form a hypothesis
      ↓
10. Test it
      ↓
11. Make the smallest fix
      ↓
12. Explain the cause
```

This trail/fail sequence is the heart of the learning-by-doing outline: you diagnose with DevTools instead of grabbing the first fix you can find.

---

# 61. Debugging Questions

When news does not appear, ask:

### Request

> Did the request happen?

### URL

> Is the endpoint correct?

### Parameters

> Did the search term reach the API?

### Status

> What status code did we receive?

### Response

> What did the server return?

### Data

> Is the data an array?

### Property

> Are we reading the correct property?

### State

> Did `setArticles()` run?

### Rendering

> Is `.map()` receiving an array?

### UI

> Are we accidentally displaying the loading or error state?

---

# 62. Common Day 2 Mistakes

## Mistake 1 — Controlled input without `onChange`

```jsx
<input value={search} />
```

The state controls the input, but the user has no way to update the state.

## Mistake 2 — Forgetting `preventDefault()`

The form may perform its normal browser behavior.

## Mistake 3 — Sending an empty request

Validate before calling the API.

## Mistake 4 — Assuming the response structure

Do not assume:

```jsx
data.articles
```

Inspect the real response.

## Mistake 5 — Forgetting `response.json()`

The HTTP response is not automatically the final JavaScript data object.

## Mistake 6 — Fetching directly during render

Avoid placing an API request directly in the component body when it creates repeated side effects.

## Mistake 7 — Incorrect `useEffect` dependencies

A dependency mistake can cause repeated API requests.

Use the Network tab to observe the actual behavior.

## Mistake 8 — Forgetting loading state

The user needs feedback while asynchronous work is happening.

## Mistake 9 — Treating empty results as an error

No results and request failure are different states.

## Mistake 10 — Hiding the actual error

During development, inspect the real error in the Console and Network tab before replacing it with a generic message.

---

# 63. Mini Quiz

## 1. What makes an input controlled in React?

A. CSS

B. React state controls its value

C. A browser extension

D. A database

**Answer:** B

## 2. Which event is commonly used when an input changes?

A. `onChange`

B. `onInputClick`

C. `onTypeOnly`

D. `onUpdateHTML`

**Answer:** A

## 3. Why do we use `event.preventDefault()` in a React form?

A. To change CSS

B. To stop the browser's default form behavior

C. To fetch JSON

D. To create state

**Answer:** B

## 4. What does `fetch()` return?

A. The final JSON object immediately

B. A Promise

C. An HTML element

D. A React component

**Answer:** B

## 5. What does `await` help us do?

A. Write asynchronous code in a sequential-looking way

B. Create a component

C. Style an element

D. Create a database

**Answer:** A

## 6. Why do we call `response.json()`?

A. To convert JSON into CSS

B. To parse the response body as JSON

C. To send another request

D. To create a React component

**Answer:** B

## 7. Why do we store API results in React state?

A. So React can respond to the changed data

B. To make HTTP faster

C. To replace JavaScript

D. To create HTML files

**Answer:** A

## 8. Why can an API request inside the component body be dangerous?

A. It may run again whenever the component renders

B. It cannot access JavaScript

C. It changes CSS

D. It disables HTML

**Answer:** A

## 9. What problem does `useEffect` help us handle?

A. Styling

B. Side effects such as API requests

C. HTML syntax

D. Git commits

**Answer:** B

## 10. Which is an empty state?

A. Server returned an error

B. Network is disconnected

C. Request succeeded but there are no results

D. JavaScript syntax is invalid

**Answer:** C

---

# 64. Independent Challenge

Now stop following the instructor's exact steps.

Add one improvement to your News App.

Choose one:

### Challenge A — Clear Search

Add:

```text
[Clear]
```

Clicking it should clear the search field.

### Challenge B — Search Message

Display:

```text
Showing results for: React
```

using the current search value.

### Challenge C — Result Count

Display:

```text
12 articles found
```

based on the returned array.

### Challenge D — Retry

When an API request fails, show:

```text
Try Again
```

and make it repeat the request.

### Challenge E — Minimum Search Length

Do not allow searches shorter than two characters.

---

# 65. Stretch Challenge — Refresh

Add:

```text
[Refresh]
```

The button should request the news again.

Think carefully:

- Where should the request function live?
- What state changes?
- What happens to loading?
- What happens to an old error?
- What happens if the request fails again?

Do not start coding until you can describe the flow.

---

# 66. Day 2 Architecture Checkpoint

Your application should now resemble:

```text
App
│
├── Header
│
├── SearchBar
│      │
│      └── Search State
│
├── NewsList
│      │
│      ├── Loading State
│      ├── Error State
│      ├── Empty State
│      │
│      └── NewsCard
│
└── Footer
```

And the data flow is approximately:

```text
User
 ↓
Search Form
 ↓
Validation
 ↓
HTTP Request
 ↓
News API
 ↓
JSON Response
 ↓
React State
 ↓
NewsList
 ↓
NewsCard
```

---

# 67. Git Checkpoint

At the end of a meaningful working stage, commit your work according to your class Git workflow.

A suitable commit message could be:

```text
feat: connect news app to API
```

Before committing:

- [ ] Application runs.
- [ ] Search input works.
- [ ] Validation works.
- [ ] API request works.
- [ ] Results render.
- [ ] Loading state works.
- [ ] Error state works.
- [ ] Empty state works.
- [ ] No secret API keys are committed.

---

# 68. Day 2 Final Checklist

## Forms

- [ ] I can create a controlled input.
- [ ] I understand `value`.
- [ ] I understand `onChange`.
- [ ] I can submit a form.
- [ ] I understand `preventDefault()`.

## Validation

- [ ] I can validate a search term.
- [ ] I can display a validation message.
- [ ] I understand why validation should happen before the API call.

## APIs

- [ ] I understand request/response at a basic level.
- [ ] I can inspect a request in DevTools.
- [ ] I can inspect a response.
- [ ] I understand JSON response data.

## Async JavaScript

- [ ] I understand that `fetch()` is asynchronous.
- [ ] I know that `fetch()` returns a Promise.
- [ ] I can use `async/await`.
- [ ] I can parse JSON.

## React

- [ ] I can store API results in state.
- [ ] I understand why API work should not simply run during every render.
- [ ] I understand the basic purpose of `useEffect`.
- [ ] I can represent loading, success, empty, and error states.

## Debugging

- [ ] I can inspect the Network tab.
- [ ] I can inspect the Console.
- [ ] I can inspect an API response.
- [ ] I can distinguish a request failure from an empty result.
- [ ] I can explain the cause of a bug rather than only its fix.

---

# 69. Exit Ticket

Answer without looking at your notes.

### 1.

What makes an input a controlled input?

### 2.

What is the flow from typing into the SearchBar to updating React state?

### 3.

Why do we use `preventDefault()`?

### 4.

What does `fetch()` return?

### 5.

Why do we use `await response.json()`?

### 6.

Why should we inspect the API response before writing the rendering code?

### 7.

Why is an API request considered a side effect?

### 8.

What problem can happen if an API request is placed directly inside a component's render logic?

### 9.

What is the purpose of `useEffect` in today's News App?

### 10.

What is the difference between:

```text
Loading
Error
Empty
Success
```

### 11.

If the Network tab shows a successful request but the page shows no cards, what would you investigate next?

### 12.

Explain today's News App data flow in one sentence.

---

# 70. Homework

Complete the News App so that it:

1. Has a working SearchBar.
2. Uses a controlled input.
3. Validates the search.
4. Sends a request to the selected API.
5. Uses `fetch()`.
6. Uses `async/await`.
7. Parses JSON.
8. Stores results in React state.
9. Uses `useEffect` where appropriate.
10. Displays loading state.
11. Displays error state.
12. Displays empty state.
13. Displays successful results using `NewsCard`.

---

# 71. Debugging Homework

Intentionally create these problems and diagnose them.

## Bug 1 — Controlled Input

Remove the `onChange` handler.

Write down:

```text
Expected:
Actual:
Cause:
Fix:
```

## Bug 2 — API URL

Break the API URL.

Use DevTools to determine what failed.

Write:

```text
Request:
Status:
Response:
Cause:
Fix:
```

## Bug 3 — Wrong Response Property

Use the wrong property when rendering the results.

Example:

```jsx
data.articles
```

when your API uses another property.

Diagnose it using:

```jsx
console.log(data);
```

## Bug 4 — Repeated Requests

Experiment with the API request placement or effect dependencies in a controlled development environment.

Use the Network tab.

Answer:

> Why did the request repeat?

## Bug 5 — Stuck Loading

Create a path where:

```jsx
loading
```

never becomes false.

Diagnose:

> Which state transition is missing?

---

# 72. The Staircase Between Day 1 and Day 2

Morning of Day 1:

```text
React
 ↓
Local data
 ↓
Components
 ↓
UI
```

Evening of Day 2:

```text
User
 ↓
Form
 ↓
Validation
 ↓
HTTP request
 ↓
API
 ↓
JSON
 ↓
React state
 ↓
UI
```

The application is no longer just displaying hard-coded information.

It is now responding to:

- User input
- Network activity
- Asynchronous results
- Loading
- Errors
- Empty results

That is a major step toward building real client-side applications.

> **Tagline:** The effect asks for data; the dependency array says when to ask again — and today you stopped guessing and started asking the right way.

## Next Gate: The Flow Gate

The Data Gate is closed. Tomorrow the ninja enters the **Flow Gate**:

> *"How does the URL become a page, and a page become navigation?"* Every new tool answers an old question — and the Flow Gate's tools answer the question left behind by one-screen apps.

---

# Using AI at the Data Gate

AI can explain why `fetch()` failed, show you how to read a Network response, or review your effect. Use it as a sparring partner, not a substitute.

**Good prompt:**

> "I got `TypeError: Cannot read properties of undefined (reading 'title')` after my fetch. Give me hints on what to inspect first, then explain."

**Bad prompt:**

> "Fix my API code."

The rule of the temple:

> **You learn by explaining the fix yourself.** If you cannot explain the data flow from URL to UI, the gate is not yet closed.

---

# 73. Day 2 Golden Rule

> **Never guess what the API returned. Inspect it.**

When the API feature breaks:

```text
Don't guess.
Don't copy a random fix.

Check the request.
Check the status.
Check the response.
Check the data shape.
Check the state.
Check the rendering.
Then fix the cause.
```

The most valuable skill today is not memorizing `fetch()` or `useEffect`.

It is learning to answer:

> **“What exactly is happening between the user's action, the API request, the response, React state, and the UI?”**

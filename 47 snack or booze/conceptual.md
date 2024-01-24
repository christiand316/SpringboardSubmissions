### Conceptual Exercise

Answer the following questions below:

- What is the purpose of the React Router?
  To allow URL-based navigation of React components. Commonly, the React components we'll render will be pages and layouts such as `UserPage`.

- What is a single page application?
  A SPA is an application that doesn't redirect to new pages, and instead, all modifications occur to the document you were originally in.

- What are some differences between client side and server side routing?
  Client-side routing is when a link click's normal behavior is interrupted or when new content is requested upon a certain action such as automatic navigation, and instead of redirecting to a new page and requesting a new document body, selective updates to the UI will be made.
  In server-side routing, "normal" navigation occurs and you request a new document body each time you want to display a new page.
  The main differences is that server-side routing has SEO optimization, while client-side routing may reduce the total size of requests made due to re-using layouts and not requesting whole new documents.

- What are two ways of handling redirects with React Router? When would you use each?
  You can either use a <Redirect/> component, use a programmatic `redirect` or `useNavigate` function, or manually use .push on the history object.
  There is no remarkable difference between them besides the difference between `redirect` and `useNavigate` being used whether for normal navigation (useNavigate) or in response to an event (such as a fetch event to trigger redirect)
  Use `history.push` to programmatically update the URL and change location immediately.

- What are two different ways to handle page-not-found user experiences using React Router?
  You can either have a fallback 404 or dynamically generate a 404 by matching that route.
  There is no remarkable difference between these two, besides the former being more idiomatic.

- How do you grab URL parameters from within a component using React Router?
  Use useParams while being a route that has a path that has dynamic paths, such as `/user/:userId/`

- What is context in React? When would you use it?
  Context in React is a way to pass state around without using props. It's useful for providing more expansive states where using props may be unwieldly, such as and especially global state or component sets that are met to work together.

- Describe some differences between class-based components and function
  components in React.
  Function components are more memory performant, more concise to write, and can take advantage of hooks, while class-based components may sometimes allow more tailoring and optimization via reuse and offer the usage of certain APIs such as componentWillUnmount

- What are some of the problems that hooks were designed to solve?
  Hooks allows use of React features outside of components in reusable, isolated functions. Instead of having to repeat code, you can define a reusable hook to achieve a certain function and interact with it like any other React hook.

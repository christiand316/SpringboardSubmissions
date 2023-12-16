### Conceptual Exercise

Answer the following questions below:

- What is React? When and why would you use it?
React is a frontend framework for creating HTML and having convenient packaging, state management, and separation of concerns between elements.
You should use any framework such as Angular, Vue, or React when messing with larger projects, as vanilla JS tends to suffer when it comes to scalability due to its lack of components.

- What is Babel?
Babel is used to transpile modern JavaScript, React code, and Typescript into something browsers can interpret and display, and polyfill to improve backwards compatability.
It's an essential part of the build process.

- What is JSX?
JSX is HTML markup in JS, which needs to be interpreted in a specific way to actually generate the HTML structure underneath.

- How is a Component created in React?
You can create a component by returning something interpretable as a React node (generally, JSX).
React then builds the tree by calling `render` repeatedly on JSX code.

- What are some difference between state and props?
Props are immutable and passed from parents to children, while state is contained within its own component (and may still be passed around to children).

- What does "downward data flow" refer to in React?
React prefers a downward data flow, which means that parents affect children, but you can only affect parents if the parents expose it through props or context (such as allowing a child component to call a function that was passed down)

- What is a controlled component?
A controlled component means that a component's state closely is tied to the props and values the parent passes to it.

- What is an uncontrolled component?
An uncontrolled component means that a component manages more of its own state and behaviors and is less dictated by its parent.

- What is the purpose of the `key` prop when rendering a list of components?
The key prop is essential to pass so that React knows what elements in a list are removed or not, due to React being designed to not distinguish between components with the same DOM structure.

- Why is using an array index a poor choice for a `key` prop when rendering a list of components?
This is because React expects unique keys during reconcilation to uniquely identify components. If we use index, then an element we just removed will likely have that index still be in there, which confuses React
and causing all sorts of unintended behaviors.

- Describe useEffect.  What use cases is it used for in React components?
useEffect allows us to interact with code and systems outside of React, such as API requests or other JS libraries.
We get to determine when useEffect reruns: when a value changes or only run once (or we can make it run every re-render, but that removes the point of using useEffect)
A key case is when we call async code in React. Only the most modern React code supports Suspense + async client-side React components, so this is the only part where we can use async code like a fetch request.

- What does useRef do?  Does a change to a ref value cause a rerender of a component?
useRef allows us to maintain a stable reference to a value across rerenders, including HTML components or React components.
Ref values aren't changed across rerenders.

- When would you use a ref? When wouldn't you use one?
Similar to useEffect, useRef allows us to interact with systems outside of React's control. For example, we can target a chart made in d3.js and interact with it using refs, or we can get certain properties such as an element's width or the screens resolution.
We don't use useRef when we're trying to do something like update a value on the screen; we're going to need useState to actually display useRef's value if we, for example, wanted the live value of an element's property to be rendered as its updated.

- What is a custom hook in React? When would you want to write one?
A custom hook is simply reusable code in React. We use them when we want to reduce code duplication and/or centralize our logic into specific hooks.
They differ from normal helper functions in that we're going to use React's APIs such as useState or useContext, which means that our hooks are usually going to involve rerendering logic (such as a custom useAxios hook that'll store data and status in a useState)
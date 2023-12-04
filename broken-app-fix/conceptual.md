### Conceptual Exercise

Answer the following questions below:

- What are some ways of managing asynchronous code in JavaScript?

You can use async/await, promises, or callbacks to manage async codes. Since async/await use promises underneath the surface, we can still interface with promises using async and await keywords.

- What is a Promise?

A promise is an object that needs to resolve first before being usable. You can chain callbacks to it with .then, .catch, and .finally 

- What are the differences between an async function and a regular function?

The differences are that an async function returns a promise that can be awaited for with the `await` keyword, whereas a regular function will return its value normally.

- What is the difference between Node.js and Express.js?

Express.js adds a significant amount of helper functionalities to Node.js, such as router objects, route pattern matching, parsing, and more.

- What is the error-first callback pattern?

Error-first means that the first argument in a callback will be an error object. We can check to see if an error has occurred by checking that object before continuing with our logic.

- What is middleware?

Middleware is any type of function that processes a request, does logic, and passes it along such as checking if a user is authenticated or to parse a body.

- What does the `next` function do?

`Next` tells an Express middleware function to begin the next route in its chain.

- What are some issues with the following code? (consider all aspects: performance, structure, naming, etc)

The main issues are that we're awaiting for each function one-by-one. Instead, we can run the awaits in parallel with `Promises.all()`. As a fallback, to prevent unresolved promises,
we can add a timeout to auto-reject after a certain amount of time has passed.

Another issue is with the names: we should probably give this data more meaningful names and add the object directly to a `results` array.

Finally, another significant problem is that we're fetching for 3 users, while the function is called a generic `getUsers` which implies that we're getting a list of all users.
We can fix that by returning all users, or by renaming `getUsers` to `getUsersByName` and asking for an array of strings for names.

```js
async function getUsers() {
  const elie = await $.getJSON('https://api.github.com/users/elie');
  const joel = await $.getJSON('https://api.github.com/users/joelburton');
  const matt = await $.getJSON('https://api.github.com/users/mmmaaatttttt');

  return [elie, matt, joel];
}
```

### Conceptual Exercise

Answer the following questions below:

- What is a JWT?
A JWT is a signed token that contains an encoded (but not encrypted) payload + headers, and a signature. The signature is signed by a secret key on the 
server.

- What is the signature portion of the JWT?  What does it do?
The signature attests to the fact of whether this JWT's payload is legitimate and has been signed by the server's secret key.
You can see whether two JWTs match by having the private key, use a JWT encoding algorithm on the payload + headers, and seeing if the resulting strings are the same.

- If a JWT is intercepted, can the attacker see what's inside the payload?
Yes, which is why we should store information that identifies a user in the database (e.g., user ID, name, or email) rather than something that authorizes a user (so never have a password, social security info, etc. in a JWT)

- How can you implement authentication with a JWT?  Describe how it works at a high level.
You'll have a way for users to generate the initial JWT, and then you'll send them a JWT with some information that identifies them as that user,
generally with a unique key on a database like an user_id or email.
Then, you'll have resources that require a JWT to access (simply being logged in, requiring certain user permission levels like moderator or admin, or being that user who owns that resource).
Whenever they access that resource, we'll decode the JWT and compare the signature to that payload signed with our secrey key. If everything matches, then that JWT was made on our servers unless if our secret was leaked.

- Compare and contrast unit, integration and end-to-end tests.
Unit: We're testing the tiniest piece of functionality, such as individual functions or routes, for logical errors, edge cases, and general correctness.
-ex: checking to see if "convert datetime to friendly string" converts various datetimes and non-datetimes into either friendly strings (a day ago, an hour ago) or errors correctly (received bad input "beepbop")

Integration: We're testing larger pieces of functionality such as our models or a workflow in our system to ensure that our systems are functional at large.
-ex: making an integration test of our User models to see if they're working as expected at large

End-to-end: We create an environment similar to the one that a user does in an extensive and lengthy test to attest whether our system would work to how we think in the hands of a user.
-ex: making an end-to-end test for a course platform might involve a test user navigating to their courses, opening one up, and checking whether content is displayed.

- What is a mock? What are some things you would mock?
A mock is when we have to replicate the functionality of a system that our code depends for a variety of reasons, such as its infeasible to have that system up or that system isn't developed yet but we have an API for it right now.
We'd mock things like database connections, outside API connections, etc.

- What is continuous integration?
CI is continuously developing, testing, and integrating code into deployment with the use of automated testing and deployment pipelines.

- What is an environment variable and what are they used for?
Environment variables are hidden variables that for resources that are hidden and exclusive or affects our runtime behaviour significantly (such as whether we're in a testing env or how much storage we have).
 They're injected into servers at startup, such as their hostname URL or database URI string.

- What is TDD? What are some benefits and drawbacks?
Test-driven developmment is creating tests first and then developing until it passes those minimum requirements.
It's excellent for ensuring strict adherence to API and reducing "meandering" when coding, because you're entirely focused on simply getting it to pass.
However, it contains some flaws in that sometimes we simply don't know what we want our code to do or look like sometimes, and strict TDD may not be preferably to a more loose and exploratory yet still test-oriented approach.

- What is the value of using JSONSchema for validation?
You should always validate data coming from outside sources, including request bodies.
Without this, you're relying on the database to fail on more general types (like we want only emails or URLs, but our email has the more general "string" constraint) or allowing users to do illegal operations.

- What are some ways to decide which code to test?
Generally, you should have very high code coverage on backend applications, while front-end applications are generally good with a spot check (developer manually checks around the deployed app for correctness) for smaller, less crucial applications.
The more crucial it is to your business logic, the more testing you should have to ensure correctness.

- What does `RETURNING` do in SQL? When would you use it?
After an insert, we can retrieve some columns with returning. Depending on our API design, we might want to return the data of a newly created resource (such as its autogenerated ID).

- What are some differences between Web Sockets and HTTP?
HTTP is non-stateful and requires the client to make repeated requests to the server and poll them, while web sockets are a stateful bilateral connection that don't require polling and simply rely on pushing.
Web sockets are excellent for real time applications such as messages or video chats, but with the caveat of them requiring server resources to keep alive.

- Did you prefer using Flask over Express? Why or why not (there is no right
  answer here --- we want to see how you think about technology)?
I prefer using Express over Flask, because I enjoy the structure that JavaScript and TypeScript can bring. Making classes, manipulating objects, having bracket-based scopes instead of white space, etc. feels more natural than messing with Python.
I also enjoy having my frontend language be the same as my backend language.
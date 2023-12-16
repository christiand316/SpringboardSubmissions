# Jobly Backend

REQUIREMENTS:
- Test-driven development, testing both routes and models
- Documenting code changes along the way
- Use Zod as the schema verifier

TODO:
- [x] Set up database
- [x] Fix config.test.js logical error on:
>   expect(config.getDatabaseUri()).toEqual("postgresql:///jobly");
>   process.env.NODE_ENV = "test";
>   expect(config.getDatabaseUri()).toEqual("postgresql:///jobly_test");

>    const port = config.PORT
>    expect(port.toString()).toEqual("5000");
-   Reasoning: prescribed URI structure does not match system configuration
- [x] Test sql.test.js 
- [x] Create and test search config function `findAllByOptions(searchConfig)` on `company.js`
- [x] Prevent SQL injections on said search config function + test sanitization function `sanitizeString(unsanitized)`
    - NOTE: considering extracting to /helpers, but not going to right now
- [X] Make auth middleware for admin-protecting routes on companies
- [X] Test those routes
    - [X] Add testing with u1token (authenticated but not authorized, regular user)
    - [X] Add testing with u2token (authenticated and authorized, admin)
- [X] Now do the same with users
    - NOTE: Added middleware function `checkAdminOrIsSelfUser` in `user.js`. Had to colocate middleware
    - otherwise the middleware couldn't catch the params
- [X] Make job schema
- [X] Make job model
- [X] Test job model
- [X] Make job route
- [X] Test job route
- [X] Allow to fetch job data from user

NOTES: 
handle = company ID

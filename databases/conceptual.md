### Conceptual Exercise

Answer the following questions below:

- What is PostgreSQL?
  PostgreSQL is a relational database manager supporting SQL features.

- What is the difference between SQL and PostgreSQL?
  SQL is a query language that can interact with any database that supports it, such as PostgreSQL or SQLite or even non-relational DBs like MongoDB (as SQL is a spec, and doesn't require a relational database)

- In `psql`, how do you connect to a database?
  Use \c to connecto to a database.

- What is the difference between `HAVING` and `WHERE`?
  Having is simply a conditional `WHERE` statement for aggregated queries, acting as a filter after the main operations have concluded (such as any filtering that occurred with WHERE)

- What is the difference between an `INNER` and `OUTER` join?
  Inner joins requires the value to be defined on both sides, while outer join permits one table to not have a value. Essentially, inner is a logical `AND` and outer is a logical `OR` for nullability.

- What is the difference between a `LEFT OUTER` and `RIGHT OUTER` join?
  Includes all values on the left or right joined table respectively, while dropping null values on the other table.

- What is an ORM? What do they do?
  An ORM maps the database to interactive objects that expose DB operations in a more controlled and restrictive manner (such as checking if a value exists first, or demanding that a query be well-structured)

- What are some differences between making HTTP requests using AJAX
  and from the server side using a library like `requests`?
  AJAX is a more abstracted version of a request, with some set defaults. However, `requests` is more low-level and requires more boilerplate to make simple requests.

- What is CSRF? What is the purpose of the CSRF token?
  CSRF, also known as cross-site request forgery, is a type of exploit where an attacker makes a request (such as a malicious user script) on the user's computer to a protected resource, exploiting their session.
  CSRF tokens mitigate this by adding a unique identifier to certain protected actions which is not guessable by attackers, and the receiving server will ignore requests that didn't have a valid CSRF tokne.

- What is the purpose of `form.hidden_tag()`?
  This is a field that WTF adds for the sole purposes of sending a CSRF token during the request. It does some cookie magic to send over that cookie in the request.

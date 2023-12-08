/** Common config for bookstore. */

require("dotenv").config()

const DB_URI = (process.env.NODE_ENV === "test")
  ? process.env.TEST_DB_URI
  : process.env.PROD_DB_URI;

module.exports = { DB_URI };
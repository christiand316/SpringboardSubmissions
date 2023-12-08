const express = require("express");
const app = express();
const ExpressError = require("./expressError")
const {query} = require("./db")
const companyRouter = require("./routes/companies");
const invoicesRouter = require("./routes/invoices");

app.use(express.json());
app.use("/company", companyRouter)
app.use("/invoices", invoicesRouter)


/** 404 handler */

app.use(async function(req, res, next) {
  const err = new ExpressError("Not Found", 404);
  return next(err);
});

/** general error handler */

app.use(async (err, req, res, next) => {
  res.status(err.status || 500);

  return res.json({
    error: err,
    message: err.message
  });
});


module.exports = app;

const express = require("express");
const Book = require("../models/book");
const BookUpdate = require("../schemas/schemabookupdate.json")
const BookCreate = require("../schemas/schemabookcreate.json")
const {validate} = require("jsonschema")
const ExpressError = require("../expressError")

const router = new express.Router();


/** GET / => {books: [book, ...]}  */

router.get("/", async function (req, res, next) {
  try {
    const books = await Book.findAll();
    return res.json( books );
  } catch (err) {
    return next(err);
  }
});

/** GET /[id]  => {book: book} */

router.get("/:id", async function (req, res, next) {
  try {
    const id = req.params.id
    if (!id) {
      return next(ExpressError(`Requiring ID`, 400))
    }
    const book = await Book.findOne(id);
    return res.json( book );
  } catch (err) {
    return next(err);
  }
});

/** POST /   bookData => {book: newBook}  */

router.post("/", async function (req, res, next) {
  try {
    const parseResult = validate(req.body, BookCreate)
    if(!parseResult.valid)
    {
      return next({status: 400, error: parseResult.errors.map(e => e.stack)})
    }
    const book = await Book.create(req.body);
    return res.status(201).json(book);
  } catch (err) {
    return next(err);
  }
});

/** PUT /[isbn]   bookData => {book: updatedBook}  */

router.put("/:isbn", async function (req, res, next) {
  try {
    const parseResult = validate(req.body, BookUpdate)
    if(!parseResult.valid)
    {
      return next({status: 400, error: parseResult.errors.map(e => e.stack)})
    }
    const previousBook = await Book.findOne(req.params.isbn)
    const book = await Book.update(req.params.isbn, {...previousBook, ...req.body});
    return res.json(book);
  } catch (err) {
    return next(err);
  }
});

/** DELETE /[isbn]   => {message: "Book deleted"} */

router.delete("/:isbn", async function (req, res, next) {
  try {
    await Book.remove(req.params.isbn);
    return res.json({ message: "Book deleted" });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;

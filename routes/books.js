const express = require("express");

const router = express.Router();

const slugify = require("slugify");

let books = require("../books");

const {
  createBook,
  bookList,
  updateBook,
  bookDelete,
} = require("../controllers/booksController");

router.get("/", bookList);

router.post("/", createBook);

router.put("/:bookId", updateBook);

router.delete("/:bookId", bookDelete);

module.exports = router;

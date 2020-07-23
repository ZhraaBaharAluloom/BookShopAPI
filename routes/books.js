const express = require("express");

const router = express.Router();

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

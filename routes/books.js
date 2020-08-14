const express = require("express");

const router = express.Router();

const multer = require("multer");
const passport = require("passport");

const {
  bookList,
  updateBook,
  bookDelete,
  fetchBook,
} = require("../controllers/booksController");

const storage = multer.diskStorage({
  destination: "./media",
  filename: (req, file, cb) => {
    cb(null, `${+new Date()}${file.originalname}`);
  },
});

const upload = multer({
  storage,
});

router.param("bookId", async (req, res, next, bookId) => {
  const book = await fetchBook(bookId, next);
  if (book) {
    req.book = book;
    next();
  } else {
    const err = new Error("Book is not found");
    err.status = 404;
    next(err);
  }
});

router.get("/", bookList);

router.put(
  "/:bookId",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  updateBook
);

router.delete(
  "/:bookId",
  passport.authenticate("jwt", { session: false }),
  bookDelete
);

module.exports = router;

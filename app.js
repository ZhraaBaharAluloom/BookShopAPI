const express = require("express");
let books = require("./books");
const cors = require("cors");

const app = express();

app.use(cors());

app.get("/books", (req, res) => {
  res.json(books);
});

app.delete("/books/:bookId", (req, res) => {
  const { bookId } = req.params;
  const foundBook = books.find((book) => book.id === +bookId);

  if (foundBook) {
    books = books.filter((book) => book.id != +bookId);
    res.status(204).end();
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

app.listen(8000, () => {
  console.log("hello");
});

const express = require("express");
let books = require("./books");
const cors = require("cors");
const bodyParser = require("body-parser");
const slugify = require("slugify");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/books", (req, res) => {
  res.json(books);
});

app.post("/books", (req, res) => {
  const id = books[books.length - 1].id + 1;
  const slug = slugify(req.body.name, { lower: true });
  const newBook = { id, slug, ...req.body };
  books.push(newBook);
  res.status(201).json(newBook);
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

let books = require("../books");
const slugify = require("slugify");

exports.bookList = (req, res) => {
  res.json(books);
};

exports.createBook = (req, res) => {
  const id = books[books.length - 1].id + 1;
  const slug = slugify(req.body.name, { lower: true });
  const newBook = { id, slug, ...req.body };
  books.push(newBook);
  res.status(201).json(newBook);
};

exports.updateBook = (req, res) => {
  const { bookId } = req.params;
  const foundBook = books.find((book) => book.id === +bookId);
  if (foundBook) {
    for (const key in req.body) foundBook[key] = req.body[key];
    res.status(204).end();
  } else {
    res.status(404).json({ message: "book is not found" });
  }
};

exports.bookDelete = (req, res) => {
  const { bookId } = req.params;
  const foundBook = books.find((book) => book.id === +bookId);

  if (foundBook) {
    books = books.filter((book) => book.id != +bookId);
    res.status(204).end();
  } else {
    res.status(404).json({ message: "Not found" });
  }
};

let books = require("../books");
const slugify = require("slugify");
const { Book } = require("../db/models");

exports.bookList = async (req, res) => {
  try {
    const books = await Book.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });

    res.json(books);
  } catch (error) {
    res.status(500).json({ message: "Book is NOT found!" });
  }
};

exports.createBook = async (req, res) => {
  try {
    const newBook = await Book.create(req.body);
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateBook = async (req, res) => {
  const { bookId } = req.params;
  try {
    const foundBook = await Book.findByPk(bookId);
    if (foundBook) {
      await foundBook.update(req.body);
      res.status(204).end();
    }
  } catch (error) {
    res.status(500).json({ message: "Nope, it can NOT be that cheep" });
  }
};

exports.bookDelete = async (req, res) => {
  const { bookId } = req.params;
  try {
    const foundBook = await Book.findByPk(bookId);
    if (foundBook) {
      await foundBook.destroy();
      res.status(204).end();
    }
  } catch (error) {
    res.status(500).json({ message: "Oops" });
  }
};

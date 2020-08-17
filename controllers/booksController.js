//Data
const { Book, Vendor } = require("../db/models");

exports.fetchBook = async (bookId, next) => {
  try {
    const book = await Book.findByPk(bookId, {
      include: {
        model: Vendor,
        as: "vendor",
        attributes: ["userId"],
      },
    });
    return book;
  } catch (error) {
    next(error);
  }
};

exports.bookList = async (req, res, next) => {
  try {
    const books = await Book.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: [
        {
          model: Vendor,
          as: "vendor",
          attributes: ["name"],
        },
      ],
    });

    res.json(books);
  } catch (error) {
    next(error);
  }
};

exports.updateBook = async (req, res, next) => {
  try {
    if (req.user.id === req.book.vendor.userId) {
      if (req.file) {
        req.body.image = `${process.env.PORT ? "https" : "http"}://${req.get(
          "host"
        )}/media/${req.file.filename}`;
      }
      await req.book.update(req.body);
      res.status(204).end();
    } else {
      const err = new Error("Unauthorized");
      err.status = 401;
      next(err);
    }
  } catch (error) {
    next(error);
  }
};

exports.bookDelete = async (req, res, next) => {
  try {
    if (req.user.id === req.book.vendor.userId) {
      await req.book.destroy();
      res.status(204).end();
    } else {
      const err = new Error("Unauthorized");
      err.status = 401;
      next(err);
    }
  } catch (error) {
    next(error);
  }
};

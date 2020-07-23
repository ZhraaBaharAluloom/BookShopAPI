const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const bookRouters = require("./routes/books");
const db = require("./db/db");
const { Book } = require("./db/models");

const app = express();

const run = async () => {
  try {
    await db.sync();
    console.log("Connection to the database successful!");
    // const newBook = await Book.create({ name: "Some book" });
    // console.log(newBook.toJSON());
    // const books = await Book.findAll();
    // books.forEach((book) => console.log(book.toJSON()));
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }
};

run();

app.use(cors());
app.use(bodyParser.json());

app.use("/books", bookRouters);

app.listen(8000, () => {});

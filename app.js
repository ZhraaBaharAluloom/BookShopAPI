const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const bookRouters = require("./routes/books");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/books", bookRouters);

app.listen(8000, () => {});

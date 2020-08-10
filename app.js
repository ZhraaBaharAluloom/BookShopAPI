const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const db = require("./db/db");
const { Book } = require("./db/models");
const passport = require("passport");
const { LocalStrategy } = require("./middleware/passport");

// Routes
const bookRouters = require("./routes/books");
const vendorRoutes = require("./routes/vendors");
const usersRoutes = require("./routes/users");


const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize())
passport.use(LocalStrategy)

//Routers
app.use("/vendors", vendorRoutes);
app.use("/books", bookRouters);
app.use(usersRoutes);

app.use("/media", express.static(path.join(__dirname, "media")));

//Not Found Paths
app.use((req, res, next) => {
  const error = new Error("Path Not Found");
  error.status = 404;
  next(error);
});


//Error Handling Middleware
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json(err.message || "Internal Server Error");
});

const run = async () => {
  try {
    await db.sync();
    console.log("Connection to the database successful!");
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }
  await app.listen(8000, () => {
    console.log("This application is running on localhost:8000");
  });
};
run();

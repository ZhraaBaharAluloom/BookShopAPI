const { Sequelize } = require("sequelize");

const db = new Sequelize({
  username: "postgres",
  password: "HiamTheStar@95",
  database: "bookshop-db",
  dialect: "postgres",
  host: "localhost",
});

module.exports = db;

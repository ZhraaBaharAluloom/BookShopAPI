const { DataTypes, Model } = require("sequelize");

const db = require("../db");

class Book extends Model {}

Book.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      defaultValue: 4,
      validate: {
        min: 1,
      },
    },
    genre: {
      type: DataTypes.STRING,
    },
    author: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    delivery: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
  }
);

module.exports = Book;

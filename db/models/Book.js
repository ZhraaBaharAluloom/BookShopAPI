const { DataTypes, Model } = require("sequelize");
const SequelizeSlugify = require("sequelize-slugify");

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
    slug: {
      type: DataTypes.STRING,
      unique: true,
    },
    description: {
      type: DataTypes.STRING,
    },
    released: {
      type: DataTypes.STRING,
    },
   
    image: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: db,
  }
);

SequelizeSlugify.slugifyModel(Book, {
  source: ["name"],
  slugOptions: { lower: true },
});

module.exports = Book;

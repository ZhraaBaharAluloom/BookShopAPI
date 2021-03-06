const { DataTypes, Model } = require("sequelize");
const SequelizeSlugify = require("sequelize-slugify");

const db = require("../db");

class Vendor extends Model {}

Vendor.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      unique: true,
    },

    image: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: db,
  }
);

SequelizeSlugify.slugifyModel(Vendor, {
  source: ["name"],
  slugOptions: { lower: true },
});

module.exports = Vendor;

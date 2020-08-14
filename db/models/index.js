const Book = require("./Book");
const Vendor = require("./Vendor");
const User = require("./User");
const { use } = require("passport");

Vendor.hasMany(Book, { as: "books", foreignKey: "vendorId" });
Book.belongsTo(Vendor, { as: "vendor" });

User.hasOne(Vendor, { as: "user", foreignKey: "userId" });
Vendor.belongsTo(User, { as: "vendor" });

module.exports = {
  Book,
  Vendor,
  User,
};

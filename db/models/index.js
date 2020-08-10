const Book = require("./Book");
const Vendor = require("./Vendor");
const  User = require("./User")

Vendor.hasMany(Book, { as: "books", foreignKey: "vendorId" });
Book.belongsTo(Vendor, { as: "vendor" });

module.exports = {
  Book,
  Vendor,
  User,
};

const Book = require("./Book");
const Vendor = require("./Vendor");
const User = require("./User");
const Order = require("./Order");

Vendor.hasMany(Book, { as: "books", foreignKey: "vendorId" });
Book.belongsTo(Vendor, { as: "vendor" });

User.hasOne(Vendor, { as: "user", foreignKey: "userId" });
Vendor.belongsTo(User, { as: "vendor" });

User.hasMany(Order, { as: "orders", foreignKey: "userId" });
Order.belongsTo(User, { as: "user" });

module.exports = {
  Book,
  Vendor,
  User,
  Order,
};

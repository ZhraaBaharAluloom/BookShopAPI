const Book = require("./Book");
const Vendor = require("./Vendor");
const User = require("./User");
const Order = require("./Order");
const OrderItem = require("./OrderItm");

// Vendor & Book
Vendor.hasMany(Book, { as: "books", foreignKey: "vendorId" });
Book.belongsTo(Vendor, { as: "vendor" });

// User & Vendor
User.hasOne(Vendor, { as: "user", foreignKey: "userId" });
Vendor.belongsTo(User, { as: "vendor" });

// User & Order
User.hasMany(Order, { as: "orders", foreignKey: "userId" });
Order.belongsTo(User, { as: "user" });

// Order & Book
Order.belongsToMany(Book, { through: OrderItem, foreignKey: "orderId" });
Book.belongsToMany(Order, { through: OrderItem, foreignKey: "bookId" });

module.exports = {
  Book,
  Vendor,
  User,
  Order,
};

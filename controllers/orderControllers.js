const { Order } = require("../db/models");
const OrderItem = require("../db/models/OrderItm");

exports.checkout = async (req, res, next) => {
  try {
    const newOrder = await Order.create({ userId: req.user.id });
    const newItem = req.body.map((item) => ({
      ...item,
      orderId: newOrder.id,
    }));
    const newOrderItems = await OrderItem.bulkCreate(newItem);
    res.status(201).json(newOrderItems);
  } catch (error) {
    next(error);
  }
};

const { Order } = require("../db/models");

exports.checkout = async (req, res, next) => {
  try {
    const newOrder = await Order.create({ userId: req.user.id });
    // const orderItem = {
    //   ...req.body,
    //   orderId: newOrder.id,
    // };
    // const newItem = await OrderItem.create(orderItem);
    res.json(newOrder);
  } catch (error) {
    next(error);
  }
};

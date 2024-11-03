const { Order } = require("../models/index");
const { OrderItem } = require("../models/index");
const { Stock } = require("../models/index");
const HttpError = require("../services/HttpError");


// select OrderItem by Id
const getting = async (req, res, next) => {
  try {
    const id = req.params.id;
    const orderItem = await OrderItem.findByPk(id);
    if (!orderItem) {
      return next(new HttpError("Couldn't find order Item", 404));
    }
    res.status(200).json(orderItem);
  } catch (err) {
    next(err);
  }
};

// select all OrderItems for all Orders
const gettingAll = async (req, res, next) => {
  try {
    const orderItem = await OrderItem.findAll();
    if (!orderItem || orderItem.length === 0) {
      return next(new HttpError("No order item found", 404));
    }
    res.status(200).json(orderItem);
  } catch (err) {
    next(err);
  }
};

// create a new OrderItem
const creating = async (req, res, next) => {
  try {
    const { price, count, orderId, stockId } = req.body;
    if (!price || !count || !orderId || !stockId) {
      return next(new HttpError("Not enough data for creating Order item", 400));
    }
    // chack if there is an Order record with given orderId
    const order = await Order.findByPk(orderId);
    if (!order) {
      return next(new HttpError("Couldn't find existing order", 404));
    }
    // chack if there is a Stock record with given stockId
    const stock = await Stock.findByPk(id);
    if (!stock) {
      return next(new HttpError("Couldn't find existing stock", 404));
    }

    // OK - insert a new OrderItem record
    const orderItem = await OrderItem.create({ price: price, count: count, OrderId: orderId, StockId: stockId });
    if (!orderItem) {
      return next(new HttpError("Problem creating Order Item", 500));
    }
    res.status(201).json(orderItem); 
  } catch (err) {
    next(err);
  }
};

// update existing OrderItem
const updating = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { price, count, orderId, stockId } = req.body;
    const [updated] = await OrderItem.update(
      { price: price, count: count, OrderId: orderId, StockId: stockId },
      {
        where: { id },
      }
    );
    if (updated === 0) {
      return next(new HttpError("Order item not found or no updates made", 404));
    }
    res.status(200).json("Updated successfully");
  } catch (err) {
    next(err);
  }
};

// delete OrderItem
const deleting = async (req, res, next) => {
  try {
    const id = req.params.id;
    const deleted = await OrderItem.destroy({ where: { id } });
    if (deleted === 0) {
      return next(
        new HttpError("Order item not found or could not be deleted", 404)
      );
    }
    res.status(200).json("Deleted successfully");
  } catch (err) {
    next(err);
  }
};


module.exports = {
  getting,
  gettingAll,
  updating,
  deleting,
  creating,
};

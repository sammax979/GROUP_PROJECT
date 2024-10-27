const { OrderItem } = require("../models/index");
const HttpError = require("../services/HttpError");

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

const creating = async (req, res, next) => {
  try {
    const { price, count, orderId, stockId } = req.body;
    if (!price || !count || !orderId || !stockId) {
      return next(new HttpError("Not enough data for creating Order item", 400));
    }
    const orderItem = await OrderItem.create({ price, count, orderId, stockId });
    if (!orderItem) {
      return next(new HttpError("Problem creating Order Item", 500));
    }
    res.status(201).json(orderItem); 
  } catch (err) {
    next(err);
  }
};

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

const updating = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { price, count, orderId, stockId } = req.body;
    const [updated] = await OrderItem.update(
      { price, count, orderId, stockId },
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

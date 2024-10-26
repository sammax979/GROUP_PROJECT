const { Stock } = require("../models/index");
const HttpError = require("../services/HttpError");

const gettingAll = async (req, res, next) => {
  try {
    const stock = await Stock.findAll();
    if (!stock || stock.length === 0) {
      return next(new HttpError("No stock found", 404));
    }
    res.status(200).json(stock);
  } catch (err) {
    next(err);
  }
};

const creating = async (req, res, next) => {
  try {
    const { size, price, count, modelId } = req.body;
    if (!size || !price || !count || modelId) {
      return next(new HttpError("Not enough data for creating Stock", 400));
    }
    const stock = await Stock.create({ size, price, count, modelId });
    if (!stock) {
      return next(new HttpError("Problem creating Stock", 500));
    }
    res.status(201).json(stock); 
  } catch (err) {
    next(err);
  }
};

const getting = async (req, res, next) => {
  try {
    const id = req.params.id;
    const stock = await Stock.findByPk(id);
    if (!stock) {
      return next(new HttpError("Couldn't find stock", 404));
    }
    res.status(200).json(stock);
  } catch (err) {
    next(err);
  }
};

const updating = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { size, price, count, modelId } = req.body;
    const [updated] = await Stock.update(
      { size, price, count, modelId },
      {
        where: { id },
      }
    );
    if (updated === 0) {
      return next(new HttpError("Stock not found or no updates made", 404));
    }
    res.status(200).json("Updated successfully");
  } catch (err) {
    next(err);
  }
};

const deleting = async (req, res, next) => {
  try {
    const id = req.params.id;
    const deleted = await Stock.destroy({ where: { id } });
    if (deleted === 0) {
      return next(
        new HttpError("Stock not found or could not be deleted", 404)
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

const { Model } = require("../models/index");
const { Stock } = require("../models/index");
const HttpError = require("../services/HttpError");

// get a Stock record by Id
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

// select all Stock records
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

// create new Stock record
const creating = async (req, res, next) => {
  try {
    const { size, price, count, modelId } = req.body;
    if (!size || !price || !count || modelId) {
      return next(new HttpError("Not enough data for creating Stock", 400));
    }
    // cheack if there is an existing Model with given Id
    const model = await Model.findByPk(modelId);
    if (!model) {
      return next(new HttpError("Couldn't find model with given Id", 404));
    }
    // OK - create a new Stock entry
    const stock = await Stock.create({ size: size, price: price, count: count, ModelId: modelId });
    if (!stock) {
      return next(new HttpError("Problem creating Stock", 500));
    }
    res.status(201).json(stock); 
  } catch (err) {
    next(err);
  }
};

// update Stock record
const updating = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { size, price, count, modelId } = req.body;

    // cheack if there is an existing Model with given Id
    const model = await Model.findByPk(modelId);
    if (!model) {
      return next(new HttpError("Couldn't find model with given Id", 404));
    }

    // update Stock record
    const [updated] = await Stock.update(
      { size: size, price: price, count: count, ModelId: modelId },
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

// delete Stock record
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

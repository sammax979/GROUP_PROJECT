const { Model } = require("../models/index");
const { Stock } = require("../models/index");

const HttpError = require("../services/HttpError");

// select all Models
const gettingAll = async (req, res, next) => {
  try {
    const models = await Model.findAll();

    if (models.length === 0) {
      return res.status(200).json("No Models found.");
    }
    res.status(200).json(models);
  } catch (err) {
    next(err);
  }
};

// create a new Model
const creating = async (req, res, next) => {
  try {
    const { name, description, image, BrandId } = req.body;

    if (!name || !description || !image || !BrandId) {
      return next(new HttpError("Not enough data for creating model", 400));
    }
    const model = await Model.create({
      name,
      description,
      image,
      BrandId,
    });

    res.status(201).json(model);
  } catch (err) {
    next(err);
  }
};

// get Model by its Id
const getting = async (req, res, next) => {
  try {
    const id = req.params.id;
    const model = await Model.findByPk(id);
    if (!model) {
      return next(new HttpError("Couldn't find model", 404));
    }
    res.status(200).json(model);
  } catch (err) {
    next(err);
  }
};

// get Models by brand Id
const getModelsbyBrandId = async (req, res, next) => {
  try {
    const id = req.params.id;
    const models = await Model.findAll({ where: { brandId: id } });

    if (models.length === 0) {
      return res.status(200).json("No Models found for the Brand");
    }
    res.status(200).json(models);
  } catch (err) {
    next(err);
  }
};

// delete Model by Id
const deleting = async (req, res, next) => {
  try {
    const id = req.params.id;

    // check ModelId in table Stock
    const stocModelId = await Stock.findOne({ where: { modelId: id } });
    if (stocModelId) {
      return res.status(400).json({ message: "Cannot delete Model because it is associated with Stock. First you need to delete ModelId in Stock" });
    }    
    
    const deleted = await Model.destroy({ where: { id } });

    if (deleted === 0) {
      return next(new HttpError("Model not found or could not be deleted", 404));
    }
    res.status(200).json("Deleted successfully");
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getting,
  gettingAll,
  getModelsbyBrandId,
  deleting,
  creating,
};

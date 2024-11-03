const { Model, Stock, Brand } = require("../models/index");

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

// create a new Model record
const creating = async (req, res, next) => {
  try {
    const { name, description, image, brandId } = req.body;

    if (!name || !description || !image || !brandId) {
      return next(new HttpError("Not enough data for creating model", 400));
    }
    // chack if there is a Brand record with given brandId
    const brand = await Brand.findByPk(brandId);
    if (!brand) {
      return next(new HttpError("Couldn't find brand with given Id", 404));
    }

    // OK - insert a new Model record
    const model = await Model.create({
      name: name,
      description: description,
      image: image,
      BrandId: brandId,
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

    // alternative - get Model with brand Name
    // const model_id = req.params.id;
    // const model = await Model.findAll({
    //   where: { id: model_id },
    //   include: [{
    //       model: Brand,
    //       attributes: ["name"]
    //     },
    //   ]
    // });

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
    const stockModel = await Stock.findOne({ where: { modelId: id } });
    if ( stockModel ) {
      return res.status(500).json({ message: "Cannot delete Model because it is associated with Stock. First you need to delete ModelId in Stock" });
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

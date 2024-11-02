

const { Brand, Model, Stock, Order, OrderItem } = require("../models/index");
const HttpError = require("../services/HttpError");


const sequelize = require("../db/database");

const homepage = async (req, res, next) => {
  try {
      // get all Brands
      const brands = await Brand.findAll( {
      order: ['id']
    });
    if (!brands || brands.length === 0) {
      return next(new HttpError("No brands found", 404));
    }

    // count the nymber of models for each brand
    let models = await Model.findAll({
      attributes: [
        'BrandId',
        [sequelize.fn('COUNT'), 'numModels']
      ],
      group: ['BrandId'],
      order: ['BrandId']
    });
    
    // insert 0 models count for brands without any models in database
    let j=0;
    let num_models = [];
    for (let k=0; k< brands.length; ++k) {
      if ( j >= models.length || brands[k].id < models[j].BrandId ) {
        num_models.push(0);
      }
      else if ( brands[k].id === models[j].BrandId ) {
        num_models.push(models[j].dataValues.numModels);
        ++j;
      }
    }

    // main page - no brand selcted yet -> no models to show
    models = {};
    res.render('index',{
      brands, num_models, models
    });

  } catch (err) {
    next(err);
  }
};

const getModelsByBrand = async (req, res, next) => {
  try {
      // get all Brands
      const brands = await Brand.findAll( {
      order: ['id']
    });
    if (!brands || brands.length === 0) {
      return next(new HttpError("No brands found", 404));
    }

    // count the nymber of models for each brand
    let models = await Model.findAll({
      attributes: [
        'BrandId',
        [sequelize.fn('COUNT'), 'numModels']
      ],
      group: ['BrandId'],
      order: ['BrandId']
    });
    
    // insert 0 models count for brands without any models in database
    let j=0;
    let num_models = [];
    for (let k=0; k< brands.length; ++k) {
      if ( j >= models.length || brands[k].id < models[j].BrandId ) {
        num_models.push(0);
      }
      else if ( brands[k].id === models[j].BrandId ) {
        num_models.push(models[j].dataValues.numModels);
        ++j;
      }
    }

    // get all models for selected brand
    models = await Model.findAll({ where: { BrandId: req.params.id } });
    if (!models || models.length === 0) {
      return next(new HttpError("No brand models found", 404));
    }

    res.render('index',{
      brands, num_models, models
    });
  } catch (err) {
    next(err);
  }
};


const getModelById = async (req, res, next) => {
  try {
    // get model by Id
    const model_id = req.params.id;
    const models = await Model.findAll({
      where: { id: model_id },
      include: [{
          model: Brand,
          attributes: ["name"]
        },
      ]
    });
    if ( models.length === 0 ) {
      return next(new HttpError("Couldn't find model", 404));
    };
    const model = models[0];

    // get availables sizes for given Model from Stock
    const modelSizes = await Stock.findAll({
      where: { ModelId: model_id },
      order: ['size']
    });

    res.render('model', {
      model, modelSizes
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
    homepage,
    getModelsByBrand,
    getModelById,
};

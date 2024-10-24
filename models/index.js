const User = require("./User");
const Brand = require("./Brand");
const Model = require("./Model");

Brand.hasMany(Model);
Model.belongsTo(Brand);

module.exports = { User, Brand, Model };

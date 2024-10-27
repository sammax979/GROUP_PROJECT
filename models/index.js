const User = require("./User");
const Brand = require("./Brand");
const Model = require("./Model");
const Order = require("./Order");
const OrderItem = require("./OrderItem");
const Stock = require("./Stock");


Brand.hasMany(Model);
Model.belongsTo(Brand);

Model.hasMany(Stock);
Stock.belongsTo(Model);

Stock.hasMany(OrderItem);
OrderItem.belongsTo(Stock);

User.hasMany(Order);
Order.belongsTo(User);

Order.hasMany(OrderItem);
OrderItem.belongsTo(Order);

module.exports = { User, Brand, Model, Order, OrderItem, Stock };

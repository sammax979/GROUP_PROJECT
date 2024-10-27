const { DataTypes } = require("sequelize");
const sequelize = require("../db/database");

const Order = sequelize.define("Order", {
  date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  }
});

module.exports = Order;

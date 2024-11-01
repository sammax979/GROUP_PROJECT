const { DataTypes } = require("sequelize");
const sequelize = require("../db/database");

const Stock = sequelize.define("Stock", {
  size: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  count: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
});

module.exports = Stock;

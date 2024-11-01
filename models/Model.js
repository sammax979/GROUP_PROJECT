const { DataTypes } = require("sequelize");
const sequelize = require("../db/database");

const Model = sequelize.define("Model", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [3, 32],
        msg: "Name must be between 3 and 32 characters long",
      },
    },
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
    len: {
      args: [10, 200],
      msg: "Description must be between 10 and 200 characters long",
    },
  },
  image: {
    type: DataTypes.TEXT,
    allowNull: true,
    len: {
      args: [5, 32],
      msg: "Image file name must be between 5 and 32 characters long",
    },
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
});

module.exports = Model;

const { DataTypes } = require("sequelize");
const sequelize = require("../db/database");

const Brand = sequelize.define("Brand", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [3, 18],
        msg: "Name must be between 3 and 18 characters long",
      },
    },
  },
  logo: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      len: {
        args: [4, 18],
        msg: "Logo must be between 4 and 18 characters long",
      },
    },
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      len: {
        args: [12, 200],
        msg: "Description must be between 12 and 200 characters long",
      },
    },
  },
});

module.exports = Brand;

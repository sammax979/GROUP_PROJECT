const { DataTypes } = require("sequelize");
const sequelize = require("../db/database");

const Brand = sequelize.define("Brand", {
  // id: {
  //   type: DataTypes.INTEGER,
  //   autoIncrement: true,
  //   primaryKey: true,
  // },
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
});

module.exports = Brand;

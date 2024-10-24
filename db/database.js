const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./db/databases/1DB.db",
});

module.exports = sequelize;

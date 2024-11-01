
const bcrypt = require("bcrypt");
const path = require('path');
require("dotenv").config({path: path.join(__dirname, '../.env')});
const saltRounds = parseInt(process.env.SALT_ROUNDS);

// const { User, Brand, Model, Order, OrderItem, Stock } = require("../models");

const dbManager = require("../db/database");
const { enterData } = require("../db/loadTestData");

const app = require("./app");

// using EJS as html templating engine
const ejs = require('ejs');
app.set('view engine','ejs');

const PORT = process.env.PORT;

// Parse command line  
// If --init flag is On - init Database, create and fill in the tables with test data and exit
const { Command } = require('commander');
const program = new Command();

program
  .version('1.0.0')
  .option('-i, --init', 'Initialize the database')
  .parse(process.argv);

const { init } = program.opts();

if (init) {
  console.log('Initializing database...');

  dbManager
    .authenticate()
    .then(() => dbManager.sync())
    .then(() => { 
      console.log("Database sync.");
    })
    .then(enterData)
    .then(() => {
      console.log("Test data loaded.");
    })
    .catch((err) => {
      console.log(err);
    });
  
  return;
} 

//********************
// Main entry point
//********************
dbManager
  .authenticate()
  .then(() => dbManager.sync())
  .then(() => {
    console.log("Databases sync");
    app.listen(PORT);
  })
  .then(() => console.log("Running Shoes Wharehouse app listening on port ", PORT))
  .catch((err) => {
    console.log(err);
  });






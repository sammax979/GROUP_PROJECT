
const bcrypt = require("bcrypt");
const path = require('path');
require("dotenv").config({path: path.join(__dirname, '../.env')});
const saltRounds = parseInt(process.env.SALT_ROUNDS);

const { User, Brand, Model, Order, OrderItem, Stock } = require("../models");

const dbManager = require("../db/database");

const app = require("./app");

const PORT = process.env.PORT;

//***********************************
// Create and populate the database
//***********************************
const enterData = async () => {
    // create Users
    let newPassword = await bcrypt.hash("easypassword", saltRounds);
    const user1 = await User.create({
      name: "John Smith",
      email: "johnsmith@gmail.com",
      password: newPassword, 
    });
    newPassword = await bcrypt.hash("peterpenpassword", saltRounds);
    await User.create({
      name: "Peter Pen",
      email: "peterpen@yahoo.com",
      password: newPassword,
    });

    // create Brands
    const brand1 = await Brand.create({
      name: "Nike",
      });
    const brand2 = await Brand.create({
      name: "HOKA",
    });
  
    // create Models
    const model1 = await Model.create({
      name: "Pegasus 34",
      description: "Universal model for everyday runs.",
      image: "pegasus34.jpg",
      BrandId: brand1.id,
    });
    const model2 = await Model.create({
      name: "Pegasus Trail",
      description: "Superb model for offroad and trail running.",
      image: "pegasustrail.jpg",
      BrandId: brand1.id,
    });
    const model3 = await Model.create({
      name: "Mach 5",
      description: "For fast asphalt runs and competitions.",
      image: "mach5.jpg",
      BrandId: brand2.id,
    });

    // create Stock records
    const stock1 = await Stock.create({
      size: "42.5",
      price: 100,
      count: 10,
      ModelId: model1.id 
    });
    const stock2 = await Stock.create({
      size: "43.5",
      price: 125,
      count: 4,
      ModelId: model2.id 
    });
    const stock3 = await Stock.create({
      size: "41",
      price: 85,
      count: 7,
      ModelId: model3.id 
    });
    
    // create Order
    const order = await Order.create({ 
      UserId: user1.id,
    });

    // create OrderItem
    await OrderItem.create({
      price: 85,
      count: 1,
      OrderId: order.id, 
      StockId: stock3.id, 
    });

  };
  
  

dbManager
  .authenticate()
  .then(() => dbManager.sync())
  .then(() => {
    console.log("Databases sync");
    app.listen(PORT);
  })
  .then(() => console.log("Running Shoes Wharehouse app listening on port ", PORT))
  .then(enterData)
  .catch((err) => {
    console.log(err);
  });






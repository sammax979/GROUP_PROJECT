const express = require('express')

const path = require('path')
require("dotenv").config({path: path.join(__dirname, '../.env')});

const { User, Brand, Model } = require("../models");

const dbManager = require("../db/database");

const app = require("./app");

const PORT = process.env.PORT;

//***********************************
// Create and populate the database
//***********************************
const enterData = async () => {
    await User.create({
      name: "John Smith",
      email: "johnsmith@gmail.com",
      password: "easypassword", 
    });
  
    await User.create({
      name: "Peter Pen",
      email: "peterpen@yahoo.com",
      password: "peterpenpassword",
    });
  
    const brand1 = await Brand.create({
      name: "Nike",
      });
    const brand2 = await Brand.create({
      name: "HOKA",
    });
  
    await Model.create({
      name: "Pegasus 34",
      description: "Universal model for everyday runs.",
      image: "pegasus34.jpg",
      BrandId: brand1.id,
    });
  
    await Model.create({
        name: "Pegasus Trail",
        description: "Superb model for offroad and trail running.",
        image: "pegasustrail.jpg",
        BrandId: brand1.id,
      });

    await Model.create({
        name: "Mach 5",
        description: "For fast asphalt runs and competitions.",
        image: "mach5.jpg",
        BrandId: brand2.id,
      });
    
  };
  
// app.listen(PORT, ()=>{
// console.log("Running Shoes Wharehouse app listening on port ", PORT)
// })

dbManager
  .authenticate()
  .then(() => dbManager.sync())
  .then(() => {
    console.log("Databases sync");
    app.listen(PORT);
  })
  .then(() => console.log("Running Shoes Wharehouse app listening on port ", PORT))
//  .then(enterData)
  .catch((err) => {
    console.log(err);
  });






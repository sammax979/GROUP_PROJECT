const bcrypt = require("bcrypt");
const path = require('path');
require("dotenv").config({path: path.join(__dirname, '../.env')});
const saltRounds = parseInt(process.env.SALT_ROUNDS);

const { User, Brand, Model, Order, OrderItem, Stock } = require("../models");

// const dbManager = require("../db/database");

//***********************************
// Create and populate the database
//***********************************
const enterData = async () => {
    console.log("\n *** enter test data ***\n");
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
        logo: "nike_logo.png",
        description: "Running shoes for Sports and Lifestyle. The greatest athletes wear Nike, the brand with the swoosh!",
        });
    const brand2 = await Brand.create({
        name: "HOKA",
        logo: "hoka_logo.png",
        description: "Trail and Running Shoes with Cutting-Edge Technology and Top-Class Cushioning.",
    });
    const brand3 = await Brand.create({
        name: "Asics",
        logo: "asics_logo.png",
        description: "As Fast as a Tiger: ASICS was founded in 1949 by Kihachiro Onitsuka, and was initially called the Onitsuka Tiger."
    });
    const brand4 = await Brand.create({
        name: "Adidas",
        logo: "adidas_logo.png",
        description: "One of the oldest and biggest sports brands that provides athletes with the best possible equipment."
    });

    // create Models
    const model1 = await Model.create({
        name: "Pegasus 41",
        description: "The responsive cushioning in the Pegasus provides an energized ride for everyday road runs.",
        image: "nike-pegasus-41.jpg",
        price: 100,
        BrandId: brand1.id,
    });
    const model2 = await Model.create({
        name: "Vomero 17",
        description: "The Vomero 17 offers a springy and soft ride that keeps you energized through every mile.",
        image: "nike-vomero-17.jpg",
        price: 125,
        BrandId: brand1.id,
    });
    const model3 = await Model.create({
        name: "Nike Alphafly 3",
        description: "The Alphafly 3 is tuned to the speed of a marathon and helps you to push your limits - and overcome them.",
        image: "nike-alphafly-3.jpg",
        price: 320,
        BrandId: brand1.id,
    });
    const model4 = await Model.create({
        name: "Hoka Mach 6",
        description: "Your Gateway to Everyday Speed. Behold Hoka's lightest, most responsive Mach to date.",
        image: "hoka-mach-6.jpg",
        price: 140,
        BrandId: brand2.id,
    });
    const model5 = await Model.create({
        name: "Hoka Rocket X 2",
        description: "The Rocket X 2 is a ground-breaking shoe for elite runners that we've added new features to with the utmost focus on construction.",
        image: "hoka-rocket-x2.jpg",
        price: 245,
        BrandId: brand2.id,
    });
    const model6 = await Model.create({
        name: "adidas Ultraboost 5",
        description: "Whether you're rocking your daily running workout or your everyday life, you'll enjoy pure comfort with this adidas Ultraboost running shoe.",
        image: "adidas-ultrabust-5.jpg",
        price: 180,
        BrandId: brand4.id,
    });
    const model7 = await Model.create({
        name: "adidas Adizero Boston 12",
        description: "Whether it's speed training, tempo runs or race day - the adidas Adizero Boston 12 is the perfect companion.",
        image: "adidas-adizero-12.jpg",
        price: 160,
        BrandId: brand4.id,
    });
    await Model.create({
        name: "Nike React Infinity Run 3",
        description: "You'll stay on your feet thanks to soft, supportive cushioning designed for a comfortable running experience.",
        image: "nike-react-infinity.jpg",
        price: 160,
        BrandId: brand1.id,
    });
    await Model.create({
        name: "Hoka Cielo X 1",
        description: "Thus ultra-fast road running shoe is super lightweight and features a carbon fiber plate with two layers of PEBA foam.",
        image: "hoka-cielo-x1.jpg",
        price: 280,
        BrandId: brand2.id,
    });

    // create Stock records
    const stock1 = await Stock.create({ size: "41.5", count:  6, ModelId: model1.id });
                   await Stock.create({ size: "42.5", count:  8, ModelId: model1.id });
                   await Stock.create({ size: "43.5", count: 10, ModelId: model1.id });

    const stock2 = await Stock.create({ size: "40", count:  5, ModelId: model2.id });
                   await Stock.create({ size: "41", count:  7, ModelId: model2.id });
                   await Stock.create({ size: "42", count:  9, ModelId: model2.id });

    const stock3 = await Stock.create({ size: "43", count: 8, ModelId: model3.id });
                   await Stock.create({ size: "44", count: 6, ModelId: model3.id });
                   await Stock.create({ size: "45", count: 4, ModelId: model3.id });

    const stock4 = await Stock.create({ size: "43",   count: 5, ModelId: model4.id });
                   await Stock.create({ size: "43.5", count: 5, ModelId: model4.id });

    const stock5= await Stock.create({ size: "43", count: 7,  ModelId: model5.id });

    const stock6 = await Stock.create({ size: "43.5", count: 12, ModelId: model6.id });
                   await Stock.create({ size: "44.5", count: 5, ModelId: model6.id });
                   await Stock.create({ size: "45.5", count: 2, ModelId: model6.id });

    const stock7 = await Stock.create({ size: "42", count: 4, ModelId: model7.id });
                   await Stock.create({ size: "43", count: 6, ModelId: model7.id });
                   await Stock.create({ size: "44", count: 4, ModelId: model7.id });

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

module.exports = { enterData };

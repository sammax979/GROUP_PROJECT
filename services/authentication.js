const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { searchByName } = require("./search");
const { Users } = require("../models");
const HttpError = require("./HttpError");
const { Op } = require("sequelize");
require("dotenv").config();

const secretKey = process.env.SECRET_KEY;

const createToken = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({
      where: {
        email: {
          [Op.like]: email,
        },
      },
    });
    if (!user) {
      return next(new HttpError("Couldn't find user", 404));
    }
    if (!bcrypt.compare(password, user.password)) {
      return next(new HttpError("Password incorrect", 404));
    }

    const token = jwt.sign(user.name, secretKey);
    res.cookie("Ticket", token);
    res.status(200).json({ message: "Logged in successfully" });
  } catch (err) {
    next(err);
  }
};

const checkToken = async (req, res, next) => {
  try {
    const token = req.cookies.Ticket;
    if (token) {
      jwt.verify(token, secretKey, (err, res) => {
        if (err) next(err);
        else {
          console.log(res);
          next();
        }
      });
    } else {
      next(new HttpError("No token provided", 401));
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { createToken, checkToken };

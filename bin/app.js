const express = require("express");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const path = require('path');
require("dotenv").config({path: path.join(__dirname, '../.env')});

const { createToken, deleteToken, checkToken } = require("../services/authentication");
const { errorLogger } = require("../services/errorHandler");

const usersRouter = require("../routes/users");
const brandsRouter = require("../routes/brands");
const modelsRouter = require("../routes/models");
const stockRouter = require("../routes/stock");
const ordersRouter = require("../routes/orders");
const orderItemsRouter = require("../routes/orderItems");

const homeRouter = require('../routes/home');

const app = express();

app.use(express.json());
app.use(express.static("public"));

app.use(cookieParser());

const PORT = process.env.PORT;
let corsOrigin = "127.0.0.1:" + PORT.toString();

app.use(
  cors({
    origin: corsOrigin,
    credentials: true,
  })
);

app.use(helmet());

app.post("/api/login", createToken);
app.get("/api/logout", deleteToken);

// HTML routes
app.use('/www', homeRouter)

app.use(checkToken);

/// API routes
app.use("/api/users", usersRouter);
app.use("/api/brands", brandsRouter);
app.use("/api/models", modelsRouter);
app.use("/api/stock", stockRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/orderitems", orderItemsRouter);

app.use(errorLogger);

module.exports = app;


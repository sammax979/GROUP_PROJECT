const express = require("express");
// const helmet = require("helmet");
// const cookieParser = require("cookie-parser");
// const cors = require("cors");

// const { createToken, checkToken } = require("./services/authentication");
const usersRouter = require("../routes/users");
const brandsRouter = require("../routes/brands");
const modelsRouter = require("../routes/models");
const stockRouter = require("../routes/stock");
const ordersRouter = require("../routes/orders");
const orderItemsRouter = require("../routes/orderItems");

const homeRouter = require('../routes/home');

// const { errorLogger } = require("./services/errorHandler");
// const { creating } = require("./controllers/customersController");

const app = express();

app.use(express.json());
app.use(express.static("public"));

//app.use(cookieParser());

// app.use(
//   cors({
//     origin: "*",
//     credentials: true,
//   })
// );
// app.use(helmet());
// app.post("/token", createToken);
// app.post("/customer", creating);

//app.use(checkToken);

// HTML routes
app.use('/www', homeRouter)

/// API routes
app.use("/api/users", usersRouter);
app.use("/api/brands", brandsRouter);
app.use("/api/models", modelsRouter);
app.use("/api/stock", stockRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/orderitems", orderItemsRouter);

// app.use(errorLogger);

module.exports = app;


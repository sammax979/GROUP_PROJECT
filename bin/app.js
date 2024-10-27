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

// const { errorLogger } = require("./services/errorHandler");
// const { creating } = require("./controllers/customersController");

const app = express();

app.use(express.json());

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

app.use("/users", usersRouter);
app.use("/brands", brandsRouter);
app.use("/models", modelsRouter);
app.use("/stock", stockRouter);
app.use("/orders", ordersRouter);
app.use("/orderitems", orderItemsRouter);

//app.use(errorLogger);

module.exports = app;


const { User } = require("../models/index");
const HttpError = require("../services/HttpError");

const bcrypt = require("bcrypt");
require("dotenv").config();

const saltRounds = parseInt(process.env.SALT_ROUNDS);
const passwordREGX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const gettingAll = async (req, res, next) => {
  try {
    const users = await User.findAll();
    if (!users || users.length === 0) {
      return next(new HttpError("No users found", 404));
    }
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

const creating = async (req, res, next) => {
  try {
    console.log(req.body);
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      next(new HttpError("Not enough data for creating user", 400));
    }
    if (!passwordREGX.test(password)) {
      next(new HttpError("Validation error: password not strong", 404));
    }
    const newPassword = await bcrypt.hash(password, saltRounds);
    const user = await User.create({
      name,
      email,
      password: newPassword,
    });
    if (!user) {
      next(new HttpError("Problem creating user", 500));
    }
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

const getting = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await User.findByPk(id);
    if (!user) {
      return next(new HttpError("Couldn't find user", 404));
    }
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

const updating = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { name, email, password } = req.body;
    console.log(name, email);
    await User.update(
      { name, email, password },
      {
        where: { id },
      }
    );
    if (!updated) {
      return next(new HttpError("User not found or update failed", 404));
    }
    res.status(200).json("Updated successfully");
  } catch (err) {
    next(err);
  }
};

const deleting = async (req, res, next) => {
  try {
    const id = req.params.id;
    User.destroy({ where: { id } });
    if (!deleted) {
      return next(new HttpError("User not found or deletion failed", 404));
    }
    res.status(200).json("User deleted successfully");
  } catch (err) {
    next(err);
  }
};

// allOrders - ? 
// const allMovies = async (req, res, next) => {
//   try {
//     const id = req.params.id;
//     const customer = await Customer.findByPk(id);
//     if (!customer) {
//       return next(new HttpError("Couldn't find customer", 404));
//     }
//     const rentals = await Rental.findAll({
//       where: {
//         customerId: id,
//       },
//       include: [
//         {
//           model: Movie,
//           attributes: ["title"],
//         },
//       ],
//     });
//     res.status(200).json(rentals);
//   } catch (err) {
//     next(err);
//   }
// };

module.exports = {
  //allMovies,
  getting,
  gettingAll,
  updating,
  deleting,
  creating,
};

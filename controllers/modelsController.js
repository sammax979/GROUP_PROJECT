const { Model } = require("../models/index");
const HttpError = require("../services/HttpError");

const gettingAll = async (req, res, next) => {
  try {
    const rentals = await Model.findAll({
      include: [
        {
          model: Movie,
          attributes: ["title", "releaseYear"],
          include: [
            {
              model: Genre,
              attributes: ["genreName"],
              through: { attributes: [] },
            },
          ],
        },
        { model: Customer, attributes: ["name"] },
      ],
      attributes: ["id", "rentalDate", "returnDate"],
    });

    if (rentals.length === 0) {
      return res.status(200).json("No rentals history yet");
    }
    res.status(200).json(rentals);
  } catch (err) {
    next(err);
  }
};

const creating = async (req, res, next) => {
  try {
    const { name, description, image, BrandId } = req.body;

    if (!name || !description || !image || !BrandId) {
      return next(new HttpError("Not enough data for creating model", 400));
    }

    const model = await Model.create({
      name,
      description,
      image,
      BrandId,
    });

    res.status(201).json(model);
  } catch (err) {
    next(err);
  }
};

const getting = async (req, res, next) => {
  try {
    const id = req.params.id;
    const model = await Model.findByPk(id);
    if (!model) {
      return next(new HttpError("Couldn't find model", 404));
    }
    res.status(200).json(model);
  } catch (err) {
    next(err);
  }
};

// const returningMovie = async (req, res, next) => {
//   try {
//     const id = req.params.id;
//     const [updated] = await Rental.update(
//       { returnDate: new Date() },
//       {
//         where: { id },
//       }
//     );

//     if (updated === 0) {
//       return next(new HttpError("Rental not found", 404));
//     }
//     res.status(200).json("Updated successfully");
//   } catch (err) {
//     next(err);
//   }
// };

const deleting = async (req, res, next) => {
  try {
    const id = req.params.id;
    const deleted = await Model.destroy({ where: { id } });

    if (deleted === 0) {
      return next(new HttpError("Model not found or could not be deleted", 404));
    }
    res.status(200).json("Deleted successfully");
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getting,
  gettingAll,
//  returningMovie,
  deleting,
  creating,
};

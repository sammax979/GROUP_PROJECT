const { Brand } = require("../models/index");
const HttpError = require("../services/HttpError");

const gettingAll = async (req, res, next) => {
  try {
    const brands = await Brand.findAll();
    if (!brands || brands.length === 0) {
      return next(new HttpError("No brands found", 404));
    }
    res.status(200).json(brands);
  } catch (err) {
    next(err);
  }
};

const creating = async (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name ) {
      return next(new HttpError("Not enough data for creating Brand", 400));
    }
    const brand = await Brand.create({ name });
    if (!brand) {
      return next(new HttpError("Problem creating Brand", 500));
    }
    res.status(201).json(brand); 
  } catch (err) {
    next(err);
  }
};

const getting = async (req, res, next) => {
  try {
    const id = req.params.id;
    const brand = await Brand.findByPk(id);
    if (!brand) {
      return next(new HttpError("Couldn't find brand", 404));
    }
    res.status(200).json(brand);
  } catch (err) {
    next(err);
  }
};

const updating = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { name } = req.body;
    const [updated] = await Brand.update(
      { name },
      {
        where: { id },
      }
    );
    if (updated === 0) {
      return next(new HttpError("Brand not found or no updates made", 404));
    }
    res.status(200).json("Updated successfully");
  } catch (err) {
    next(err);
  }
};

const deleting = async (req, res, next) => {
  try {
    const id = req.params.id;
    const deleted = await Brand.destroy({ where: { id } });
    if (deleted === 0) {
      return next(
        new HttpError("Brand not found or could not be deleted", 404)
      );
    }
    res.status(200).json("Deleted successfully");
  } catch (err) {
    next(err);
  }
};

// const allMoviesByGenre = async (req, res, next) => {
//   try {
//     const genreName = req.params.name;
//     const genre = await Genre.findOne({
//       where: { genreName },
//       include: [
//         {
//           model: Movie,
//           attributes: ["title", "description"],
//         },
//       ],
//     });
//     if (!genre || !genre.Movies || genre.Movies.length === 0) {
//       return next(new HttpError("No movies found for this genre", 404));
//     }
//     res.status(200).json(genre);
//   } catch (err) {
//     next(err);
//   }
// };


module.exports = {
//  allModelsByBrand,
  getting,
  gettingAll,
  updating,
  deleting,
  creating,
};

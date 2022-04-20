const Favourite = require("../Models/favouriteSchema");
const Customers = require("../Models/customerSchema");
const { validationResult } = require("express-validator");

module.exports = {
  getFavourites: async (req, res, next) => {
    const { id } = req.params;
    if (!id) {
      try {
        const allFavourites = await Favourite.find({}).populate([
          {
            path: "favouriteProducts",
            populate: { path: "category" },
            populate: { path: "discount" },
          },
          { path: "ownerId" },
        ]);
        res.json(allFavourites);
      } catch (error) {
        next(`cannot get all favourites:${error}`);
      }
    } else {
      try {
        const favourite = await Favourite.find({ ownerId: id }).populate([
          {
            path: "favouriteProducts",
            populate: { path: "category" },
            populate: { path: "discount" },
          },
          { path: "ownerId" },
        ]);
        // console.log(favourite);
        res.status(200).json(favourite);
      } catch (error) {
        next(`cannot get customers ${id}:${error}`);
      }
    }
  }, //get all or one favourites

  addFavourite: async (req, res, next) => {
    const { id } = req.params;
    try {
      let productId = req.body.myVariable._id;
      let favourite = await Favourite.findOne({ ownerId: id });
      if (favourite) {
        favourite.favouriteProducts.push(productId);
        await favourite.save();

        await favourite.populate([
          {
            path: "favouriteProducts",
            populate: [{ path: "discount" }, { path: "category" }],
          },
        ]);
        res.send(favourite);
      } else {
        let arr = [productId];
        let newFavourite = new Favourite({
          ownerId: id,
          favouriteProducts: arr,
        })
          .save()
          .populate([
            {
              path: "favouriteProducts",
              populate: { path: "discount" },
              populate: { path: "category" },
            },
            { path: "ownerId" },
          ]);
        res.status(200).json(newFavourite);
      }
    } catch (error) {
      res.status(400).send("error from catch");
    }
  },

  deleteFavourite: async (req, res, next) => {
    const { id } = req.params;
    const arr = id.split("&");
    const owner = arr[0];
    const product = arr[1];
    const favourite = await Favourite.findOne({ ownerId: owner });

    if (!favourite) {
      next("cannot find this customer");
    } else {
      try {
        await Favourite.updateOne(
          { ownerId: owner },
          {
            $pull: {
              favouriteProducts: product,
            },
          }
        )
          .then((data) => {
            Favourite.findOne({ ownerId: owner })
              .populate([
                {
                  path: "favouriteProducts",
                  populate: [{ path: "discount" }, { path: "category" }],
                },
              ])
              .then((data) => {
                res.status(200).json({ message: "updated", data });
              });
          })
          .catch((error) => next(error));
      } catch (err) {
        next(err.message);
      }
    }
  },
};

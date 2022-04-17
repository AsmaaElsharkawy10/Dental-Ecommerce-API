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
      let productId = req.body.selectedOfferProduct._id;
      let favourite = await Favourite.findOne({ ownerId: id });
      console.log(favourite);
      if (favourite) {
        favourite.favouriteProducts.push(productId);
        favourite.save();

        res.json(favourite);
      } else {
        let arr = [productId];
        let newFavourite = new Favourite({
          ownerId: id,
          favouriteProducts: arr,
        }).save();
        res.status(200).json(newFavourite);
      }
    } catch (error) {
      //   next(error,"feom catch");
      res.status(400).send("error from catch");
    }
  },

  deleteFavourite: async (req, res, next) => {
    const  {id} = req.params;
    const arr = id.split('&')
    const owner = arr[0]
    const product =arr[1]
    const favourite = await Favourite.findOne({ ownerId: owner });
    if (!favourite) {
      next("cannot find this customer");
    } else {
      try {

console.log(typeof(product));
        
        for(let i =0 ; i<favourite.favouriteProducts.length;i++){
          
           if(favourite.favouriteProducts[i] === +product){
            console.log(favourite.favouriteProducts[i]);
            favourite.favouriteProducts.splice(i,1)
           }
        }  

        favourite.save()
        // res.status(200).json(data);
        res.send({msg:"deleted",data})
      } catch (err) {
        next(err.message);
      }
    }
  },
};

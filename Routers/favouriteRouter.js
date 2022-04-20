const router = require("express").Router();
// const isAuth = require('../Middlewares/AuthMW')
const {
  getFavourites,
  addFavourite,
  deleteFavourite,
} = require("../Controllers/favouriteController");

router.route("/favourite/:id?")
.get(/*isAuth,*/getFavourites)
.post(addFavourite)
.put(deleteFavourite)

module.exports = router;


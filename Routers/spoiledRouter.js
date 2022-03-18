const express = require("express");
const { validatePostData } = require("../Services/spoiledService");
const router = express.Router();
const controller = require("./../Controllers/spoiledController")

router.route("/spoliedProducts/:id?")
        .get(controller.getAllSpoiledProductsOrOne)  
        .post(validatePostData(),controller.addSpoiledProduct)
        .put(controller.updateSpoiledProduct)
        .delete(controller.deleteSpoiledProduct)
        
module.exports =router; 
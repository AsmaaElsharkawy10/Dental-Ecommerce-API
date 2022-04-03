const express = require("express");
const { validatePostData, validatePutData, validateDeleteData } = require("../Services/spoiledService");
const router = express.Router();
const controller = require("./../Controllers/spoiledController")

router.route("/spoliedProducts/:id?")
        .get(controller.getAllSpoiledProductsOrOne)  
        .post(validatePostData(),controller.addSpoiledProduct)
        .put(validatePutData(), controller.updateSpoiledProduct)
        .delete(validateDeleteData(), controller.deleteSpoiledProduct)
        
module.exports =router; 
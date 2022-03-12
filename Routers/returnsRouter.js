const express = require("express");
const { validatePostData } = require("../Services/returnsService");
const router = express.Router();
const controller = require("./../Controllers/returnsController")

router.route("/returnedProducts/:id?")
        .get(controller.getAllReturnsOrOne)  
        .post(validatePostData(),controller.addReturnedProduct)
        .put(controller.updateReturnedProduct)
        .delete(controller.deleteReturnedProduct)
        
module.exports =router;        
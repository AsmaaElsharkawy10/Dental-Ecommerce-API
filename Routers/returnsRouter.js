const express = require("express");
const { validatePostData, validatePutData, validateDeleteData } = require("../Services/returnsService");
const router = express.Router();
const controller = require("./../Controllers/returnsController")

router.route("/returnedProducts/:id?")
        .get(controller.getAllReturnsOrOne)  
        .post(validatePostData(),controller.addReturnedProduct)
        .put(validatePutData, controller.updateReturnedProduct)
        .delete(validateDeleteData, controller.deleteReturnedProduct)
        
module.exports =router;        
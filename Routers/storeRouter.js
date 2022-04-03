const express = require("express");
const { validatePostData, validatePutData, validateDeleteData } = require("../Services/storeService");
const router = express.Router();
const controller = require("./../Controllers/storeController")

router.route("/stores/:id?")
        .get(controller.getAllStoresOrOne)  
        .post(validatePostData(),controller.addStore)
        .put(validatePutData(), controller.updateStore)
        .delete(validateDeleteData(), controller.deleteStore)
        
module.exports =router;        
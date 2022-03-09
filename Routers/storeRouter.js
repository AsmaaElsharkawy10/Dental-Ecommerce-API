const express = require("express");
const { validatePostData } = require("../Services/storeService");
const router = express.Router();
const controller = require("./../Controllers/storeController")

router.route("/stores/:id?")
        .get(controller.getAllStoresOrOne)  
        .post(validatePostData(),controller.addStore)
        .put(controller.updateStore)
        .delete(controller.deleteStore)
        
module.exports =router;        
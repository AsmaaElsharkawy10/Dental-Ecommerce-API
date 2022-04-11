const express = require("express");
const productRouter = express.Router();

const {
  getAllProductsOrOne,
  createProduct,
  updateProduct,
  removeProduct,
} = require("../Controllers/productController");
const {
  postProduct,
  putProduct,
  deleteProduct,
} = require("../Services/productService");
productRouter.route("/products/:key?")
             .get(getAllProductsOrOne)
             .post(postProduct(), createProduct)
             .put(putProduct(), updateProduct)
             .delete(deleteProduct(), removeProduct);
module.exports = productRouter;

const { validationResult } = require("express-validator");
const Product = require("../Models/productSchema");

//Get all products
module.exports.getAllProductsOrOne = async (req, res, next) => {

  try {
    // check param id sent
    if (req.params.key) {

      // let param = [
      //   {
      //     $lookup:{
      //       from:"Category",
      //       localField:"category",
      //       foreignField:"_id",
      //       as:"categoryName"
      //   }
      // }
      // ]

      // let products = await Product.aggregate(param)
      // res.json(products)
      const products = await Product.find(
        {
        "$or":[
          {"productName":{$regex:req.params.key}},
          {"company":{$regex:req.params.key}},
          {"countryOfManufacture":{$regex:req.params.key}},
        ]
      }).populate({path:"category"})
    res.json(products);
    }
    else {
      const products = await Product.find().populate([
        { path: "discount" },
        { path: "category" },
      ]);
      res.json(products);
    }
  } catch (err) {
    next("error find");
  }
};

//post product
module.exports.createProduct = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let error = new Error();
    error.status = 422;
    error.message = errors
      .array()
      .reduce((current, object) => current + object.msg + " ", "");
    throw error;
  }
  const {
    productName,
    expirationDate,
    company,
    price,
    quantity,
    countryOfManufacture,
    description,
    rating
  } = req.body;
  let category=JSON.parse(req.body.category);
  let discount=JSON.parse(req.body.discount);

  const newProduct = new Product({
    productName,
    expirationDate,
    company,
    price,
    quantity,
    image: "http://localhost:8080/images/" + req.file.filename,
    countryOfManufacture,
    description,
    category,
    discount,
    rating
  });

  const productData = await newProduct.save();
  res.json({ msg: "Product added", productData });
};


// update product
module.exports.updateProduct = async (req, res, next) => {
  const {
    _id,
    productName,
    expirationDate,
    company,
    price,
    quantity,
    image,
    countryOfManufacture,
    description,
    category,
    discount,
  } = req.body;

  try {
    const product = await Product.findById(_id);

    if (!product) res.json({ msg: "no such product" });

    product.productName = productName;
    product.expirationDate = expirationDate;
    product.company = company;
    product.price = price;
    product.quantity = quantity;
    product.image = image;
    product.description = description;
    product.category = category;
    product.countryOfManufacture = countryOfManufacture;
    product.discount = discount;

    const updatedProduct = await product.save();
    res.json({ msg: "Product updated", updatedProduct });
  } catch (err) {
    next(err);
  }
};

// Delete Product
module.exports.removeProduct = async (req, res, next) => {
  const {id} = req.params;
    try {
    const deletedProduct = await Product.deleteOne({ _id: id });
    res.send({ msg: "Product deleted", deletedProduct });
  } catch (err) {
    next(err.message);
  }
};

const { validationResult } = require("express-validator");
const Product = require("../Models/productSchema");

//Get all products
module.exports.getAllProductsOrOne = async (req, res, next) => {
  try {
    // check param id sent
    if (req.params.id) {
      const product = await Product.findById(req.params.id);
      res.json(product);
    } else {
      const products = await Product.find();
      res.json(products);
    }
  } catch (err) {
    next("error find");
  }
};

//post product
module.exports.createProduct = async (req, res, next) => {
   const errors = validationResult(req);
   if(!errors.isEmpty())
   {
          let error=new Error();
          error.status=422;
          error.message=errors.array().reduce((current,object)=>current+object.msg+" ","")
          throw error;
   }
  const {productName , expirationDate ,company,price,quantity,countryOfManufacture,description,category,discount } = req.body;
  const newProduct = new Product({
    productName,
    expirationDate,
    company,
    price,
    quantity,
    image:req.file.filename,
    countryOfManufacture,
    description,
    category,
    discount

  });

  const productData = await newProduct.save();
  res.json({ msg: "Product added", productData });
}

// update product
module.exports.updateProduct= async (req, res, next) => {

  const {_id,
     productName ,
     expirationDate ,
     company,
     price,
     quantity,
     image,
     countryOfManufacture,
     description,
     category,
     discount } = req.body;

  try {
    const product = await Product.findById(_id);

    if (!product) res.json({ msg: "no such product" });

    product.productName = productName ;
    product.expirationDate = expirationDate ;
    product.company = company ;
    product.price = price ;
    product.quantity = quantity ;
    product.image = image ;
    product.description = description ;
    product.category = category ;
    product.countryOfManufacture = countryOfManufacture ;
    product.discount = discount ;

    const updatedProduct = await product.save();
    res.json({ msg: "Product updated", updatedProduct });
  } catch (err) {
    next(err);
  }
}

// Delete Product
module.exports.removeProduct= async (req, res, next) => {
 
  const { _id } = req.body;
  try {
    const deletedProduct = await Product.deleteOne({ _id: _id });
    res.send({ msg: "Product deleted", deletedProduct });
  } catch (err) {
    next(err.message);
  }
};
 
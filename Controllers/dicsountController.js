const Discount = require("../Models/discountSchema");
const { validationResult } = require("express-validator");

//Get all receipts
module.exports.getAllDiscountsOrOne = async (req, res, next) => {
  try {
    // check param id sent
    if (req.params.id) {
      const discount = await Discount.findById(req.params.id);
      res.json(discount);
    } else {
      const discounts = await Discount.find();
      res.json(discounts);
    }
  } catch (err) {
    next("error find");
  }
};

//post all receipt

module.exports.createDiscount = async (req, res, next) => {
   const errors = validationResult(req);
   if(!errors.isEmpty())
   {
          let error=new Error();
          error.status=422;
          error.message=errors.array().reduce((current,object)=>current+object.msg+" ","")
          throw error;
   }
  const {discountAmount , date ,style} = req.body;
  const newDiscount = new Discount({
    discountAmount,
    date,
    style
  });

  const discounttData = await newDiscount.save();
  res.json({ msg: "Discount added", discounttData });
}

// update receipt
module.exports.updateDiscount= async (req, res, next) => {

  const {_id,  discountAmount , date ,style} = req.body;

  try {
    const discount = await Discount.findById(_id);

    if (!discount) res.json({ msg: "no such discount" });

    discount.discountAmount = discountAmount ;
    discount.date = date ;
    discount.style=style;  
   

    const updatedDiscount = await discount.save();

    res.json({ msg: "Discount updated", updatedDiscount });
  } catch (err) {
    next(err);
  }
}

// Delete receipt
module.exports.removeDiscount= async (req, res, next) => {
 
  const { _id } = req.body;
  try {
    const deletedDiscount = await Discount.deleteOne({ _id: _id });
    res.send({ msg: "Discount deleted", deletedDiscount });
  } catch (err) {
    next(err.message);
  }
};
 
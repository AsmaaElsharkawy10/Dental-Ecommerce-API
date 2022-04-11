const Receipt = require("../Models/receiptSchema");
const { validationResult } = require("express-validator");

//Get all receipts
module.exports.getAllReceiptsOrOne = async (req, res, next) => {
  try {
    // check param id sent
    if (req.params.id) {
      const receipt = await Receipt.findById(req.params.id).populate({path:"products"});
      res.json(receipt);
    } else {
      const receipts = await Receipt.find().populate({path:"products"});
      res.json(receipts);
    }
  } catch (err) {
    next("error find");
  }
};

//post all receipt

module.exports.createReceipt = async (req, res, next) => {
   const errors = validationResult(req);
   if(!errors.isEmpty())
   {
          let error=new Error();
          error.status=422;
          error.message=errors.array().reduce((current,object)=>current+object.msg+" ","")
          throw error;
   }
  const {purchaserName, date, status,totalPrice,type,orderId,products } = req.body;
  const newReceipt = new Receipt({
    purchaserName,
    date,
    orderId,
    status,
    totalPrice,
    type,
    products
  });

  const receiptData = await newReceipt.save();
  res.json({ msg: "receipt added", receiptData });
}

// update receipt
module.exports.updateReceipt= async (req, res, next) => {

  const {_id,  purchaserName, date, status, totalPrice, type ,products,orderId} = req.body;

  try {
    const receipt = await Receipt.findById(_id);

    if (!receipt) res.json({ msg: "no such receipt" });

    receipt.purchaserName = purchaserName ;
    receipt.date = date ;
    receipt.status = status ;
    receipt.totalPrice = totalPrice;
    receipt.type = type;
    receipt.orderId = orderId;
    receipt.products = products;
   

    const updatedReceipt = await receipt.save();

    res.json({ msg: "receipt updated", updatedReceipt });
  } catch (err) {
    next(err);
  }
}

// Delete receipt
module.exports.removeReceipt= async (req, res, next) => {
 
  const {id} = req.params;
  try {
    const deletedReceipt = await Receipt.deleteOne({ _id: id });
    res.send({ msg: "Receipt deleted", deletedReceipt });
  } catch (err) {
    next(err.message);
  }
};
 
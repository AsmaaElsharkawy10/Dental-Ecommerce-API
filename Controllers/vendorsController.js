const Vendor= require("../Models/vendorSchema");
const { validationResult } = require("express-validator");

//Get all receipts
module.exports.getAllVendorsOrOne = async (req, res, next) => {
  try {
    // check param id sent
    if (req.params.id) {
      const vendor = await Vendor.findById(req.params.id).populate({path:"receipts"})
      ;
      res.json(vendor);
    } else {
      const vendors = await Vendor.find().populate({path:"receiptId"})
      ;
      res.json(vendors);
    }
  } catch (err) {
    next("error find");
  }
};
//post all receipt

module.exports.createVendor = async (req, res, next) => {
   const errors = validationResult(req);
   if(!errors.isEmpty())
   {
          let error=new Error();
          error.status=422;
          error.message=errors.array().reduce((current,object)=>current+object.msg+" ","")
          throw error;
   }
  const {vendorName, companyName ,phoneNumber,country,receiptId } = req.body;
  const newVendor = new Vendor({
    vendorName,
    companyName,
    phoneNumber,
    country,
    receiptId
  });

  const vendorData = await newVendor.save();
  res.json({ msg: "vendor added", vendorData });
}



// update receipt
module.exports.updateVendor= async (req, res, next) => {
  const errors = validationResult(req);
  if(!errors.isEmpty())
  {
         let error=new Error();
         error.status=422;
         error.message=errors.array().reduce((current,object)=>current+object.msg+" ","")
         throw error;
  }

  const {_id, vendorName, phoneNumber, companyName,country,receiptId } = req.body;

  try {
    const vendor = await Vendor.findById(_id);

    if (!vendor) res.json({ msg: "no such vendor" });

    vendor.vendorName = vendorName ;
    vendor.phoneNumber = phoneNumber ;
    vendor.companyName = companyName ;
    vendor.country = country;
    vendor.receiptId = receiptId;
   

    const updatedVendor = await vendor.save();

    res.json({ msg: "vendor updated", updatedVendor });
  } catch (err) {
    next(err);
  }
}

// Delete receipt
module.exports.removeVendor= async (req, res, next) => {
  const errors = validationResult(req);
  if(!errors.isEmpty())
  {
         let error=new Error();
         error.status=422;
         error.message=errors.array().reduce((current,object)=>current+object.msg+" ","")
         throw error;
  }
  const { _id } = req.body;
  try {
    const deletedVendor = await Vendor.deleteOne({ _id: _id });
    res.send({ msg: "Vendor deleted", deletedVendor });
  } catch (err) {
    next(err.message);
  }
};
 
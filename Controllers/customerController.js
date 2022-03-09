const Customers = require("../Models/customerSchema");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

module.exports = {
  getAllOrOne: async (req, res, next) => {
    const { id } = req.params;
    if (!id) {
      try {
        const allCustomer = await Customers.find();
        res.status(200).json(allCustomer);
      } catch (error) {
        next(`cannot get all customers:${error}`);
      }
    } else {
      try {
        const customer = await Customers.findOne({ id });
        if (customer) {
          res.status(200).json(customer);
        } else res.status(400).json({ customer: "not Found" });
      } catch (error) {
        next(error);
      }
    }
  }, //get all or one customer

  addCustomer:(req, res, next) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      let error=new Error();
      error.status=422;
      error.message=errors.array().reduce((current,object)=>current+object.msg+" ","")
      throw error;
    }
        let {
          customerPassword,
          customerPhone,
          fullName,
          customerEmail,
          customerImage,
          customerTotalPurchase,
          Orders,
          customerAddresses,
          role,
        } = req.body;
        
          const salt = bcrypt.genSaltSync(10);
          const hashedPassword = bcrypt.hashSync(customerPassword, salt);
          customerPassword = hashedPassword;
          const customer = new Customers({
            customerPassword,
            customerPhone,
            fullName,
            customerEmail,
            customerImage,
            customerTotalPurchase,
            Orders,
            customerAddresses,
            role,
          });
          customer.save()
          .then(data=>res.status(200).json({message:"added",data}))
          .catch(error=>next(error+"cannot add customer")); 
      

  }, //add customer

  updateCustomer:(req, res, next) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      let error=new Error();
      error.status=422;
      error.message=errors.array().reduce((current,object)=>current+object.msg+" ","")
      throw error;
    }
    Customers.updateOne({_id:req.body._id}, {
      $set: {
        customerPassword: req.body.customerPassword,
        customerPhone: req.body.customerPhone,
        fullName: req.body.fullName,
        customerEmail: req.body.customerEmail,
        customerImage: req.body.customerImage,
        customerTotalPurchase: req.body.customerTotalPurchase,
        Orders: req.body.Orders,
        customerAddresses: req.body.customerAddresses,
        role: req.body.role,
      }
    })
      .then((data) => {
        if (data == null) throw new Error("cannot update this customer");
        res.status(200).json({ message: "updated", data });
      })
      .catch((error) => next(error));
  },

  
  deleteCustomer:async(req,res,next)=>{
    const { _id } = req.body;
    try {
      const data = await Customers.deleteOne({ _id: _id });
      res.send({ msg: "deleted", data });
    } catch (err) {
      next(err.message);
    }  
  }


};

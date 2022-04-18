const Customers = require("../Models/customerSchema");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const fs=require("fs")

module.exports = {
  getAllOrOne: async (req, res, next) => {
    const { id } = req.params;
    if (!id) {
      try {
     
        const allCustomer = await Customers.find({})
        res.status(200).json(allCustomer);
      } catch (error) {
        next(`cannot get all customers:${error}`);
      }
    } else {
      try {
        const customer = await Customers.findOne({ _id:id })
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
          customerTotalPurchase,
          role,
        } = req.body;
        
     
        let customerAddress = JSON.parse(req.body.customerAddress)

          const salt = bcrypt.genSaltSync(10);
          const hashedPassword = bcrypt.hashSync(customerPassword, salt);
          customerPassword = hashedPassword;
          
          const customer = new Customers({
            customerPassword,
            customerPhone,
            fullName,
            customerEmail,
            image:"http://localhost:8080/images/"+req.file.filename,
            customerAddress,
            customerTotalPurchase,
            role,
          });
          customer.save()
          .catch(error=>next(error+"cannot add customer")); 
          res.status(200).json({message:"adedd",customer});                         

  }, //add customer

  updateCustomer:async(req, res, next) => {    
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      let error=new Error();
      error.status=422;
      error.message=errors.array().reduce((current,object)=>current+object.msg+" ","")
      throw error;
    }
    let customerAddress = JSON.parse(req.body.customerAddress)
    Customers.updateOne({_id:req.params.id}, {
      $set: {
        customerPhone: req.body.customerPhone,
        fullName: req.body.fullName,
        image:req.body.image || "http://localhost:8080/images/"+req.file.filename,
        // customerTotalPurchase: req.body.customerTotalPurchase,
        customerAddress:customerAddress,
        role: req.body.role,
      }
    })
      .then((data) => {
        if (data == null) throw new Error("cannot update this customer");
        // fs.unlinkSync(`./../images/${data}`)
        res.status(200).json({ message: "updated", data });
      }).catch((error) => next(error));
    
  },

  
  deleteCustomer:async(req,res,next)=>{
    const {id} = req.params;
    const customer =Customers.findOne({_id:id});
    if(!customer){
    next("cannot find this customer");
    }else{
    try {
      const data = await Customers.deleteOne({ _id: id });
      res.send({ msg: "deleted", data });
    } catch (err) {
      next(err.message);
    }
  }  
  }


};

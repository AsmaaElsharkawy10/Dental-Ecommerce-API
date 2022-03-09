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

  addCustomer: async (req, res, next) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      let error = new Error();
      error.status = 422;
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
          await customer.save()
          .then(data=>res.status(200).json({message:"added",data}))
          .catch(error=>next(error +"cannot add customer")); 
  }, //add customer

  updateCustomer: () => async (req, res, next) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      let error = new Error();
      error.status = 422;
      throw error;
    }
    Customers.findByIdAndUpdate(req.body._id, {
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
      },
    })
      .then((data) => {
        if (data == null) throw new Error("customer Is not Found!");
        res.status(200).json({ message: "updated", data });
      })
      .catch((error) => next(error));
  },
};

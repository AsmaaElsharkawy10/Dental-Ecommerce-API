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
    } else {
      try {
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
        const emailExist = await Customers.findOne({ customerEmail });
        if (!emailExist) {
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
          await customer.save();
          res.status(200).json(customer);
        } else next("email is already existed");
      } catch (error) {
        next(`customer cannot be created :${error}`);
      }
    }
  }, //add customer

  updateCustomer: () => async (req, res, next) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      let error = new Error();
      error.status = 422;
      throw error;
    } else {
      const {
        _id,
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

      try {
        const customer = await Customers.findById(_id);
        if (!customer) res.json({ msg: "no such customer" });

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(customerPassword, salt);
        customerPassword = hashedPassword;

        customer.fullName = fullName || customer.fullName;
        customer.customerPassword =
          customerPassword || customer.customerPassword;
        customer.customerEmail = customerEmail || customer.customerEmail;
        customer.customerAddresses =
          customerAddresses || customer.customerAddresses;
        customer.role = role || customer.role;
        customer.customerImage = customerImage || customer.customerImage;
        customer.Orders = Orders || customer.Orders;
        customer.customerTotalPurchase =
          customerTotalPurchase || customer.customerTotalPurchase;
        customer.customerPhone = customerPhone || customer.customerPhone;

        const data = await customer.save();

        res.json({ msg: "updated", data });
      } catch (err) {
        next(err.message);
      }
    }
  },

  deleteCustomer: () => async (req, res, next) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      let error = new Error();
      error.status = 422;
      throw error;
    }
    const { _id } = req.body;
    try {
      const data = await Customers.deleteOne({ _id: _id });
      res.send({ msg: "deleted", data });
    } catch (err) {
      next(err.message);
    }
  },
};

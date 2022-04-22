const Customers = require("../Models/customerSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports.loginController = async (req, res,next) => {
  const { email, password } = req.body;

    try {
      const customer = await Customers.findOne({ customerEmail: email }).populate({path:"Orders"})

      if (customer) {
      const validPassword = await bcrypt.compare(
        password,
        customer.customerPassword
      );
      console.log(validPassword);
      if (validPassword) {
        const token = jwt.sign({ _id: customer._id }, process.env.SECRET);
        res.status(200).json({ login: "success", customer, token: token });
      } else res.status(400).send(`your password is incorrect`);
    }else res.status(400).send(`Invalid email`);
  } catch (error) {
    res.status(400).send(`login error:${error}`);
  }
};

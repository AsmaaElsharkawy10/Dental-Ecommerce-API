const Employees = require('../Models/employeeSchema');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const fs = require('fs');

module.exports = {
  getAllOrOne: async (req, res, next) => {
    const { id } = req.params;
    if (!id) {
      try {
        const allEmployee = await Employees.find({});
        res.status(200).json(allEmployee);
      } catch (error) {
        next(`cannot get all employee:${error}`);
      }
    } else {
      try {
        const employee = await Employees.findOne({ _id: id });
        if (employee) {
          res.status(200).json(employee);
        } else res.status(400).json({ employee: 'not Found' });
      } catch (error) {
        next(error);
      }
    }
  }, //get all or one customer

  addEmployee: (req, res, next) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      let error = new Error();
      error.status = 422;
      error.message = errors
        .array()
        .reduce((current, object) => current + object.msg + ' ', '');
      throw error;
    }
    let {
      fullName,
      phone,
      email,
      password,
      gender,
      workHour,
      militarystatus,
      dateOfEmployment,
      position,
    } = req.body;

    let address = JSON.parse(req.body.address);

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    password = hashedPassword;
    let employees;
    const customer = new Employees({
      password,
      phone,
      fullName,
      email,
      workHour,
      militarystatus,
      dateOfEmployment,
      //   image:"http://localhost:8080/images/"+req.file.filename,
      address,
      gender,
      position,
    });
    customer
      .save()
      .then(() => {
        employees = Employees.find({});
      })
      .catch((error) => next(error + 'cannot add employee'));
    // res.status(200).json({ msg: "Customer added", data:employees });
    res.status(200).json({ message: 'adedd', data: employees });
  }, //add Employee

  updateEmployee: async (req, res, next) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      let error = new Error();
      error.status = 422;
      error.message = errors
        .array()
        .reduce((current, object) => current + object.msg + ' ', '');
      throw error;
    }
    let address = JSON.parse(req.body.address);
    let updateEmployee;
    updateEmployee = Employees.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          phone: req.body.phone,
          fullName: req.body.fullName,
         // image:
         //   req.body.image ||
         //   'http://localhost:8080/images/' + req.file.filename,
          // customerTotalPurchase: req.body.customerTotalPurchase,
          address: address,
          position: req.body.position,
        },
      },
      { new: true },
      (err, user) => {
        if (err) {
          return res.status(400).json({ error: 'cannot update this employee' });
        } else {
          updateEmployee = user;
          res.status(200).json({ message: 'updated', data: updateEmployee });
        }
      }
    );
  },

  deleteEmployee: async (req, res, next) => {
    const { id } = req.params;
    const employee = Employees.findOne({ _id: id });
    if (!employee) {
      next('cannot find this customer');
    } else {
      try {
        const data = await Employees.deleteOne({ _id: id });
        res.send({ msg: 'deleted', data });
      } catch (err) {
        next(err.message);
      }
    }
  },
};

/*
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

const Employees = require("../Models/employeeSchema");
exports.getAllEmployees = (request, response, next) => {
  Employees.find({})
    .then((data) => {
      response.status(200).json(data);
    })
    .catch((err) => {
      next(err + "cant show employee");
    });
};

exports.getEmployeesById = (request, response, next) => {
  Employees.findOne({ _id: request.body._id })
    .then((data) => {
      response.status(200).json(data);
    })
    .catch((err) => {
      next(err);
    });
};
exports.createEmployee = (request, response, next) => {
  let errors = validationResult(request);
  if (!errors.isEmpty()) {
    let error = new Error();
    error.status = 422;
    error.message = errors
      .array()
      .reduce((current, object) => current + object.msg + " ", "");
    throw error;
  }
  let {
    fullName,
    password,
    email,
    address,
    phone,
  //  image,
    workHour,
    gender,
    militarystatus,
    dateOfEmployment,
    position,
  } = request.body;

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);
  password = hashedPassword;

  let newEmployee = new Employees({
    fullName,
    password,
    email,
    address,
    phone,
  //  image,
    workHour,
    gender,
    militarystatus,
    dateOfEmployment,
    position,
  });
  newEmployee
    .save()
    .then((data) => {
      response.status(201).json({ message: "added", data });
    })
    .catch((error) => next(error + "this is wrong"));
};


exports.updateEmployee = (request, response, next) => {
  let {
    fullName,
    password,
    email,
    address,
    phone,
    image,
    workHour,
    gender,
    militarystatus,
    dateOfEmployment,
    position,
  } = request.body;

  Employees.updateOne(
    { _id: request.body._id },
    {
      fullName,
      password,
      email,
      address,
      phone,
      image,
      workHour,
      gender,
      militarystatus,
      dateOfEmployment,
      position,
    }
  )
    .then((data) => {
      if (data.modifiedCount == 0) throw new Error("employee not found");
      response.status(200).json({ message: "updated", data });
    })
    .catch((error) => next(error));
};
exports.deleteEmployee = (request, response, next) => {
  Employees.findOneAndDelete({ _id: request.body._id })
    .then((data) => {
      if (data.modifiedCount == 0) throw new Error("employee not found");
      response.status(200).json({ message: "deleted", data });
    })
    .catch((error) => next(error));
};
*/

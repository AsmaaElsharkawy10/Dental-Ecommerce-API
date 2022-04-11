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
  Employees.findOne({ _id: request.params._id })
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
    image,
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
    image,
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
  Employees.findOneAndDelete({ _id: request.params._id })
    .then((data) => {
      if (data.modifiedCount == 0) throw new Error("employee not found");
      response.status(200).json({ message: "deleted", data });
    })
    .catch((error) => next(error));
};

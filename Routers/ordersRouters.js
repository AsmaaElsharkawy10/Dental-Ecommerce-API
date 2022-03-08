const ordersRouter =require("express").Router();
const {getAllOrders} =require("../Controllers/ordersController")

ordersRouter
.route("/orders/:id?")
.get(getAllOrders)

module.exports = ordersRouter;
const Orders = require('../Models/ordersSchema');
const { validationResult } = require('express-validator');


module.exports.getAllOrders = async (req, res, next) => {
  try {
    if (req.params.id) {
      const order = await Orders.findById(req.params.id);
      res.json(order);
    } else {
      const orders = await Orders.find().populate([
        
        {
          path: "receipt",
          populate: [{ path: "products" }],
          
        },
        {
          path:"customerId"
        }
      ]);
      res.json(orders);
    }
  } catch (err) {
    next('error find');
  }
};

module.exports.createOrders = async (req, res, next) => {
  console.log(req.body)
  const { cart , id } = req.body;
  console.log(typeof(id))
  const array = [];
  cart.cartItems.map((item)=>{
    array.push(item._id)
  })
  console.log(array)
 let receipt   =   {total:cart.cartTotalAmount,products:array}
 let date = new Date()
 
 let orderDate = {requestDate:new Date() , deliverDate: date.setDate(date.getDate() + 3)}
  const newOrder = new Orders({
    customerId:id,
    status:req.body.status || "inProgress",
    receipt,
    orderDate
  });
  const orderData = await newOrder.save();
  const orders = await Orders.find()
  res.json({ msg: 'orders added', data:orders });
};

module.exports.updateOrders = async (req, res, next) => {
 
  const {  customerId, status,receipt, ordersDate } = req.body;

  try {
    const {id} = req.params
    const order = await Orders.findById(id);

    if (!order) res.json({ msg: 'no orders' });

    order.customerId = customerId;
    order.status = status;
    order.receipt = receipt;
    order.ordersDate = ordersDate;

    const updatedOrder = await order.save();
    
    res.json({ msg: 'order updated', updatedOrder });
  } catch (err) {
    next(err);
  }
};

module.exports.removeOrders = async (req, res, next) => {

  const { id } = req.params;
  try {
    const deletedOrder = await Orders.deleteOne({ _id: id });
    res.send({ msg: 'Order deleted', deletedOrder });
  } catch (err) {
    next(err.message);
  }
};

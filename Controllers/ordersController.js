const Orders = require('../Models/ordersSchema');

module.exports = {
  getAllOrders: async (req, res) => {
    const allOrders = await Orders.find({}).then(
      () => res.status(200).json(allOrders)
    ).catch((e)=>next(e))
  },
};

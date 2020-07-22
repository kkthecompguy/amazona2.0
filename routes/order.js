const express = require('express');
const Order = require('../models/Order');
const router = express.Router();
const isAuthenticated = require('../middleware/auth');


// @route /api/orders
// @desc create orders
// @access public
router.post('/', async (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.address || !req.body.cartItems || !req.body.total) return res.status(400).json({ msg: "Please include valid data" });

  try {
    const order = await Order(req.body).save();

    return res.status(200).json(order);

  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: error.message });
  }
});


// @route /api/orders
// @desc get all orders
// @access Private
router.get('/', isAuthenticated, async (req, res) => {
  try {
    if (!req.user.isAdmin) return res.status(401).json({ msg: "User not authorized" });
    
    const orders = await Order.find();

    return res.status(200).json(orders);

  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: error.message });
  }
});


// @route /api/orders/:id
// @desc delete an order
// @access Private
router.delete('/:id', isAuthenticated, async (req, res) => {
  if (!req.user.isAdmin) return res.status(401).json({ msg: "User is not authorized" });
  try {
    const order = await Order.findById(req.params.id);

    if (!order) return res.status(404).json({ msg: 'Order not found' });

    await order.remove();

    return res.status(200).json({ msg: 'Order is deleted' });

  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: error.message });
  }
});

module.exports = router;
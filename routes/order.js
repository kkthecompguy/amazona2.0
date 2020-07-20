const express = require('express');
const Order = require('../models/Order');
const router = express.Router();

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

module.exports = router;
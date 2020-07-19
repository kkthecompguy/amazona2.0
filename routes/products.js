const express = require('express');
const router = express.Router();
const Product = require('../models/Product');


// @route GET /api/products
// @desc get all products
// @access Private
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();

    return res.status(200).json(products);

  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: error.message });
  }
});


// @route POST /api/products
// @desc create products
// @access Private
router.post('/', async (req, res) => {
  try {
    let newProduct = new Product({
      title: req.body.title,
      image: req.body.image,
      price: req.body.price,
      description: req.body.description,
      availableSizes: req.body.availableSizes
    });

    newProduct = await newProduct.save();

    return res.status(200).json(newProduct);

  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: error.message });
  }
});


// @route DELETE /api/products/:id
// @desc delete product
// @access Private
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) return res.status(404).json({ msg: "Product Not Found" });

    await product.remove();

    return res.status(200).json({ msg: "Product Deleted" });

  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: error.message });
  }
});

module.exports = router;
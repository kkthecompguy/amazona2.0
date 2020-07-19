const mongoose = require('mongoose');
const shortid = require('shortid');

const ProductSchema = new mongoose.Schema({
  _id: { 
    type: String,
    default: shortid.generate
  },
  title: {
    type: String
  },
  image: {
    type: String
  },
  price: {
    type: Number
  },
  description: {
    type: String
  },
  availableSizes: {
    type: Array,
    default: []
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Product = mongoose.model('products', ProductSchema);
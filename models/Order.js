const mongoose = require('mongoose');
const shortid = require('shortid');

const OrderSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: shortid.generate
  },
  name: {
    type:String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  cartItems: {
    type: Array,
    default: []
  },
  total: {
    type: Number,
    default: 0
  },
  paid: {
    type: Boolean,
    default: false
  },
  shipped: {
    type: Boolean,
    default: false
  }
},
{
  timestamps: true
}
);

module.exports = mongoose.model('orders', OrderSchema)
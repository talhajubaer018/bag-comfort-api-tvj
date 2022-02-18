const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  name: {
    type: String,
    required: [true, 'Please add a name']
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  price: {
    type: Number,
    required: [true, 'Please add a price']
  },
  stock: {
    type: Number,
    required: [true, 'Please add stock number']
  }

}, {
  timestamps: true
})

module.exports = mongoose.model('Product', productSchema)
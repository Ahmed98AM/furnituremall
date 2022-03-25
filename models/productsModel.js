const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
  image: String,
  priceA: Number,
  priceB: Number,
  priceC: Number,
  number: {
    type: Number,
    validate: {
      validator: function (val) {
        return val > 0;
      },
      message: 'The Number of Items Added is Not Available',
    },
  },
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;

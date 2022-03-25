const Product = require('../models/productsModel');
const Bill = require('../models/billsModel');
const mongoose = require('mongoose');

const billProductsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A Product's Name Must be Entered"],
  },
  price: {
    type: Number,
    required: [true, "A Product's Price Must be Entered"],
  },
  number: {
    type: Number,
  },
  bill: {
    type: mongoose.Schema.ObjectId,
    ref: 'Bill',
  },
});

billProductsSchema.pre('save', async function (next) {
  const foundProduct = await Product.findOne({ name: this.name });
  if (foundProduct) {
    const itemsAvailableCounter = foundProduct.number - this.number;
    await Product.findByIdAndUpdate(foundProduct._id, { number: itemsAvailableCounter }, { runValidators: true });
  }
  next();
});

billProductsSchema.pre('findOneAndUpdate', async function (next) {
  this.tempBillProduct = await this.model.findOne(this.getQuery());
  next();
});

billProductsSchema.post('findOneAndUpdate', async function () {
  const oldFoundBillProduct = await this.tempBillProduct;
  const newFoundBillProduct = await this.model.findOne(this.getQuery());
  if (oldFoundBillProduct && newFoundBillProduct)
    await Bill.findByIdAndUpdate(newFoundBillProduct.bill, { created_at: Date.now() });
  if (oldFoundBillProduct && newFoundBillProduct) {
    const itemsSoldUpdate =
      oldFoundBillProduct.name === newFoundBillProduct.name
        ? oldFoundBillProduct.number - newFoundBillProduct.number
        : newFoundBillProduct.number * -1;
    const foundProduct = await Product.findOne({ name: newFoundBillProduct.name });
    if (foundProduct) {
      const itemsAvailableCounter = foundProduct.number + itemsSoldUpdate;
      await Product.findByIdAndUpdate(foundProduct._id, { number: itemsAvailableCounter }, { runValidators: true });
    }
  }
});

billProductsSchema.pre('findOneAndDelete', async function (next) {
  const deletedBillProduct = await this.model.findOne(this.getQuery());
  let itemsRemovedFromBill = 0;
  if (deletedBillProduct) {
    itemsRemovedFromBill = deletedBillProduct.number;
    await Product.findOneAndUpdate(
      { name: deletedBillProduct.name },
      { $inc: { number: itemsRemovedFromBill } },
      { new: true }
    );
  }
  next();
});

const BillProducts = new mongoose.model('BillProducts', billProductsSchema);
module.exports = BillProducts;

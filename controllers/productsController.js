const Product = require('../models/productsModel');
const catchAsync = require('../utils/catchAsync');

exports.getAllProducts = async function (req, res, next) {
  try {
    const foundProducts = await Product.find();
    res.json({
      status: 'success',
      foundProducts,
    });
  } catch (err) {
    console.log(err);
  }
};
exports.createProduct = catchAsync(async function (req, res, next) {
  let createdProduct = {};
  if (req.body) {
    createdProduct = await Product.create(req.body);
  }
  res.status(201).json({
    status: 'success',
    data: createdProduct,
  });
});
exports.updateProduct = catchAsync(async function (req, res, next) {
  const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body);
  res.status(200).json({
    status: 'success',
    data: updatedProduct,
  });
});
exports.deleteProduct = async function (req, res, next) {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: 'success',
    });
  } catch (err) {
    next(err);
  }
};

const Product = require('../models/product.model');

exports.getAllProducts = async function (req, res, next) {
  try {
    const foundProducts = await Product.find();
    res.json({
      status: 'success',
      foundProducts,
    });
  } catch (err) {
    next(err);
  }
};
exports.createProduct = async function (req, res, next) {
  try{
    let createdProduct = {};
    if (req.body) {
      createdProduct = await Product.create(req.body);
    }
    res.status(201).json({
      status: 'success',
      data: createdProduct,
    });
  } catch (err) {
    next(err);
  }
};
exports.updateProduct = async function (req, res, next) {
  try{
  const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body);
  res.status(200).json({
    status: 'success',
    data: updatedProduct,
  });
  } catch (err) {
    next(err);
  }
};
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

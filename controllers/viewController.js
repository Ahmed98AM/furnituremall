const Product = require('../models/productsModel');
const Bill = require('../models/billsModel');
const catchAsync = require('../utils/catchAsync');

exports.showAllProducts = catchAsync(async function (req, res, next) {
  const foundProducts = await Product.find();
  res.render('products/products.ejs', { foundProducts: foundProducts });
});

exports.showNewProductForm = catchAsync(async function (req, res, next) {
  res.render('products/new.ejs');
});

exports.showUpdateProductForm = catchAsync(async function (req, res, next) {
  try {
    const foundProduct = await Product.findById(req.params.id);
    res.render('products/update.ejs', { foundProduct: foundProduct });
  } catch (err) {
    console.log(err);
  }
});

exports.showNewBillForm = async function (req, res, next) {
  res.render('bills/new.ejs', { billId: req.params.id });
};

exports.showUpdateBillForm = catchAsync(async function (req, res, next) {
  try {
    const foundBill = await Bill.findById(req.params.id);
    const foundProducts = await Product.find({});
    res.render('bills/update.ejs', { foundBill, foundProducts: foundProducts });
  } catch (err) {
    console.log(err);
  }
});

exports.showAllBills = catchAsync(async function (req, res, next) {
  const foundBills = await Bill.find();
  if (foundBills.length !== 0) {
    const priceSumUpdatedBills = await Promise.all(
      foundBills.map(async (foundBill) => {
        let sumProductsCounter = 0;
        foundBill.billProducts.forEach(function (billProduct) {
          sumProductsCounter += billProduct.price * billProduct.number;
        });
        return await Bill.findByIdAndUpdate(foundBill._id, { $set: { priceSum: sumProductsCounter } }, { new: true });
      })
    );
    res.locals.billID = foundBills[0]._id;
    res.render('bills/bills.ejs', {
      foundBills: priceSumUpdatedBills,
    });
  } else {
    res.render('bills/bills.ejs', {
      foundBills,
    });
  }
});

const BillProducts = require('../models/billProductsModel');
const Product = require('../models/product.model');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const productAvailabilityChecker = async function (reqBody) {
  for (const billProduct in reqBody) {
    let foundProduct = await Product.find({ name: reqBody[billProduct].name });
    const errorMsg = `Number of items wanted of the product named ${reqBody[billProduct].name} is not avalaible `;
    if (reqBody[billProduct].number * 1 > foundProduct[0].number * 1) {
      return errorMsg;
    }
  }
  return false;
};

exports.createBillProducts = catchAsync(async function (req, res, next) {
  if (await productAvailabilityChecker(req.body)) {
    return next(new AppError(await productAvailabilityChecker(req.body), 400));
  }
  for (const billProduct in req.body) {
    if (req.body[billProduct].name)
      await BillProducts.create({
        name: req.body[billProduct].name,
        price: req.body[billProduct].price,
        number: req.body[billProduct].number,
        bill: req.body[billProduct].billId,
      });
  }
  res.status(201).json({
    status: 'success',
  });
});

exports.updateBillProducts = catchAsync(async function (req, res, next) {
  if (await productAvailabilityChecker(req.body)) {
    return next(new AppError(await productAvailabilityChecker(req.body), 400));
  }
  for (const billProduct in req.body) {
    req.body[billProduct].billProductId
      ? await BillProducts.findByIdAndUpdate(
          req.body[billProduct].billProductId,
          {
            name: req.body[billProduct].name,
            price: req.body[billProduct].price,
            number: req.body[billProduct].number,
          },
          { runValidators: true }
        )
      : await BillProducts.create({
          name: req.body[billProduct].name,
          price: req.body[billProduct].price,
          number: req.body[billProduct].number,
          bill: req.body[billProduct].billId,
        });
  }
  res.status(201).json({
    status: 'success',
  });
});

exports.deleteBillProduct = catchAsync(async function (req, res, next) {
  await BillProducts.findByIdAndDelete(req.params.id);
  res.status(200).json({
    status: 'success',
  });
});

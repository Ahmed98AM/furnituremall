const Bill = require('../models/billsModel');
const BillProducts = require('../models/billProductsModel');
const catchAsync = require('../utils/catchAsync');

exports.getAllBills = catchAsync(async function (req, res, next) {
  const foundBills = await Bill.find();
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

  res.status(201).json({
    status: 'success',
    data: priceSumUpdatedBills,
  });
});

exports.createBill = catchAsync(async function (req, res, next) {
  const createdBill = await Bill.create({ created_At: Date.now() });
  res.status(201).json({
    status: 'success',
    data: createdBill,
  });
});

exports.deleteBill = catchAsync(async function (req, res, next) {
  const deletedBill = await Bill.findByIdAndDelete(req.params.id);
  await Promise.all(
    deletedBill.billProducts.map(async function (billProduct) {
      return await BillProducts.findByIdAndDelete(billProduct._id);
    })
  );
  res.status(200).json({
    status: 'success',
  });
});

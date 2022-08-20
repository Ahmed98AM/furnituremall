const Bill = require('../models/billsModel');
const BillProducts = require('../models/billProductsModel');

exports.getAllBills = async function (req, res, next) {
  try{
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
  } catch (err) {
    next(err);
  }
};

exports.createBill = async function (req, res, next) {
  try{
  const createdBill = await Bill.create({ created_At: Date.now() });
  res.status(201).json({
    status: 'success',
    data: createdBill,
  });
  } catch (err) {
    next(err)
  }
};

exports.deleteBill = async function (req, res, next) {
  try{
  const deletedBill = await Bill.findByIdAndDelete(req.params.id);
  await Promise.all(
    deletedBill.billProducts.map(async function (billProduct) {
      return await BillProducts.findByIdAndDelete(billProduct._id);
    })
  );
  res.status(200).json({
    status: 'success',
  });
  } catch (err) {
    next(err);
  }
};

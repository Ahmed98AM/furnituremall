const express = require('express');
const router = express.Router();
const billsController = require('../controllers/billsController');
const billProductsController = require('../controllers/billProductsController');

router.route('/').get(billsController.getAllBills).post(billsController.createBill);
router.route('/:id').delete(billsController.deleteBill).patch(billProductsController.updateBillProducts);

module.exports = router;

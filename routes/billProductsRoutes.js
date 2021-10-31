const express = require('express');
const router = express.Router({ mergeParams: true });
const billProductsController = require('../controllers/billProductsController');

router.route('/').post(billProductsController.createBillProducts);
router.route('/:id').delete(billProductsController.deleteBillProduct);

module.exports = router;

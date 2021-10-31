const express = require('express');
const router = express.Router();
const viewController = require('../controllers/viewController');

router.route('/products').get(viewController.showAllProducts);
router.route('/products/new').get(viewController.showNewProductForm);
router.route('/products/:id/update').get(viewController.showUpdateProductForm);

router.route('/bills').get(viewController.showAllBills);
router.route('/bills/new/:id').get(viewController.showNewBillForm);
router.route('/bills/:id/update').get(viewController.showUpdateBillForm);

module.exports = router;

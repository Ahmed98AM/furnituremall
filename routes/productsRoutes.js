const express = require('express');
const productsController = require('../controllers/productsController');
const router = express.Router();

router.route('/').get(productsController.getAllProducts).post(productsController.createProduct);
router.route('/:id').delete(productsController.deleteProduct).patch(productsController.updateProduct);

module.exports = router;

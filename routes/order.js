var express = require('express');
var router = express.Router();
var orderController = require('../controller/order.controller');

router.get('/getArea', orderController.getArea);
router.get('/getShop', orderController.getShop);
router.get('/getCategory', orderController.getCategory);
router.get('/getProduct', orderController.getProduct);
router.post('/generateOrder', orderController.generateOrder);
router.get('/getOderByMonth', orderController.getOderByMonth);
router.get('/getOderByArea', orderController.getOderByArea);
router.get('/getUserTarget', orderController.getUserTarget);
module.exports = router;

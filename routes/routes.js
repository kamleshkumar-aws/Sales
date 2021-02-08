var express = require('express');
var router = express.Router();
//product
let productRoute = require('../routes/product');
let loginRoute = require('./login');
let userRoute = require('./users');
let roleRoute = require('./role');
let userTargetRoute = require('./userTarget');
let categoryRoute = require('./category');
let userLocationRoute = require('./userLocation');
let addressDependent = require('./addressDependent');
let shopRoute = require('./shop');
let order = require('./order');
let refressToken=require('./refreshToken')

router.use('/login', loginRoute);
router.use('/location', userLocationRoute);
router.use('/refreshToken', refressToken);
router.use(require('../authentication/tokenChecker').checkToken);
router.use('/product', productRoute);
router.use('/category', categoryRoute);
router.use('/user', userRoute);
router.use('/role', roleRoute);
router.use('/userTarget', userTargetRoute);
router.use('/address', addressDependent);
router.use('/shop', shopRoute);
router.use('/order', order);
module.exports = router;

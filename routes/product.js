var express = require("express");
var router = express.Router();
let productController = require("../controller/product.controller");

router.get("/get",productController.get);
router.post("/save",productController.save);
router.post("/getById",productController.getById);

module.exports = router;
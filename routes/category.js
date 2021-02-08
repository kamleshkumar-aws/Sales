var express = require("express");
var router = express.Router();
let categoryController = require("../controller/category.controller");

router.get("/get",categoryController.get);
router.post("/save",categoryController.save);
router.post("/getById",categoryController.getById);

module.exports = router;
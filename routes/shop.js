"use strict";
var express = require("express");
var router = express.Router();
var shopController = require("../controller/shop.controller");
const {
    celebrate
} = require('celebrate');
const {
    userSchema,
    userRoleSchema
} = require('../validation/requestBodyValidation')
/* GET users listing. */

router.get("/getAll", shopController.get);

router.get("/getShopById",shopController.getById);

router.post("/save", shopController.save);

router.post("/getShopDropdown", shopController.getShopDropdown);

module.exports = router;
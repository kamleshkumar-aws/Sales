var express = require("express");
var router = express.Router();
var userController = require("../controller/user.controller");

router.post("/setUserLocation", userController.SetLocation);

module.exports = router;

"use strict";
var express = require("express");
var router = express.Router();
var userController = require("../controller/user.controller");
const { celebrate } = require("celebrate");
const {
  userSchema,
  userRoleSchema
} = require("../validation/requestBodyValidation");
/* GET users listing. */

router.get("/getAll", userController.Get);

router.get("/getUserById", userController.GetById);

router.put("/updateUser", userController.Update);

router.post("/addUser", userController.Add);

router.post("/AssignRole", userController.AssignRole);

router.get("/getUserByRoleId", userController.getUserByRoleId);

router.get("/getUserDetailsByRoleId", userController.getUserDetailsByRoleId);

module.exports = router;

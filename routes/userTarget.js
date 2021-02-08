"use strict";
var express = require("express");
var router = express.Router();
var userTargetController = require("../controller/userTarget.controller");
/* GET users listing. */

router.get("/getAll", userTargetController.Get);

router.get("/getUserTargetById", userTargetController.GetById);

router.put("/updateUserTarget", userTargetController.Update);

router.post("/addUserTarget", userTargetController.Add);

router.post(
  "/getUserTargetByRoleId",
  userTargetController.getUserTargetByRoleId
);

module.exports = router;

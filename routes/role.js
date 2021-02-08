"use strict";
var express = require("express");
var router = express.Router();
let roleController = require("../controller/role.controller");

/* GET users listing. */

router.get("/getAll", roleController.Get);

router.get("/getRoleById", roleController.GetById);

router.put("/updateRole", roleController.Update);

router.post("/addRole", roleController.Add);

router.get("/getRoleDropdown", roleController.GetRoleDropdown);

module.exports = router;

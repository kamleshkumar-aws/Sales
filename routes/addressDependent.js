var express = require("express");
var router = express.Router();
var areaController = require("../controller/area.controller");

router.get("/getArea", areaController.get);
router.post("/saveArea", areaController.save);
router.post("/getAreaById", areaController.getById);
router.get("/getCountry", areaController.getCountry);
router.get("/getState", areaController.getState);
router.get("/getCity", areaController.getCity);
router.get("/getAreaByCity", areaController.getArea);
module.exports = router;

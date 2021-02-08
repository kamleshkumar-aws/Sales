"use strict";
let areaBusiness = require("../bal/area.business");

let get = (req, res, next) => {
  let companyId = req.decoded.userObj.companyId;
  areaBusiness
    .getAll(companyId)
    .then(result => {
      if (result)
        return res.generateResponse(true, result, "fetch successfully.", 200);
      else return res.generateResponse(false, result, "No record found.", 200);
    })
    .catch(err => {
      err.errors.forEach(element => {
        error += element.message;
      });
      return res.generateResponse(false, "", error == "" ? err : error, 500);
    });
};

let getById = (req, res, next) => {
  let id = req.query.id;
  areaBusiness
    .getById(id)
    .then(result => {
      if (result)
        return res.generateResponse(true, result, "fetch successfully.", 200);
      else return res.generateResponse(false, result, "No record found.", 200);
    })
    .catch(err => {
      err.errors.forEach(element => {
        error += element.message;
      });
      return res.generateResponse(false, "", error == "" ? err : error, 500);
    });
};

let save = (req, res, next) => {
  let areaObj = req.body;
  let companyId = req.decoded.userObj.companyId;
  areaBusiness
    .saveUpdate(areaObj, companyId)
    .then(result => {
     // console.log(result)
      return res.generateResponse(
        true,
        result,
        "Area Processed successfully.",
        200
      );
    })
    .catch(err => {
      err.errors.forEach(element => {
        error += element.message;
      });
      return res.generateResponse(false, "", err, 500);
    });
};

let getCountry = (req, res, next) => {
  areaBusiness
    .getCountry()
    .then(result => {
      return res.generateResponse(true, result, "fetch successfully.", 200);
    })
    .catch(err => {
      err.errors.forEach(element => {
        error += element.message;
      });
      return res.generateResponse(false, "", error == "" ? err : error, 500);
    });
};

let getState = (req, res, next) => {
  let countryId = req.query.countryId;
  areaBusiness
    .getState(countryId)
    .then(result => {
      return res.generateResponse(true, result, "fetch successfully.", 200);
    })
    .catch(err => {
      err.errors.forEach(element => {
        error += element.message;
      });
      return res.generateResponse(false, "", error == "" ? err : error, 500);
    });
};

let getCity = (req, res, next) => {
  let stateId = req.query.stateId;
  areaBusiness
    .getCity(stateId)
    .then(result => {
      return res.generateResponse(true, result, "fetch successfully.", 200);
    })
    .catch(err => {
      err.errors.forEach(element => {
        error += element.message;
      });
      return res.generateResponse(false, "", error == "" ? err : error, 500);
    });
};
let getArea = (req, res, next) => {
  let cityId = req.query.cityId;
  areaBusiness
    .getArea(cityId)
    .then(result => {
      return res.generateResponse(true, result, "fetch successfully.", 200);
    })
    .catch(err => {
      err.errors.forEach(element => {
        error += element.message;
      });
      return res.generateResponse(false, "", error == "" ? err : error, 500);
    });
};
module.exports = {
  get,
  getById,
  save,
  getCountry,
  getState,
  getCity,
  getArea
};

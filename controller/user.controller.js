"use strict";
let userBusiness = require("../bal/user.business");

let Get = (req, res, next) => {
  let companyId = req.decoded.userObj.companyId;
  userBusiness
    .getAllUser(companyId)
    .then(result => {
      if (result.length > 0)
        return res.generateResponse(true, result, "fetch successfully.", 200);
      else return res.generateResponse(false, result, "No record found.", 200);
    })
    .catch(err => {
      var error = "";
      if (err.errors)
        err.errors.forEach(element => {
          error += element.message;
        });
      return res.generateResponse(false, "", error == "" ? err : error, 500);
    });
};

let Add = (req, res, next) => {
  let user = req.body;
  let companyId = req.decoded.userObj.companyId;
  let userId = req.decoded.userObj.id;
  userBusiness
    .addUser(user, companyId, userId)
    .then(result => {
      return res.generateResponse(true, result, "Added successfully.", 200);
    })
    .catch(err => {
      var error = "";
      if (err.errors)
        err.errors.forEach(element => {
          error += element.message;
        });
      return res.generateResponse(false, "", error == "" ? err : error, 500);
    });
};

let Update = (req, res, next) => {
  let user = req.body;
  let userId = req.decoded.userObj.id;
  userBusiness
    .updateUser(user, userId)
    .then(result => {
      if (result > 0)
        return res.generateResponse(true, result, "Updated successfully.", 200);
      else return res.generateResponse(false, result, "No record found.", 200);
    })
    .catch(err => {
      var error = "";
      if (err.errors)
        err.errors.forEach(element => {
          error += element.message;
        });
      return res.generateResponse(false, "", error == "" ? err : error, 500);
    });
};

let GetById = (req, res, next) => {
  let userId = req.query.id;
  userBusiness
    .getById(userId)
    .then(result => {
      if (result)
        return res.generateResponse(true, result, "fetch successfully.", 200);
      else return res.generateResponse(false, result, "No record found.", 200);
    })
    .catch(err => {
      var error = "";
      if (err.errors)
        err.errors.forEach(element => {
          error += element.message;
        });
      return res.generateResponse(false, "", error == "" ? err : error, 500);
    });
};

let AssignRole = (req, res, next) => {
  let userRole = req.body;
  userBusiness
    .assignRole(userRole)
    .then(result => {
      return res.generateResponse(true, result, "Added successfully.", 200);
    })
    .catch(err => {
      var error = "";
      if (err.errors)
        err.errors.forEach(element => {
          error += element.message;
        });
      return res.generateResponse(false, "", error == "" ? err : error, 500);
    });
};

let SetLocation = (req, res, next) => {
  let userLocation = req.body;
  userBusiness
    .setUserLocation(userLocation)
    .then(result => {
      return res.generateResponse(true, result, "Added successfully.", 200);
    })
    .catch(err => {
      var error = "";
      if (err.errors)
        err.errors.forEach(element => {
          error += element.message;
        });
      return res.generateResponse(false, "", error == "" ? err : error, 500);
    });
};
let getUserByRoleId = (req, res, next) => {
  let id = req.query.id;
  userBusiness
    .getUserByRoleId(id, req.decoded.userObj.companyId)
    .then(result => {
      return res.generateResponse(true, result, "Added successfully.", 200);
    })
    .catch(err => {
      var error = "";
      if (err.errors)
        err.errors.forEach(element => {
          error += element.message;
        });
      return res.generateResponse(false, "", error == "" ? err : error, 500);
    });
};

let getUserDetailsByRoleId = (req, res, next) => {
  let id = req.query.id;
  userBusiness
    .getUserDetailsByRoleId(id, req.decoded.userObj.companyId)
    .then(result => {
      return res.generateResponse(true, result, "Added successfully.", 200);
    })
    .catch(err => {
      var error = "";
      if (err.errors)
        err.errors.forEach(element => {
          error += element.message;
        });
      return res.generateResponse(false, "", error == "" ? err : error, 500);
    });
};

module.exports = {
  Get,
  Add,
  Update,
  GetById,
  AssignRole,
  SetLocation,
  getUserByRoleId,
  getUserDetailsByRoleId
};

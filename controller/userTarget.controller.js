let userTargetBusiness = require("../bal/userTarget.business");

let Get = (req, res, next) => {
  let userId = req.query.userId;
  userTargetBusiness
    .getAllUserTarget(userId)
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
  let userTarget = req.body;
  let userId = req.decoded.userObj.id;
  userTargetBusiness
    .addUserTarget(userTarget, userId)
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
  let userTarget = req.body;
  let userId = req.decoded.userObj.id;
  userTargetBusiness
    .updateUserTarget(userTarget, userId)
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
  let id = req.query.userTargetId;
  userTargetBusiness
    .getByIdTarget(id)
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

let getUserTargetByRoleId = (req, res, next) => {
  let companyId = req.decoded.userObj.companyId;
  let roleId = req.query.roleId;
  userTargetBusiness
    .getUserTargetByRoleId(roleId, companyId)
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

module.exports = {
  Get,
  Add,
  Update,
  GetById,
  getUserTargetByRoleId
};

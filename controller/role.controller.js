let roleBusiness = require("../bal/role.business");

let Get = (req, res, next) => {
  let companyId = req.decoded.userObj.companyId;
  roleBusiness
    .getAllRole(companyId)
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
  let role = req.body;
  let companyId = req.decoded.userObj.companyId;
  roleBusiness
    .addRole(role, companyId)
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
  let role = req.body;
  roleBusiness
    .updateRole(role)
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
  let roleId = req.query.roleId;
  roleBusiness
    .getById(roleId)
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

let GetRoleDropdown = (req, res, next) => {
  let userId = req.query.userId;
  let companyId = req.decoded.userObj.companyId;
  roleBusiness
    .getRoleDropdown(companyId, userId)
    .then(results => {
      if (results.length > 0)
        return res.generateResponse(true, results, "fetch successfully.", 200);
      else return res.generateResponse(true, results, "NO record found.", 200);
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
  GetRoleDropdown
};

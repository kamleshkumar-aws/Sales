var { UserTarget,sequelize } = require("../dbSetting/Connection");

let getAllUserTarget = userId => {
  return new Promise(function(resolve, reject) {
    UserTarget.findAll({ where: { userId: userId } })
      .then(UserTargets => {
        return resolve(UserTargets);
      })
      .catch(err => {
        return reject(err);
      });
  });
};

let addUserTarget = (userTarget, userId) => {
  return new Promise(function(resolve, reject) {
    UserTarget.create({
      target: userTarget.target,
      fromDate: userTarget.fromDate,
      toDate: userTarget.toDate,
      userId: userTarget.userId,
      createdById: userId
    })
      .then(userTargetResult => {
        return resolve(userTargetResult);
      })
      .catch(err => {
        return reject(err);
      });
  });
};

let updateUserTarget = (userTarget, userId) => {
  return new Promise(function(resolve, reject) {
    UserTarget.update(
      {
        target: userTarget.target,
        fromDate: userTarget.fromDate,
        toDate: userTarget.toDate,
        userId: userTarget.userId,
        modifiedById: userId
      },
      { where: { id: userTarget.id } }
    )
      .then(function(rowsUpdated) {
        return resolve(rowsUpdated);
      })
      .catch(err => {
        return reject(err);
      });
  });
};

let getByIdTarget = id => {
  return new Promise(function(resolve, reject) {
    UserTarget.findByPk(id)
      .then(userTarget => {
        return resolve(userTarget);
      })
      .catch(err => {
        return reject(err);
      });
  });
};

let getUserTargetByRoleId=(roleId,companyId)=>
{
  sequelize.query(
    "select * from mst_user us JOIN map_user_role map ON us.id = map.userId JOIN map_user_target maptarget ON us.Id = maptarget.userId WHERE map.roleId ="
    + roleId +" AND us.companyId = "+companyId
  ).then(([user, metadata])=>{
    return resolve(user);
  }).catch(err=>{
    return reject(err);
  })
}

module.exports = {
  getAllUserTarget,
  addUserTarget,
  updateUserTarget,
  getByIdTarget,
  getUserTargetByRoleId
};

var {
  User,
  UserRole,
  UserLocation,
  sequelize,
  Address
} = require("../dbSetting/Connection");

let getAllUser = companyId => {
  return new Promise(function(resolve, reject) {
    if (companyId) {
      User.findAll({
        where: {
          companyId: companyId
        }
      })
        .then(users => {
          return resolve(users);
        })
        .catch(err => {
          return reject(err);
        });
    } else {
      User.findAll()
        .then(users => {
          return resolve(users);
        })
        .catch(err => {
          return reject(err);
        });
    }
  });
};

let addUser = (user, companyId, userId) => {
  return new Promise(function(resolve, reject) {
    return sequelize.transaction().then(t => {
      Address.create({
        areaId: user.areaId,
        landmark: user.landmark,
        addressLine1: user.addressLine1,
        addressLine2: user.addressLine2,
        postalCode: user.postalCode,
        isActive: user.isActive,
        cityId: user.cityId,
        createdById: userId
      },
      { transaction: t })
        .then(addressResult => {
          User.create({
            firstName: user.firstName,
            lastName: user.lastName,
            mobile: user.mobile,
            emailId: user.emailId,
            username: user.username,
            password: user.password,
            companyId: companyId,
            isActive: user.isActive,
            managerId: user.managerId,
            createdById: userId,
            addressId: addressResult.id
          },
          { transaction: t })
            .then(userResult => {
              t.commit();
              return resolve(userResult);
            })
            .catch(err => {
              t.rollback();
              return reject(err);
            });
        })
        .catch(err => {
          t.rollback();
          return reject(err);
        });
    });
  });
};

let updateUser = (user, userId) => {
  return new Promise(function(resolve, reject) {
    return sequelize.transaction().then(t => {
      User.update(
        {
          firstName: user.firstName,
          lastName: user.lastName,
          mobile: user.mobile,
          emailId: user.emailId,
          username: user.username,
          password: user.password,
          isActive: user.isActive,
          modifiedById: userId
        },
        {
          where: {
            id: user.id
          }
        }
        ,
				{ transaction: t }
      )
        .then(function(rowsUpdated) {
          Address.update(
            {
              area: user.area,
              landmark: user.landmark,
              addressLine1: user.addressLine1,
              addressLine2: user.addressLine2,
              postalCode: user.postalCode,
              isActive: user.isActive,
              cityId: user.cityId,
              modifiedById: userId
            },
            {
              where: {
                id: user.addressId
              }
            }
            ,
				{ transaction: t }
          )
            .then(rowsUpdated => {
              t.commit();
            })
            .catch(err => {
              t.rollback();
              return reject(err);
            });
          return resolve(rowsUpdated);
        })
        .catch(err => {
          t.rollback();
          return reject(err);
        });
    });
  });
};

let getById = id => {
  return new Promise(function(resolve, reject) {
    sequelize
      .query(
        "select us.*,ad.* from mst_user us LEFT JOIN  mst_address ad ON ad.id=us.addressId where us.Id = " +
          id
      )
      .then(([user, metadata]) => {
        return resolve(user);
      })
      .catch(err => {
        return reject(err);
      });
  });
};

let assignRole = userRole => {
  return new Promise(function(resolve, reject) {
    UserRole.create({
      roleId: userRole.roleId,
      userId: userRole.userId
    })
      .then(userRoles => {
        return resolve(userRoles);
      })
      .catch(err => {
        return reject(err);
      });
  });
};

let setUserLocation = userLocation => {
  return new Promise(function(resolve, reject) {
    UserLocation.create({
      UserId: userLocation.userId,
      latitude: userLocation.latitude,
      longitude: userLocation.longitude,
      logDate: userLocation.logDate
    })
      .then(result => {
        return resolve(result);
      })
      .catch(err => {
        return reject(err);
      });
  });
};

let getUserByRoleId = (roleId, companyId) => {
  return new Promise(function(resolve, reject) {
    sequelize
      .query(
        "select user.id as Value ,concat(user.firstName,' ',user.lastName) as Text  from mst_user user join map_user_role map ON user.id=map.userId AND map.roleId=" +
          roleId +
          " AND user.companyId =" +
          companyId
      )
      .then(([data, metadata]) => {
        return resolve(data);
      })
      .catch(err => {
        return reject(err);
      });
  });
};

let getUserDetailsByRoleId = (roleId, companyId) => {
  roleId = roleId || 0;
  return new Promise(function(resolve, reject) {
    sequelize
      .query(
        "select us.id  ,us.firstName +' '+us.lastName as name ,ustar.target,ustar.fromDate,ustar.toDate from mst_user us " +
          "JOIN map_user_target ustar On us.id=ustar.userId join map_user_role map ON us.id=map.userId WHERE  map.roleId= CASE WHEN " +
          roleId +
          "=0 THEN map.roleId ELSE " +
          roleId +
          " END AND us.companyId =" +
          companyId
      )
      .then(([data, metadata]) => {
        return resolve(data);
      })
      .catch(err => {
        return reject(err);
      });
  });
};

module.exports = {
  getAllUser,
  addUser,
  updateUser,
  getById,
  assignRole,
  setUserLocation,
  getUserByRoleId,
  getUserDetailsByRoleId
};

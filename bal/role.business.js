var { Role, sequelize, RoleCompany } = require("../dbSetting/Connection");

let getAllRole = companyId => {
  return new Promise(function(resolve, reject) {
    if (companyId) {
      Role.findAll({ where: { companyId: companyId } })
        .then(roles => {
          return resolve(roles);
        })
        .catch(err => {
          return reject(err);
        });
    } else {
      Role.findAll()
        .then(roles => {
          return resolve(roles);
        })
        .catch(err => {
          return reject(err);
        });
    }
  });
};

let addRole = (role, companyId) => {
  return new Promise(function(resolve, reject) {
    return sequelize
      .transaction()
      .then(t => {
        Role.create({
          name: role.name,
          isActive: role.isActive,
          companyId: companyId
        })
          .then(roleResult => {
            RoleCompany.create({
              roleId: roleResult.id,
              companyId: companyId
            })
              .then(roleCompanyResult => {
                t.commit();
                return resolve(roleResult);
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
      })
      .catch(err => {
        return reject(err);
      });
  });
};

let updateRole = role => {
  return new Promise(function(resolve, reject) {
    Role.update(
      { name: role.name, isActive: role.isActive },
      { where: { id: role.id } }
    )
      .then(function(rowsUpdated) {
        return resolve(rowsUpdated);
      })
      .catch(err => {
        return reject(err);
      });
  });
};

let getById = id => {
  return new Promise(function(resolve, reject) {
    Role.findByPk(id)
      .then(role => {
        return resolve(role);
      })
      .catch(err => {
        return reject(err);
      });
  });
};

let getRoleDropdown = (companyId, userId) => {
  userId = userId || 0;
  return new Promise(function(resolve, reject) {
    if (companyId) {
      sequelize
        .query(
          "select role.id as value ,role.name as text ,case when map.id is null then 0 else 1 End as selected from sys_role role "+
          " JOIN map_role_company rolecom ON role.id=rolecom.roleId"+
          " JOIN mst_company com ON com.id=rolecom.companyId left join map_user_role map ON role.id=map.roleId AND map.userId=" +
            userId +
            " And com.id =" +
            companyId
        )
        .then(([roles, metadata]) => {
          return resolve(roles);
        })
        .catch(err => {
          return reject(err);
        });
    } else {
      sequelize
        .query(
          "select role.id as value ,role.name as text ,case when map.id is null then 0 else 1 End as selected from sys_role role "+
          " JOIN map_role_company rolecom ON role.id=rolecom.roleId"+
          " JOIN mst_company com ON com.id=rolecom.companyId left join map_user_role map ON role.id=map.roleId AND map.userId="+
            userId
        )
        .then(([roles, metadata]) => {
          return resolve(roles);
        })
        .catch(err => {
          return reject(err);
        });
    }
  });
};
module.exports = { getAllRole, addRole, updateRole, getById, getRoleDropdown };

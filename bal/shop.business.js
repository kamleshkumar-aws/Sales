var { Shop, sequelize, Address } = require("../dbSetting/Connection");

getAll = companyId => {
  return new Promise(function(resolve, reject) {
    if (req.decoded.companyId) {
      Shop.findAll({ where: { companyId: companyId } })
        .then(shops => {
          if (shops.length > 0) {
            resolve(shops);
          } else {
            reject("No data found!");
          }
        })
        .catch(err => {
          reject(err);
        });
    } else {
      Shop.findAll()
        .then(shops => {
          if (shops.length > 0) {
            resolve(shops);
          } else {
            reject("No data found!");
          }
        })
        .catch(err => {
          reject(err);
        });
    }
  });
};

insertShop = (shop, companyId, userId) => {
  return new Promise(function(resolve, reject) {
    return sequelize.transaction().then(t => {
      Address.create({
        areaId: shop.areaId,
        landmark: shop.landmark,
        addressLine1: shop.addressLine1,
        addressLine2: shop.addressLine2,
        postalCode: shop.postalCode,
        isActive: shop.isActive,
        cityId: shop.cityId,
        createdById: userId
      },
      { transaction: t })
        .then(addressResult => {
          Shop.create({
            name: shop.name,
            ownerName: shop.ownerName,
            mobileNumber: shop.mobileNumber,
            email: shop.email,
            isActive: shop.isActive,
            companyId: companyId,
            createdById: userId,
            addressId: addressResult.id
          },
          { transaction: t })
            .then(shopResult => {
              t.commit();
              return resolve(shopResult);
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

updateShop = (shop, userId) => {
  return new Promise(function(resolve, reject) {
    return sequelize.transaction().then(t => {
      Shop.update(
        {
          name: shop.name,
          ownerName: shop.ownerName,
          mobileNumber: shop.mobileNumber,
          email: shop.email,
          isActive: shop.isActive,
          modifiedById: userId
        },
        { where: { id: shop.Id } }
        ,
				{ transaction: t }
      )
        .then(shopResult => {
          Address.update(
            {
              area: shop.area,
              landmark: shop.landmark,
              addressLine1: shop.addressLine1,
              addressLine2: shop.addressLine2,
              postalCode: shop.postalCode,
              isActive: shop.isActive,
              cityId: shop.cityId,
              modifiedById: userId
            },
            { where: { id: shop.addressId } }
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
          return resolve(shopResult);
        })
        .catch(err => {
          return reject(err);
        });
    });
  });
};

let getById = id => {
  return new Promise(function(resolve, reject) {
    sequelize
      .query(
        "select shop.*,ad.* from mst_shop shop  LEFT JOIN mst_address ad ON ad.id=shop.addressId where shop.Id = " +
          id
      )
      .then(shop => {
        return resolve(shop);
      })
      .catch(err => {
        return reject(err);
      });
  });
};

let getShopDropdown = (companyId, areaId) => {
  return new Promise(function(resolve, reject) {
    Shop.findAll(
      {
        attributes: ["id", "name"],
        where: { companyId: companyId },
        include: [{ model: Address, required: true, where: { areaId: areaId },attributes:[] }]
      }
    )
      .then(shop => {
        return resolve(shop);
      })
      .catch(err => {
        console.log(err);
        return reject(err);
      });
  });
};

module.exports = {
  getAll,
  insertShop,
  updateShop,
  getById,
  getShopDropdown
};

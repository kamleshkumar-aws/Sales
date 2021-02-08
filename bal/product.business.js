var { Product,sequelize } = require("../dbSetting/Connection");

let getAll = companyId => {
  if (companyId) {
    return new Promise(function (resolve, reject) {
      sequelize.query(
        "select prod.* , cat.name categoryName from mst_product prod join mst_category "+ 
        "cat ON cat.id=prod.categoryId  AND prod.companyId = " +companyId
      )
        .then(([data, metadata]) => {
          return resolve(data);
        })
        .catch(err => {
          return reject(err);
        });
    });
  } else {
    return new Promise(function (resolve, reject) {
      Product.findAll()
        .then(data => {
          return resolve(data);
        })
        .catch(err => {
          return reject(err);
        });
    });
  }
};

let save = (catObj) => {
  return new Promise(function (resolve, reject) {
    Product.create(catObj)
      .then(data => {
        return resolve(data);
      })
      .catch(err => {
        return reject(err);
      });
  });
};

let update = catObj => {
  let id = catObj.id;
  delete catObj.id;
  return new Promise(function (resolve, reject) {
    Product.update(catObj, { where: { id: id } })
      .then(data => {
        return resolve(data);
      })
      .catch(err => {
        return reject(err);
      });
  });
};

let getById = (id) => {
  return new Promise(function (resolve, reject) {
    Product.findByPk(id)
      .then(data => {
        console.log(data);
        return resolve(data);
      })
      .catch(err => {
        return reject(err);
      });
  });
};


module.exports = { save, update, getById, getAll };

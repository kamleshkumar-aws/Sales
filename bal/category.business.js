var { Category } = require("../dbSetting/Connection");
let bluebird = require("bluebird");
let CategoryRepo = bluebird.promisifyAll(Category);

let getAll = companyId => {
  if (companyId) {
    return new Promise(function(resolve, reject) {
      Category.findAll({ where: { companyId: companyId } })
        .then(data => {
          console.log(data);
          return resolve(data);
        })
        .catch(err => {
          return reject(err);
        });
    });
  } else {
    return new Promise(function(resolve, reject) {
      Category.findAll()
        .then(data => {
          return resolve(data);
        })
        .catch(err => {
          return reject(err);
        });
    });
  }
};

let save = catObj => {
  return new Promise(function(resolve, reject) {
    Category.create(catObj)
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
  return new Promise(function(resolve, reject) {
    Category.update(catObj, { where: { id: id } })
      .then(data => {
        return resolve(data);
      })
      .catch(err => {
        return reject(err);
      });
  });
};

let getById = id => {
  return new Promise(function(resolve, reject) {
    Category.findByPk(id)
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

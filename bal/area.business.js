let {
  Area,
  Country,
  State,
  City,
  sequelize
} = require("../dbSetting/Connection");

let getAll = companyId => {
  if (companyId) {
    return new Promise(function(resolve, reject) {
      // Area.findAll({ where: { companyId: companyId } })
      sequelize
        .query(
          "select ar.*,city.id cityId , city.name cityName,st.id stateId,st.name stateName," +
            " country.id countryId ,country.name countryName FROM mst_area ar JOIN mst_city city ON city.id=ar.cityId JOIN mst_state" +
            " st ON st.id=city.stateId JOIN mst_country country On country.id = st.countryId where ar.companyId=" +
            companyId
        )
        .then(([data, metadata]) => {
          return resolve(data);
        })
        .catch(err => {
          return reject(err);
        });
    });
  } else {
    return new Promise(function(resolve, reject) {
      sequelize
        .query(
          "select ar.*,city.id cityId , city.name cityName,st.id stateId,st.name stateName," +
            " country.id countryId ,country.name countryName FROM mst_area ar JOIN mst_city city ON city.id=ar.cityId JOIN mst_state" +
            " st ON st.id=city.stateId JOIN mst_country country On country.id = st.countryId"
        )
        .then(([data, metadata]) => {
          return resolve(data);
        })
        .catch(err => {
          return reject(err);
        });
    });
  }
};

let getById = id => {
  return new Promise(function(resolve, reject) {
    // Area.findByPk(id)
    sequelize
      .query(
        "select ar.*,city.id cityId , city.name cityName,st.id stateId,st,name stateName," +
          " country.id countryId ,country.name countryName FROM mst_area ar JOIN mst_city city ON city.id=ar.cityId JOIN mst_state" +
          " st ON st.id=city.stateId JOIN mst_country country On country.id = st.countryId where ar.id=" +
          id
      )
      .then(([data, metadata]) => {
        return resolve(data);
      })
      .catch(err => {
        return reject(err);
      });
  });
};

let saveUpdate = (areaObj, companyId) => {
  let id = areaObj.id || 0;
  //delete areaObj.id;
  //areaObj.companyId = companyId;
  return new Promise(function(resolve, reject) {
    if (id == 0) {
      Area.create({
        name: areaObj.name,
        isActive: areaObj.isActive,
        companyId: companyId,
        postalCode: areaObj.postalCode,
        cityId: areaObj.cityId
      })
        .then(data => {
          //console.log(data);
          return resolve(data);
        })
        .catch(err => {
          //console.log(err);
          return reject(err);
        });
    } else {
      Area.update(
        {
          name: areaObj.name,
          isActive: areaObj.isActive,
          postalCode: areaObj.postalCode,
          cityId: areaObj.cityId
        },
        { where: { id: id } }
      )
        .then(data => {
          return resolve(data);
        })
        .catch(err => {
          console.log(err);
          return reject(err);
        });
    }
  });
};

let getCountry = () => {
  return new Promise(function(resolve, reject) {
    Country.findAll({attributes: ['id', 'name'], where: { isActive: 1 } })
      .then(data => {
        return resolve(data);
      })
      .catch(err => {
        return reject(err);
      });
  });
};

let getState = countryId => {
  return new Promise(function(resolve, reject) {
    if (countryId) {
      State.findAll({ attributes: ['id', 'name'],where: { countryId: countryId, isActive: 1 } })
        .then(data => {
          return resolve(data);
        })
        .catch(err => {
          return reject(err);
        });
    } else {
      State.findAll()
        .then(data => {
          return resolve(data);
        })
        .catch(err => {
          return reject(err);
        });
    }
  });
};

let getCity = stateId => {
  return new Promise(function(resolve, reject) {
    if (stateId) {
      City.findAll({ attributes: ['id', 'name'],where: { stateId: stateId, isActive: 1 } })
        .then(data => {
          return resolve(data);
        })
        .catch(err => {
          return reject(err);
        });
    } else {
      City.findAll()
        .then(data => {
          return resolve(data);
        })
        .catch(err => {
          return reject(err);
        });
    }
  });
};
let getArea = cityId => {
  return new Promise(function(resolve, reject) {
    if (cityId) {
      Area.findAll({attributes: ['id', 'name'], where: { cityId: cityId, isActive: 1 } })
        .then(data => {
          return resolve(data);
        })
        .catch(err => {
          return reject(err);
        });
    } else {
      Area.findAll()
        .then(data => {
          return resolve(data);
        })
        .catch(err => {
          return reject(err);
        });
    }
  });
};

module.exports = {
  getAll,
  getById,
  saveUpdate,
  getCountry,
  getState,
  getCity,
  getArea
};

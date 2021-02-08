let { order, sequelize } = require("../dbsetting/Connections")

let getAll = companyId => {
    return new Promise(function (resolve, reject) {
        sequelize.query(
            
        ).then(data => { return resolve(data); }).catch(err => { return reject(err); })
    });
}
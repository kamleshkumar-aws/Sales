let shopBusiness = require("../bal/shop.business");

let get = (req, res, next) => {
    let companyId = req.decoded.userObj.companyId;
    shopBusiness
        .getAll(companyId)
        .then(result => {
            if (result)
                return res.generateResponse(true, result, "fetch successfully.", 200);
            else return res.generateResponse(false, result, "No record found.", 200);
        })
        .catch(err => {
            err.errors.forEach(element => {
                error += element.message;
            });
            return res.generateResponse(false, "", error == "" ? err : error, 500);
        });
}

let save = (req, res, next) => {
    let shop = req.body;
    let companyId = req.decoded.userObj.companyId;
    let userId = req.decoded.userObj.id;
    if (shop.id) {
        shopBusiness.updateShop(shop, userId).then(result => {
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
    }
    else {
        shopBusiness.insertShop(shop, companyId, userId).then(result => {
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
    }
}
let getById=(req,res,next)=>{
    let shopId = req.query.id;
    shopBusiness
      .getById(shopId)
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
}

let getShopDropdown=(req,res,next)=>{
    let shop = req.body;
    let companyId = req.decoded.userObj.companyId;
    shopBusiness
      .getShopDropdown(companyId,shop.areaId)
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
}

module.exports={
    get,
    save,
    getById,
    getShopDropdown
}
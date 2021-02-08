let productBal = require('../bal/product.business');
let get = async (req, res, next) => {
    try {
        let companyId = req.decoded.userObj.companyId;
        console.log(companyId);
        let result = await productBal.getAll(companyId);
        return res.generateResponse(true, result, "Category fetched successfully.", 200);
    } catch (error) {
        return res.generateResponse(false, "", error.message, 500);
    }
}
let getById = async (req, res, next) => {
    try {
        let { productId } = req.body;
        //let companyId = req.decoded.userObj.companyId;
        let result = await productBal.getById(productId);
        return res.generateResponse(true, result, "product fetched successfully.", 200);
    } catch (error) {
        return res.generateResponse(false, "", error.message, 500);
    }
}

let save = async (req, res, next) => {
    try {
        let { id, name, discount, price, isActive, categoryId, quantity } = req.body;
        id = id || 0;
        let companyId = req.decoded.userObj.companyId;
        if (id === 0) {
            await productBal.save({ name, discount, price, categoryId, companyId: companyId, createdById: req.decoded.userObj.id, quantity: quantity });
        } else {
            await productBal.update({ id, name, discount, price, isActive, categoryId, updatedAt: new Date(), modifiedById: req.decoded.userObj.id, quantity: quantity });
        }
        return res.generateResponse(true, "", "Product Saved successfully.", 200);
    } catch (error) {
        return res.generateResponse(false, "", error.message, 500);
    }
}

module.exports = {
    get,
    save,
    getById
}
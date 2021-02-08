
let categoryBal = require('../bal/category.business');

let get = async (req, res, next) => {
    try {
        let companyId = req.decoded.userObj.companyId;
        let result = await categoryBal.getAll(companyId);
        return  res.generateResponse(true, result, "Category fetched successfully.", 200);
    } catch (error) {
       return res.generateResponse(false, "", error.message, 500);
    }
}
let getById = async (req, res, next) => {
    try { 
        let { categoryId} = req.body;
        //let companyId = req.decoded.userObj.companyId;
        let result = await categoryBal.getById(categoryId);
        return  res.generateResponse(true, result, "Category fetched successfully.", 200);
    } catch (error) {
       return res.generateResponse(false, "", error.message, 500);
    }
}

let save = async (req, res, next) => {
    try {
        let { categoryId, name, description, companyId,cgst,sgst } = req.body;
        id = categoryId || 0;
        companyId = req.decoded.userObj.companyId;
        if (id === 0) {
         await categoryBal.save({name, description, companyId:companyId,cgst:cgst,sgst:sgst,createdById:req.decoded.userObj.id}).then(result=>{
            return  res.generateResponse(true, result, "Category Saved successfully.", 200);
         }).catch(err=>{
            return res.generateResponse(false, "", error.message, 500);
          });       
        } else {
          await categoryBal.update({id,name, description,cgst:cgst,sgst:sgst,updatedAt:new Date(), modifiedById:req.decoded.userObj.id}).then(result=>{
            return  res.generateResponse(true, result, "Category Saved successfully.", 200);
          }).catch(err=>{
            return res.generateResponse(false, "", error.message, 500);
          });   
        }
        
    } catch (error) {
       return res.generateResponse(false, "", error.message, 500);
    }
}

module.exports = {
    get,
    save,
    getById
}
let orderBusiness = require('../bal/order.business');

let getArea = (req, res, next) => {
	let companyId = req.decoded.userObj.companyId;
	orderBusiness
		.getArea(companyId)
		.then(result => {
			if (result) return res.generateResponse(true, result, 'fetch successfully.', 200);
			else return res.generateResponse(false, result, 'No record found.', 200);
		})
		.catch(err => {
			err.errors.forEach(element => {
				error += element.message;
			});
			return res.generateResponse(false, '', error == '' ? err : error, 500);
		});
};

let getShop = (req, res, next) => {
	let companyId = req.decoded.userObj.companyId;
	let areaId = req.query.areaId;
	orderBusiness
		.getShop(companyId, areaId)
		.then(result => {
			if (result) return res.generateResponse(true, result, 'fetch successfully.', 200);
			else return res.generateResponse(false, result, 'No record found.', 200);
		})
		.catch(err => {
			// err.errors.forEach(element => {
			// 	error += element.message;
			// });
			return res.generateResponse(false, '', err.message, 500);
		});
};
let getCategory = (req, res, next) => {
	let companyId = req.decoded.userObj.companyId;
	orderBusiness
		.getCategory(companyId)
		.then(result => {
			if (result) return res.generateResponse(true, result, 'fetch successfully.', 200);
			else return res.generateResponse(false, result, 'No record found.', 200);
		})
		.catch(err => {
			// err.errors.forEach(element => {
			// 	error += element.message;
			// });
			return res.generateResponse(false, '', err.message, 500);
		});
};
let getProduct = (req, res, next) => {
	let companyId = req.decoded.userObj.companyId;
	let categoryId = req.query.categoryId;
	orderBusiness
		.getProduct(companyId, categoryId)
		.then(result => {
			if (result) return res.generateResponse(true, result, 'fetch successfully.', 200);
			else return res.generateResponse(false, result, 'No record found.', 200);
		})
		.catch(err => {
			// err.errors.forEach(element => {
			// 	error += element.message;
			// });
			return res.generateResponse(false, '', err.message, 500);
		});
};

let generateOrder = (req, res, next) => {
	let orderDetails = req.body;
	let companyId = req.decoded.userObj.companyId;
	let userId = req.decoded.userObj.id;
	orderBusiness
		.generateOrder(companyId, userId, orderDetails)
		.then(result => {
			return res.generateResponse(true, result, 'Added successfully.', 200);
		})
		.catch(err => {
			var error = '';
			if (err.errors)
				err.errors.forEach(element => {
					error += element.message;
				});
			return res.generateResponse(false, '', err.message, 500);
		});
};
let getOderByMonth=(req, res, next)=>{
	orderBusiness.getOderByMonth(req.decoded.userObj.id)
	.then(result => {
		return res.generateResponse(true, result, 'Fetched successfully.', 200);
	})
	.catch(err => {
		var error = '';
		if (err.errors)
			err.errors.forEach(element => {
				error += element.message;
			});
		return res.generateResponse(false, '', err.message, 500);
	});
}

let getOderByArea=(req, res, next)=>{
	orderBusiness.getOderByArea(req.decoded.userObj.id)
	.then(result => {
		return res.generateResponse(true, result, 'Fetched successfully.', 200);
	})
	.catch(err => {
		var error = '';
		if (err.errors)
			err.errors.forEach(element => {
				error += element.message;
			});
		return res.generateResponse(false, '', err.message, 500);
	});
}
let getUserTarget=(req, res, next)=>{
	orderBusiness.getUserTarget(req.decoded.userObj.id)
	.then(result => {
		return res.generateResponse(true, result, 'Fetched successfully.', 200);
	})
	.catch(err => {
		var error = '';
		if (err.errors)
			err.errors.forEach(element => {
				error += element.message;
			});
		return res.generateResponse(false, '', err.message, 500);
	});
}

module.exports = {
	getArea,
	getShop,
	getCategory,
	getProduct,
	generateOrder,
	getOderByMonth,
	getOderByArea,
	getUserTarget
};

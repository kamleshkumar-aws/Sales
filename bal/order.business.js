var { Shop, sequelize, Address, Category, Product, Order, OrderDetails, Area } = require('../dbSetting/Connection');

let getArea = companyId => {
	return new Promise(function(resolve, reject) {
		Area.findAll({ attributes: ['id', 'name'], where: { companyId: companyId } })
			.then(areas => {
				if (areas.length > 0) {
					resolve(areas);
				} else {
					reject('No data found!');
				}
			})
			.catch(err => {
				reject(err);
			});
	});
};

let getShop = (companyId, areaId) => {
	return new Promise(function(resolve, reject) {
		if (areaId == undefined || areaId == 0) {
			sequelize
				.query('select shop.id,shop.name from mst_shop shop ' + ' where shop.companyId = ' + companyId)
				.then(([shops, metadata]) => {
					return resolve(shops);
				})
				.catch(err => {
					return reject(err);
				});
		} else {
			sequelize
				.query(
					'select shop.id,shop.name from mst_shop shop JOIN mst_address ad ON ad.id=shop.addressId ' +
						' JOIN mst_area ar ON ar.id=ad.areaId where ar.companyId = ' +
						companyId +
						' AND ar.Id = ' +
						areaId
				)
				.then(([shops, metadata]) => {
					return resolve(shops);
				})
				.catch(err => {
					return reject(err);
				});
		}
	});
};

let getCategory = companyId => {
	return new Promise(function(resolve, reject) {
		Category.findAll({ attributes: ['id', 'name'], where: { companyId: companyId } })
			.then(categories => {
				if (categories.length > 0) {
					resolve(categories);
				} else {
					reject('No data found!');
				}
			})
			.catch(err => {
				reject(err);
			});
	});
};

let getProduct = (companyId, categoryId) => {
	return new Promise(function(resolve, reject) {
		if (categoryId == undefined || categoryId == 0) {
			sequelize
				.query('select id,name,discount,price from mst_product where companyId = ' + companyId)
				.then(([products, metadata]) => {
					return resolve(products);
				})
				.catch(err => {
					return reject(err);
				});
		} else {
			sequelize
				.query(
					'select id,name,discount,price from mst_product where companyId = ' +
						companyId +
						' AND categoryId = ' +
						categoryId
				)
				.then(([products, metadata]) => {
					return resolve(products);
				})
				.catch(err => {
					return reject(err);
				});
		}
	});
};

let generateOrder = (companyId, userId, orderDetails) => {
	let orderDetaisData = orderDetails.orderDetaisData;
	let currentDate = new Date();
	return new Promise(function(resolve, reject) {
		return sequelize.transaction().then(t => {
			Order.create(
				{
					orderNo:
						'ORD' +
						orderDetails.shopId +
						'-' +
						currentDate.getDate() +
						currentDate.getMonth() +
						currentDate.getFullYear() +
						currentDate.getHours() +
						currentDate.getMinutes(),
					ShopId: orderDetails.shopId,
					companyId: companyId,
					orderTotal: orderDetails.orderTotal,
					discountTotal: orderDetails.discountTotal,
					createdById: userId,
				},
				{ transaction: t }
			)
				.then(orderResult => {
					orderDetaisData.forEach(function(order) {
						order['companyId'] = companyId;
						order['createdById'] = userId;
						order['OrderId'] = orderResult.id;
					});
					OrderDetails.bulkCreate(orderDetaisData, { transaction: t })
						.then(OrderDetailsResult => {
							t.commit();
							return resolve(OrderDetailsResult);
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

let getOderByMonth=(userId)=>
{
	return new Promise(function(resolve, reject) {
		sequelize.query(
         'SELECT monthname(`createdAt`) AS `x`, FLOOR(sum(orderTotal)/100000) AS `y`,FLOOR(sum(orderTotal)/100000) AS `label` FROM `trn_order` AS `Order` WHERE `Order`.`createdById` = '+userId+' GROUP BY monthname(`createdAt`)'+
		 ' ORDER BY 1 DESC LIMIT 5'
         )
		.then(([result, metadata])=>{
			resolve(result);
		}).catch(err=>{
			reject(err); 
		})

	})
}
let getOderByArea=(userId)=>
{
	return new Promise(function(resolve, reject) {
		sequelize.query(
         'SELECT Area.name AS `labels`, FLOOR(sum(orderTotal)/100000) AS `salesAmount`'+
		 ' FROM `trn_order` AS `Order` JOIN'+
		 ' `mst_shop` AS `Shop` ON `Shop`.id = `Order`.ShopId'+
		 ' JOIN `mst_address` AS `Address` ON `Address`.id = `Shop`.addressId'+
		 ' JOIN `mst_area` AS `Area` ON `Area`.id = `Address`.areaId'+
		 ' WHERE `Order`.`createdById` = '+userId+
		 ' GROUP BY Area.name'+
		 ' ORDER BY 1 DESC'+
		 ' LIMIT 5'
         )
		.then(([result, metadata])=>{
			resolve(result);
		}).catch(err=>{
			reject(err); 
		})

	})
}

let getUserTarget=(userId)=>{
	return new Promise(function(resolve, reject) {
		sequelize.query(
         [
			'select SUM(COALESCE(ord.orderTotal,0)) as totalSales,',
			'case when target>SUM(COALESCE(ord.orderTotal,0))  THEN  target-SUM(COALESCE(ord.orderTotal,0)) ELSE 0 END as targetRemaining,',
			'case when target<SUM(COALESCE(ord.orderTotal,0))  THEN  SUM(COALESCE(ord.orderTotal,0))-target ELSE 0 END as extraSales,',
			'target as totalTarget,',
			 'CASE when target<=SUM(COALESCE(ord.orderTotal,0))  THEN true else false END targetCompleted',
			 ' from  (select userId,fromDate,toDate,target',
		     ' from map_user_target',
		     ' where userId='+userId+' AND CURDATE() BETWEEN  fromDate AND toDate) as tar',		 
	         ' JOIN',
			 ' UrkBMVl1Pe.trn_order ord ',
	         ' ON tar.userId=ord.createdById AND createdAt BETWEEN fromDate AND toDate',
	         ' GROUP BY  target'
		 ].join("\n")
         )
		.then(([result, metadata])=>{
			resolve(result);
		}).catch(err=>{
			reject(err); 
		})

	})
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

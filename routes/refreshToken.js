'use strict';
var express = require('express');
var router = express.Router();
var User = require('../dbSetting/Connection').User;
const config = require('../constant/constant');
let jwt = require('jsonwebtoken');
/* GET users listing. */
router.post('/', function(req, res) {
	let refreshToken = req.body.refreshToken;
	// For the given username fetch user from DB
	if (refreshToken) {
		jwt.verify(refreshToken, config.secretKey, (err, decoded) => {
			if (err) {
				return res.generateResponse(false, err, 'Refresh Token is not valid', 401);
			} else {
				let token = jwt.sign(
					{
						userObj: decoded.userObj,
					},
					config.secretKey,
					{
						expiresIn: '24h',
					}
				);
				return res.generateResponse(
					true,
					{
						token,
					},
					'Authentication successful!',
					200
				);
			}
			
		});
	} else {
		return res.generateResponse(false, '', 'Refresh token is not supplied', 404);
	}
});

module.exports = router;

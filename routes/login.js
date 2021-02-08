'use strict';
var express = require('express');
var router = express.Router();
var User = require('../dbSetting/Connection').User;
const config = require('../constant/constant');
let jwt = require('jsonwebtoken');
const { celebrate } = require('celebrate');
const { loginSchema } = require('../validation/requestBodyValidation');
/* GET users listing. */
router.post('/', celebrate(loginSchema), function(req, res) {
	let username = req.body.username;
	let password = req.body.password;
	// For the given username fetch user from DB
	let mockedUsername = 'amitm';
	let mockedPassword = 'sep@2019';

	if (username && password) {
		User.findAll({
			where: {
				username: username,
				password: password,
			},
		})
			.then(Users => {
				if (Users.length != 0) {
					console.log(Users[0]);
					let token = jwt.sign(
						{
							userObj: Users[0],
						},
						config.secretKey,
						{
							expiresIn: '24h',
						}
					);
					let refreshToken = jwt.sign(
						{
							userObj: Users[0],
						},
						config.secretKey
					);
					return res.generateResponse(
						true,
						{
							token,
							refreshToken,
							name: Users[0].firstName + ' ' + Users[0].lastName,
							id: Users[0].id,
						},
						'Authentication successful!',
						200
					);
				} else {
					return res.generateResponse(
						false,
						{
							token: '',
						},
						'Incorrect username or password',
						401
					);
				}
			})
			.catch(err => {
				return res.generateResponse(
					false,
					{
						token: '',
					},
					'Authentication failed! Please check the request',
					403
				);
			});
	} else {
		return res.generateResponse(
			false,
			{
				token: '',
			},
			'Authentication failed! Please check the request',
			403
		);
	}
});

module.exports = router;

let jwt = require("jsonwebtoken");
const config = require("../constant/constant");

let checkToken = (req, res, next) => {
  let token = req.headers["x-access-token"] || req.headers["authorization"];
  if (token) {
    token = token.slice(7, token.length);
    jwt.verify(token, config.secretKey, (err, decoded) => {
      if (err) {
        return res.generateResponse(false, "", "Token is not valid", 401);
      } else {
        req.decoded = decoded;
        console.log(req.decoded);
        next();
      }
    });
  } else {
    return res.generateResponse(false, "", "Auth token is not supplied", 404);
  }
};

module.exports = {
  checkToken: checkToken
};

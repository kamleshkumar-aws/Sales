const secretKey = "salesManagementSystemAccessToken";
const timeForAccessToken = 10;
const timeForRefreshToken = 20;
let token = {
  UserId: Number,
  Time: String,
  Name: String,
  companyId:Number
};
let currentUserToken = "";
const tokenType = ["Access", "Refresh"];
module.exports = {
  secretKey,
  token,
  timeForAccessToken,
  timeForRefreshToken,
  tokenType,
  currentUserToken
};




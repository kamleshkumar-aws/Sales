const { Sequelize } = require("sequelize");
const usermodel = require("../models/user");
const rolemodel = require("../models/role");
const userRolemodel = require("../models/userRole");
const sysMaster = require("../models/sysMaster");
const sysValue = require("../models/sysValue");
const country = require("../models/country");
const state = require("../models/state");
const city = require("../models/city");
const address = require("../models/address");
const company = require("../models/Company");
const shop = require("../models/shop");
const product = require("../models/product");
const userTarget = require("../models/userTarget");
const category = require("../models/category");
const userLocation = require("../models/userLocation");
const area = require("../models/area");
const roleCompany = require("../models/roleCompany");
const gst = require("../models/sysGst");
const order = require("../models/order");
const orderDetails = require("../models/orderDetails");
const payment = require("../models/payment");
const paymentDetails = require("../models/paymentDetails");
// const sequelize = new Sequelize("salesmanagementsystem", "root", "password", {
//   host: "localhost",
//   dialect: "mariadb",
//   timestamps: true,
//   pool: {
//     max: 10,
//     min: 0,
//     acquire: 30000,
//     idle: 10000
//   }
// });
const sequelize = new Sequelize("vicky", "vicky", "vikcy@2021", {
  host: "52.207.212.113",
  dialect: "mariadb",
  port: 3306,
  timestamps: true,
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});
const SysMaster = sysMaster(sequelize, Sequelize);
const SysValue = sysValue(sequelize, Sequelize);
const Country = country(sequelize, Sequelize);
const State = state(sequelize, Sequelize);
const City = city(sequelize, Sequelize);
const Address = address(sequelize, Sequelize);
const Company = company(sequelize, Sequelize);
const User = usermodel(sequelize, Sequelize);
const Role = rolemodel(sequelize, Sequelize);
const UserRole = userRolemodel(sequelize, Sequelize);
const Shop = shop(sequelize, Sequelize);
// const UserAddress = userAddress(sequelize, Sequelize);
// const ShopAddress = shopAddress(sequelize, Sequelize);
const Category = category(sequelize, Sequelize);
const Product = product(sequelize, Sequelize);
const UserTarget = userTarget(sequelize, Sequelize);
const UserLocation = userLocation(sequelize, Sequelize);
const Area = area(sequelize, Sequelize);
const RoleCompany = roleCompany(sequelize, Sequelize);
const GST = gst(sequelize, Sequelize);
const Order = order(sequelize, Sequelize);
const OrderDetails = orderDetails(sequelize, Sequelize);
const Payment = payment(sequelize, Sequelize);
const PaymentDetails = paymentDetails(sequelize, Sequelize);
//master value
SysMaster.hasMany(SysValue);
SysValue.belongsTo(SysMaster);

//company
SysValue.hasMany(Company, { foreignKey: { allowNull: false } });
Company.belongsTo(SysValue, { foreignKey: { allowNull: false } });
// Company.belongsTo(User, { as: "createdBy" });
// Company.belongsTo(User, { as: "modifiedBy" });

//area
Company.hasMany(Area);
Area.belongsTo(Company, { foreignKey: { allowNull: false } });
City.hasMany(Area);
Area.belongsTo(City, { foreignKey: { allowNull: false } });

// Company.hasMany(User);
// User.belongsTo(Company);
User.belongsTo(User, { as: "createdBy" });
User.belongsTo(User, { as: "modifiedBy" });
User.belongsTo(User, { as: "manager" });
Company.hasMany(RoleCompany);
RoleCompany.belongsTo(Company);
Role.hasMany(RoleCompany);
RoleCompany.belongsTo(Role);
//user role map
User.hasMany(UserRole, { foreignKey: { allowNull: false } });
Role.hasMany(UserRole, { foreignKey: { allowNull: false } });
UserRole.belongsTo(User, { foreignKey: { allowNull: false } });
UserRole.belongsTo(Role, { foreignKey: { allowNull: false } });
//company user map

//address map
Country.hasMany(State, { foreignKey: { allowNull: false } });
State.belongsTo(Country, { foreignKey: { allowNull: false } });
State.hasMany(City, { foreignKey: { allowNull: false } });
City.belongsTo(State, { foreignKey: { allowNull: false } });
// Country.hasMany(Address, { foreignKey: { allowNull: false } });
// State.hasMany(Address, { foreignKey: { allowNull: false } });
City.hasMany(Address, { foreignKey: { allowNull: false } });
Address.belongsTo(Area, { foreignKey: { allowNull: false } });
// Address.belongsTo(State, { foreignKey: { allowNull: false } });
Address.belongsTo(City, { foreignKey: { allowNull: false } });
// Address.belongsTo(User, { as: "createdBy" });
// Address.belongsTo(User, { as: "modifiedBy" });

//shop
Company.hasMany(Shop, { foreignKey: { allowNull: false } });
Shop.belongsTo(Company, { foreignKey: { allowNull: false } });
Shop.belongsTo(User, { as: "createdBy" });
Shop.belongsTo(User, { as: "modifiedBy" });
//UserAddress
Address.hasOne(User, { foreignKey: { allowNull: true } });
// UserAddress.belongsTo(Address, { foreignKey: { allowNull: false } });
// User.hasMany(UserAddress, { foreignKey: { allowNull: false } });
User.belongsTo(Address, { foreignKey: { allowNull: true } });
//shop address
// Address.hasMany(ShopAddress, { foreignKey: { allowNull: false } });
// ShopAddress.belongsTo(Address, { foreignKey: { allowNull: false } });
Address.hasOne(Shop, { foreignKey: { allowNull: false } });
Shop.belongsTo(Address, { foreignKey: { allowNull: false } });
//category
Category.belongsTo(User, { as: "createdBy" });
Category.belongsTo(User, { as: "modifiedBy" });
Company.hasMany(Category);
Category.belongsTo(Company);
//Product
Product.belongsTo(User, { as: "createdBy" });
Product.belongsTo(User, { as: "modifiedBy" });
Category.hasMany(Product, { foreignKey: { allowNull: false } });
Product.belongsTo(Category, { foreignKey: { allowNull: false } });
Company.hasMany(Product, { foreignKey: { allowNull: false } });
Product.belongsTo(Company, { foreignKey: { allowNull: false } });
// Product.belongsTo(GST, { foreignKey: { allowNull: false } });
//User target
User.hasMany(UserTarget, { foreignKey: { allowNull: false } });
UserTarget.belongsTo(User, { foreignKey: { allowNull: false } });
UserTarget.belongsTo(User, { as: "createdBy" });
UserTarget.belongsTo(User, { as: "modifiedBy" });
//User Location
User.hasMany(UserLocation, { foreignKey: { allowNull: false } });
UserLocation.belongsTo(User, { foreignKey: { allowNull: false } });
//order
Order.belongsTo(Shop, { foreignKey: { allowNull: false } });
Order.belongsTo(Company, { foreignKey: { allowNull: false } });
Order.belongsTo(User, { as: "createdBy" });
Order.belongsTo(User, { as: "modifiedBy" });
OrderDetails.belongsTo(Order, { foreignKey: { allowNull: false } });
OrderDetails.belongsTo(Product, { foreignKey: { allowNull: false } });
OrderDetails.belongsTo(User, { as: "createdBy" });
OrderDetails.belongsTo(User, { as: "modifiedBy" });
Payment.belongsTo(Order, { foreignKey: { allowNull: false } });
Payment.belongsTo(User, { as: "createdBy" });
Payment.belongsTo(User, { as: "modifiedBy" });
PaymentDetails.belongsTo(Payment, { foreignKey: { allowNull: false } });
PaymentDetails.belongsTo(User, { as: "createdBy" });
PaymentDetails.belongsTo(User, { as: "modifiedBy" });

sequelize.sync({ alter: false, force: false }).then(() => {
  console.log(`Database & tables created!`);
});

module.exports = {
  User,
  Role,
  UserRole,
  SysMaster,
  SysValue,
  Country,
  State,
  City,
  Address,
  Company,
  sequelize,
  Shop,
  // UserAddress,
  // ShopAddress,
  Product,
  UserTarget,
  Category,
  UserLocation,
  Area,
  GST,
  Order,
  OrderDetails,
  Payment,
  //PaymentDetails
};

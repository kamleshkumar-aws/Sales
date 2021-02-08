/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      firstName: {
        type: DataTypes.STRING(128),
        allowNull: false
      },
      lastName: {
        type: DataTypes.STRING(128),
        allowNull: false
      },
      mobile: {
        type: DataTypes.STRING(16),
        allowNull: false,
        unique: true
      },
      emailId: {
        type: DataTypes.STRING(48),
        allowNull: false,
        unique: true
      },
      username: {
        type: DataTypes.STRING(16),
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING(80),
        allowNull: false
      },
      companyId: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
        // references: {
        //   model: "mst_company",
        //   key: "id"
        // }
      },
      isActive: {
        type: DataTypes.BOOLEAN(),
        allowNull: true,
        defaultValue: true
      }
    },
    {
      tableName: "mst_user"
    }
  );
  return user;
};

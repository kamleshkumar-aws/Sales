/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    var role = sequelize.define(
      "RoleCompany",
      {
        id: {
          type: DataTypes.INTEGER(11),
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        }
      },
      {
        tableName: "map_role_company"
      }
    );
    return role;
  };
  
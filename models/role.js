/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  var role = sequelize.define(
    "role",
    {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING(128),
        allowNull: false,
        unique: true
      },
      isActive: {
        type: DataTypes.INTEGER(1),
        allowNull: true,
        defaultValue: "1"
      }
    },
    {
      tableName: "sys_role"
    }
  );
  return role;
};

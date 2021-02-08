/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    "address",
    {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      // area:{
      //   type: DataTypes.STRING(128),
      //   allowNull: false
      // },
      landmark: {
        type: DataTypes.STRING(128),
        allowNull: false
      },
      addressLine1: {
        type: DataTypes.STRING(256),
        allowNull: false
      },
      addressLine2: {
        type: DataTypes.STRING(128),
        allowNull: true
      },
      postalCode:{
        type: DataTypes.STRING(6),
        allowNull: false,
      },
      isActive: {
        type: DataTypes.BOOLEAN(),
        allowNull: true,
        defaultValue: true
      }
    },
    {
      tableName: "mst_address"
    }
  );
};

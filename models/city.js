/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    "city",
    {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING(128),
        allowNull: false
      },
      // stateId: {
      //   type: DataTypes.INTEGER(11),
      //   allowNull: false,
      //   references: {
      //     model: "mst_state",
      //     key: "id"
      //   }
      // },
      isActive: {
        type: DataTypes.BOOLEAN(),
        allowNull: true,
        defaultValue: true
      }
    },
    {
      tableName: "mst_city"
    }
  );
};

/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define(
      "area",
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
        postalCode:
        {
          type:DataTypes.STRING(6),
          allowNull:false
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
        tableName: "mst_area"
      }
    );
  };
  
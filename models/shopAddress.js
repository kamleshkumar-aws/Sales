/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    var ShopAddress = sequelize.define(
      "shopAddress",
      {
        id: {
          type: DataTypes.INTEGER(11),
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },
        // userId: {
        //   type: DataTypes.INTEGER(11),
        //   allowNull: false,
        //   references: {
        //     model: "mst_user",
        //     key: "id"
        //   }
        // },
        // roleId: {
        //   type: DataTypes.INTEGER(11),
        //   allowNull: false,
        //   references: {
        //     model: "sys_role",
        //     key: "id"
        //   }
        // }
      },
      {
        tableName: "map_shop_address"
      }
    );
    return ShopAddress;
  };
  
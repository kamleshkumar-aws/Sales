/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  var shop = sequelize.define(
    "Shop",
    {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      //   companyId: {
      //     type: DataTypes.INTEGER(11),
      //     allowNull: true,
      //     references: {
      //       model: "mst_company",
      //       key: "id"
      //     }
      //   },
      name: {
        type: DataTypes.STRING(128),
        allowNull: false
      },
      ownerName: {
        type: DataTypes.STRING(128),
        allowNull: false
      },
      mobileNumber: {
        type: DataTypes.STRING(15),
        allowNull: false
      },
      email: {
        type: DataTypes.STRING(50),
        allowNull: true
      },
      isActive: {
        type: DataTypes.INTEGER(1),
        allowNull: true,
        defaultValue: "1"
        //   createdBy: {
        //     type: DataTypes.INTEGER(11),
        //     allowNull: true,
        //     references: {
        //       model: "mst_user",
        //       key: "id"
        //     }
        //   },
        //   modifiedBy: {
        //     type: DataTypes.INTEGER(11),
        //     allowNull: true,
        //     references: {
        //       model: "mst_user",
        //       key: "id"
        //     }
      }
    },
    {
      indexes: [
        {
          unique: true,
          fields: ["name", "companyId"]
        }
      ],
      tableName: "mst_shop"
    }
  );
  return shop;
};

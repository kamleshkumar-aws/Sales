/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    "company",
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
      // companyTypeId: {
      //   type: DataTypes.INTEGER(11),
      //   allowNull: false,
      //   references: {
      //     model: "sys_Value",
      //     key: "id"
      //   }
      // },
      validUpto: {
        type: "TIMESTAMP",
        allowNull: false
      },
      isActive: {
        type: DataTypes.BOOLEAN(),
        allowNull: true,
        defaultValue: true
      }
    },
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
    //   }
    // },
    {
      tableName: "mst_company"
    }
  );
};

/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  var Product = sequelize.define(
    "product",
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
      discount: {
        type: DataTypes.FLOAT,
        defaultValue:0.00,
        allowNull: false
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      },
      quantity: {
        type: DataTypes.INTEGER(6),
        allowNull: false
      },
      isActive: {
        type: DataTypes.BOOLEAN(),
        allowNull: true,
        defaultValue: true
      },
      createdAt: {
        type: "TIMESTAMP",
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false
      },
      updatedAt: {
        type: "TIMESTAMP",
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false
      },
      companyId: {
        type: DataTypes.INTEGER(11),
        allowNull: true
      },
      categoryId: {
        type: DataTypes.INTEGER(11),
        allowNull: true
      },
      createdById: {
        type: DataTypes.INTEGER(11),
        defaultValue: 1,
        allowNull: false
      },
      modifiedById: {
        type: DataTypes.INTEGER(11),
        defaultValue: 1,
        allowNull: false
      }
    },
    {
      tableName: "mst_product"
    }
  );
  return Product;
};

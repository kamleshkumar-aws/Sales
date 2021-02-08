module.exports = function(sequelize, DataTypes) {
  var Category = sequelize.define(
    "category",
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
      description: {
        type: DataTypes.STRING(128),
        allowNull: true
      },
      cgst: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0.0
      },
      sgst: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0.0
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
      },
      createdAt: {
        type: 'TIMESTAMP',
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
      },
      updatedAt: {
        type: 'TIMESTAMP',
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
      },
      companyId: {
        type: DataTypes.INTEGER(11),
        defaultValue: 1,
        allowNull: false
      }
    },
    {
      tableName: "mst_category"
    }
  );
  return Category;
};

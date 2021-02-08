/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
    var GST= sequelize.define(
        "GST",
        {
            id: {
                type: DataTypes.INTEGER(11),
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            type: {
                type: DataTypes.STRING(24),
                allowNull: false
            },
            productcategoryId:{
                type: DataTypes.INTEGER(11),
                allowNull: false,
            },
            percentage: {
                type: DataTypes.FLOAT,
                allowNull: false
            }
        },
        {
            tableName: "sys_gst"
        }
    );
    return GST;
};

/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('sysMaster', {
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
        isActive: {
            type: DataTypes.BOOLEAN(),
            allowNull: true,
            defaultValue: true
        }
    }, {
        tableName: 'sys_Master'
    });
};

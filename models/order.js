module.exports = function (sequelize, DataTypes) {
    var Order = sequelize.define(
        "Order",
        {
            id: {
                type: DataTypes.BIGINT,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            orderNo: {
                type: DataTypes.STRING(50),
                allowNull: false
            },
            // shopId: {
            //     type: DataTypes.INTEGER(11),
            //     allowNull: false
            // },
            // companyId: {
            //     type: DataTypes.INTEGER(11),
            //     allowNull: false
            // },
            expectedOn: {
                type: "TIMESTAMP",
                allowNull: true,
            },
            deliveredOn: {
                type: "TIMESTAMP",
                allowNull: true,
            },
            poGeneratedDate: {
                type: "TIMESTAMP",
                allowNull: true,
            },
            orderTotal: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false,
            },
            discountTotal: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false,
            },
            cancelReason: {
                type: DataTypes.STRING(256),
                allowNull: true,
            },
            // createdById: {
            //     type: DataTypes.INTEGER(11),
            //     allowNull: false
            // },
            // modifiedById: {
            //     type: DataTypes.INTEGER(11),
            //     allowNull: false
            // },
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
        },
        {
            tableName: "trn_order"
        }
    );
    return Order;
};
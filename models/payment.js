module.exports = function (sequelize, DataTypes) {
    var Payment = sequelize.define(
        "Payment",
        {
            id: {
                type: DataTypes.BIGINT,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            // orderId: {
            //     type: DataTypes.BIGINT,
            //     allowNull: false
            // },
            payableAmount: {
                type: DataTypes.DECIMAL(10,2),
                allowNull: false
            },
            statusId: {
                type: DataTypes.INTEGER(11),
                allowNull: false
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
            tableName: "trn_payment"
        }
    );
    return Payment;
};  
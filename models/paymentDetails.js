module.exports = function (sequelize, DataTypes) {
    var PaymentDetails = sequelize.define(
        "Payment",
        {
            id: {
                type: DataTypes.BIGINT,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            // paymentId: {
            //     type: DataTypes.BIGINT,
            //     allowNull: false
            // },
            paidAmount: {
                type: DataTypes.DECIMAL(10,2),
                allowNull: false
            },
            paidOn: {
                type:"TIMESTAMP",
                allowNull: false
            },
            acceptedBy: {
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
            tableName: "trn_payment_details"
        }
    );
    return PaymentDetails;
};  
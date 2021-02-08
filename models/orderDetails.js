module.exports = function (sequelize, DataTypes) {
    var OrderDetails = sequelize.define(
        "OrderDetails",
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
            // productId: {
            //     type: DataTypes.INTEGER(11),
            //     allowNull: false
            // },
            quantity: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            discount: {
                type: DataTypes.FLOAT,
                defaultValue:0.00,
                allowNull: false,
            },
            isCancelled: {
                type: DataTypes.BOOLEAN,
                defaultValue:false,
                allowNull: false,
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
            tableName: "trn_order_details"
        }
    );
    return OrderDetails;
};  
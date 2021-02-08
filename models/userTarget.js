module.exports = function(sequelize, DataTypes) {
    var UserTarget = sequelize.define(
      "UserTarget",
      {
        id: {
          type: DataTypes.INTEGER(11),
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },
       target:{
          type:DataTypes.DECIMAL(13,2),
          allowNull: false,
       },
       fromDate:{
        type:DataTypes.DATE(),
        allowNull: false,
       },
       toDate:{
        type:DataTypes.DATE(),
        allowNull: false,
       }
      },
      {
        tableName: "map_user_target"
      }
    );
    return UserTarget;
  };
module.exports = function(sequelize, DataTypes) {
  var UserLocation = sequelize.define(
    "UserLocation",
    {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      latitude: {
        type: DataTypes.STRING(25),
        allowNull: false
      },
      longitude: {
        type: DataTypes.STRING(25),
        allowNull: false
      },
      logDate: {
        type: DataTypes.DATE(),
        allowNull: false
      }
    },
    {
      tableName: "map_user_location"
    }
  );
  return UserLocation;
};

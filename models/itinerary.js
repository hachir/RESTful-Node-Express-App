// ! This is the model for the Itinerary table. See diagram.
var Trips = require('./trips');

module.exports = function (sequelize, DataTypes) {
  var Day = sequelize.define('Day', {
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true,
        // isAfter: Trips.startDate,
        // isBefore: Trips.endDate
      }
    }

  });

  Day.associate = function (model) {
    Day.belongsTo(model.Trips, {
      foreignKey: {
        allowNull: false
      }
    });
    Day.hasMany(model.Events, {
      onDelete: 'cascade'
    });
    Day.hasMany(model.Budget, {
      onDelete: 'cascade'
    });
  };



  return Day;
};
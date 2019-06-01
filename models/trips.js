// Trip Model
var moment = require('moment');
var now = moment().format('YYYY-MM-DD');

module.exports = function (sequelize, DataTypes) {
  var Trip = sequelize.define('Trips', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2],
        notEmpty: true
      }
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: true,
        isDate: true,
        isAfter: now
      }
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: true,
        isDate: true,
        isAfter: now
      }
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true

      }
    }

  });


  Trip.associate = function (model) {
    Trip.belongsTo(model.User, {
      foreignKey: {
        allowNull: false
      }
    });
    Trip.hasMany(model.PkList, {
      onDelete: 'cascade'
    });
    Trip.hasMany(model.Day, {
      onDelete: 'cascade'
    });
    Trip.hasMany(model.Events, {
      onDelete: 'cascade'
    });
    Trip.hasMany(model.Budget, {
      onDelete: 'cascade'
    })

  };

  return Trip;
};
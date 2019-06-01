// This is for the itinetary events model

module.exports = function (sequelize, DataTypes) {
  var Event = sequelize.define('Events', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [2, 50]
      }
    },
    time: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  });

  Event.associate = function (model) {
    Event.belongsTo(model.Day, {
      foreignKey: {
        allowNull: false
      }
    });
    Event.belongsTo(model.Trips, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Event;
};
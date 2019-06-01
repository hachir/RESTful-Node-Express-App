// ! This is the model for the join table to find all Trip attendees. See diagram.

module.exports = function (sequelize) {
  var Attendees = sequelize.define('Attendees', {

  });

  Attendees.associate = function (model) {
    Attendees.belongsTo(model.User, {
      foreignKey: {
        allowNull: false

      }
    });
    Attendees.belongsTo(model.Trips, {
      foreignKey: {
        allowNull: false

      }
    });

  };

  return Attendees;

};
// ! This is the packingList table. See diagram.

module.exports = function (sequelize, DataTypes) {
  var PkList = sequelize.define('PkList', {
    item: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    completed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  });

  PkList.associate = function (model) {
    PkList.belongsTo(model.Trips, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return PkList;
};
var db = require('../models');

module.exports = (sequelize, DataTypes) => {
    var Budget = sequelize.define("Budget", {
        item: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [2, 50]
            }
        },

        cost: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true,
                not: ["[a-z]", 'i'],
                isNumeric: true,
            }
        }

    });

    Budget.associate = function (model) {
        Budget.belongsTo(model.Day, {
            foreignKey: {
                allowNull: true
            }

        });
        Budget.belongsTo(model.Trips, {
            foreignKey: {
                allowNull: false
            }
        })

    };

    return Budget;


};
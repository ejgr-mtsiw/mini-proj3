'use strict';

module.exports = function (sequelize, DataTypes) {

    let Volunteer = sequelize.define('Volunteer', {
        idVolunteer: { autoIncrement: true, primaryKey: true, type: DataTypes.INTEGER },
        nome: { type: DataTypes.STRING, notEmpty: true },
        email: { type: DataTypes.STRING },
        telefone: { type: DataTypes.STRING }
    },
        {
            tableName: 'volunteers',
            timestamps: false
        }
    );

    Volunteer.associate = function (models) {
        models.Volunteer.hasMany(models.TaskVolunteer,
            {
                onDelete: "CASCADE",
                foreignKey: {
                    name: 'idVolunteer',
                    allowNull: false
                }
            }
        );
    }

    return Volunteer;
}

'use strict';

module.exports = function (sequelize, DataTypes) {

    let Task = sequelize.define('Task', {
        idTask: { autoIncrement: true, primaryKey: true, type: DataTypes.INTEGER },
        idConference: { type: DataTypes.INTEGER },
        nome: { type: DataTypes.STRING, notEmpty: true },
        descricao: { type: DataTypes.STRING },
        inicio: { type: DataTypes.DATE },
        fim: { type: DataTypes.DATE },
        concluida: { type: DataTypes.INTEGER }
    },
        {
            tableName: 'tasks',
            timestamps: false
        }
    );

    Task.associate = function (models) {
        models.Task.belongsTo(models.Conference,
            {
                onDelete: "CASCADE",
                foreignKey: {
                    name: 'idConference',
                    allowNull: false
                }
            }
        );

        models.Task.hasMany(models.TaskVolunteer,
            {
                onDelete: "CASCADE",
                as: 'volunteers',
                foreignKey: {
                    name: 'idTask',
                    allowNull: false
                }
            }
        );
    }

    return Task;
}

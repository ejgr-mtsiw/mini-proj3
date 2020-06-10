'use strict';

module.exports = function (sequelize, DataTypes) {

    let TaskVolunteer = sequelize.define('TaskVolunteer', {
        idTask: { primaryKey: true, type: DataTypes.INTEGER },
        idVolunteer: { primaryKey: true, type: DataTypes.INTEGER },
    },
        {
            tableName: 'task_volunteer',
            timestamps: false
        }
    );

    TaskVolunteer.associate = function (models) {
        models.TaskVolunteer.belongsTo(models.Task,
            {
                onDelete: 'CASCADE',
                foreignKey: {
                    name: 'idTask',
                    allowNull: false
                }
            });

        models.TaskVolunteer.belongsTo(models.Volunteer,
            {
                onDelete: 'CASCADE',
                foreignKey: {
                    name: 'idVolunteer',
                    allowNull: false
                }
            });
    };

    return TaskVolunteer;
}

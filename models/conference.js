'use strict';

module.exports = function (sequelize, DataTypes) {

    let Conference = sequelize.define('Conference', {
        idConference: { autoIncrement: true, primaryKey: true, type: DataTypes.INTEGER },
        acronimo: { type: DataTypes.STRING, notEmpty: true },
        nome: { type: DataTypes.STRING },
        descricao: { type: DataTypes.TEXT },
        local: { type: DataTypes.STRING },
        data: { type: DataTypes.DATE },
        dataRegisto: { type: DataTypes.DATE }
    },
        {
            tableName: 'conference',
            timestamps: false
        }
    );

    Conference.associate = function (models) {
        models.Conference.hasMany(models.ConferenceParticipant,
            {
                foreignKey: 'idConference'
            }
        );
    };

    return Conference;
}

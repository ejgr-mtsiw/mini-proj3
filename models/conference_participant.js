'use strict';

module.exports = function (sequelize, DataTypes) {
    let ConferenceParticipant = sequelize.define('ConferenceParticipant', {
        idConference: { primaryKey: true, type: DataTypes.INTEGER },
        idParticipant: { primaryKey: true, type: DataTypes.STRING },
        nomeParticipante: { type: DataTypes.STRING, notEmpty: true },
        dataRegisto: { type: DataTypes.DATE }
    },
        {
            tableName: 'conf_participant',
            timestamps: false
        }
    );

    ConferenceParticipant.associate = function (models) {
        models.SpeakerType.belongsTo(models.Conference,
            {
                onDelete: "CASCADE",
                foreignKey: {
                    name: "idConference",
                    allowNull: false
                }
            }
        );
    };

    return ConferenceParticipant;
}

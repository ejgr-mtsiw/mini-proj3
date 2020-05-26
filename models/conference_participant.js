'use strict';

module.exports = function (sequelize, DataTypes) {
    let ConferenceParticipant = sequelize.define('ConferenceParticipant', {
        idConference: { type: DataTypes.INTEGER, notEmpty: true },
        idParticipant: { type: DataTypes.STRING, notEmpty: true },
        nomeParticipante: { type: DataTypes.STRING, notEmpty: true },
        dataRegisto: { type: DataTypes.DATE }
    },
        {
            tableName: 'conf_participant',
            timestamps: false
        }
    );

    // This table doesn't have primary keys
    ConferenceParticipant.removeAttribute('id');

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

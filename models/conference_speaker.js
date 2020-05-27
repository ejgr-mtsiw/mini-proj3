'use strict';

module.exports = function (sequelize, DataTypes) {

    let ConferenceSpeaker = sequelize.define('ConferenceSpeaker', {
        idConference: { primaryKey: true, type: DataTypes.INTEGER },
        idSpeaker: { primaryKey: true, type: DataTypes.INTEGER },
    },
        {
            tableName: 'conf_speaker',
            timestamps: false
        }
    );

    ConferenceSpeaker.associate = function (models) {
        models.ConferenceSpeaker.belongsTo(models.Speaker,
            {
                onDelete: 'CASCADE',
                foreignKey: {
                    name: 'idSpeaker',
                    allowNull: false
                }
            });

        models.ConferenceSpeaker.belongsTo(models.Conference,
            {
                onDelete: 'CASCADE',
                foreignKey: {
                    name: 'idConference',
                    allowNull: false
                }
            });
    };

    return ConferenceSpeaker;
}

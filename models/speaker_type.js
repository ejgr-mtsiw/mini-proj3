'use strict';

module.exports = function (sequelize, DataTypes) {
    let SpeakerType = sequelize.define('SpeakerType', {
        idSpeakerType: { autoIncrement: true, primaryKey: true, type: DataTypes.INTEGER },
        descricao: { type: DataTypes.STRING, notEmpty: true }
    },
        {
            tableName: 'speaker_type',
            timestamps: false
        }
    );

    SpeakerType.associate = function (models) {
        models.SpeakerType.hasMany(models.Speaker,
            {
                foreignKey: "idSpeakerTipo"
            }
        );
    };

    return SpeakerType;
}

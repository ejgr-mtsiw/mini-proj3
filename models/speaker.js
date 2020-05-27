'use strict';

module.exports = function (sequelize, DataTypes) {

    let Speaker = sequelize.define('Speaker', {
        idSpeaker: { autoIncrement: true, primaryKey: true, type: DataTypes.INTEGER },
        nome: { type: DataTypes.STRING, notEmpty: true },
        filiacao: { type: DataTypes.STRING },
        bio: { type: DataTypes.TEXT },
        foto: { type: DataTypes.STRING },
        link: { type: DataTypes.STRING },
        idSpeakerTipo: { type: DataTypes.INTEGER, defaultValue: 1 },
        active: { type: DataTypes.INTEGER },
        facebook: { type: DataTypes.STRING },
        linkedin: { type: DataTypes.STRING },
        twitter: { type: DataTypes.STRING },
        cargo: { type: DataTypes.STRING }
    },
        {
            tableName: 'speaker',
            timestamps: false
        }
    );

    Speaker.associate = function (models) {
        models.Speaker.belongsTo(models.SpeakerType,
            {
                onDelete: "SET DEFAULT",
                foreignKey: {
                    name: 'idSpeakerTipo',
                    allowNull: false
                }
            }
        );

        /*
        models.Speaker.belongsToMany(models.Conference,
            {
                as: 'conferences',
                through: models.ConferenceSpeaker,
                foreignKey: 'idSpeaker'
            });
            */
        models.Speaker.hasMany(models.ConferenceSpeaker,
            {
                as: 'conferences',
                foreignKey: {
                    name: 'idSpeaker'
                }
            });
    };

    return Speaker;
}

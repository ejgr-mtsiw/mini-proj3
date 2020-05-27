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

        /*
        
        Parent.belongsToMany( Child, {
    as: [Relationship],
    through: [Parent_Child] //this can be string or a model,
    foreignKey: 'Parent_rowId'
});

Child.belongsToMany(Parent, {
    as: [Relationship2],
    through: [Parent_Child],
    foreignKey: 'Child_rowId'
});

        */
        /*
                models.Conference.belongsToMany(models.Speaker,
                    {
                        as: 'speakers',
                        through: models.ConferenceSpeaker,
                        foreignKey: 'idConference'
                    });
                    */
        models.Speaker.hasMany(models.ConferenceSpeaker,
            {
                foreignKey: {
                    name: 'idConference'
                }
            });

        models.Speaker.hasMany(models.ConferenceSponsor,
            {
                foreignKey: {
                    name: 'idConference'
                }
            });
    };

    return Conference;
}

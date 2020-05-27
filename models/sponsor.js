'use strict';

module.exports = function (sequelize, DataTypes) {

    let Sponsor = sequelize.define('Sponsor', {
        idSponsor: { autoIncrement: true, primaryKey: true, type: DataTypes.INTEGER },
        nome: { type: DataTypes.STRING, notEmpty: true },
        logo: { type: DataTypes.STRING },
        categoria: { type: DataTypes.TEXT },
        active: { type: DataTypes.STRING },
        link: { type: DataTypes.STRING }
    },
        {
            tableName: 'sponsor',
            timestamps: false
        }
    );

    Sponsor.associate = function (models) {
        models.Sponsor.hasMany(models.ConferenceSponsor,
            {
                as: 'conferences',
                foreignKey: {
                    name: 'idSponsor'
                }
            });
    };

    return Sponsor;
}

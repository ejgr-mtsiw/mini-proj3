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

    return Sponsor;
}

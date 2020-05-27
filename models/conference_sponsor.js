'use strict';

module.exports = function (sequelize, DataTypes) {

    let ConferenceSponsor = sequelize.define('ConferenceSponsor', {
        idConference: { primaryKey: true, type: DataTypes.INTEGER },
        idSponsor: { primaryKey: true, type: DataTypes.INTEGER },
    },
        {
            tableName: 'conf_sponsor',
            timestamps: false
        }
    );

    ConferenceSponsor.associate = function (models) {
        models.ConferenceSponsor.belongsTo(models.Sponsor,
            {
                onDelete: 'CASCADE',
                foreignKey: {
                    name: 'idSponsor',
                    allowNull: false
                }
            });

        models.ConferenceSponsor.belongsTo(models.Conference,
            {
                onDelete: 'CASCADE',
                foreignKey: {
                    name: 'idConference',
                    allowNull: false
                }
            });
    };

    return ConferenceSponsor;
}

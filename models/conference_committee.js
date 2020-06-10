'use strict';

module.exports = function (sequelize, DataTypes) {

    let ConferenceCommittee = sequelize.define('ConferenceCommittee', {
        idConference: { primaryKey: true, type: DataTypes.INTEGER },
        idCommitteeMember: { primaryKey: true, type: DataTypes.INTEGER },
    },
        {
            tableName: 'conf_committee',
            timestamps: false
        }
    );

    ConferenceCommittee.associate = function (models) {
        models.ConferenceCommittee.belongsTo(models.CommitteeMember,
            {
                onDelete: 'CASCADE',
                foreignKey: {
                    name: 'idCommitteeMember',
                    allowNull: false
                }
            });

        models.ConferenceCommittee.belongsTo(models.Conference,
            {
                onDelete: 'CASCADE',
                foreignKey: {
                    name: 'idConference',
                    allowNull: false
                }
            });
    };

    return ConferenceCommittee;
}

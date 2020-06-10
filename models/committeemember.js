'use strict';

module.exports = function (sequelize, DataTypes) {

    let CommitteeMember = sequelize.define('CommitteeMember', {
        idCommitteeMember: { autoIncrement: true, primaryKey: true, type: DataTypes.INTEGER },
        nome: { type: DataTypes.STRING, notEmpty: true },
        email: { type: DataTypes.STRING },
        foto: { type: DataTypes.STRING },
        instituicao: { type: DataTypes.STRING },
        cargo: { type: DataTypes.STRING },
        facebook: { type: DataTypes.STRING },
        linkedin: { type: DataTypes.STRING },
        twitter: { type: DataTypes.STRING },
        bio: { type: DataTypes.TEXT }
    },
        {
            tableName: 'committeemembers',
            timestamps: false
        }
    );

    CommitteeMember.associate = function (models) {
        models.CommitteeMember.hasMany(models.ConferenceCommittee,
            {
                as: 'conferences',
                foreignKey: {
                    name: 'idCommitteeMember'
                }
            });
    };

    return CommitteeMember;
}

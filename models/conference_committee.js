'use strict';
const Promise = require('bluebird').getNewLibraryCopy();
const fs = require('fs');

const dataFile = __dirname + '/../data/conf_committee.json';

module.exports = function (sequelize, DataTypes) {

    let ConferenceCommittee = sequelize.define('ConferenceCommittee', {
        idConference: { primaryKey: true, type: DataTypes.INTEGER },
        idCommitteeMember: { primaryKey: true, type: DataTypes.INTEGER },
    },
        {
            tableName: 'conf_comite',
            timestamps: false
        }
    );

    // We're using JSON tables so relations don't work (not implemented)...
    /*
        ConferenceCommittee.associate = function (models) {
            models.ConferenceCommittee.belongsTo(models.ConferenceCommittee,
                {
                    onDelete: 'CASCADE',
                    foreignKey: {
                        name: 'idConferenceCommittee',
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
    */

    ConferenceCommittee.sync = function (options) {

        return Promise.resolve(0);
    };

    ConferenceCommittee.init = function (attributes, options = {}) {

        options = Object.assign({}, this.options, options);
        options.hooks = options.hooks === undefined ? true : !!options.hooks;

        return Promise.resolve(this);
    };

    /**
     * @returns {Promise<Array<Model>>}
     */
    ConferenceCommittee.findAll = (options) => {

        let committeesList = [];
        const committees = require(dataFile);

        committees.forEach(element => {
            committeesList.push(ConferenceCommittee.build(element));
        });

        return Promise.resolve(committeesList);
    };

    ConferenceCommittee.build = (values, options) => {

        let v = new ConferenceCommittee(values, options);
        v.save = ConferenceCommittee.save;
        v.update = ConferenceCommittee.update;
        return v;
    };

    ConferenceCommittee.save = function (options) {

        const committees = require(dataFile);

        if (this.isNewRecord) {
            let v = this.get();
            committees.push(v);

            ConferenceCommittee.writeFile(committees);
        } else {
            let idConference = options.where.idConference || 0;
            let idCommitteeMember = options.where.idCommitteeMember || 0;

            if (idConference == 0 || idCommitteeMember == 0) {
                return Promise.reject(0);
            }

            let exists = false;
            for (let i = 0; i < committees.length; i++) {
                let committee = committees[i];
                if (Number(committee.idConference) === Number(idConference) &&
                    Number(committee.idCommitteeMember) === Number(idCommitteeMember)) {
                    exists = true;
                    committees[i] = this.get();
                    ConferenceCommittee.writeFile(committees);
                    break;
                }
            }

            if (!exists) {
                return Promise.reject(idCommitteeMember);
            }
        }

        return Promise.resolve(this);
    };

    ConferenceCommittee.update = function (values, options) {

        let v = ConferenceCommittee.build(values, options);
        v.isNewRecord = false;

        return v.save(options);
    };

    ConferenceCommittee.destroy = (options) => {

        const committees = require(dataFile);

        let idConference = options.where.idConference || 0;
        let idCommitteeMember = options.where.idCommitteeMember || 0;

        if (idConference == 0 || idCommitteeMember == 0) {
            return Promise.reject(0);
        }

        for (let i = 0; i < committees.length; i++) {
            let committee = committees[i];
            if (Number(committee.idConference) === Number(idConference) &&
                Number(committee.idCommitteeMember) === Number(idCommitteeMember)) {
                committees.splice(i, 1);
                ConferenceCommittee.writeFile(committees);
                return Promise.resolve('ok');
            }
        }

        return Promise.reject(idCommitteeMember);
    };

    ConferenceCommittee.writeFile = (data) => {
        fs.writeFile(dataFile, JSON.stringify(data), (err) => {
            if (err) throw err;
        });
    };

    return ConferenceCommittee;
}

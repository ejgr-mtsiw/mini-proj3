'use strict';
const Promise = require('bluebird').getNewLibraryCopy();
const fs = require('fs');

const dataFile = __dirname + '/../data/committeemembers.json';

/**
 * This model uses a JSON file as database but emulates a
 * Sequelize object, so later we only need to remove the json code
 * when moving to a true DBMS
 */

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
            tableName: 'committeemembers.json',
            timestamps: false
        }
    );

    CommitteeMember.sync = function (options) {
        console.info('CommitteeMember.sync');
        return Promise.resolve(0);
    };

    CommitteeMember.init = function (attributes, options = {}) {
        console.info('CommitteeMember.init');

        console.info(this);

        options = Object.assign({}, this.options, options);
        options.hooks = options.hooks === undefined ? true : !!options.hooks;

        return Promise.resolve(this);
    };

    /**
     * @returns {Promise<Array<Model>>}
     */
    CommitteeMember.findAll = (options) => {
        let membersList = [];
        const members = require(dataFile);

        console.info('CommitteeMember.findAll');

        members.forEach(element => {
            membersList.push(CommitteeMember.build(element));
        });

        return Promise.resolve(membersList);
    };

    CommitteeMember.build = (values, options) => {

        console.info('CommitteeMember.build');

        let v = new CommitteeMember(values, options);
        v.save = CommitteeMember.save;
        v.update = CommitteeMember.update;
        return v;
    };

    CommitteeMember.save = function (options) {

        const members = require(dataFile);

        if (this.isNewRecord) {
            console.log('CommitteeMember.save INSERT');

            this.set({
                'idCommitteeMember': CommitteeMember.calculateNewId(members)
            });

            let v = this.get();
            members.push(v);

            CommitteeMember.writeFile(members);
        } else {
            console.log('CommitteeMember.save UPDATE');

            let idCommitteeMember = options.where.idCommitteeMember || 0;

            if (idCommitteeMember == 0) {
                return Promise.reject(0);
            }

            let exists = false;
            for (let i = 0; i < members.length; i++) {
                let member = members[i];
                if (Number(member.idCommitteeMember) === Number(idCommitteeMember)) {
                    exists = true;
                    console.log(members);
                    members[i] = this.get();
                    console.log(members);
                    CommitteeMember.writeFile(members);
                    break;
                }
            }

            if (!exists) {
                return Promise.reject(idCommitteeMember);
            }
        }

        return Promise.resolve(this);
    };

    CommitteeMember.update = function (values, options) {
        console.log('CommitteeMember.update');

        let v = CommitteeMember.build(values, options);
        v.isNewRecord = false;
        v.set('idCommitteeMember', options.where.idCommitteeMember);

        return v.save(options);
    };

    CommitteeMember.destroy = (options) => {
        console.log('CommitteeMember.destroy');

        const members = require(dataFile);

        let idCommitteeMember = options.where.idCommitteeMember || 0;

        if (idCommitteeMember == 0) {
            return Promise.reject(0);
        }

        for (let i = 0; i < members.length; i++) {
            let member = members[i];
            if (Number(member.idCommitteeMember) === Number(idCommitteeMember)) {
                members.splice(i, 1);
                CommitteeMember.writeFile(members);
                return Promise.resolve('ok');
            }
        }

        return Promise.reject(idCommitteeMember);
    };

    CommitteeMember.writeFile = (data) => {
        fs.writeFile(dataFile, JSON.stringify(data), (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
        });
    };

    CommitteeMember.calculateNewId = (members) => {
        // calculate new id
        let max = 0;
        let id = 0;

        for (const member of members) {
            id = Number(member.idCommitteeMember);
            if (id > max) {
                max = id;
            }
        }

        return max + 1;
    };

    return CommitteeMember;
}

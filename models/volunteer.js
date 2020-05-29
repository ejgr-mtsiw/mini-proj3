'use strict';
const Promise = require('bluebird').getNewLibraryCopy();
const fs = require('fs');

const dataFile = __dirname + '/../data/volunteers.json';

/**
 * This volunteer model uses a JSON file as database but emulates a
 * Sequelize object, so later we only need to remove the json code
 * when moving to a true DBMS
 */

module.exports = function (sequelize, DataTypes) {

    let Volunteer = sequelize.define('Volunteer', {
        idVolunteer: { autoIncrement: true, primaryKey: true, type: DataTypes.INTEGER },
        nome: { type: DataTypes.STRING, notEmpty: true },
        email: { type: DataTypes.STRING },
        telefone: { type: DataTypes.STRING }
    },
        {
            tableName: 'volunteers.json',
            timestamps: false
        }
    );

    Volunteer.sync = function (options) {
        console.info('Volunteer.sync');
        return Promise.resolve(0);
    };

    Volunteer.init = function (attributes, options = {}) {
        console.info('Volunteer.init');

        console.info(this);

        options = Object.assign({}, this.options, options);
        options.hooks = options.hooks === undefined ? true : !!options.hooks;

        return Promise.resolve(this);
    };

    /**
     * @returns {Promise<Array<Model>>}
     */
    Volunteer.findAll = (options) => {
        let volunteerList = [];
        const volunteers = require(dataFile);

        console.info('Volunteer.findAll');

        volunteers.forEach(element => {
            volunteerList.push(Volunteer.build(element));
        });

        return Promise.resolve(volunteerList);
    };

    Volunteer.build = (values, options) => {

        console.info('Volunteer.build');

        let v = new Volunteer(values, options);
        v.save = Volunteer.save;
        v.update = Volunteer.update;
        return v;
    };

    Volunteer.save = function (options) {

        const volunteers = require(dataFile);

        if (this.isNewRecord) {
            console.log('Volunteer.save INSERT');

            this.set({
                'idVolunteer': Volunteer.calculateNewId(volunteers)
            });

            let v = this.get();
            volunteers.push(v);

            Volunteer.writeFile(volunteers);
        } else {
            console.log('Volunteer.save UPDATE');

            let idVolunteer = options.where.idVolunteer || 0;

            if (idVolunteer === 0) {
                return Promise.reject(0);
            }

            let exists = false;
            for (let i = 0; i < volunteers.length; i++) {
                let volunteer = volunteers[i];
                if (Number(volunteer.idVolunteer) === Number(idVolunteer)) {
                    exists = true;
                    console.log(volunteers);
                    volunteers[i] = this.get();
                    console.log(volunteers);
                    Volunteer.writeFile(volunteers);
                    break;
                }
            }

            if (!exists) {
                return Promise.reject(idVolunteer);
            }
        }

        return Promise.resolve(this);
    };

    Volunteer.update = function (values, options) {
        console.log('Volunteer.update');

        let v = Volunteer.build(values, options);
        v.isNewRecord = false;
        v.set('idVolunteer', options.where.idVolunteer);

        return v.save(options);
    };

    Volunteer.destroy = (options) => {
        console.log('Volunteer.destroy');

        const volunteers = require(dataFile);

        let idVolunteer = options.where.idVolunteer || 0;

        if (idVolunteer === 0) {
            return Promise.reject(0);
        }

        for (let i = 0; i < volunteers.length; i++) {
            let volunteer = volunteers[i];
            if (Number(volunteer.idVolunteer) === Number(idVolunteer)) {
                volunteers.splice(i, 1);
                Volunteer.writeFile(volunteers);
                return Promise.resolve('ok');
            }
        }

        return Promise.reject(idVolunteer);
    };

    Volunteer.writeFile = (data) => {
        fs.writeFile(dataFile, JSON.stringify(data), (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
        });
    };

    Volunteer.calculateNewId = (volunteers) => {
        // calculate new id
        let max = 0;
        let id = 0;

        for (const volunteer of volunteers) {
            id = Number(volunteer.idVolunteer);
            if (id > max) {
                max = id;
            }
        }

        return max + 1;
    };

    return Volunteer;
}

'use strict';
const Promise = require('bluebird').getNewLibraryCopy();
const fs = require('fs');

const dataFile = __dirname + '/../data/task_volunteer.json';

module.exports = function (sequelize, DataTypes) {

    let TaskVolunteer = sequelize.define('TaskVolunteer', {
        idTask: { primaryKey: true, type: DataTypes.INTEGER },
        idVolunteer: { primaryKey: true, type: DataTypes.INTEGER },
    },
        {
            tableName: 'task_volunteer.json',
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

    TaskVolunteer.sync = function (options) {

        return Promise.resolve(0);
    };

    TaskVolunteer.init = function (attributes, options = {}) {

        options = Object.assign({}, this.options, options);
        options.hooks = options.hooks === undefined ? true : !!options.hooks;

        return Promise.resolve(this);
    };

    /**
     * @returns {Promise<Array<Model>>}
     */
    TaskVolunteer.findAll = (options) => {

        let list = [];
        const tasks = require(dataFile);

        tasks.forEach(element => {
            list.push(TaskVolunteer.build(element));
        });

        return Promise.resolve(list);
    };

    TaskVolunteer.build = (values, options) => {

        let v = new TaskVolunteer(values, options);
        v.save = TaskVolunteer.save;
        v.update = TaskVolunteer.update;
        return v;
    };

    TaskVolunteer.save = function (options) {

        const tasks = require(dataFile);

        if (this.isNewRecord) {
            let v = this.get();
            tasks.push(v);

            TaskVolunteer.writeFile(tasks);
        } else {
            let idTask = options.where.idTask || 0;
            let idVolunteer = options.where.idVolunteer || 0;

            if (idTask == 0 || idVolunteer == 0) {
                return Promise.reject(0);
            }

            let exists = false;
            for (let i = 0; i < tasks.length; i++) {
                let task = tasks[i];
                if (Number(task.idTask) === Number(idTask) &&
                    Number(task.idVolunteer) === Number(idVolunteer)) {
                    exists = true;
                    tasks[i] = this.get();
                    TaskVolunteer.writeFile(tasks);
                    break;
                }
            }

            if (!exists) {
                return Promise.reject(idVolunteer);
            }
        }

        return Promise.resolve(this);
    };

    TaskVolunteer.update = function (values, options) {

        let v = TaskVolunteer.build(values, options);
        v.isNewRecord = false;

        return v.save(options);
    };

    TaskVolunteer.destroy = (options) => {

        const tasks = require(dataFile);

        let idTask = options.where.idTask || 0;
        let idVolunteer = options.where.idVolunteer || 0;

        if (idTask == 0 || idVolunteer == 0) {
            return Promise.reject(0);
        }

        for (let i = 0; i < tasks.length; i++) {
            let task = tasks[i];
            if (Number(task.idTask) === Number(idTask) &&
                Number(task.idVolunteer) === Number(idVolunteer)) {
                tasks.splice(i, 1);
                TaskVolunteer.writeFile(tasks);
                return Promise.resolve('ok');
            }
        }

        return Promise.reject(idVolunteer);
    };

    TaskVolunteer.writeFile = (data) => {
        fs.writeFile(dataFile, JSON.stringify(data), (err) => {
            if (err) throw err;
        });
    };

    return TaskVolunteer;
}

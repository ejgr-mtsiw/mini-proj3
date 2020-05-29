'use strict';
const Promise = require('bluebird').getNewLibraryCopy();
const fs = require('fs');

const dataFile = __dirname + '/../data/tasks.json';

/**
 * This task model uses a JSON file as database but emulates a
 * Sequelize object, so later we only need to remove the json code
 * when moving to a true DBMS
 */

module.exports = function (sequelize, DataTypes) {

    let Task = sequelize.define('Task', {
        idTask: { autoIncrement: true, primaryKey: true, type: DataTypes.INTEGER },
        idConference: { type: DataTypes.INTEGER },
        nome: { type: DataTypes.STRING, notEmpty: true },
        descricao: { type: DataTypes.STRING },
        inicio: { type: DataTypes.DATE },
        fim: { type: DataTypes.DATE },
        concluida: { type: DataTypes.INTEGER }
    },
        {
            tableName: 'tasks.json',
            timestamps: false
        }
    );

    Task.sync = function (options) {

        return Promise.resolve(0);
    };

    Task.init = function (attributes, options = {}) {

        options = Object.assign({}, this.options, options);
        options.hooks = options.hooks === undefined ? true : !!options.hooks;

        return Promise.resolve(this);
    };

    /**
     * @returns {Promise<Array<Model>>}
     */
    Task.findAll = (options) => {

        let taskList = [];
        let tasks = require(dataFile);

        if (options.where && options.where.idConference) {
            let idConference = Number(options.where.idConference);
            tasks = tasks.filter((task) => {
                return task.idConference == idConference;
            });
        }

        tasks.forEach(element => {
            taskList.push(Task.build(element));
        });

        return Promise.resolve(taskList);
    };

    Task.build = (values, options) => {

        let v = new Task(values, options);
        v.save = Task.save;
        v.update = Task.update;
        return v;
    };

    Task.save = function (options) {

        const tasks = require(dataFile);

        if (this.isNewRecord) {
            this.set({
                'idTask': Task.calculateNewId(tasks)
            });

            let v = this.get();
            tasks.push(v);

            Task.writeFile(tasks);
        } else {
            let idTask = options.where.idTask || 0;

            if (idTask === 0) {
                return Promise.reject(0);
            }

            let exists = false;
            for (let i = 0; i < tasks.length; i++) {
                let task = tasks[i];
                if (Number(task.idTask) === Number(idTask)) {
                    exists = true;
                    tasks[i] = this.get();
                    Task.writeFile(tasks);
                    break;
                }
            }

            if (!exists) {
                return Promise.reject(idTask);
            }
        }

        return Promise.resolve(this);
    };

    Task.update = function (values, options) {

        let v = Task.build(values, options);
        v.isNewRecord = false;
        v.set('idTask', options.where.idTask);

        return v.save(options);
    };

    Task.destroy = (options) => {

        const tasks = require(dataFile);

        let idTask = options.where.idTask || 0;

        if (idTask === 0) {
            return Promise.reject(0);
        }

        for (let i = 0; i < tasks.length; i++) {
            let task = tasks[i];
            if (Number(task.idTask) === Number(idTask)) {
                tasks.splice(i, 1);
                Task.writeFile(tasks);
                return Promise.resolve('ok');
            }
        }

        return Promise.reject(idTask);
    };

    Task.writeFile = (data) => {
        fs.writeFile(dataFile, JSON.stringify(data), (err) => {
            if (err) throw err;
        });
    };

    Task.calculateNewId = (tasks) => {
        // calculate new id
        let max = 0;
        let id = 0;

        for (const task of tasks) {
            id = Number(task.idTask);
            if (id > max) {
                max = id;
            }
        }

        return max + 1;
    };

    return Task;
}

const models = require('../../models');
const messages = require('../../config/messages/bd');

const { validationResult } = require('express-validator');
const validator = require('./tasks.validator');

var exports = module.exports = {};

/**
 * Get all tasks (admin)
 */
exports.getAllTasks = (req, res) => {

    models.Task.findAll()
        .then((tasks) => {
            res.send(tasks);
        });
};

/**
 * Add a new task
 */
exports.addNewTask = [

    validator.idConference,
    validator.nome,
    validator.inicio,
    validator.fim,

    (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(messages.db.requiredData.status)
                .send(messages.db.requiredData);
        }

        models.Task.create({
            idConference: req.body.idConference,
            nome: req.body.nome,
            inicio: req.body.inicio,
            fim: req.body.fim
        }).then(function (item) {
            return res.status(messages.db.successInsert.status)
                .send(messages.db.successInsert);
        }).catch(function (err) {
            console.log(err);
            return res.status(messages.db.dbError.status)
                .send(messages.db.dbError);
        });
    }
];

/**
 * Update a task
 */
exports.updateTask = [

    validator.idTask,
    validator.idConference,
    validator.nome,
    validator.inicio,
    validator.fim,

    (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(messages.db.requiredData.status)
                .send(messages.db.requiredData);
        }

        models.Task.update({
            idConference: req.body.idConference,
            nome: req.body.nome,
            inicio: req.body.inicio,
            fim: req.body.fim
        }, {
            where: {
                idTask: req.body.idTask
            }
        }).then(function (item) {
            return res.status(messages.db.successUpdate.status)
                .send(messages.db.successUpdate);
        }).catch(function (err) {
            console.log(err);
            return res.status(messages.db.dbError.status)
                .send(messages.db.dbError);
        });
    }
];

/**
 * Remove a task from the database
 */
exports.deleteTask = [

    validator.idTaskParam,

    (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(messages.db.requiredData.status)
                .send(messages.db.requiredData);
        }

        models.Task.destroy({
            where: {
                idTask: req.params.idTask
            }
        }).then(function (item) {
            res.status(messages.db.successDelete.status)
                .send(messages.db.successDelete);
        }).catch(function (err) {
            console.log(err);
            res.status(messages.db.dbError.status)
                .send(messages.db.dbError);
        });
    }
];

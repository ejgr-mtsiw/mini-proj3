const models = require('../../models');
const messages = require('../../config/messages/bd');

const { validationResult } = require('express-validator');
const validator = require('./volunteers.validator');

var exports = module.exports = {};

/**
 * Get all volunteers (admin)
 */
exports.getAllVolunteers = (req, res) => {

    models.Volunteer.findAll()
        .then((volunteers) => {
            res.send(volunteers);
        });
};

/**
 * Add a new volunteer
 */
exports.addNewVolunteer = [

    validator.nome,
    validator.email,
    validator.telefone,

    (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(messages.db.requiredData.status)
                .send(messages.db.requiredData);
        }

        models.Volunteer.create(
            {
                'nome': req.body.nome,
                'email': req.body.email,
                'telefone': req.body.telefone
            }
        ).then(function (item) {
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
 * Update a volunteer
 */
exports.updateVolunteer = [

    validator.idVolunteer,
    validator.nome,
    validator.email,
    validator.telefone,

    (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(messages.db.requiredData.status)
                .send(messages.db.requiredData);
        }

        models.Volunteer.update({
            'nome': req.body.nome,
            'email': req.body.email,
            'telefone': req.body.telefone
        }, {
            where: {
                'idVolunteer': req.body.idVolunteer
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
 * Remove a volunteer from the database
 */
exports.deleteVolunteer = [

    validator.idVolunteerParam,

    (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(messages.db.requiredData.status)
                .send(messages.db.requiredData);
        }

        models.Volunteer.destroy({
            where: {
                idVolunteer: req.params.idVolunteer
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

const models = require('../../models');
const messages = require('../../config/messages/bd');

const { validationResult } = require('express-validator');
const validator = require('./sponsors.validator');

var exports = module.exports = {};

/**
 * Get all sponsors (admin)
 */
exports.getAllSponsors = (req, res) => {

    models.Sponsor.findAll()
        .then((sponsors) => {
            res.send(sponsors);
        });
};

/**
 * Get all sponsors and tag the current conference
 */
exports.getSponsorsWithConference = [

    validator.idConferenceParam,

    (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(messages.db.requiredData.status)
                .send(messages.db.requiredData);
        }

        models.Sponsor.findAll({
            include: {
                as: 'conferences',
                model: models.ConferenceSponsor,
                where: {
                    idConference: req.params.idConference
                },
                required: false
            }
        })
            .then(function (sponsors) {
                res.send(sponsors);
            });
    }
];

/**
 * Add a new sponsor
 */
exports.addNewSponsor = [

    validator.nome,
    validator.categoria,
    validator.logo,
    validator.link,

    (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(messages.db.requiredData.status)
                .send(messages.db.requiredData);
        }

        models.Sponsor.create(
            {
                nome: req.body.nome,
                categoria: req.body.categoria,
                link: req.body.link,
                logo: req.body.logo
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
 * Update a sponsor
 */
exports.updateSponsor = [

    validator.idSponsor,
    validator.nome,
    validator.categoria,
    validator.logo,
    validator.link,

    (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(messages.db.requiredData.status)
                .send(messages.db.requiredData);
        }

        models.Sponsor.update({
            nome: req.body.nome,
            categoria: req.body.categoria,
            link: req.body.link,
            logo: req.body.logo
        }, {
            where: {
                'idSponsor': req.body.idSponsor
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
 * Remove a sponsor from the database
 */
exports.deleteSponsor = [

    validator.idSponsorParam,

    (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(messages.db.requiredData.status)
                .send(messages.db.requiredData);
        }

        models.Sponsor.destroy({
            where: {
                idSponsor: req.params.idSponsor
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

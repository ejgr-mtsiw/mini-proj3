const models = require('../../models');
const messages = require('../../config/messages/bd');

const { validationResult } = require('express-validator');
const validator = require('./speakers.validator');

var exports = module.exports = {};

/**
 * Get the list of speakers
 */
exports.getAllSpeakers = (req, res) => {

    models.Speaker.findAll()
        .then(function (speakers) {
            res.send(speakers);
        });
};

/**
 * Get all speakers and tag the current conference
 */
exports.getSpeakersWithConference = [

    validator.idConferenceParam,

    (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(messages.db.requiredData.status)
                .send(messages.db.requiredData);
        }

        models.Speaker.findAll({
            include: {
                as: 'conferences',
                model: models.ConferenceSpeaker,
                where: {
                    'idConference': req.params.idConference
                },
                required: false
            }
        }).then(function (speakers) {
            res.send(speakers);
        });
    }
];

/**
 * Get the list of speakers types
 */
exports.getSpeakerTypes = (req, res) => {

    models.SpeakerType.findAll()
        .then(function (speakertypes) {
            res.send(speakertypes);
        });
};

/**
 * Add a new speaker
 */
exports.addNewSpeaker = [

    validator.nome,
    validator.cargo,
    validator.bio,
    validator.foto,
    validator.facebook,
    validator.linkedin,
    validator.twitter,

    (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(messages.db.requiredData.status)
                .send(messages.db.requiredData);
        }

        models.Speaker.create(
            {
                nome: req.body.nome,
                cargo: req.body.cargo,
                bio: req.body.bio,
                foto: req.body.foto,
                facebook: req.body.facebook,
                linkedin: req.body.linkedin,
                twitter: req.body.twitter
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
 * Update a speaker
 */
exports.updateSpeaker = [

    validator.idSpeaker,
    validator.nome,
    validator.cargo,
    validator.bio,
    validator.foto,
    validator.facebook,
    validator.linkedin,
    validator.twitter,

    (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(messages.db.requiredData.status)
                .send(messages.db.requiredData);
        }

        models.Speaker.update({
            nome: req.body.nome,
            cargo: req.body.cargo,
            bio: req.body.bio,
            foto: req.body.foto,
            facebook: req.body.facebook,
            linkedin: req.body.linkedin,
            twitter: req.body.twitter
        }, {
            where: {
                'idSpeaker': req.body.idSpeaker
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
 * Remove a speaker from the database
 */
exports.deleteSpeaker = [

    validator.idSpeakerParam,

    (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(messages.db.requiredData.status)
                .send(messages.db.requiredData);
        }

        models.Speaker.destroy({
            where: {
                idSpeaker: req.params.idSpeaker
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

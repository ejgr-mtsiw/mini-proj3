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

        let nome = req.body.nome;
        let cargo = req.body.cargo;
        let bio = req.body.bio;
        let foto = req.body.foto;
        let facebook = req.body.facebook;
        let linkedin = req.body.linkedin;
        let twitter = req.body.twitter;

        models.Speaker.create(
            {
                'nome': nome,
                'cargo': cargo,
                'bio': bio,
                'foto': foto,
                'facebook': facebook,
                'linkedin': linkedin,
                'twitter': twitter
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

        let idSpeaker = req.body.idSpeaker;
        let nome = req.body.nome;
        let cargo = req.body.cargo;
        let bio = req.body.bio;
        let foto = req.body.foto;
        let facebook = req.body.facebook;
        let linkedin = req.body.linkedin;
        let twitter = req.body.twitter;

        models.Speaker.update({
            'nome': nome,
            'cargo': cargo,
            'bio': bio,
            'foto': foto,
            'facebook': facebook,
            'linkedin': linkedin,
            'twitter': twitter
        }, {
            where: {
                'idSpeaker': idSpeaker
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
exports.deleteSpeaker = (req, res) => {
    let id = req.params.id;

    models.Speaker.destroy({
        where: {
            idSpeaker: id
        }
    }).then(function (item) {
        res.status(messages.db.successDelete.status)
            .send(messages.db.successDelete);
    }).catch(function (err) {
        console.log(err);
        res.status(messages.db.dbError.status)
            .send(messages.db.dbError);
    });
};

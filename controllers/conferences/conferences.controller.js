const models = require('../../models');
const messages = require('../../config/messages/bd');

const { validationResult } = require('express-validator');
const validator = require('./conferences.validator');

var exports = module.exports = {};

/**
 * Get all conferences (admin)
 */
exports.getAllConferences = (req, res) => {

    models.Conference.findAll()
        .then((conferences) => {
            res.send(conferences);
        });
};

/**
 * Add a new conference
 */
exports.addNewConference = [

    validator.nome,
    validator.acronimo,
    validator.descricao,
    validator.local,
    validator.data,

    (req, res) => {

        const errors = validationResult(req);

        console.error(errors);

        if (!errors.isEmpty()) {
            return res.status(messages.db.requiredData.status)
                .send(messages.db.requiredData);
        }

        models.Conference.create(
            {
                'nome': req.body.nome,
                'acronimo': req.body.acronimo,
                'descricao': req.body.descricao,
                'local': req.body.local,
                'data': req.body.data
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
exports.updateConference = [

    validator.idConference,
    validator.nome,
    validator.acronimo,
    validator.descricao,
    validator.local,
    validator.data,

    (req, res) => {

        const errors = validationResult(req);

        console.error(errors);

        if (!errors.isEmpty()) {
            return res.status(messages.db.requiredData.status)
                .send(messages.db.requiredData);
        }

        models.Conference.update(
            {
                'nome': req.body.nome,
                'acronimo': req.body.acronimo,
                'descricao': req.body.descricao,
                'local': req.body.local,
                'data': req.body.data
            },
            {
                where: {
                    'idConference': req.body.idConference
                }
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
 * Remove a conference from the database
 */
exports.deleteConference = (req, res) => {
    let idConference = req.params.idConference;

    models.Conference.destroy({
        where: {
            'idConference': idConference
        }
    }).then(function (item) {
        return res.status(messages.db.successDelete.status)
            .send(messages.db.successDelete);
    }).catch(function (err) {
        console.log(err);
        return res.status(messages.db.dbError.status)
            .send(messages.db.dbError);
    });
};


/**
 * Get speakers for some conference
 */
exports.getConferenceSpeakers = (req, res) => {

    let idConference = req.params.idConference;

    models.Speaker.findAll({
        include: {
            as: 'conferences',
            model: models.ConferenceSpeaker,
            required: true
        },
        where: {
            '$conferences.idConference$': idConference
        }
    }).then(function (speakers) {
        res.send(speakers);
    });
};

/**
 * Adds speaker to conference
 */
exports.addSpeakerToConference = (req, res) => {

    //TODO: validate!
    let idConference = req.params.idConference;
    let idSpeaker = req.params.idSpeaker;

    models.ConferenceSpeaker.create({
        'idConference': idConference,
        'idSpeaker': idSpeaker
    }).then(function (item) {
        return res.status(messages.db.successInsert.status)
            .send(messages.db.successInsert);
    }).catch(function (err) {
        console.log(err);
        return res.status(messages.db.dbError.status)
            .send(messages.db.dbError);
    });
};

/**
 * Removes a speaker from a conference
 */
exports.removeSpeakerFromConference = (req, res) => {

    //TODO: validate!
    let idConference = req.params.idConference;
    let idSpeaker = req.params.idSpeaker;

    models.ConferenceSpeaker.destroy({
        where: {
            'idConference': idConference,
            'idSpeaker': idSpeaker
        }
    }).then(function (item) {
        return res.status(messages.db.successDelete.status)
            .send(messages.db.successDelete);
    }).catch(function (err) {
        console.log(err);
        return res.status(messages.db.dbError.status)
            .send(messages.db.dbError);
    });
};

/**
 * Get sponsors for some conference
 */
exports.getConferenceSponsors = (req, res) => {

    //TODO: validate!
    let idConference = req.params.idConference;

    models.Sponsor.findAll({
        include: {
            as: 'conferences',
            model: models.ConferenceSponsor,
            required: true
        },
        where: {
            '$conferences.idConference$': idConference
        }
    }).then(function (sponsors) {
        res.send(sponsors);
    });
};

/**
 * Adds sponsor to conference
 */
exports.addSponsorToConference = (req, res) => {

    //TODO: validate!
    let idConference = req.params.idConference;
    let idSponsor = req.params.idSponsor;

    models.ConferenceSponsor.create({
        'idConference': idConference,
        'idSponsor': idSponsor
    }).then(function (item) {
        return res.status(messages.db.successInsert.status)
            .send(messages.db.successInsert);
    }).catch(function (err) {
        console.log(err);
        return res.status(messages.db.dbError.status)
            .send(messages.db.dbError);
    });
};

/**
 * Removes a sponsor from a conference
 */
exports.removeSponsorFromConference = (req, res) => {

    //TODO: validate!
    let idConference = req.params.idConference;
    let idSponsor = req.params.idSponsor;

    models.ConferenceSponsor.destroy({
        where: {
            'idConference': idConference,
            'idSponsor': idSponsor
        }
    }).then(function (item) {
        return res.status(messages.db.successDelete.status)
            .send(messages.db.successDelete);
    }).catch(function (err) {
        console.log(err);
        return res.status(messages.db.dbError.status)
            .send(messages.db.dbError);
    });
};

/**
 * Obter a lista de participantes na conferência
 */
exports.getConferenceParticpants = (req, res) => {

    //TODO: validate!
    idConference = req.params.idConference;

    models.ConferenceParticipant.findAll(
        {
            where: {
                'idConference': idConference
            }
        }
    ).then(function (participants) {
        res.send(participants);
    });
};

/**
 * Adicionar um participante à conferência
 */
exports.addParticipantToConference = [

    validator.idConference,
    validator.email,
    validator.nome,

    (req, res) => {

        const errors = validationResult(req);

        console.log(errors);

        if (!errors.isEmpty()) {
            return res.status(messages.db.requiredData.status)
                .send(messages.db.requiredData);
        }

        let idConference = req.body.idConference;
        let email = req.body.email;
        let nome = req.body.nome;

        //! TODO: Check for duplicate user

        models.ConferenceParticipant.create(
            {
                idConference: idConference,
                idParticipant: email,
                nomeParticipante: nome
            }
        ).then((item) => {
            return res.status(messages.db.successInsert.status)
                .send(messages.db.successInsert);
        }).catch((err) => {
            console.log(err);
            return res.status(messages.db.dbError.status)
                .send(messages.db.dbError);
        });
    }
];

/**
 * Remover um participante da conferência
 */
exports.removeParticipantFromConference = [

    validator.idConference,
    validator.email,

    (req, res) => {
        let idConference = req.params.idConference;
        let email = req.params.email;

        console.info("Removing participant: " + email);
        models.ConferenceParticipant.destroy({
            where: {
                idParticipant: email,
                idConference: idConference
            }
        }).then((item) => {
            res.status(messages.db.successDelete.status)
                .send(messages.db.successDelete);
        }).catch((err) => {
            console.log(err);
            res.status(messages.db.dbError.status)
                .send(messages.db.dbError);
        });
    }
];
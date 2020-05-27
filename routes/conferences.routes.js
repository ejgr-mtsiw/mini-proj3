const models = require('../models');
const express = require('express');
const router = express.Router();
const messages = require('../config/messages/bd');
const { check, validationResult } = require('express-validator');

/**
 * Get all conferences
 */
router.get('/', (req, res) => {

    models.Conference.findAll()
        .then(function (conferences) {
            res.send(conferences);
        });
});

/**
 * Adds a new conference
 */
router.post('/', [
    // Name can't be empty
    check('nome').trim().notEmpty(),
    // Acrónimo can't be empty
    check('acronimo').trim().notEmpty(),
    // Descrição can't be empty
    check('descricao').trim().notEmpty(),
    // Local can't be empty
    check('local').trim().notEmpty(),
    // Date must be valid
    check('data').isISO8601().toDate(),
], (req, res) => {

    const errors = validationResult(req);

    console.error(errors);

    if (!errors.isEmpty()) {
        return res.status(messages.db.requiredData.status)
            .send(messages.db.requiredData);
    }

    let nome = req.body.nome;
    let acronimo = req.body.acronimo;
    let descricao = req.body.descricao;
    let local = req.body.local;
    let data = req.body.data;

    models.Conference.create(
        {
            'nome': nome,
            'acronimo': acronimo,
            'descricao': descricao,
            'local': local,
            'data': data
        }
    ).then(function (item) {
        return res.status(messages.db.successInsert.status)
            .send(messages.db.successInsert);
    }).catch(function (err) {
        console.log(err);
        return res.status(messages.db.dbError.status)
            .send(messages.db.dbError);
    });
});

/**
 * Updates a conference
 */
router.put('/:idConference', [
    // Name can't be empty
    check('idConference').trim().notEmpty(),
    // Name can't be empty
    check('nome').trim().notEmpty(),
    // Acrónimo can't be empty
    check('acronimo').trim().notEmpty(),
    // Descrição can't be empty
    check('descricao').trim().notEmpty(),
    // Local can't be empty
    check('local').trim().notEmpty(),
    // Date must be valid
    check('data').isISO8601().toDate(),
], (req, res) => {

    const errors = validationResult(req);

    console.error(errors);

    if (!errors.isEmpty()) {
        return res.status(messages.db.requiredData.status)
            .send(messages.db.requiredData);
    }

    let idConference = req.body.idConference;
    let nome = req.body.nome;
    let acronimo = req.body.acronimo;
    let descricao = req.body.descricao;
    let local = req.body.local;
    let data = req.body.data;

    models.Conference.update(
        {
            'nome': nome,
            'acronimo': acronimo,
            'descricao': descricao,
            'local': local,
            'data': data
        },
        {
            where: {
                'idConference': idConference
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
});

/**
 * Removes a conference
 */
router.delete('/:idConference', (req, res) => {

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
});

/**
 * Get speakers for some conference
 */
router.get('/:idConference/speakers', (req, res) => {

    let idConference = req.params.idConference;

    models.Speaker.findAll({
        include: {
            as: 'conferences',
            model: models.ConferenceSpeaker,
            where: {
                'idConference': idConference
            },
            required: false
        }
    }).then(function (speakers) {
        res.send(speakers);
    });
});

/**
 * Adds speaker to conference
 */
router.put('/:idConference/speakers/:idSpeaker', (req, res) => {

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
});

/**
 * Removes a speaker from a conference
 */
router.delete('/:idConference/speakers/:idSpeaker', (req, res) => {

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
});

/**
 * Get sponsors for some conference
 */
router.get('/:idConference/sponsors', (req, res) => {

    let idConference = req.params.idConference;

    models.Sponsor.findAll({
        include: {
            as: 'conferences',
            model: models.ConferenceSponsor,
            where: {
                'idConference': idConference
            },
            required: false
        }
    })
        .then(function (sponsors) {
            res.send(sponsors);
        });
});

/**
 * Adds sponsor to conference
 */
router.put('/:idConference/sponsors/:idSponsor', (req, res) => {

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
});

/**
 * Removes a sponsor from a conference
 */
router.delete('/:idConference/sponsors/:idSponsor', (req, res) => {

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
});

/**
 * Obter a lista de participantes na conferência
 */
router.get('/:idConference/participants', (req, res) => {

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
});

/**
 * Adicionar um participante à conferência
 */
router.post('/:idConference/participants/:email?', [
    // email must be an email
    check('email').normalizeEmail().isEmail(),
    // nome must be filled
    check('nome').trim().notEmpty()
], (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(messages.db.requiredData.status)
            .send(messages.db.requiredData);
    }

    let email = req.body.email;
    let nome = req.body.nome;

    models.ConferenceParticipant.create(
        {
            idConference: 1,
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
});

/**
 * Remover um participante da conferência
 */
router.delete('/:idConference/participants/:email', (req, res) => {
    let email = req.params.email;

    console.info("Removing participant: " + email);
    models.ConferenceParticipant.destroy({
        where: {
            idParticipant: email
        }
    }).then((item) => {
        res.status(messages.db.successDelete.status)
            .send(messages.db.successDelete);
    }).catch((err) => {
        console.log(err);
        res.status(messages.db.dbError.status)
            .send(messages.db.dbError);
    });
});

module.exports = router;
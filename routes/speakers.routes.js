const models = require('../models');
const express = require('express');
const router = express.Router();
const messages = require('../config/messages/bd');
const { check, validationResult } = require('express-validator');

/**
 * Get the list of speakers
 */
router.get('/conference/:idConference/speakers', function (req, res) {

    models.Speaker.findAll()
        .then(function (speakers) {
            res.send(speakers);
        });
});

/**
 * Get the list of speakers types
 */
router.get('/speakers/types', function (req, res) {

    models.SpeakerType.findAll()
        .then(function (speakertypes) {
            res.send(speakertypes);
        });
});

/**
 * Add a new speaker
 */
router.post('/conference/:idConference/speakers/', [
    // Name can't be empty
    check('nome').trim().notEmpty(),
    // Cargo can't be empty
    check('cargo').trim().notEmpty(),
    // Bio can't be empty
    check('bio').trim().optional({ checkFalsy: true }).notEmpty(),
    // Foto must be an URL
    check('foto').optional({ checkFalsy: true }).isURL(),
    // Facebook must be an URL
    check('facebook').optional({ checkFalsy: true }).isURL(),
    // Linkedin must be an URL
    check('linkedin').optional({ checkFalsy: true }).isURL(),
    // Twitter must be an URL
    check('twitter').optional({ checkFalsy: true }).isURL()
], (req, res) => {

    const errors = validationResult(req);

    console.error(errors);

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
});

/**
 * Update a speaker
 */
router.put('/conference/:idConference/speakers/:id', [
    // Name can't be empty
    check('nome').trim().notEmpty(),
    // Cargo can't be empty
    check('cargo').trim().notEmpty(),
    // Bio can't be empty
    check('bio').trim().optional({ checkFalsy: true }).notEmpty(),
    // Foto must be an URL
    check('foto').optional({ checkFalsy: true }).isURL(),
    // Facebook must be an URL
    check('facebook').optional({ checkFalsy: true }).isURL(),
    // Linkedin must be an URL
    check('linkedin').optional({ checkFalsy: true }).isURL(),
    // Twitter must be an URL
    check('twitter').optional({ checkFalsy: true }).isURL()
], (req, res) => {

    const errors = validationResult(req);

    console.error(errors);

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
});

/**
 * Remove a speaker from the database
 */
router.delete('/conference/:idConference/speakers/:id', function (req, res) {
    let id = req.params.id;

    console.info("Removing speaker: " + id);
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
});

module.exports = router;

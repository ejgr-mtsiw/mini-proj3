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
 * Add a new speaker to the conference
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

module.exports = router;
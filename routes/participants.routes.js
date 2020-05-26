const models = require('../models');
const express = require('express');
const router = express.Router();
const messages = require('../config/messages/bd');

/**
 * Obter a lista de participantes na conferência
 */
router.get('/', function (req, res) {

    models.ConferenceParticipant.findAll()
        .then(function (participants) {
            res.send(participants);
        });
});

/**
 * Adicionar um participante à conferência
 */
router.post('/:email?', function (req, res) {

    let email = req.body.email;
    let nome = req.body.nome;

    models.ConferenceParticipant.create(
        {
            idConference: 1,
            idParticipant: email,
            nomeParticipante: nome
        }
    ).then(function (item) {
        res.status(messages.db.successInsert.status)
            .send(messages.db.successInsert);
    }).catch(function (err) {
        console.log(err);
        res.status(messages.db.dbError.status)
            .send(messages.db.dbError);
    });

});

router.delete('/:email', function (req, res) {
    let email = req.params.email;

    console.info("Removing participant: " + email);
    models.ConferenceParticipant.destroy({
        where: {
            idParticipant: email
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
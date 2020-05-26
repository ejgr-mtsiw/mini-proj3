var models = require('../models');
var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {

    models.ConferenceParticipant.findAll()
        .then(function (participants) {
            res.send(participants);
        });
});

module.exports = router;
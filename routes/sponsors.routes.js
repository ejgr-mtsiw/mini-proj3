var models = require('../models');
var express = require('express');
var router = express.Router();

router.get('/conference/:idConference/sponsors/', function (req, res) {

    models.Sponsor.findAll()
        .then(function (sponsors) {
            res.send(sponsors);
        });
});

module.exports = router;
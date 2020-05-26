var models = require('../models');
var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {

    models.Speaker.findAll()
        .then(function (speakers) {
            res.send(speakers);
        });
});

module.exports = router;
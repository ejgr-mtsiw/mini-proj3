var models = require('../models');
var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {

    models.Volunteer.findAll()
        .then(function (volunteers) {
            res.send(volunteers);
        });
});

module.exports = router;
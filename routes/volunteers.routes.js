var models = require('../models');
var express = require('express');
var router = express.Router();

/**
 * Get all volunteers
 */
router.get('/', (req, res) => {

    models.Volunteer.findAll()
        .then((volunteers) => {
            res.send(volunteers);
        });
});

module.exports = router;
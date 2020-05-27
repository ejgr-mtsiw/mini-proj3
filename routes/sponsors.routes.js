var models = require('../models');
var express = require('express');
var router = express.Router();

/**
 * Get all sponsors (admin)
 */
router.get('/', (req, res) => {

    models.Sponsor.findAll()
        .then((sponsors) => {
            res.send(sponsors);
        });
});

module.exports = router;
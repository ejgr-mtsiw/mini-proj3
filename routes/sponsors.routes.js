const models = require('../models');
const express = require('express');
const router = express.Router();
const messages = require('../config/messages/bd');
const { check, validationResult } = require('express-validator');

/**
 * Get all sponsors (admin)
 */
router.get('/', (req, res) => {

    models.Sponsor.findAll()
        .then((sponsors) => {
            res.send(sponsors);
        });
});


/**
 * Add a new sponsor
 */
router.post('/', [
    // Name can't be empty
    check('nome').trim().notEmpty(),
    // Categoria can't be empty
    check('categoria').trim().notEmpty(),
    // Logo must be an URL
    check('logo').isURL(),
    // Link must be an URL
    check('link').isURL()
], (req, res) => {

    const errors = validationResult(req);

    console.error(errors);

    if (!errors.isEmpty()) {
        return res.status(messages.db.requiredData.status)
            .send(messages.db.requiredData);
    }

    let nome = req.body.nome;
    let categoria = req.body.categoria;
    let link = req.body.link;
    let logo = req.body.logo;

    models.Sponsor.create(
        {
            'nome': nome,
            'categoria': categoria,
            'link': link,
            'logo': logo
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
 * Update a sponsor
 */
router.put('/:id', [
    // Name can't be empty
    check('nome').trim().notEmpty(),
    // Categoria can't be empty
    check('categoria').trim().notEmpty(),
    // Logo must be an URL
    check('logo').isURL(),
    // Link must be an URL
    check('link').isURL()
], (req, res) => {

    const errors = validationResult(req);

    console.error(errors);

    if (!errors.isEmpty()) {
        return res.status(messages.db.requiredData.status)
            .send(messages.db.requiredData);
    }

    let idSponsor = req.body.idSponsor;
    let nome = req.body.nome;
    let categoria = req.body.categoria;
    let link = req.body.link;
    let logo = req.body.logo;

    models.Sponsor.update({
        'nome': nome,
        'categoria': categoria,
        'link': link,
        'logo': logo
    }, {
        where: {
            'idSponsor': idSponsor
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
 * Remove a sponsor from the database
 */
router.delete('/:id', (req, res) => {
    let id = req.params.id;

    models.Sponsor.destroy({
        where: {
            idSponsor: id
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
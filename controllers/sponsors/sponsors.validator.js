
const { body, param } = require('express-validator');

module.exports = {
    idSponsorParam: param('idSponsor').notEmpty().isNumeric(),
    idSponsor: body('idSponsor').notEmpty().isNumeric(),
    nome: body('nome').trim().notEmpty().escape(),
    categoria: body('categoria').trim().notEmpty().escape(),
    logo: body('logo').isURL().escape(),
    link: body('link').isURL().escape(),
    idConferenceParam: param('idConference').notEmpty().isNumeric()
};
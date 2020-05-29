
const { body } = require('express-validator');

module.exports = {
    // Id can't be empty
    idSponsor: body('idSponsor').isNumeric().notEmpty(),
    // Name can't be empty
    nome: body('nome').trim().notEmpty(),
    // Categoria can't be empty
    categoria: body('categoria').trim().notEmpty(),
    // Logo must be an URL
    logo: body('logo').isURL(),
    // Link must be an URL
    link: body('link').isURL()
};
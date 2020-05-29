
const { body } = require('express-validator');

module.exports = {
    // Id can't be empty
    idVolunteer: body('idVolunteer').isNumeric().notEmpty(),
    // Name can't be empty
    nome: body('nome').trim().notEmpty(),
    // Categoria can't be empty
    email: body('email').isEmail().notEmpty(),
    // Logo must be an URL
    telefone: body('telefone').trim().notEmpty()
};
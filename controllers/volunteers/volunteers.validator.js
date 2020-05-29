
const { body, param } = require('express-validator');

module.exports = {
    idVolunteerParam: param('idVolunteer').isNumeric().notEmpty(),
    idVolunteer: body('idVolunteer').notEmpty().isNumeric(),
    nome: body('nome').trim().notEmpty().escape(),
    email: body('email').notEmpty().isEmail().normalizeEmail(),
    telefone: body('telefone').trim().notEmpty().escape()
};
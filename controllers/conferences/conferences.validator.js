
const { check } = require('express-validator');

module.exports = {
    // Id can't be empty
    idConference: check('idConference').isNumeric().notEmpty(),
    // Name can't be empty
    nome: check('nome').trim().notEmpty(),
    // Acrónimo can't be empty
    acronimo: check('acronimo').trim().notEmpty(),
    // Descrição can't be empty
    descricao: check('descricao').trim().notEmpty(),
    // Local can't be empty
    local: check('local').trim().notEmpty(),
    // Data can't be empty
    data: check('data').isISO8601().toDate(),
    // Email for participants
    email: check('email').isEmail().notEmpty()
};


const { body, param } = require('express-validator');

module.exports = {
    idTaskParam: param('idTask').isNumeric().notEmpty(),
    idConferenceParam: param('idConference').isNumeric().notEmpty(),
    idTask: body('idTask').notEmpty().isNumeric(),
    idConference: body('idConference').notEmpty().isNumeric(),
    nome: body('nome').trim().notEmpty().escape(),
    descricao: body('descricao').optional({ checkFalsy: true }).trim().escape(),
    inicio: body('inicio').trim().notEmpty().isISO8601().toDate(),
    fim: body('fim').trim().notEmpty().isISO8601().toDate(),
    concluido: body('concluido').isNumeric().notEmpty()
};
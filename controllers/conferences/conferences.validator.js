
const { body, param } = require('express-validator');

module.exports = {
    idConferenceParam: param('idConference').notEmpty().isNumeric(),
    idConference: body('idConference').notEmpty().isNumeric(),
    nome: body('nome').trim().notEmpty().escape(),
    acronimo: body('acronimo').trim().notEmpty().escape(),
    descricao: body('descricao').trim().notEmpty().escape(),
    local: body('local').trim().notEmpty().escape(),
    data: body('data').isISO8601().toDate(),
    email: body('email').notEmpty().isEmail().normalizeEmail(),
    idSpeakerParam: param('idSpeaker').notEmpty().isNumeric(),
    idSponsorParam: param('idSponsor').notEmpty().isNumeric(),
    idCommitteeMemberParam: param('idCommitteeMember').notEmpty().isNumeric(),
    emailParam: param('email').notEmpty().isEmail().normalizeEmail()
};

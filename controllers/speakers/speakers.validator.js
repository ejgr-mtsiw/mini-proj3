
const { body, param } = require('express-validator');

module.exports = {
    idSpeakerParam: param('idSpeaker').notEmpty().isNumeric(),
    idSpeaker: body('idSpeaker').notEmpty().isNumeric(),
    nome: body('nome').trim().notEmpty().escape(),
    cargo: body('cargo').trim().notEmpty().escape(),
    bio: body('bio').optional({ checkFalsy: true }).trim().escape(),
    foto: body('foto').optional({ checkFalsy: true }).isURL().escape(),
    facebook: body('facebook').optional({ checkFalsy: true }).isURL().escape(),
    linkedin: body('linkedin').optional({ checkFalsy: true }).isURL().escape(),
    twitter: body('twitter').optional({ checkFalsy: true }).isURL().escape(),
    idConferenceParam: param('idConference').notEmpty().isNumeric()
};
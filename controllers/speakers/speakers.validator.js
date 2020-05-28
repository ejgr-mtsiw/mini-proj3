
const { body } = require('express-validator');

module.exports = {
    // Id can't be empty
    idSpeaker: body('idSpeaker').isNumeric().notEmpty(),
    // Name can't be empty
    nome: body('nome').trim().notEmpty(),
    // Cargo can't be empty
    cargo: body('cargo').trim().notEmpty(),
    // Bio can't be empty
    bio: body('bio').trim().optional({ checkFalsy: true }).notEmpty(),
    // Foto must be an URL
    foto: body('foto').optional({ checkFalsy: true }).isURL(),
    // Facebook must be an URL
    facebook: body('facebook').optional({ checkFalsy: true }).isURL(),
    // Linkedin must be an URL
    linkedin: body('linkedin').optional({ checkFalsy: true }).isURL(),
    // Twitter must be an URL
    twitter: body('twitter').optional({ checkFalsy: true }).isURL()
};
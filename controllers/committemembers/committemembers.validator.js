
const { body, param } = require('express-validator');

module.exports = {
    idCommitteeMemberParam: param('idCommitteeMember').notEmpty().isNumeric(),
    idCommitteeMember: body('idCommitteeMember').notEmpty().isNumeric(),
    nome: body('nome').trim().notEmpty().escape(),
    email: body('email').notEmpty().isEmail().normalizeEmail(),
    foto: body('foto').notEmpty().isURL().escape(),
    instituicao: body('instituicao').trim().notEmpty().escape(),
    cargo: body('cargo').trim().notEmpty().escape(),
    bio: body('bio').optional({ checkFalsy: true }).trim().escape(),
    facebook: body('facebook').optional({ checkFalsy: true }).isURL().escape(),
    linkedin: body('linkedin').optional({ checkFalsy: true }).isURL().escape(),
    twitter: body('twitter').optional({ checkFalsy: true }).isURL().escape()
};

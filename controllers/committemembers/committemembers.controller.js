const models = require('../../models');
const messages = require('../../config/messages/bd');

const { validationResult } = require('express-validator');
const validator = require('./committemembers.validator');

var exports = module.exports = {};

/**
 * Get all committee members (admin)
 */
exports.getAllCommitteeMembers = (req, res) => {

    models.CommitteeMember.findAll()
        .then((members) => {
            res.send(members);
        });
};

/**
 * Add a new committee member
 */
exports.addNewCommitteeMember = [

    validator.nome,
    validator.email,
    validator.foto,
    validator.instituicao,
    validator.cargo,
    validator.bio,
    validator.facebook,
    validator.linkedin,
    validator.twitter,

    (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(messages.db.requiredData.status)
                .send(messages.db.requiredData);
        }

        models.CommitteeMember.create(
            {
                'nome': req.body.nome,
                'email': req.body.email,
                'foto': req.body.foto,
                'instituicao': req.body.instituicao,
                'cargo': req.body.cargo,
                'bio': req.body.bio,
                'facebook': req.body.facebook,
                'linkedin': req.body.linkedin,
                'twitter': req.body.twitter
            }
        ).then(function (item) {
            return res.status(messages.db.successInsert.status)
                .send(messages.db.successInsert);
        }).catch(function (err) {
            console.log(err);
            return res.status(messages.db.dbError.status)
                .send(messages.db.dbError);
        });
    }
];

/**
 * Update a committee member
 */
exports.updateCommitteeMember = [

    validator.idCommitteeMember,
    validator.nome,
    validator.email,
    validator.foto,
    validator.instituicao,
    validator.cargo,
    validator.bio,
    validator.facebook,
    validator.linkedin,
    validator.twitter,

    (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(messages.db.requiredData.status)
                .send(messages.db.requiredData);
        }

        models.CommitteeMember.update({
            'nome': req.body.nome,
            'email': req.body.email,
            'foto': req.body.foto,
            'instituicao': req.body.instituicao,
            'cargo': req.body.cargo,
            'bio': req.body.bio,
            'facebook': req.body.facebook,
            'linkedin': req.body.linkedin,
            'twitter': req.body.twitter
        }, {
            where: {
                'idCommitteeMember': req.body.idCommitteeMember
            }
        }).then(function (item) {
            return res.status(messages.db.successUpdate.status)
                .send(messages.db.successUpdate);
        }).catch(function (err) {
            console.log(err);
            return res.status(messages.db.dbError.status)
                .send(messages.db.dbError);
        });
    }
];

/**
 * Remove a committee member from the database
 */
exports.deleteCommitteeMember = [

    validator.idCommitteeMemberParam,

    (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(messages.db.requiredData.status)
                .send(messages.db.requiredData);
        }

        models.CommitteeMember.destroy({
            where: {
                idCommitteeMember: req.params.idCommitteeMember
            }
        }).then(function (item) {
            res.status(messages.db.successDelete.status)
                .send(messages.db.successDelete);
        }).catch(function (err) {
            console.log(err);
            res.status(messages.db.dbError.status)
                .send(messages.db.dbError);
        });
    }
];

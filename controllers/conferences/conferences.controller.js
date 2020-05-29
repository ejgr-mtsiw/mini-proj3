const models = require('../../models');
const messages = require('../../config/messages/bd');

const { validationResult } = require('express-validator');
const validator = require('./conferences.validator');

var exports = module.exports = {};

/**
 * Get all conferences (admin)
 */
exports.getAllConferences = (req, res) => {

    models.Conference.findAll()
        .then((conferences) => {
            res.send(conferences);
        });
};

/**
 * Add a new conference
 */
exports.addNewConference = [

    validator.nome,
    validator.acronimo,
    validator.descricao,
    validator.local,
    validator.data,

    (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(messages.db.requiredData.status)
                .send(messages.db.requiredData);
        }

        models.Conference.create(
            {
                'nome': req.body.nome,
                'acronimo': req.body.acronimo,
                'descricao': req.body.descricao,
                'local': req.body.local,
                'data': req.body.data
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
 * Update a conference
 */
exports.updateConference = [

    validator.idConference,
    validator.nome,
    validator.acronimo,
    validator.descricao,
    validator.local,
    validator.data,

    (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(messages.db.requiredData.status)
                .send(messages.db.requiredData);
        }

        models.Conference.update(
            {
                nome: req.body.nome,
                acronimo: req.body.acronimo,
                descricao: req.body.descricao,
                local: req.body.local,
                data: req.body.data
            },
            {
                where: {
                    'idConference': req.body.idConference
                }
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
 * Remove a conference from the database
 */
exports.deleteConference = [

    validator.idConferenceParam,

    (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(messages.db.requiredData.status)
                .send(messages.db.requiredData);
        }

        models.Conference.destroy({
            where: {
                idConference: req.params.idConference
            }
        }).then(function (item) {
            return res.status(messages.db.successDelete.status)
                .send(messages.db.successDelete);
        }).catch(function (err) {
            console.log(err);
            return res.status(messages.db.dbError.status)
                .send(messages.db.dbError);
        });
    }
];


/**
 * Get speakers for some conference
 */
exports.getConferenceSpeakers = [

    validator.idConferenceParam,

    (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(messages.db.requiredData.status)
                .send(messages.db.requiredData);
        }

        models.Speaker.findAll({
            include: {
                as: 'conferences',
                model: models.ConferenceSpeaker,
                required: true
            },
            where: {
                '$conferences.idConference$': req.params.idConference
            }
        }).then(function (speakers) {
            res.send(speakers);
        });
    }
];

/**
 * Adds speaker to conference
 */
exports.addSpeakerToConference = [

    validator.idConferenceParam,
    validator.idSpeakerParam,

    (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(messages.db.requiredData.status)
                .send(messages.db.requiredData);
        }

        models.ConferenceSpeaker.create({
            idConference: req.params.idConference,
            idSpeaker: req.params.idSpeaker
        }).then(function (item) {
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
 * Removes a speaker from a conference
 */
exports.removeSpeakerFromConference = [

    validator.idConferenceParam,
    validator.idSpeakerParam,

    (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(messages.db.requiredData.status)
                .send(messages.db.requiredData);
        }

        models.ConferenceSpeaker.destroy({
            where: {
                idConference: req.params.idConference,
                idSpeaker: req.params.idSpeaker
            }
        }).then(function (item) {
            return res.status(messages.db.successDelete.status)
                .send(messages.db.successDelete);
        }).catch(function (err) {
            console.log(err);
            return res.status(messages.db.dbError.status)
                .send(messages.db.dbError);
        });
    }
];

/**
 * Get sponsors for some conference
 */
exports.getConferenceSponsors = [

    validator.idConferenceParam,

    (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(messages.db.requiredData.status)
                .send(messages.db.requiredData);
        }

        models.Sponsor.findAll({
            include: {
                as: 'conferences',
                model: models.ConferenceSponsor,
                required: true
            },
            where: {
                '$conferences.idConference$': req.params.idConference
            }
        }).then(function (sponsors) {
            res.send(sponsors);
        });
    }
];

/**
 * Adds sponsor to conference
 */
exports.addSponsorToConference = [

    validator.idConferenceParam,
    validator.idSponsorParam,

    (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(messages.db.requiredData.status)
                .send(messages.db.requiredData);
        }

        models.ConferenceSponsor.create({
            idConference: req.params.idConference,
            idSponsor: req.params.idSponsor
        }).then(function (item) {
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
 * Removes a sponsor from a conference
 */
exports.removeSponsorFromConference = [

    validator.idConferenceParam,
    validator.idSponsorParam,

    (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(messages.db.requiredData.status)
                .send(messages.db.requiredData);
        }

        models.ConferenceSponsor.destroy({
            where: {
                idConference: req.params.idConference,
                idSponsor: req.params.idSponsor
            }
        }).then(function (item) {
            return res.status(messages.db.successDelete.status)
                .send(messages.db.successDelete);
        }).catch(function (err) {
            console.log(err);
            return res.status(messages.db.dbError.status)
                .send(messages.db.dbError);
        });
    }
];

/**
 * Obter a lista de participantes na conferência
 */
exports.getConferenceParticpants = [

    validator.idConferenceParam,

    (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(messages.db.requiredData.status)
                .send(messages.db.requiredData);
        }

        models.ConferenceParticipant.findAll(
            {
                where: {
                    idConference: req.params.idConference
                }
            }
        ).then(function (participants) {
            res.send(participants);
        });
    }
];

/**
 * Adicionar um participante à conferência
 */
exports.addParticipantToConference = [

    validator.idConference,
    validator.email,
    validator.nome,

    (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(messages.db.requiredData.status)
                .send(messages.db.requiredData);
        }

        let idConference = req.body.idConference;
        let email = req.body.email;
        let nome = req.body.nome;

        //! TODO: Check for duplicate user

        models.ConferenceParticipant.create(
            {
                idConference: idConference,
                idParticipant: email,
                nomeParticipante: nome
            }
        ).then((item) => {
            return res.status(messages.db.successInsert.status)
                .send(messages.db.successInsert);
        }).catch((err) => {
            console.log(err);
            return res.status(messages.db.dbError.status)
                .send(messages.db.dbError);
        });
    }
];

/**
 * Remover um participante da conferência
 */
exports.removeParticipantFromConference = [

    validator.idConferenceParam,
    validator.emailParam,

    (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(messages.db.requiredData.status)
                .send(messages.db.requiredData);
        }

        models.ConferenceParticipant.destroy({
            where: {
                idParticipant: req.params.email,
                idConference: req.params.idConference
            }
        }).then((item) => {
            res.status(messages.db.successDelete.status)
                .send(messages.db.successDelete);
        }).catch((err) => {
            console.log(err);
            res.status(messages.db.dbError.status)
                .send(messages.db.dbError);
        });
    }
];

/**
 * Get committee members for some conference
 */
exports.getConferenceCommittee = [

    validator.idConferenceParam,

    (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(messages.db.requiredData.status)
                .send(messages.db.requiredData);
        }

        models.CommitteeMember.findAll({
            include: {
                as: 'conferences',
                model: models.ConferenceCommittee,
                required: true
            },
            where: {
                '$conferences.idConference$': req.params.idConference
            }
        }).then(function (members) {

            //TODO: Remove when using SQL
            // The next steps are necessary to simulate a relation between
            // the tables, as they are just JSON files for now

            return models.ConferenceCommittee.findAll().then((committees) => {
                for (let i = 0; i < members.length; i++) {
                    members[i].dataValues.conferences = [];
                    for (let j = 0; j < committees.length; j++) {
                        if (Number(committees[j].idConference) === Number(req.params.idConference) &&
                            Number(committees[j].idCommitteeMember) === Number(members[i].idCommitteeMember)) {

                            members[i].dataValues.conferences = [{
                                idConference: req.params.idConference
                            }];
                            break;
                        }
                    }
                }

                return res.send(members);
            });
        });
    }
];

/**
 * Adds committee member to conference
 */
exports.addCommitteeMemberToConference = [

    validator.idConferenceParam,
    validator.idCommitteeMemberParam,

    (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(messages.db.requiredData.status)
                .send(messages.db.requiredData);
        }

        models.ConferenceCommittee.create({
            idConference: req.params.idConference,
            idCommitteeMember: req.params.idCommitteeMember
        }).then(function (item) {
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
 * Removes a committee member from a conference
 */
exports.removeCommitteeMemberFromConference = [

    validator.idConferenceParam,
    validator.idCommitteeMemberParam,

    (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(messages.db.requiredData.status)
                .send(messages.db.requiredData);
        }

        models.ConferenceCommittee.destroy({
            where: {
                idConference: req.params.idConference,
                idCommitteeMember: req.params.idCommitteeMember
            }
        }).then(function (item) {
            return res.status(messages.db.successDelete.status)
                .send(messages.db.successDelete);
        }).catch(function (err) {
            console.log(err);
            return res.status(messages.db.dbError.status)
                .send(messages.db.dbError);
        });
    }
];

/**
 * Get tasks for some conference
 */
exports.getConferenceTasks = [

    validator.idConferenceParam,

    (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(messages.db.requiredData.status)
                .send(messages.db.requiredData);
        }

        let idConference = req.params.idConference;

        models.Task.findAll({
            include: {
                as: 'volunteers',
                model: models.TaskVolunteer,
                required: false
            },
            where: {
                idConference: idConference
            }
        }).then(function (tasks) {

            // TODO: Remove when using SQL
            // The next steps are necessary to simulate a relation between
            // the tables, as they are just JSON files for now

            return models.TaskVolunteer.findAll().then((volunteers) => {
                for (let i = 0; i < tasks.length; i++) {
                    tasks[i].dataValues.volunteers = [];

                    for (let j = 0; j < volunteers.length; j++) {
                        if (Number(volunteers[j].idTask) === Number(tasks[i].idTask)) {
                            tasks[i].dataValues.volunteers.push({
                                idVolunteer: volunteers[j].idVolunteer
                            });
                        }
                    }
                }

                return res.send(tasks);
            });
        });
    }
];

/**
 * Add a volunteer to this task
 */
exports.addVolunteerToTask = [

    validator.idConferenceParam,
    validator.idTaskParam,
    validator.idVolunteerParam,

    (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(messages.db.requiredData.status)
                .send(messages.db.requiredData);
        }

        models.TaskVolunteer.create({
            idTask: req.params.idTask,
            idVolunteer: req.params.idVolunteer
        }).then(function (item) {
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
 * Remove a volunteer from this task
 */
exports.removeVolunteerFromTask = [

    validator.idConferenceParam,
    validator.idTaskParam,
    validator.idVolunteerParam,

    (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(messages.db.requiredData.status)
                .send(messages.db.requiredData);
        }

        models.TaskVolunteer.destroy({
            where: {
                idTask: req.params.idTask,
                idVolunteer: req.params.idVolunteer
            }
        }).then(function (item) {
            return res.status(messages.db.successInsert.status)
                .send(messages.db.successInsert);
        }).catch(function (err) {
            console.log(err);
            return res.status(messages.db.dbError.status)
                .send(messages.db.dbError);
        });
    }
];
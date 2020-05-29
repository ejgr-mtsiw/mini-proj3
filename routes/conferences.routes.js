const express = require('express');
const router = express.Router();

const conferenceController = require('../controllers/conferences/conferences.controller');

/**
 * Get all conferences
 */
router.get('/', conferenceController.getAllConferences);

/**
 * Adds a new conference
 */
router.post('/', conferenceController.addNewConference);

/**
 * Updates a conference
 */
router.put('/:idConference', conferenceController.updateConference);

/**
 * Removes a conference
 */
router.delete('/:idConference', conferenceController.deleteConference);

/**
 * Get speakers for some conference
 */
router.get('/:idConference/speakers', conferenceController.getConferenceSpeakers);

/**
 * Adds speaker to conference
 */
router.put('/:idConference/speakers/:idSpeaker', conferenceController.addSpeakerToConference);

/**
 * Removes a speaker from a conference
 */
router.delete('/:idConference/speakers/:idSpeaker', conferenceController.removeSpeakerFromConference);

/**
 * Get sponsors for some conference
 */
router.get('/:idConference/sponsors', conferenceController.getConferenceSponsors);

/**
 * Adds sponsor to conference
 */
router.put('/:idConference/sponsors/:idSponsor', conferenceController.addSponsorToConference);

/**
 * Removes a sponsor from a conference
 */
router.delete('/:idConference/sponsors/:idSponsor', conferenceController.removeSponsorFromConference);

/**
 * Obter a lista de participantes na conferência
 */
router.get('/:idConference/participants', conferenceController.getConferenceParticpants);

/**
 * Adicionar um participante à conferência
 */
router.post('/:idConference/participants/:email?', conferenceController.addParticipantToConference);

/**
 * Remover um participante da conferência
 */
router.delete('/:idConference/participants/:email', conferenceController.removeParticipantFromConference);

/**
 * Get committee members for some conference
 */
router.get('/:idConference/committee', conferenceController.getConferenceCommittee);

/**
 * Adds a committee member to conference
 */
router.put('/:idConference/committee/:idCommitteeMember', conferenceController.addCommitteeMemberToConference);

/**
 * Removes a committee member from a conference
 */
router.delete('/:idConference/committee/:idCommitteeMember', conferenceController.removeCommitteeMemberFromConference);

/**
 * Get tasks for some conference
 */
router.get('/:idConference/tasks', conferenceController.getConferenceTasks);

/**
 * Add a volunteer to this task
 */
router.put('/:idConference/tasks/:idTask/volunteers/:idVolunteer', conferenceController.addVolunteerToTask);

/**
 * Remove a volunteer from this task
 */
router.delete('/:idConference/tasks/:idTask/volunteers/:idVolunteer', conferenceController.removeVolunteerFromTask);

module.exports = router;

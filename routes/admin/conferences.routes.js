const express = require('express');
const router = express.Router();

const conferenceController = require('../../controllers/conferences/conferences.controller');

module.exports = (auth) => {

    /**
     * Get all conferences
     */
    router.get('/',
        auth.required,
        conferenceController.getAllConferences);

    /**
     * Adds a new conference
     */
    router.post('/',
        auth.required,
        conferenceController.addNewConference);

    /**
     * Updates a conference
     */
    router.put('/:idConference',
        auth.required,
        conferenceController.updateConference);

    /**
     * Removes a conference
     */
    router.delete('/:idConference',
        auth.required,
        conferenceController.deleteConference);

    /**
     * Adds speaker to conference
     */
    router.put('/:idConference/speakers/:idSpeaker',
        auth.required,
        conferenceController.addSpeakerToConference);

    /**
     * Removes a speaker from a conference
     */
    router.delete('/:idConference/speakers/:idSpeaker',
        auth.required,
        conferenceController.removeSpeakerFromConference);

    /**
     * Adds sponsor to conference
     */
    router.put('/:idConference/sponsors/:idSponsor',
        auth.required,
        conferenceController.addSponsorToConference);

    /**
     * Removes a sponsor from a conference
     */
    router.delete('/:idConference/sponsors/:idSponsor',
        auth.required,
        conferenceController.removeSponsorFromConference);

    /**
     * Obter a lista de participantes na conferência
     */
    router.get('/:idConference/participants',
        auth.required,
        conferenceController.getConferenceParticpants);

    /**
     * Remover um participante da conferência
     */
    router.delete('/:idConference/participants/:email',
        auth.required,
        conferenceController.removeParticipantFromConference);

    /**
     * Adds a committee member to conference
     */
    router.put('/:idConference/committee/:idCommitteeMember',
        auth.required,
        conferenceController.addCommitteeMemberToConference);

    /**
     * Removes a committee member from a conference
     */
    router.delete('/:idConference/committee/:idCommitteeMember',
        auth.required,
        conferenceController.removeCommitteeMemberFromConference);

    /**
     * Get tasks for some conference
     */
    router.get('/:idConference/tasks',
        auth.required,
        conferenceController.getConferenceTasks);

    /**
     * Add a volunteer to this task
     */
    router.put('/:idConference/tasks/:idTask/volunteers/:idVolunteer',
        auth.required,
        conferenceController.addVolunteerToTask);

    /**
     * Remove a volunteer from this task
     */
    router.delete('/:idConference/tasks/:idTask/volunteers/:idVolunteer',
        auth.required,
        conferenceController.removeVolunteerFromTask);

    return router;
}

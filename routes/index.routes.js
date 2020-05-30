const express = require('express');
const router = express.Router();

const homeController = require('../controllers/home.controller');
const conferenceController = require('../controllers/conferences/conferences.controller');

module.exports = (auth) => {

    /* GET home page. */
    router.get('/',
        auth.optional,
        homeController.showHomepage);

    /**
     * Get speakers for some conference (frontend)
     */
    router.get('/conferences/:idConference/speakers',
        auth.optional,
        conferenceController.getConferenceSpeakers);

    /**
     * Get sponsors for some conference
     */
    router.get('/conferences/:idConference/sponsors',
        auth.optional,
        conferenceController.getConferenceSponsors);

    /**
     * Adicionar um participante à conferência
     */
    router.post('/conferences/:idConference/participants/:email?',
        auth.optional,
        conferenceController.addParticipantToConference);

    /**
     * Get committee members for some conference
     */
    router.get('/conferences/:idConference/committee',
        auth.optional,
        conferenceController.getConferenceCommittee);

    return router;
};

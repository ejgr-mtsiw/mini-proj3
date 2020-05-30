const express = require('express');
const router = express.Router();

const speakerController = require('../../controllers/speakers/speakers.controller');

module.exports = (auth) => {

    /**
     * Get the list of speakers
     */
    router.get('/',
        auth.required,
        speakerController.getAllSpeakers);

    /**
     * Get all sponsors (admin) taggin the current conference
     */
    router.get('/conference/:idConference/',
        auth.required,
        speakerController.getSpeakersWithConference);

    /**
     * Get the list of speakers types
     */
    router.get('/types',
        auth.required,
        speakerController.getSpeakerTypes);

    /**
     * Add a new speaker
     */
    router.post('/',
        auth.required,
        speakerController.addNewSpeaker);

    /**
     * Update a speaker
     */
    router.put('/:idSpeaker',
        auth.required,
        speakerController.updateSpeaker);

    /**
     * Remove a speaker from the database
     */
    router.delete('/:idSpeaker',
        auth.required,
        speakerController.deleteSpeaker);

    return router;
}

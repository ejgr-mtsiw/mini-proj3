const express = require('express');
const router = express.Router();

const speakerController = require('../controllers/speakers/speakers.controller');

/**
 * Get the list of speakers
 */
router.get('/', speakerController.getAllSpeakers);

/**
 * Get the list of speakers types
 */
router.get('/types', speakerController.getSpeakerTypes);

/**
 * Add a new speaker
 */
router.post('/', speakerController.addNewSpeaker);

/**
 * Update a speaker
 */
router.put('/:id', speakerController.updateSpeaker);

/**
 * Remove a speaker from the database
 */
router.delete('/:id', speakerController.deleteSpeaker);

module.exports = router;

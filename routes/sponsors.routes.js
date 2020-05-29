const express = require('express');
const router = express.Router();

const sponsorController = require('../controllers/sponsors/sponsors.controller');

/**
 * Get all sponsors (admin)
 */
router.get('/', sponsorController.getAllSponsors);

/**
 * Get all sponsors (admin) taggin the current conference
 */
router.get('/sponsors/conference/:idConference/', sponsorController.getSponsorsWithConference);

/**
 * Add a new sponsor
 */
router.post('/', sponsorController.addNewSponsor);

/**
 * Update a sponsor
 */
router.put('/:idSponsor', sponsorController.updateSponsor);

/**
 * Remove a sponsor from the database
 */
router.delete('/:idSponsor', sponsorController.deleteSponsor);

module.exports = router;

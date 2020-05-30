const express = require('express');
const router = express.Router();

const sponsorController = require('../../controllers/sponsors/sponsors.controller');

module.exports = (auth) => {
    /**
     * Get all sponsors (admin)
     */
    router.get('/',
        auth.required,
        sponsorController.getAllSponsors);

    /**
     * Get all sponsors (admin) taggin the current conference
     */
    router.get('/conference/:idConference/',
        auth.required,
        sponsorController.getSponsorsWithConference);

    /**
     * Add a new sponsor
     */
    router.post('/',
        auth.required,
        sponsorController.addNewSponsor);

    /**
     * Update a sponsor
     */
    router.put('/:idSponsor',
        auth.required,
        sponsorController.updateSponsor);

    /**
     * Remove a sponsor from the database
     */
    router.delete('/:idSponsor',
        auth.required,
        sponsorController.deleteSponsor);

    return router;
}

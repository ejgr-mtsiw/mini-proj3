var express = require('express');
var router = express.Router();

const volunteerController = require('../../controllers/volunteers/volunteers.controller');

module.exports = (auth) => {
    /**
     * Get all volunteers
     */
    router.get('/',
        auth.required,
        volunteerController.getAllVolunteers);

    /**
     * Add a new volunteer to the database
     */
    router.post('/',
        auth.required,
        volunteerController.addNewVolunteer);

    /**
     * Updates a volunteer
     */
    router.put('/:idVolunteer?',
        auth.required,
        volunteerController.updateVolunteer);

    /**
     * Removes a volunteer from the database
     */
    router.delete('/:idVolunteer',
        auth.required,
        volunteerController.deleteVolunteer);

    return router;
}
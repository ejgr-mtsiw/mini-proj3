var express = require('express');
var router = express.Router();

const volunteerController = require('../controllers/volunteers/volunteers.controller');

/**
 * Get all volunteers
 */
router.get('/', volunteerController.getAllVolunteers);

/**
 * Add a new volunteer to the database
 */
router.post('/', volunteerController.addNewVolunteer);

/**
 * Updates a volunteer
 */
router.put('/:idVolunteer?', volunteerController.updateVolunteer);

/**
 * Removes a volunteer from the database
 */
router.delete('/:idVolunteer', volunteerController.deleteVolunteer);

module.exports = router;
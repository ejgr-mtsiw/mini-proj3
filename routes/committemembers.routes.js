var express = require('express');
var router = express.Router();

const committeeMemberController = require('../controllers/committemembers/committemembers.controller');

/**
 * Get all committee members
 */
router.get('/', committeeMemberController.getAllCommitteeMembers);

/**
 * Get all committee members (admin) tagging the current conference
 */
router.get('/conference/:idConference/', committeeMemberController.getAllCommitteeMembersWithConference);

/**
 * Add a new committee members to the database
 */
router.post('/', committeeMemberController.addNewCommitteeMember);

/**
 * Updates a committee members
 */
router.put('/:idCommitteeMember?', committeeMemberController.updateCommitteeMember);

/**
 * Removes a committee members from the database
 */
router.delete('/:idCommitteeMember', committeeMemberController.deleteCommitteeMember);

module.exports = router;
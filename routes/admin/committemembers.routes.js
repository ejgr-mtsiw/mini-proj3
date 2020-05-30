var express = require('express');
var router = express.Router();

const committeeMemberController = require('../../controllers/committemembers/committemembers.controller');

module.exports = (auth) => {

    /**
     * Get all committee members
     */
    router.get('/',
        auth.required,
        committeeMemberController.getAllCommitteeMembers);

    /**
     * Get all committee members (admin) tagging the current conference
     */
    router.get('/conference/:idConference/',
        auth.required,
        committeeMemberController.getAllCommitteeMembersWithConference);

    /**
     * Add a new committee members to the database
     */
    router.post('/',
        auth.required,
        committeeMemberController.addNewCommitteeMember);

    /**
     * Updates a committee members
     */
    router.put('/:idCommitteeMember?',
        auth.required,
        committeeMemberController.updateCommitteeMember);

    /**
     * Removes a committee members from the database
     */
    router.delete('/:idCommitteeMember',
        auth.required,
        committeeMemberController.deleteCommitteeMember);

    return router;
}
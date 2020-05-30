var express = require('express');
var router = express.Router();

const userController = require('../../controllers/users/users.controller');

module.exports = (auth) => {
    /* GET users listing. */
    router.get('/',
        auth.required,
        userController.getAllUsers);

    return router;
}

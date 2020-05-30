const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth.controller');

module.exports = (auth) => {

    router.post('/signin',
        auth.authenticate,
        authController.signin);

    router.get('/signout',
        auth.optional,
        authController.signout);

    return router;
};

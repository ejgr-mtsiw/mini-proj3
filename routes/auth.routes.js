const messages = require('../config/messages/login');

const express = require('express');
const router = express.Router();

module.exports = function (passport) {

    router.post('/signin',
        passport.authenticate('local'),
        function (req, res) {
            return res.status(messages.user.signinSucces.status)
                .send(messages.user.signinSucces);
        });

    return router;
};

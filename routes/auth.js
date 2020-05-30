const messages = require('../config/messages/login');

module.exports = (passport) => {

    return {
        authenticate: passport.authenticate('local'),
        required: (req, res, next) => {
            if (req.isAuthenticated() === true) {
                return next();
            } else {
                return res.status(messages.user.unauthorized.status)
                    .send(messages.user.unauthorized);
            }
        },
        optional: (req, res, next) => {
            return next();
        }
    };
}
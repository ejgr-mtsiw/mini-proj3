const models = require('../../models');

var exports = module.exports = {};

/**
 * Get all users (admin)
 */
exports.getAllUsers = (req, res) => {

    models.User.findAll()
        .then((users) => {
            res.send(users);
        });
};

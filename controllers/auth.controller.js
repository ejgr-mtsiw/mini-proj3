const messages = require('../config/messages/login');

exports = module.exports = {};

exports.signin = (req, res) => {
    return res.status(messages.user.signinSucces.status)
        .send(messages.user.signinSucces);
};

exports.signout = (req, res) => {
    req.session.destroy();
    return res.redirect('/pwa/index.html?signout=ok');
};


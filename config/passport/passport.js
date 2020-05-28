var bCrypt = require('bcryptjs');

const jsonMessages = require('../messages/login');

module.exports = function (passport, user) {
    var User = user;
    var LocalStrategy = require('passport-local').Strategy;

    passport.serializeUser(function (user, done) {
        return done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function (id, done) {
        User.findByPk(id).then(function (user) {
            if (user) {
                return done(null, user.get());
            }
            else {
                return done(user.errors, null);
            }
        });
    });

    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
        function (req, email, password, done) {
            // request object is now first argument
            const isValidPassword = function (password, hash) {
                return bCrypt.compareSync(password, hash);
            }

            // const generateHash = function (password) {
            //     return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
            // };

            User.findOne({
                where:
                {
                    'email': email
                }
            }).then((user) => {
                if (!user) {
                    return done(null, false, jsonMessages.user.email);
                }

                if (!isValidPassword(password, user.password)) {
                    return done(null, false, jsonMessages.user.password);
                }

                var userinfo = user.get();
                return done(null, userinfo);
            }).catch((err) => {
                console.error("Error:", err);
                return done(null, false, jsonMessages.user.error);
            });
        }
    ));
}

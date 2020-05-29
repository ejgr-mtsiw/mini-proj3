var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require("express-session");
var passport = require('passport');
const models = require('./models');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(session(
    {
        secret: '2 keyboard cats',
        resave: true,
        saveUninitialized: true
    }
));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session());

require('./config/passport/passport.js')(passport, models.User);

const indexRouter = require('./routes/index.routes');
const authRouter = require('./routes/auth.routes')(passport);
const usersRouter = require('./routes/users.routes');
const conferencesRouter = require('./routes/conferences.routes');
const speakersRouter = require('./routes/speakers.routes');
const sponsorsRouter = require('./routes/sponsors.routes');
const volunteersRouter = require('./routes/volunteers.routes');
const committeeRouter = require('./routes/committemembers.routes');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/', authRouter);
app.use('/users', usersRouter);
app.use('/conferences', conferencesRouter);
app.use('/speakers', speakersRouter);
app.use('/sponsors', sponsorsRouter);
app.use('/volunteers', volunteersRouter);
app.use('/committee', committeeRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;

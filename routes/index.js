const express = require('express');
const router = express.Router();

module.exports = (passport) => {

    const auth = require('./auth')(passport);

    const authRouter = require('./auth.routes')(auth);

    // frontend
    const indexRouter = require('./index.routes')(auth);

    //admin
    const committeeRouter = require('./admin/committemembers.routes')(auth);
    const conferencesRouter = require('./admin/conferences.routes')(auth);
    const speakersRouter = require('./admin/speakers.routes')(auth);
    const sponsorsRouter = require('./admin/sponsors.routes')(auth);
    const tasksRouter = require('./admin/tasks.routes')(auth);
    const usersRouter = require('./admin/users.routes')(auth);
    const volunteersRouter = require('./admin/volunteers.routes')(auth);

    router.use('/', authRouter);

    router.use('/', indexRouter);

    router.use('/committee', committeeRouter);
    router.use('/conferences', conferencesRouter);
    router.use('/speakers', speakersRouter);
    router.use('/sponsors', sponsorsRouter);
    router.use('/tasks', tasksRouter);
    router.use('/users', usersRouter);
    router.use('/volunteers', volunteersRouter);

    return router;
}
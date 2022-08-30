const express = require('express');
const app = express();
const initCorsMiddleware = require('./lib/middleware/cors');
const planetsRoutes = require('./routes/planets');
const validationErrorMiddleware =
    require('./lib/middleware/validation/index').validationErrorMiddleware;
const initSessionMiddleware = require('./lib/middleware/session');
const { passport } = require('./lib/middleware/passport');
const authRoutes = require('./routes/auth');
// const {
//     notFoundMiddleware,
//     initErrorMiddleware,
// } = require('./lib/middleware/error');

app.use(initSessionMiddleware(app.get('env')));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());

app.use(initCorsMiddleware());

app.use('/planets', planetsRoutes);
// app.use('/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('ciao mbare tutto ok')
});
app.get('/auth/login', (req, res, next) => {

    if (typeof req.query.redirectTo !== 'string' || !req.query.redirectTo) {
        res.status(400);
        return next('Missing redirectTo query string parameter');
    }

    req.session.redirectTo = req.query.redirectTo;

    res.redirect('/auth/github/login');
});

app.get(
    '/auth/github/login',
    passport.authenticate('github', {
        scope: ['user:email'],
    })

);

app.get(
    '/auth/github/callback',
    passport.authenticate('github', {
        failureRedirect: '/auth/github/login',
        keepSessionInfo: true,
    }),
    (req, res) => {
        if (typeof req.session.redirectTo !== 'string') res.status(500).end();

        res.redirect(req.session.redirectTo);
    }
);

app.get('/auth/logout', (req, res, next) => {
    if (typeof req.query.redirectTo !== 'string' || !req.query.redirectTo) {
        res.status(400);
        return next('Missing redirectTo query string parameter');
    }

    const redirectUrl = req.query.redirectTo;

    req.logout((error) => {
        if (error) next(error);

        res.redirect(redirectUrl);
    });
});


// app.use(notFoundMiddleware);
// app.use(initErrorMiddleware(app.get('env')));
// app.use(validationErrorMiddleware);

module.exports = app;
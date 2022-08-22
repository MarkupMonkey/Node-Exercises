const express = require('express');
const app = express();
const initCorsMiddleware = require('./lib/middleware/cors');
const planetsRoutes = require('./routes/planets');
const validationErrorMiddleware =
    require('./lib/middleware/validation/index').validationErrorMiddleware;

app.use(express.json());
app.use(initCorsMiddleware());
app.use('/', planetsRoutes);

app.use(validationErrorMiddleware);

module.exports = app;
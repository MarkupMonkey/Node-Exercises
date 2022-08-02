const express = require('express');
const app = express();
const prisma = require('../lib/prisma/client');
const {
    validate,
    validationErrorMiddleware,
} = require('../lib/validation/index');
const planetSchema = require('../lib/validation/planet');
app.use(express.json());
app.get('/planets', async (req, res) => {
    const planets = await prisma.planet.findMany();
    res.json(planets);
});

app.get('/planets/:id(\\d+)', async (req, res, next) => {
    const planetId = Number(req.params.id);

    const planet = await prisma.planet.findUnique({
        where: { id: planetId },
    });

    if (!planet) {
        res.status(404);
        return next(`Cannot GET /planet/${planetId}`);
    }

    res.json(planet);
});

app.post('/planets', validate({ body: planetSchema }), async (req, res) => {
    const planetData = req.body;

    const planet = await prisma.planet.create({
        data: planetData,
    });
    res.status(201).json(planet);
});

app.put(
    '/planets/:id(\\d+)',
    validate({ body: planetSchema }),
    async (req, res, next) => {
        const planetData = req.body;
        const planetId = Number(req.params.id);

        try {
            const planet = await prisma.planet.update({
                where: { id: planetId },
                data: planetData,
            });

            res.status(200).json(planet);

        } catch (err) {
            res.status(404);
            next(`Cannot PUT /planets/${planetId}`);
        }


    }
);

app.delete('/planets/:id(\\d+)', async (req, res, next) => {
    const planetId = Number(req.params.id);

    try {
        await prisma.planet.delete({
            where: { id: planetId },
        });

        res.status(204).end();

    } catch (err) {
        res.status(404);
        next(`Cannot DELETE /planets/${planetId}`);
    }

});

app.use(validationErrorMiddleware);

module.exports = app;
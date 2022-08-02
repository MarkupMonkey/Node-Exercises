require('dotenv').config();
const express = require('express');

const prisma = require('./lib/prisma/client');

const app = express();

app.get('/planets', async (req, res) => {
    const planets = await prisma.planet.findMany();

    res.json(planets);
});

app.listen(process.env.PORT, () => console.log(`server is running on port: ${process.env.PORT}`));

module.exports = app;
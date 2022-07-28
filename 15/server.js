require('dotenv').config();
const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.json({ msg: 'Here comes the sun' });
});

app.listen(process.env.PORT, () => console.log(`server is running on port: ${process.env.PORT}`));

module.exports = app;
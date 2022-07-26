require('dotenv').config();
const express = require('express');
const PORT = process.env.PORT;
const app = express();

app.get('/', (req, res) => {
    res.json({ msg: 'Here comes the sun' });
});

app.listen(PORT, () => console.log(`server running on port: ${PORT}`));

module.exports = app;
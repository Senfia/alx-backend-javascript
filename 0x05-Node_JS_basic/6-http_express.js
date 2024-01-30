// File: 6-http_express.js

const express = require('express');

const app = express();
const PORT = 1245;

app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});

module.exports = app;

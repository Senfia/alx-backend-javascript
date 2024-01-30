// File: 7-http_express.js

const express = require('express');
// const fs = require('fs').promises;
const path = require('path');
const countStudents = require('./3-read_file_async');

const app = express();
const PORT = 1245;

app.get('/', (req, res) => {
  res.send('Hello Holberton School!\n');
});

app.get('/students', async (req, res) => {
  try {
    const databasePath = path.join(__dirname, 'database.csv');
    const report = await countStudents(databasePath);
    const responseText = `This is the list of our students\n${report}`;

    res.type('text/plain');
    res.send(responseText);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});

module.exports = app;

// File: 5-http.js

const http = require('http');
const fs = require('fs').promises;
const path = require('path');

const PORT = 1245;
const HOST = 'localhost';

const countStudents = async (dataPath) => {
  try {
    const data = await fs.readFile(dataPath, 'utf-8');
    const fileLines = data.trim().split('\n');
    const studentGroups = {};
    const dbFieldNames = fileLines[0].split(',');
    const studentPropNames = dbFieldNames.slice(0, dbFieldNames.length - 1);

    for (const line of fileLines.slice(1)) {
      const studentRecord = line.split(',');
      const studentPropValues = studentRecord.slice(0, studentRecord.length - 1);
      const field = studentRecord[studentRecord.length - 1];
      if (!Object.keys(studentGroups).includes(field)) {
        studentGroups[field] = [];
      }
      const studentEntries = studentPropNames.map((propName, idx) => [
        propName, studentPropValues[idx],
      ]);
      studentGroups[field].push(Object.fromEntries(studentEntries));
    }

    const totalStudents = Object.values(studentGroups).reduce((pre, cur) => (
      pre || []).length + cur.length);

    const reportParts = [`Number of students: ${totalStudents}`];

    for (const [field, group] of Object.entries(studentGroups)) {
      reportParts.push([
        `Number of students in ${field}: ${group.length}.`,
        'List:',
        group.map((student) => student.firstname).join(', '),
      ].join(' '));
    }

    return reportParts.join('\n');
  } catch (error) {
    throw new Error('Cannot load the database');
  }
};

const app = http.createServer(async (req, res) => {
  try {
    if (req.method === 'GET') {
      if (req.url === '/') {
        // Handling the root path
        const responseText = 'Hello Holberton School!';
        res.writeHead(200, { 'Content-Type': 'text/plain', 'Content-Length': responseText.length });
        res.end(responseText);
      } else if (req.url === '/students') {
        // Handling the /students path
        const databasePath = path.join(__dirname, 'database.csv');
        const report = await countStudents(databasePath);
        const responseText = `This is the list of our students\n${report}`;

        res.writeHead(200, { 'Content-Type': 'text/plain', 'Content-Length': responseText.length });
        res.end(responseText);
      } else {
        // Handling other paths
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
      }
    } else {
      // Handling non-GET requests
      res.writeHead(405, { 'Content-Type': 'text/plain' });
      res.end('Method Not Allowed');
    }
  } catch (error) {
    console.error(error.message);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Internal Server Error');
  }
});

app.listen(PORT, HOST, () => {
  console.log(`Server is listening on http://${HOST}:${PORT}`);
});

module.exports = app;

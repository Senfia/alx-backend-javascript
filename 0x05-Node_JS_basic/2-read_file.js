// File: 2-read_file.js

const fs = require('fs').promises;

async function countStudents(path) {
  try {
    // Read the CSV file asynchronously
    const csvData = await fs.readFile(path, 'utf-8');

    const lines = csvData.trim().split('\n');
    const headers = lines.shift().split(',');

    const students = lines.map((line) => {
      const values = line.split(',');
      const student = {};
      headers.forEach((header, index) => {
        student[header.trim()] = values[index].trim();
      });
      return student;
    });

    // Filter out empty lines
    const validStudents = students.filter((student) => Object.values(student).some((field) => field !== ''));

    // Log the number of students and their details
    console.log(`Number of students: ${validStudents.length}`);
    headers.forEach((field) => {
      const fieldCount = validStudents.reduce((count, student) => count + (student[field] !== '' ? 1 : 0), 0);
      const fieldList = validStudents.map((student) => student[field]).join(', ');
      console.log(`Number of students in ${field}: ${fieldCount}. List: ${fieldList}`);
    });
  } catch (error) {
    console.error('Cannot load the database');
    throw error;
  }
}

// Export the countStudents function as a module
module.exports = countStudents;

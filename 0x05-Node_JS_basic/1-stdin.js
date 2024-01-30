// File: 1-stdin.js

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log('Welcome to Holberton School, what is your name?');

rl.on('line', (input) => {
  if (input.trim() === '') {
    console.log('Your name is: (empty input)');
  } else {
    console.log(`Your name is: ${input}`);
  }
});

rl.on('close', () => {
  console.log('\nThis important software is now closing');
});

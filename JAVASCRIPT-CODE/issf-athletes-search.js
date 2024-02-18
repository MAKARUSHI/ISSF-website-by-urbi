const mysql = require('mysql');
const readline = require('readline');

// Create a connection to the MySQL database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'MAKRUSHIsdatabase',
  database: 'YourDatabaseName' // Replace 'YourDatabaseName' with the actual name of your database
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database: ', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Prompt the user for a search query
rl.question('Enter search query: ', (query) => {
  // Perform a query
  const sql = `SELECT * FROM issf_athletes WHERE FIRST_NAME LIKE '%${query}%'`;
  connection.query(sql, (err, results, fields) => {
    if (err) {
      console.error('Error executing query: ', err);
      return;
    }
    console.log('Query results: ', results);
    // Close the connection
    connection.end((err) => {
      if (err) {
        console.error('Error closing connection: ', err);
        return;
      }
      console.log('Connection closed');
    });
    // Close readline interface
    rl.close();
  });
});

// Handle readline close event
rl.on('close', () => {
  console.log('Exiting...');
  process.exit(0);
});

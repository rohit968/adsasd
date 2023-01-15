const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  port: '3306',
  database: 'musicrest'
});

module.exports = connection;
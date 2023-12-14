// db.js
const dbConnector = require('./dbConnector');
const mysql = require('mysql2/promise');

// Call the function to set environment variables
dbConnector.getDatabasePool();

// MySQL 연결 풀 생성
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  password: process.env.DB_PW,
  waitForConnections: true,
  insecureAuth: true,
  dateStrings: "date",
  connectionLimit: 1000,
  waitForConnections: false
});

module.exports = pool;

//db.js
require('dotenv').config();

const mysql = require('mysql2/promise');

// MySQL 연결 풀 생성

  const pool = mysql.createPool({
    host:process.env.DB_HOST,
        user:process.env.DB_USER,
        port:process.env.DB_PORT,
        database:process.env.DB_NAME,
        waitForConnections:true,
        insecureAuth:true,
        dateStrings : "date",
        connectionLimit: 1000,
        waitForConnections: false
        
});

module.exports=pool;
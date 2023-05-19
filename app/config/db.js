//db
require('dotenv').config();

const mysql = require('mysql2/promise');

// MySQL 연결 풀 생성

  const pool = mysql.createPool({
    host:process.env.DB_HOST,
        user:process.env.DB_USER,
        password:process.env.DB_PW,
        port:process.env.DB_PORT,
        database:process.env.DB_NAME,
        waitForConnections:true,
        insecureAuth:true,
        dateStrings : "date",
});

module.exports=pool;
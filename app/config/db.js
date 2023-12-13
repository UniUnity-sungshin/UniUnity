require('dotenv').config();

const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host:process.env.DB_HOST,
        user:process.env.DB_USER,
        port:process.env.DB_PORT,
        database:process.env.DB_NAME,
        password:process.env.DB_PW,
        waitForConnections:true,
        insecureAuth:true,
        dateStrings : "date",
        connectionLimit: 1000,
        waitForConnections: false

  });
console.log(DB_HOST);

module.exports=pool;




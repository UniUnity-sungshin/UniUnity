//db
require('dotenv').config();

const mysql = require('mysql2/promise');
// let  = async()=>{
//     const db=mysql.createPool({
//         host:process.env.DB_HOST,
//         user:process.env.DB_USER,
//         password:process.env.DB_PW,
//         port:process.env.DB_PORT,
//         database:process.env.DB_NAME,
//         waitForConnections:true,
//         insecureAuth:true
//     });
//     const sql=`SELECT university_name from University`;
            
//     let [rows,fields]=await db.query(sql);
//     console.log(rows);

// };

// MySQL 연결 풀 생성

  const pool = mysql.createPool({
    host:process.env.DB_HOST,
        user:process.env.DB_USER,
        password:process.env.DB_PW,
        port:process.env.DB_PORT,
        database:process.env.DB_NAME,
        waitForConnections:true,
        insecureAuth:true
});

const db = {
  getConnection : (callback) => {
    pool.getConnection((err, conn) => {
      if (err) throw err;
      callback(conn);
    });
  }
}


module.exports=db;
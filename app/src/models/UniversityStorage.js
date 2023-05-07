"use strict"
const { pool } = require("../../config/db");
class UniversityStorage{

    static searchUniversityName(keyword){
        return new Promise(async(resolve,reject)=>{
            const searchTerm = `%${keyword}%`; // 패턴에 해당하는 검색어

            pool.getConnection((err,connection)=>{
                if(err){
                    console.error('MySQL 연결 오류: ',err);
                    throw err;
                }
            
                connection.query('SELECT university_name FROM University WHERE university_name LIKE ?',
                [searchTerm],
                (error, results) => {
                if (error) {
                    console.error('검색 쿼리 오류: ', error);
                    reject(error);
                }
                resolve(results);
            });
        });
    })
}
}

module.exports=UniversityStorage;
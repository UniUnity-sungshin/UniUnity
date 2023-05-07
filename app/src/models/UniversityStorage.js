"use strict"
const { pool } = require("../../config/db");
class UniversityStorage{

    static getUniversityNameList(){
        return new Promise(async(resolve,reject)=>{
           
            pool.getConnection((err,connection)=>{
                if(err){
                    console.error('MySQL 연결 오류: ',err);
                    throw err;
                }
            
            });
            pool.query("SELECT university_name,university_url FROM University;",function(err,rows,fields){
                if(err){
                    console.err('Query 오류',err);
                    throw err;
                }
                console.log(rows);
                resolve(rows);
            })        
    })
}
}

module.exports=UniversityStorage;
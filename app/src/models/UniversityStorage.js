"use strict"
const { pool } = require("../../config/db");
class UniversityStorage{

    // university_id받아 university_name반환하기
    static getUnversityName(university_id){
        return new Promise(async(resolve,reject)=>{
            const query = "SELECT university_name FROM University WHERE university_id =?;";
            pool.query(query,[university_id],(err,data)=>{
                if(err)reject(`${err}`);
                
                else {
                    resolve(data[0].university_name);
                }
            });
        })
    }

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
                resolve(rows);
            })        
    })
}
}

module.exports=UniversityStorage;
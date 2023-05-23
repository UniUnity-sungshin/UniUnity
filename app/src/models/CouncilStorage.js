"use strict"
const { pool } = require("../../config/db");

class CouncilStorage{
    static getUniversity(universityName) {
        return new Promise(async (resolve,reject)=> {
            pool.query('SELECT university_name FROM University WHERE university_url =?',[universityName],(err,data)=>{
                if(err)reject(`${err}`);
                else {               
                    //console.log(data[0]);
                    resolve(data[0]);
                }
            });
        });
    }
    // unversity_url 입력받아 university_name 보내기
    static getUniversityName(university_url){
        return new Promise(async(resolve,reject)=>{
            pool.getConnection((err,connection)=>{
                if(err){
                    console.error('MySQL 연결 오류: ',err);
                    throw err;
                }
            });
            pool.query("SELECT university_name FROM University WHERE university_url=?;",[university_url],function(err,rows){
                if(err){
                    console.err('Query 오류',err);
                    throw err;
                }
                resolve(rows[0]);
            })           
        })
    }
}

module.exports=CouncilStorage;
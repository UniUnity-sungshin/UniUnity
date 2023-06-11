"use strict"
const { pool } = require("../../config/db");

class CouncilStorage{
    // static getUniversity(universityName) {
    //     return new Promise(async (resolve,reject)=> {
    //         pool.query('SELECT university_name FROM University WHERE university_url =?',[universityName],(err,data)=>{
    //             if(err)reject(`${err}`);
    //             else {               
    //                 //console.log(data[0]);
    //                 resolve(data[0]);
    //             }
    //         });
    //     });
    // }
    // unversity_url 입력받아 university_name 보내기
    static getUniversityName(university_url){
        console.log("db-getUniversityName()");
        return new Promise(async(resolve,reject)=>{
            pool.getConnection((err,connection)=>{
                if(err){
                    console.error('MySQL 연결 오류: ',err);
                    reject(err)
                }
                pool.query("SELECT university_name FROM University WHERE university_url=?;",[university_url],function(err,rows){
                    connection.release();
                    if(err){
                        console.error('Query 함수 오류',err);
                        reject(err)
                    }
                    resolve(rows[0]);
                
            });      
             
        });
    })
}
    
    // static getImages(university_url) {
    //     return new Promise((resolve, reject) => {
    //         pool.getConnection((err,connection)=>{
    //             if(err){
    //                 console.error('MySQL 연결 오류: ',err);
    //                 throw err;
    //             }
    //         });    
    //         pool.query("SELECT pi.image_url FROM University u JOIN Post p ON u.university_id = p.university_id JOIN PostImage pi ON p.post_id = pi.post_id WHERE u.university_url = ? ORDER BY p.post_date DESC LIMIT 5;", [university_url], (error, results) => {
    //         if (error) {
    //             console.error("이미지 가져오기 오류", error);
    //             reject(error);
    //         } else {
    //             resolve(results);
    //         }
    //         });
    //     });
    // }
}

module.exports=CouncilStorage;
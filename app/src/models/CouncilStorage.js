"use strict"
const { pool } = require("../../config/db");

class CouncilStorage{
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
    // unversity_url 입력받아 university_id 반환
    static getUniversityID(university_url){
        console.log("db-getUniversityID()");
        return new Promise(async(resolve,reject)=>{
            pool.getConnection((err,connection)=>{
                if(err){
                    console.error('MySQL 연결 오류: ',err);
                    reject(err)
                }
                pool.query("SELECT university_id FROM University WHERE university_url=?;",[university_url],function(err,rows){
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
    // 카드뉴스 Image_url 반환
    static getCardNewsImageUrl(university_id){
        console.log("db-getCardNewsImageUrl()");
        return new Promise(async(resolve,reject)=>{
            pool.getConnection((err,connection)=>{
                if(err){
                    console.error('MySQL 연결 오류: ',err);
                    reject(err)
                }
                pool.query("SELECT pi.post_id, pi.image_id, pi.image_url FROM (SELECT p.university_id, p.post_id, p.category, p.post_date FROM Post p WHERE p.university_id = ? AND p.category = '총학생회 공지사항' ORDER BY p.post_date DESC LIMIT 10) AS latest_posts JOIN PostImage pi ON latest_posts.post_id = pi.post_id WHERE pi.image_id = (SELECT MIN(image_id) FROM PostImage WHERE post_id = latest_posts.post_id);",[university_id],function(err,rows){
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
}

module.exports=CouncilStorage;
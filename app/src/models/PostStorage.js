"use strict"
const { pool } = require("../../config/db");
class PostStorage{

// unversity_name 입력받아 university_id 보내기
static getUniversityID(university_name){
    return new Promise(async(resolve,reject)=>{
        pool.getConnection((err,connection)=>{
            if(err){
                console.error('MySQL 연결 오류: ',err);
                throw err;
            }
        });
        pool.query("SELECT university_id FROM University WHERE university_name=?;",[university_name],function(err,rows){
            if(err){
                console.err('Query 오류',err);
                throw err;
            }
            // console.log(rows[0].university_id);
            resolve(rows[0].university_id);
        })           
    })
}

    //최신순 포스트 리스트 불러오기
    static getPostListAll(){
        return new Promise(async(resolve,reject)=>{
           
            pool.getConnection((err,connection)=>{
                if(err){
                    console.error('MySQL 연결 오류: ',err);
                    throw err;
                }
            
            });
            const query = "SELECT post_date, post_title, post_content, view_count, like_count, comment_count, category FROM Post Where university_id =? ;";
            pool.query(query,[university_id],(err,data)=>{
                if(err)reject(`${err}`);
                else {
                    resolve(data);
                }
            });




    })
}
}

module.exports=PostStorage;
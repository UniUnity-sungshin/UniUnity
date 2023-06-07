"use strict"
const { reject } = require("underscore");
const { pool } = require("../../config/db");
class PostStorage {

    //게시글 등록하기
    static savePost(postInfo){
        return new Promise(async (resolve,reject)=>{
            pool.getConnection((err,connection)=>{
                if (err) {
                    console.error('MySQL 연결 오류: ', err);
                    throw err;
                }
            })
            const query = 'INSERT INTO Post(user_email,university_id,post_title,post_content,category) VALUES (?,?,?,?,?);' ;
            pool.query(query,
                [
                postInfo.user_email,
                postInfo.university_id,
                postInfo.post_title,
                postInfo.post_content,
                postInfo.category    
            ],
                (err)=>{
                if(err)reject({status:500,
                            err:`${err}`});
                else resolve ({status:201});
            });
        })


    }
    //post_id로 게시글 불러오기
    static getPost(post_id){
        return new Promise(async (resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    console.error('MySQL 연결 오류: ', err);
                    throw err;
                }
            });
            pool.query("SELECT * FROM Post WHERE post_id=?;", [post_id], function (err, rows) {
                if (err) {
                    console.err('Query 오류', err);
                    throw err;
                }
                resolve(rows[0]);
            })
        })

    } 

    // unversity_url 입력받아 university_id 보내기
    static getUniversityUrlToID(university_url) {
        return new Promise(async (resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    console.error('MySQL 연결 오류: ', err);
                    throw err;
                }
            });
            pool.query("SELECT university_id FROM University WHERE university_url=?;", [university_url], function (err, rows) {
                if (err) {
                    console.err('Query 오류', err);
                    throw err;
                }
                // console.log(rows[0].university_id);
                resolve(rows[0].university_id);
            })
        })
    }

    //최신순 포스트 리스트 불러오기
    static getPostListAll(university_id) {
        return new Promise(async (resolve, reject) => {

            pool.getConnection((err, connection) => {
                if (err) {
                    console.error('MySQL 연결 오류: ', err);
                    throw err;
                }

            });
            const query = "SELECT post_date, post_title, post_content, view_count, like_count, comment_count, category FROM Post Where university_id =? ;";
            pool.query(query, [university_id], (err, data) => {
                if (err) reject(`${err}`);
                else {
                    resolve(data);
                }
            });




        })
    }

    //카테고리별로 게시글 불러오기
    static getPostListbyCategory(university_id,category){
        return new Promise(async (resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    console.error('MySQL 연결 오류: ', err);
                    throw err;
                }
            });
            pool.query("SELECT * FROM Post WHERE category=? AND university_id=?;", [category,university_id], function (err, rows) {
                if (err) {
                    console.err('Query 오류', err);
                    throw err;
                }
                resolve(rows);
            })
        })

    } 

    //카테고리별 정렬
    // static getPostListbyCategory(category) {
    //     return new Promise(async (resolve, reject) => {

    //         pool.getConnection((err, connection) => {
    //             if (err) {
    //                 console.error('MySQL 연결 오류: ', err);
    //                 throw err;
    //             }

    //         });
    //         const query = "SELECT post_date, post_title, post_content, view_count, like_count, comment_count, category FROM Post Where university_id =? ;";
    //         pool.query(query, [university_id], (err, data) => {
    //             if (err) reject(`${err}`);
    //             else {
    //                 resolve(data);
    //             }
    //         });
    //     })
    // }
}


module.exports = PostStorage;
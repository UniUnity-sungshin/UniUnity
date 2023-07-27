"use strict"
// const { reject } = require("underscore");
const { pool } = require("../../config/db");
class CommentStorage {
    //commnet_id 랜덤생성 (1)

    

    //댓글 등록하기
    static saveComment(commentInfo) {
        return new Promise(async (resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    console.error('MySQL 연결 오류: ', err);
                    reject(err)
                }

                // const commentID=randomCommentID();//(2)
                const query = 'INSERT INTO Comment(comment_id,user_email,post_id,comment_content) VALUES (?,?,?,?);';
                pool.query(query,
                    [
                        commentInfo.comment_id,
                        commentInfo.user_email,
                        commentInfo.post_id,
                        commentInfo.comment_content,
                    ],
                    (err) => {
                        pool.releaseConnection(connection);
                        if (err) reject({
                            status: 500,
                            err: `${err}`
                        });//,comment:this.getComment(comment_id)
                        else resolve({ status: 201 });
                    });
            })
        })
    }

        //comment_id로 댓글 불러오기
        static getComment(comment_id) { //(4)
            return new Promise(async (resolve, reject) => {
                pool.getConnection((err, connection) => {
                    if (err) {
                        console.error('MySQL 연결 오류: ', err);
                        reject(err)
                    }
                    pool.query("SELECT * FROM Comment WHERE comment_id=?;", [comment_id], function (err, rows) {
                        pool.releaseConnection(connection);
                        if (err) {
                            console.error('Query 함수 오류',err);
                            reject(err)
                        }
                        resolve(rows[0]);
                    })
                })
            });
    
        }

        static getCommentListbyPostID(post_id) {
            return new Promise(async (resolve, reject) => {
                pool.getConnection((err, connection) => {
                    if (err) {
                        console.error('MySQL 연결 오류: ', err);
                        reject(err)
                    }
    
                    pool.query("SELECT * FROM Comment WHERE post_id=?;", [post_id], function (err, rows) {
                        pool.releaseConnection(connection);
                        if (err) {
                            console.error('Query 함수 오류',err);
                            reject(err)
                        }
                        resolve(rows);
                    })
                })
            });
    
        }
    //댓글 최신순불러오기
    static getCommentListAll(comment_id) {//post_Id
        return new Promise(async (resolve, reject) => {

            pool.getConnection((err, connection) => {
                if (err) {
                    console.error('MySQL 연결 오류: ', err);
                    reject(err)
                }


                const query = "SELECT * FROM Comment Where comment_id =?;"; //post_id
                pool.query(query, [comment_id], (err, data) => {
                    pool.releaseConnection(connection);
                    if (err) {
                        reject(`${err}`);
                     } else {
                        resolve(data);
                    }
                });

            });




        });
    }

}

module.exports = CommentStorage;
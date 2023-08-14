"use strict"
// const { reject } = require("underscore");
const { pool } = require("../../config/db");
class CommentStorage {



    static saveComment(commentInfo) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    console.error('MySQL 연결 오류: ', err);
                    reject(err);
                    return;
                }

                const query = 'INSERT INTO Comment(comment_id, user_email, post_id, comment_content) VALUES (?, ?, ?, ?);';
                // const updateQuery = 'UPDATE Post SET comment_count = comment_count + 1 WHERE post_id = ?';

                connection.query(query, [commentInfo.comment_id, commentInfo.user_email, commentInfo.post_id, commentInfo.comment_content], (err) => {
                    if (err) {
                        pool.releaseConnection(connection);
                        console.error('INSERT Query 함수 오류', err);
                        reject({ status: 500, err: `${err}` });
                        return;
                    }

                    // 업데이트 쿼리 실행
                    // connection.query(updateQuery, [commentInfo.post_id], (err) => {
                    //     pool.releaseConnection(connection);
                    //     if (err) {
                    //         console.error('UPDATE Query 함수 오류', err);
                    //         reject({ status: 500, err: `${err}` });
                    //         return;
                    //     }

                    //     resolve({ status: 201 });
                //});
                });
            });
        });
    }


    //댓글 등록하기(원래 등록api)
    // static saveComment(commentInfo) {
    //     return new Promise(async (resolve, reject) => {
    //         pool.getConnection((err, connection) => {
    //             if (err) {
    //                 console.error('MySQL 연결 오류: ', err);
    //                 reject(err)
    //             }


    //             const query = 'INSERT INTO Comment(comment_id,user_email,post_id,comment_content) VALUES (?,?,?,?);';
    //             pool.query(query,
    //                 [
    //                     commentInfo.comment_id,
    //                     commentInfo.user_email,
    //                     commentInfo.post_id,
    //                     commentInfo.comment_content,
    //                 ],
    //                 (err) => {
    //                     pool.releaseConnection(connection);
    //                     if (err) reject({
    //                         status: 500,
    //                         err: `${err}`
    //                     });//,comment:this.getComment(comment_id)
    //                     else resolve({ status: 201 });
    //                 });

    //         })
    //     })
    // }

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
                        console.error('Query 함수 오류', err);
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
                        console.error('Query 함수 오류', err);
                        reject(err)
                    }
                    resolve(rows);
                })
            })
        });

    }
    //댓글 불러오기(등록순)
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

    //댓글 삭제하기
    static goDeleteComment(user_email, comment_id) {
        return new Promise(async (resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    console.error('MySQL 연결 오류: ', err);
                    reject(err);
                }

                const query = 'DELETE FROM Comment WHERE user_email = ? AND commnet_id =?';
                // const updateQuery = 'UPDATE Post SET comment_count = comment_count - 1 WHERE post_id = ?';

                pool.query(query, [user_email, comment_id], (err, result) => {
                    pool.releaseConnection(connection);
                    if (err) {
                        reject({
                            result: false,
                            status: 500,
                            err: `${err}`
                        });
                    } else {
                        if (result.affectedRows > 0) {
                            resolve({
                                result: true,
                                status: 200
                            });
                        } else {
                            reject({
                                result: false,
                                status: 404,
                                err: '댓글을 찾을 수 없거나 삭제 권한이 없습니다.'
                            });
                        }
                    }
                });
                // 업데이트 쿼리 실행
    //             connection.query(updateQuery, [commentInfo.post_id], (err) => {
    //                 pool.releaseConnection(connection);
    //                 if (err) {
    //                     console.error('UPDATE Query 함수 오류', err);
    //                     reject({ status: 500, err: `${err}` });
    //                     return;
    //                 }

    //                 resolve({ status: 201 });
    //             });
    //         });
    //     });
    // }
            });
        });
    }
    


    // 마이페이지) user_email에 해당하는 사용자의 하트 목록 보여주기
    static getUserHeartList(userInfo) {
        const user_email = userInfo.user_email;
        return new Promise(async (resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    console.error('MySQL 연결 오류: ', err);
                    reject(err)
                }
                pool.query("SELECT * FROM Post WHERE post_id IN (SELECT post_id FROM Heart WHERE user_email=?);", [user_email], function (err, rows) {
                    if (err) {
                        console.error('Query 함수 오류', err);
                        reject(err)
                    }
                    else if (rows.length < 1) {
                        pool.releaseConnection(connection);
                        resolve({ result: "현재 나의 좋아요 게시글이 없습니다. 게시글에 좋아요를 눌러보세요 :)", status: 202 });
                    }
                    pool.releaseConnection(connection);
                    resolve({ result: rows, status: 200 });
                })
            })
        });
    }

    // 마이페이지) 특정 user_email 과 post_id에 해당하는 heart_id가 존재하는지 확인
    static checkHeart(heartInfo) {
        const post_id = heartInfo.post_id;
        const user_email = heartInfo.user_email;
        return new Promise(async (resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    console.error('MySQL 연결 오류: ', err);
                    reject(err)
                }
                pool.query("SELECT heart_id FROM Heart WHERE user_email=? AND post_id=?;", [user_email, post_id], function (err, rows) {
                    if (err) {
                        console.error('Query 함수 오류', err);
                        reject(err)
                    }
                    else if (rows.length < 1) {
                        pool.releaseConnection(connection);
                        resolve({ result: false, status: 200 });
                    }
                    pool.releaseConnection(connection);
                    resolve({ result: rows[0], status: 200 });
                })
            })
        });
    }

    // 마이페이지) Heart 테이블에 정보 삭제
    static deleteHeart(heart_id) {
        return new Promise(async (resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    console.error('MySQL 연결 오류: ', err);
                    reject(err)
                }
                pool.query("SELECT * FROM Heart WHERE heart_id=?;", [heart_id], function (err, check) {
                    if (err) {
                        console.error('Query 함수 오류', err);
                        reject(err)
                    }
                    else if (check.length < 1) {
                        pool.releaseConnection(connection);
                        resolve({ result: "This 'heart_id' does not exist in the 'Heart' table.", status: 202 });
                    }
                    pool.query("DELETE FROM Heart WHERE heart_id=?;", [heart_id], function (err, rows) {
                        if (err) {
                            console.error('Query 함수 오류', err);
                            reject(err)
                        }
                        // 해당 게시글 like_count 감소
                        pool.query("UPDATE Post SET like_count=like_count-1 WHERE post_id=?;", [check[0].post_id], function (err) {
                            pool.releaseConnection(connection);
                            if (err) {
                                console.error('Query 함수 오류', err);
                                reject(err)
                            }
                        })
                        resolve({ result: rows, status: 200 });
                    })
                })
            })
        });
    }



    //댓글 개수 받아오기
    static postCommentNum(post_id) {
        return new Promise(async (resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    console.error('MySQL 연결 오류: ', err);
                    reject(err)
                }
                pool.query("SELECT COUNT(*) FROM Comment WHERE post_id=?;", [post_id], function (err, rows) {
                    pool.releaseConnection(connection);
                    if (err) {
                        console.error('Query 함수 오류', err);
                        reject(err)
                    }
                    resolve({ result: rows[0], status: 200 });
                })
            })
        });
    }

}

module.exports = CommentStorage;
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
                function getCurrentDateTime() {
                    const now = new Date();
                    const offset = 9 * 60; // 9시간을 분 단위로 변환
                    const localTime = now.getTime() + now.getTimezoneOffset() * 60 * 1000; // 로컬 시간을 밀리초 단위로 변환
                    const seoulTime = new Date(localTime + offset * 60 * 1000); // 서울 시간 계산
                    const year = seoulTime.getFullYear();
                    const month = String(seoulTime.getMonth() + 1).padStart(2, '0');
                    const day = String(seoulTime.getDate()).padStart(2, '0');
                    const hours = String(seoulTime.getHours()).padStart(2, '0');
                    const minutes = String(seoulTime.getMinutes()).padStart(2, '0');
                    const seconds = String(seoulTime.getSeconds()).padStart(2, '0');
                    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
                }
                // 현재 시간을 YYYY-MM-DD HH:MM:SS 형식으로 포맷팅
                const formattedDateTime = getCurrentDateTime();
            
                const query = 'INSERT INTO Comment(user_email, post_id, comment_content, comment_date) VALUES ( ?, ?, ?, ?);';
                // const updateQuery = 'UPDATE Post SET comment_count = comment_count + 1 WHERE post_id = ?';

                connection.query(query, [ commentInfo.user_email, commentInfo.post_id, commentInfo.comment_content, formattedDateTime], (err) => {
                    if (err) {
                        pool.releaseConnection(connection);
                        console.error('INSERT Query 함수 오류', err);
                        reject({ result:false, status: 500, err: `${err}` });

                    }
                    else resolve({ result:true, status: 201 });
                });
            });
        });
    }

    static updatePostCommentCount(post_id){
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    console.error('MySQL 연결 오류: ', err);
                    reject(err);
                    return;
                }

                const query = 'UPDATE Post SET comment_count = comment_count + 1 WHERE post_id = ?';

                connection.query(query, [ post_id], (err) => {
                    if (err) {
                        pool.releaseConnection(connection);
                        console.error('INSERT Query 함수 오류', err);
                        reject({ result:false, err: `${err}` });

                    }
                    else resolve({ result:true});
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

                pool.query("select comment_content,like_count_comment,post_id,comment_date,comment_id,user_nickname,user.user_email from Comment comm LEFT JOIN User user ON comm.user_email=user.user_email where post_id=?;", [post_id], function (err, rows) {
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

    //댓글 삭제하기!!!
    static goDeleteComment(user_email, comment_id) {
        return new Promise(async (resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    console.error('MySQL 연결 오류: ', err);
                    reject(err);
                }

                const query = 'DELETE FROM Comment WHERE user_email = ? AND comment_id =?';

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

            });
        });
    }

    static reducePostCommentCount(post_id){
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    console.error('MySQL 연결 오류: ', err);
                    reject(err);
                    return;
                }

                const query = 'UPDATE Post SET comment_count = comment_count - 1 WHERE post_id = ?';

                connection.query(query, [ post_id], (err) => {
                    if (err) {
                        pool.releaseConnection(connection);
                        console.error('INSERT Query 함수 오류', err);
                        reject({ result:false, err: `${err}` });

                    }
                    else resolve({ result:true});
                });
            });
        });

    }

    static commentWriter(comment_id) {
        return new Promise((resolve, reject) => {
          pool.getConnection((err, connection) => {
            if (err) {
              console.error('MySQL 연결 오류: ', err);
              reject(err);
            }
            pool.query("SELECT user_email FROM Comment WHERE comment_id = ?;", [comment_id], function (err, rows) {
              pool.releaseConnection(connection);
              if (err) {
                console.error('Query 함수 오류', err);
                reject(err);
              }
              resolve(rows[0]);
            });
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
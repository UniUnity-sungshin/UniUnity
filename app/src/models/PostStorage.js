"use strict"
const { reject } = require("underscore");
const { pool } = require("../../config/db");
class PostStorage {

    //게시글 등록하기
    static savePost(postInfo) {
        return new Promise(async (resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    console.error('MySQL 연결 오류: ', err);
                    reject(err)
                }


                const query = 'INSERT INTO Post(user_email,university_id,post_title,post_content,category) VALUES (?,?,?,?,?);';
                pool.query(query,
                    [
                        postInfo.user_email,
                        postInfo.university_id,
                        postInfo.post_title,
                        postInfo.post_content,
                        postInfo.category
                    ],
                    (err) => {
                        pool.releaseConnection(connection);
                        if (err) reject({
                            result: false,
                            status: 500,
                            err: `${err}`
                        });
                        else resolve({ 
                            result : true,
                            status: 201 });
                    });
            })
        })
    }
    //post_id로 게시글 불러오기
    static getPost(post_id) {
        return new Promise(async (resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    console.error('MySQL 연결 오류: ', err);
                    reject(err)
                }
                pool.query("SELECT * FROM Post WHERE post_id=?;", [post_id], function (err, rows) {
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

    // unversity_url 입력받아 university_id 보내기
    static getUniversityUrlToID(university_url) {
        return new Promise(async (resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    console.error('MySQL 연결 오류: ', err);
                    reject(err)
                }

                pool.query("SELECT university_id FROM University WHERE university_url=?;", [university_url], function (err, rows) {
                    pool.releaseConnection(connection);
                    if (err) {
                        console.error('Query 함수 오류',err);
                        reject(err)
                    }
                    // console.log(rows[0].university_id);
                    resolve(rows[0].university_id);
                })
            })

        });
    }

    //최신순 포스트 리스트 불러오기
    static getPostListAll(university_id, page = 1, pageSize = 10) {
        return new Promise(async (resolve, reject) => {
            const offset = (page - 1) * pageSize;

            pool.getConnection((err, connection) => {
                if (err) {
                    console.error('MySQL 연결 오류: ', err);
                    reject(err)
                }


                const query= "SELECT * FROM Post WHERE university_id = ? ORDER BY post_id DESC";
                pool.query(query, [university_id], (err, data) => {
                    pool.releaseConnection(connection);
                    if (err) reject(`${err}`);
                    else {
                        resolve(data);
                    }
                });

                

            });


        })
    }

    //카테고리별로 게시글 불러오기
    static getPostListbyCategory(university_id, category) {
        return new Promise(async (resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    console.error('MySQL 연결 오류: ', err);
                    reject(err)
                }

                pool.query("SELECT * FROM Post WHERE category=? AND university_id=?;", [category, university_id], function (err, rows) {
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

    // 게시글 검색
    static async searchPost(keyword){ 
        return new Promise(async(resolve,reject)=>{
            pool.getConnection((err,connection)=>{
                if(err){
                    console.error('MySQL 연결 오류: ',err);
                    reject(err);
                }
                var k = '%' + keyword + '%';
                pool.query("SELECT * FROM Post WHERE post_title LIKE ?;",[k],function(err,rows){
                    connection.release();
                    if(err){
                        console.error('Query 오류',err);
                        reject(err);
                    }
                    resolve(rows);
                })
            });
        })    
    }

      //마이페이지-내가 작성한 게시글 보기
      static getMyPost(userInfo) {
        const user_email=userInfo.user_email;
        console.log("getMyPost",userInfo);
        return new Promise(async (resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    console.error('MySQL 연결 오류: ', err);
                    reject(err)
                }

                pool.query("SELECT * FROM Post WHERE user_email=?;", [user_email], function (err, rows) {
                    pool.releaseConnection(connection);
                    if (err) {
                        console.error('Query 함수 오류',err);
                        reject(err)
                    }
                    resolve({result:rows,status:200});
                })
            })
        });


    }

    //내가 작성한 게시글 삭제하기
    static goDeletePost(post_id, user_email) {
  return new Promise(async (resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        console.error('MySQL 연결 오류: ', err);
        reject(err);
      }

      const query = 'DELETE FROM Post WHERE post_id = ? AND user_email = ?';
      pool.query(query, [post_id, user_email], (err, result) => {
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
              err: '게시글을 찾을 수 없거나 삭제 권한이 없습니다.'
            });
          }
        }
      });
    });
  });
}


  // 게시글 조회수 증가
  static async getIncreaseReadCount(post_id,read_count) {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) {
          console.error('MySQL 연결 오류: ', err);
          reject({
            result: false,
            status: 500,
            err: `${err}`
          });
        }

        const query = 'UPDATE Post SET read_count = read_count + 1 WHERE post_id = ?';
        pool.query(query, [post_id, read_count], (err, result) => {
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
                err: '게시글을 찾을 수 없습니다.'
              });
            }
          }
        });
      });
    });
  }
    }


module.exports = PostStorage;
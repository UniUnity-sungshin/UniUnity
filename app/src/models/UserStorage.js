"use strict"
const { pool } = require("../../config/db");
class UserStorage {
    //id를 통해 유저 정보 갖고 오기
    static getUserInfo(user_email) {
        return new Promise(async (resolve, reject) => {
            const query = "SELECT * FROM User WHERE user_email =?;";
            pool.query(query, [user_email], (err, data) => {
                if (err) reject(`${err}`);
                else {
                    resolve(data[0]);
                }
            });
        });

    }
    //회원가입
    static save(userInfo) {
        return new Promise(async (resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    console.error('MySQL 연결 오류: ', err);
                    reject(err)
                }
                const query = "INSERT INTO User(user_email,user_name,psword,user_type,user_nickname,university_id,user_marketing) VALUES (?,?,?,?,?,?,?);";
                pool.query(query, [
                    userInfo.user_email,
                    userInfo.user_name,
                    userInfo.psword,
                    userInfo.user_type,
                    userInfo.user_nickname,
                    userInfo.university_id,
                    userInfo.user_marketing
                ],
                    (err) => {
                        pool.releaseConnection(connection);
                        if (err) reject({
                            result: false,
                            status: 500,
                            err: `${err}`
                        });
                        else resolve({ result: true, status: 201 });
                    })
            });

        });



    }
    //닉네임 변경
    static updateNickname(userInfo) {
        return new Promise(async (resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    console.error('MySQL 연결 오류: ', err);
                    reject(err)
                }
                const query = "UPDATE User SET user_nickname=? WHERE user_email=?;";
                pool.query(query, [
                    userInfo.user_nickname,
                    userInfo.user_email
                ],
                    (err) => {
                        pool.releaseConnection(connection);
                        if (err) reject({
                            result: false,
                            status: 500,
                            err: `deleteErr: ${err}`
                        });
                        else resolve({ result: true, status: 200 });
                    })
            });

        });

    }

    //비밀번호 변경
    static updatePsword(userInfo) {
        return new Promise(async (resolve, reject) => {
            console.log(userInfo)
            pool.getConnection((err, connection) => {
                if (err) {
                    console.error('MySQL 연결 오류: ', err);
                    reject(err)
                }

                const query = "UPDATE User SET psword=? WHERE user_email=?;";

                pool.query(query, [
                    userInfo.new_psword,
                    userInfo.user_email
                ],
                    (err) => {
                        pool.releaseConnection(connection);
                        if (err) reject({
                            result: false,
                            status: 500,
                            err: `${err}`
                        });
                        else resolve({ result: true, status: 200 });
                    })
            });

        });

    }
    //회원 탈퇴
    static deleteUser(userInfo) {
        return new Promise(async (resolve, reject) => {

            pool.getConnection((err, connection) => {
                if (err) {
                    console.error('MySQL 연결 오류: ', err);
                    reject(err)
                }
                //1. User테이블에서 회원 삭제
                const query = "DELETE FROM User WHERE user_email=?;";

                pool.query(query, [
                    userInfo.user_email
                ],
                    (err) => {
                        pool.releaseConnection(connection);
                        if (err) reject({
                            result: false,
                            status: 500,
                            err: `${err}`
                        });
                        else return;
                    })
            });
            var count = 0;
            pool.getConnection((err, connection) => {
                if (err) {
                    console.error('MySQL 연결 오류: ', err);
                    reject(err)
                }
                // 2. withdrawalUser 테이블에서 주어진 user_email에 해당하는 레코드 확인
                const checkQuery = `SELECT COUNT(*) AS count FROM WithdrawalUser WHERE user_email = ?`;

                pool.query(checkQuery, [
                    userInfo.user_email
                ],
                    (err, data) => {
                        pool.releaseConnection(connection);
                        if (err) reject({
                            result: false,
                            status: 500,
                            err: `${err}`
                        });
                        else {
                            count = data[0].count;

                            if (count > 0) {
                                pool.getConnection((err, connection) => {
                                    if (err) {
                                        console.error('MySQL 연결 오류: ', err);
                                        reject(err)
                                    }
                                    // 3. user_email이 존재하는 경우 해당 레코드의 withdrawal_num 값을 1 증가시킴
                                    const updateQuery = `UPDATE WithdrawalUser SET withdrawal_num = withdrawal_num + 1 WHERE user_email = ?`;

                                    pool.query(updateQuery, [
                                        userInfo.user_email
                                    ],
                                        (err) => {
                                            pool.releaseConnection(connection);
                                            if (err) reject({
                                                result: false,
                                                status: 500,
                                                err: `updateErr: ${err}`
                                            });
                                            else resolve({ result: true, status: 200 });
                                        })
                                });

                            } else {
                                pool.getConnection((err, connection) => {
                                    if (err) {
                                        console.error('MySQL 연결 오류: ', err);
                                        reject(err)
                                    }
                                    // 4. user_email이 존재하지 않는 경우 새로운 레코드를 삽입
                                    const insertQuery = `INSERT INTO WithdrawalUser (user_email, withdrawal_num) VALUES (?, 1)`;

                                    pool.query(insertQuery, [
                                        userInfo.user_email
                                    ],
                                        (err) => {
                                            pool.releaseConnection(connection);
                                            if (err) reject({
                                                result: false,
                                                status: 500,
                                                err: `insertErr: ${err}`
                                            });
                                            else resolve({ result: true, status: 200 });
                                        })
                                });
                            }



                        }
                    })
            });


        });

    }
}
module.exports = UserStorage;
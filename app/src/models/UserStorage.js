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
            const query = "INSERT INTO User(user_email,user_name,psword,user_type,user_nickname,university_id) VALUES (?,?,?,?,?,?);";
            pool.query(query,
                [userInfo.user_email,
                userInfo.user_name,
                userInfo.psword,
                userInfo.user_type,
                userInfo.user_nickname,
                userInfo.university_id],
                (err) => {
                    if (err) reject({
                        result:false,
                        status: 500,
                        err: `${err}`
                    });
                    else resolve({ result:true,status: 201 });
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
                            result:false,
                            status: 500,
                            err: `${err}`
                        });
                        else resolve({ result:true, status: 200 });
                    })
            });

        });

    }

    //비밀번호 변경
    static updatePsword(userInfo) {
        return new Promise(async (resolve, reject) => {

            pool.getConnection((err, connection) => {
                if (err) {
                    console.error('MySQL 연결 오류: ', err);
                    reject(err)
                }

                const query = "UPDATE User SET psword=? WHERE user_email=?;";

                console.log("update:",userInfo.new_psword)

                console.log("update:",userInfo.user_email)
                pool.query(query, [
                    userInfo.new_psword,
                    userInfo.user_email
                ],
                    (err) => {
                        pool.releaseConnection(connection);
                        if (err) reject({
                            result:false,
                            status: 500,
                            err: `${err}`
                        });
                        else resolve({ result:true, status: 200 });
                    })
            });

        });

    }
    //회원 탈퇴

}
module.exports = UserStorage;
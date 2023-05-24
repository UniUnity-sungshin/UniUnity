"use strict"
const { pool } = require("../../config/db");
class UserStorage{
    //id를 통해 유저 정보 갖고 오기
    static getUserInfo(client_email) {
        return new Promise(async (resolve,reject)=>{
            const query = "SELECT * FROM User WHERE user_email =?;";
            pool.query(query,[client_email],(err,data)=>{
                if(err)reject(`${err}`);
                
                else {
                    resolve(data[0]);
                }
            });
        });
        
    }
    //회원가입
    static save(userInfo) {
        console.log(userInfo)
        return new Promise(async (resolve,reject)=>{
            const query = "INSERT INTO User(user_email,user_name,psword,user_type,user_nickname,university_id) VALUES (?,?,?,?,?,?);" ;
            pool.query(query,
                [userInfo.user_email,
                    userInfo.user_name,
                    userInfo.psword,
                    userInfo.user_type,
                    userInfo.user_nickname,
                    userInfo.university_id],
                (err)=>{
                if(err)reject(`${err}`);
                else resolve ({success:true});
            });
        
        });
    }
    

}
module.exports=UserStorage;
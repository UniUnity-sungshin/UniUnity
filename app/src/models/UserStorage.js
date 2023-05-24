"use strict"
const { pool } = require("../../config/db");
class UserStorage{
    static getUserInfo(id) {
        return new Promise(async (resolve,reject)=>{
            const query = "SELECT * FROM User WHERE user_email =?;";
            pool.query(query,[id],(err,data)=>{
                if(err)reject(`${err}`);
                
                else {
                    resolve(data[0]);
                }
            });
        });
        
    }

    static save(userInfo) {
        console.log(userInfo)
        return new Promise(async (resolve,reject)=>{
            console.log(userInfo.psword.length);
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
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

    // static async save(userInfo) {
    //     return new Promise((resolve,reject)=>{
    //         const query = "INSERT INTO users(id,name,psword) VALUES(?,?,?);" ;
    //         pool.query(query,
    //             [userInfo.id,userInfo.name,userInfo.psword],
    //             (err)=>{
    //             if(err)reject(`${err}`);
    //             else resolve ({success:true});
    //         });
    //     });
    // }
    

}
module.exports=UserStorage;
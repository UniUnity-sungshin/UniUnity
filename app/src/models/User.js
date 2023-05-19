"use strict";

const passport =require('passport');
const LocalStrategy=require('passport-local').Strategy;

const UserStorage=require("./UserStorage");
class User{
    constructor(body){
        this.body=body;
    } 

    async getUserInfo(user_email){
        console.log("user_email=",user_email);
        const userInfo =await UserStorage.getUserInfo(user_email);
        if(userInfo){
            console.log(userInfo);
            return {loginStatus: true, 
                    user_email:userInfo.user_email,
                    psword : userInfo.psword,
                    user_type:userInfo.user_type,
                    user_name:userInfo.user_name,
                    university_id:userInfo.university_id
            };
        }
        return {loginStatus:false,msg:"존재하지 않는 아이디 입니다."}
        
        
    }


    // register(){
    //     const client = this.body;
    //     const response = UserStorage.save(client);
    //     return response;
    // }


}

module.exports=User
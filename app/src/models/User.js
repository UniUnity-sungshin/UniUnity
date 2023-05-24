"use strict";

const passport =require('passport');
const University = require('./University');
const LocalStrategy=require('passport-local').Strategy;

const UserStorage=require("./UserStorage");
class User{
    constructor(body){
        this.body=body;
    } 
    //user_email을 통해 user정보 갖고오기 
    async getUserInfo(user_email){
        console.log("user_email=",user_email);
        const userInfo =await UserStorage.getUserInfo(user_email);
        if(userInfo){
            const university=new University();
            return {loginStatus: true, 
                    user_email:userInfo.user_email,
                    psword : userInfo.psword,
                    user_type:userInfo.user_type,
                    user_name:userInfo.user_name,
                    user_nickname:userInfo.user_nickname,
                    //university_id가 아닌 university_name으로 반환해줌
                    university_name:await university.getUnversityIdToName(userInfo.university_id)
            };
        }
        return {loginStatus:false,msg:"존재하지 않는 이메일입니다."}
        
        
    }

    //회원가입 
    async register(){
        const client = this.body;
        const response = await UserStorage.save(client);
        return response;
    }


}

module.exports=User
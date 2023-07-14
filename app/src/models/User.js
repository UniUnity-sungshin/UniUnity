"use strict";

const passport =require('passport');
const University = require('./University');
const LocalStrategy=require('passport-local').Strategy;

const UserStorage=require("./UserStorage");
class User{
    constructor(body){
        this.body=body;
    } 

    //client_email 통해 user정보 갖고오기 
    async getUserInfo(client_email){
        const userInfo =await UserStorage.getUserInfo(client_email);
        if(userInfo){
            const university=new University();
            return {loginStatus: true, 
                    user_email:userInfo.user_email,
                    psword : userInfo.psword,
                    user_type:userInfo.user_type,
                    user_name:userInfo.user_name,
                    user_nickname:userInfo.user_nickname,
                    university_id:userInfo.university_id,
                    university_url:await university.getUnversityIdToUrl(userInfo.university_id),
                    //university_id가 아닌 university_name으로 반환해줌
                    university_name:await university.getUnversityIdToName(userInfo.university_id)
            };
        }
        return {loginStatus:false}
    }

    //회원가입 
    async register(){
        const client = this.body;
        const response = await UserStorage.save(client);
        return response;
    }
    //닉네임 변경
    async modifyNickname(){
        const client = this.body;
        const response = await UserStorage.updateNickname(client);
        return response;
    }
    //비밀번호 변경
    async modifyPsword(){
        const client = this.body;
        const response = await UserStorage.updatePsword(client);
        return response;
    }
    //회원 탈퇴
    async withdrawalUser(){
        const client = this.body;
        const response = await UserStorage.deleteUser(client);
        return response;
    }


}

module.exports=User
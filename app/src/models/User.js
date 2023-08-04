"use strict";

const passport =require('passport');
const University = require('./University');
const LocalStrategy=require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const UserStorage=require("./UserStorage");
const { response } = require('express');
class User{
    constructor(body){
        this.body=body;
    } 

    //client_email 통해 user정보 갖고오기 
    async getUserInfo(client_email){
        try{
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
        }catch(err){
            return {
                result:false,
                status: 400,
                err:err};
        }
    }

    //회원가입 
    async register(){
        try{
            const client = this.body;
            console.log(client);
            const response = await UserStorage.save(client);
            return response;
        }catch(err){
            return {
                result:false,
                status: 400,
                err:err};
        }
       
    }
    //닉네임 변경
    async modifyNickname(){
        try{
            const client = this.body;
            const response = await UserStorage.updateNickname(client);
            return response;
        }catch(err){
            return {
                result:false,
                status: 400,
                err:err};
        }
       
    }
    //비밀번호 변경
    async modifyPsword(){
        try{
            const client = this.body;
            console.log(client)
            let userInfo=await UserStorage.getUserInfo(client.user_email);
           
            if(await bcrypt.compare(client.psword,userInfo.psword)){
                const response = await UserStorage.updatePsword(client);
                return response;
            }else{
                return {
                    result:false,
                    status: 400,
                    err: `비밀번호가 틀렸습니다.`
                }
            }
        }catch(err){
            return {
                result:false,
                status: 400,
                err:err};
        }
       
    }
    //회원 탈퇴
    async withdrawalUser(){
        try{
            const client = this.body;
            let userInfo=await UserStorage.getUserInfo(client.user_email);
       
            if(await bcrypt.compare(client.psword,userInfo.psword)){
                const response = await UserStorage.deleteUser(client);
                return response;
            }else{
                return {
                    result:false,
                    status: 400,
                    err: `비밀번호가 틀렸습니다.`
                }
            }
        }catch(err){
            console.log(err);
            return {
                result:false,
                status: 400,
                err:`${err}`
            };
        }
       
    }


}

module.exports=User
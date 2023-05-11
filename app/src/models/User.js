"use strict";

const passport =require('passport');
const LocalStrategy=require('passport-local').Strategy;

const UserStorage=require("./UserStorage");
class User{
    constructor(body){
        this.body=body;
    }

    async login(){
        const client =this.body
        console.log(this.body);
        const userInfo =await UserStorage.getUserInfo(client.user_email);
        if(userInfo){
            let user_email=userInfo.user_email
            let psword=userInfo.psword

            if(user_email===client.user_email && psword ===  client.psword){
                return {success : true};
            }
            return {success:false,msg:"비밀번호가 틀렸습니다."};
        }
        return {success:false,msg:"존재하지 않는 아이디입니다."};
    }


    register(){
        const client = this.body;
        const response = UserStorage.save(client);
        return response;
    }


}

module.exports=User
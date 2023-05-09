"use strict";

const passport =require('passport');
const LocalStrategy=require('passport-local').Strategy;

const UserStorage=require("./UserStorage");
class User{
    constructor(body){
        this.body=body;
    }

    login(){
        const client =this.body
        console.log(this.body);
        const {email,psword}=UserStorage.getUserInfo(client.user_email);
        console.log(email,psword);
        if(email){
            if(email===client.user_email && psword ===  client.psword){
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
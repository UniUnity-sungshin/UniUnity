"use strict"

const University = require("../models/University");
const User =require("../models/User");
const output ={
    home : (req,res)=>{
        res.render('home/mainpage.html');
    },
    login : (req,res)=>{
        res.render('home/login.html');
    },
    signup : (req,res)=>{
        res.render('home/signup.html');
    },
    partner:(req,res)=>{
            res.render("home/partner.html");
    }
}


const process={
    //로그인 인증 process
    login:async (req,res)=>{
        console.log("1",req.body);
        const user= new User(req.body);
        const response=await user.login();
        console.log("login response:",response);
        return res.json(response);
    },
    register:(req,res)=>{
        const user= new User(req.body);
        const response=user.register();
        return res.json(response);
    },
    showUniversityNameList:async(req,res)=>{
        const university_name=new University();
        const response=await university_name.showUniversityNameList();
        return res.json(response);
    },
    
};

module.exports={
    output,
    process,
};
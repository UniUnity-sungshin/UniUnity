"use strict"

const University = require("../models/University");
const User =require("../models/User");
// const Partner = require("../models/Partner");

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
    showUniversityNameList:async(req,res)=>{
        const university_name=new University();
        const response=await university_name.showUniversityNameList();
        return res.json(response);

    },
    partner:(req,res)=>{
        res.render("home/partner.html");
    },
    // partnerUni:(req,res)=>{
    //     res.render('/partner/:university.html');
    // },
}

//로그인 인증 process
const process={
    login:async (req,res)=>{
        console.log(req);
        console.log(req.body);
        const user= new User(req.body);
        const response=await user.login();
        const url ={
            method:"POST",
            path:"/login",
            status: response.arr?400:200,
        };
        return res.status(url.status).json(response);
    },
    register:(req,res)=>{
        const user= new User(req.body);
        const response=user.register();
        return res.json(response);
    },
    
};

module.exports={
    output,
    process,
};
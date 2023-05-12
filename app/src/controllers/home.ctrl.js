"use strict"

const University = require("../models/University");
const User =require("../models/User");
const Council=require("../models/Council");

const output ={
    home : (req,res)=>{
        res.render('home/mainpage.html');
    },
    signin : (req,res)=>{
        res.render('home/signin.html');
    },
    signup : (req,res)=>{
        res.render('home/signup.html');
    },
    council : (req,res)=>{
        console.log("output 함수");
        res.render('council/council.ejs');
    },
    searchUniversityName:async(req,res)=>{
        const university_name=new University();
        const response=await university_name.searchUniversity(req.params.keyword);
        return res.json(response);
    }
}

//로그인 인증 process
const process={
    login:(req,res)=>{
        const user= new User(req.body);
        const response=user.login();
        return res.json(response);
    },
    register:(req,res)=>{
        const user= new User(req.body);
        const response=user.register();
        return res.json(response);
    },
};

//council 페이지 라우팅
const result = {
    council : (req, res) => {
        console.log("result 함수");
        console.log(req.params.universityname);
        const council = new Council();
        const response=council.showUniversity(req.params.universityname);
        res.render("council/council.ejs", response);
        //return res.json(response);
    }
    
}

module.exports={
    output,
    process,
    result
};
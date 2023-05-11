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
        console.log("홈 컨트롤러 파일" + req.params.universityname);
        const council = new Council();
        const response=council.showUniversity(req.params.universityname);
        console.log("홈 컨트롤러 council.showUniversity 됨");
        console.log(response);
        return res.json(response);

        res.render("council/council.ejs");
    },
    // council : (req, res) => {
    //     let uni= req.params.universityName;
    //     res.render("council/council.ejs");
    // },
    storemap : (req, res) => {
        res.render("council/storeMap.ejs");
    },
    
    affiliationmap : (req, res) => {
        res.render("council/affiliationMap.ejs");
    },
    
    mypage : (req, res) => {
        res.render("council//myPage.ejs");
    },
    
    morenews : (req, res) => {
        res.render("council/moreNews.ejs");
    },
    
    morestore : (req, res) => {
        res.render("council/moreStore.ejs");
    },
    
    moreschool : (req, res) => {
        res.render("council/moreSchool.ejs");
    },
    
    mainnews : (req, res) => {
        res.render("council/mainNews.ejs");
    }
    
}

module.exports={
    output,
    process,
    result
};
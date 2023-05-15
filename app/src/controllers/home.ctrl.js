"use strict"

const Partner = require("../models/Partner");
const University = require("../models/University");
const User =require("../models/User");
const Council=require("../models/Council");

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
    post:(req,res)=>{
        res.render('home/post.html');
    },
    partner:(req,res)=>{
        res.render("home/partner.html");
    },
}

//로그인 인증 process
const process={
    login:async (req,res)=>{
        const user= new User(req.body);
        const response=await user.login();
        return res.json(response);
    },
    register:(req,res)=>{
        const user= new User(req.body);
        const response=user.register();
        return res.json(response);
    },
};

//제휴 파트
const partner = {
    getUniversityID:async(req,res)=>{
        const partner_uni = new Partner();
        const response = await partner_uni.getUniversityID(req.params.university_name);
        return res.json(response);
    },
    getPartnerUni: async(req,res)=>{
        const partner_uni = new Partner();
        const university_id = await partner_uni.getUniversityID(req.body.university_name);
        const response = await partner_uni.getPartnerStores(parseInt(university_id));
        return res.json(response);
    },
};

//council 페이지 라우팅
const result = {
    council :async (req, res) => {
        console.log(req.params.universityname);
        const council = new Council();
        const response=await council.showUniversity(req.params.universityname);
        console.log(response);
        res.render("council/council.ejs", {data: response});
        
        //return res.json(response);
    }
}
   
module.exports={
    output,
    process,
    result,
    partner
};
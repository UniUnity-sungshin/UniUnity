"use strict"

const Partner = require("../models/Partner");
const University = require("../models/University");
const User =require("../models/User");

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
    showUniversityNameList:async(req,res)=>{
        const university_name=new University();
        const response=await university_name.showUniversityNameList();
        return res.json(response);
    },
    partner:(req,res)=>{
        res.render("home/partner.html");
    },
    getUniversityID:async(req,res)=>{
        const partner_uni = new Partner();
        const response = await partner_uni.getUniversityID(req.params.university_name);
        return res.json(response);
    },
    getPartnerUni: async(req,res)=>{
        const partner_uni = new Partner();
        const university_id = await partner_uni.getUniversityID(req.params.university_name);
        const response = await partner_uni.getPartnerStores(parseInt(university_id));
        return res.json(response);
    },
    partnerUni:async(req,res)=>{
        res.render("home/partner.html");
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

module.exports={
    output,
    process,
};
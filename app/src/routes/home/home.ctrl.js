"use strict"

const User =require("../../models/User");
// const Retailer = require("../../models/Retailer");

const output ={
    home : (req,res)=>{
        res.render("home/index");
    },
    
    login : (req,res)=>{
        res.render("home/login");
    },
    register:(req,res)=>{
        res.render("home/register");
    },
    retailer:(req,res)=>{
        res.render("home/retailer");
    },
    partner:(req,res)=>{
        res.render("home/partner");
    },
    partnerUni:(req,res)=>{
        res.render('/partner/:university');
    },
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
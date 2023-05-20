"use strict"

const Partner = require("../models/Partner");
const Retailer = require("../models/Retailer");
const University = require("../models/University");
const User =require("../models/User");
const Council=require("../models/Council");
const Post=require("../models/Post");
const request = require('request');
// const Auth=require("../lib/auth");
// const auth = require("../lib/auth");

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
    mypage:(req,res)=>{
        res.render('home/mypage.html');
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
    //회원가입
    register:(req,res)=>{
        const user= new User(req.body);
        const response=user.register();
        return res.json(response);
    },
    //로그인 상태
    loginStatus:(req,res)=>{
        if(req.user){
            return res.json(req.user);
        }
        return res.json({loginStatus:false})
    },
    //로그아웃
    logout:(req,res,next)=>{
        req.logout(function(err) {
            if (err) { return next(err); }
            res.redirect('/');
          });
       
    }

};

//제휴 파트
const partner = {
    getUniversityID:async(req,res)=>{
        const partner_uni = new Partner();
        const response = await partner_uni.getUniversityID(req.params.university_name);
        return res.json(response);
    },
    getUniversityLocation: async(req,res)=>{
        const partner_uni = new Partner();
        const university_id = await partner_uni.getUniversityID(req.body.university_name);
        const response = await partner_uni.getUniversityLocation(university_id);
        return res.json(response);
    },
    getPartnerUni: async(req,res)=>{
        const partner_uni = new Partner();
        const university_id = await partner_uni.getUniversityID(req.body.university_name);
        const response = await partner_uni.getPartnerStores(university_id);
        return res.json(response);
    },
};

// 소상공인 파트
const retailer = {
    retailer: async(req,res)=>{
        // const serviceKey = 'p0%2BHQGnCYhn4J%2BB0BJpY5cOD0thCQ29az7PS9MQ4gLwPqbZrSns3eFy4VZ%2BUSc95PAkZUjK%2FGiir%2FcMk1FAq4A%3D%3D';
        // var url = `http://apis.data.go.kr/B553077/api/open/sdsc2/storeListInRectangle?serviceKey=${serviceKey}&pageNo=1&numOfRows=10&minx=${minx}'&miny=${miny}&maxx=${maxx}&maxy=${maxy}&type=json`
        // request(test, function(error, response, body){
        //     if(error){
        //         console.log(error)
        //     }
        //     let obj = JSON.parse(body);
        //     // 콘솔에 찍어보기
        //     console.log(obj.body.items[0].trarNo);
        // })
        res.render("home/retailer.html")
    }
}

//council 페이지 라우팅
const result = {
    council : async (req, res) => {
        console.log(req.params.universityname);
        const council = new Council();
        const response=await council.showUniversity(req.params.universityname);
        console.log(response);
        res.render("council/council.html", {data: response});
        //return response;
    }
}

const post={
    postAll : async (req, res) => {
        console.log(req.params.university_name);
        let university_name=req.params.university_name;
        const post = new Post();
        const response=await post.showPostListAll(university_name);
        console.log(response);
        return res.json(response);
    }
}

   
module.exports={
    output,
    process,
    result,
    partner,
    post,
    retailer
};
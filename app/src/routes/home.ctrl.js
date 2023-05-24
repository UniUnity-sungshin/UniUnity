"use strict"

const Partner = require("../models/Partner");
const Retailer = require("../models/Retailer");
const User =require("../models/User");
const Council=require("../models/Council");
const Post=require("../models/Post");
const University = require("../models/University");

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
        const university_url = req.params.university_url;
        res.render("home/partner.html", {data:university_url});
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
    loginStatus:async (req,res)=>{
        console.log(req.user);
        const user =new User();
        //const university=new University();
        let userInfo=await user.getUserInfo(req.user);
        //let university_name=await university.getUnversityIdToName(userInfo.university_id);
        if(req.user){
            return res.json({loginStatus:true,
                user_email:userInfo.user_email,
                user_name:userInfo.user_name,
                user_type:userInfo.user_type,
                university_name:userInfo.university_name
                });
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
        const partner = new Partner();
        const response = await partner.getUniversityID(req.params.university_name);
        return res.json(response);
    },
    getPartnerUni: async(req,res)=>{
        const partner = new Partner();
        const university_id = await partner.getUniversityID(req.body.university_name);
        const response = await partner.getPartnerStores(university_id);
        return res.json(response);
    },
    getUniversityLocation: async(req,res)=>{
        const partner = new Partner();
        const university_id = await partner.getUniversityID(req.body.university_name);
        const response = await partner.getUniversityLocation(university_id);
        return res.json(response);
    },
    getPartner: async(req,res) => {
        const partner = new Partner();
        const response = await partner.showUniversity(req.body.university_url);
        const university_name = response.university_name;
        const university_id = await partner.getUniversityID(university_name);
        const university_location = await partner.getUniversityLocation(university_id);
        const university_uni = await partner.getPartnerStores(university_id);
        const obj = [];
        obj.push({latitudeUni: university_location.latitude, longitudeUni: university_location.longitude});
        for(let i = 0; i < university_uni.length; i++){
            obj.push(university_uni[i]);
        }
        return res.json(obj);
    },
};

// 소상공인 파트
const retailer = {
    retailer: async(req,res)=>{
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
        console.log(req.params.university_url);
        let university_url=req.params.university_url;
        const post = new Post();
        const response=await post.showPostListAll(university_url);
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
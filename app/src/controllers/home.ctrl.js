"use strict"

const Partner = require("../models/Partner");
const Retailer = require("../models/Retailer");
const User = require("../models/User");
const Council = require("../models/Council");
const Post = require("../models/Post");
const University = require("../models/University");
const sendEmailWithAuthorization = require("../../mailer");
const bcrypt = require('bcrypt');

const output = {
    home: (req, res) => {
        res.render('home/mainpage.html');
    },
    login: (req, res) => {
        res.render('home/login.html');
    },
    signup: (req, res) => {
        res.render('home/signup.html');
    },
    mypage: (req, res) => {
        res.render('home/mypage.html');
    },
    showUniversityNameList: async (req, res) => {
        const university_name = new University();
        const response = await university_name.showUniversityNameList();
        return res.json(response);
    },
    post: (req, res) => {
        res.render('post/post.html');
    },
    postform: (req, res) => {
        res.render('post/postform.html');
    },
    postviewer:(req,res)=>{
        res.render('post/postviewer.html');
    },

    partner: (req, res) => {
        res.render("store/partner.html");
    },
    partnerForm: (req, res) => {
        res.render("store/uploadTest.html");
    },
}

//로그인 인증 process
const process = {

    //회원가입
    register: async(req, res) => {
        
            console.log(req.body);
            const hashedPassword=await bcrypt.hash(req.body.psword,10)
            const user=new User({
                user_email:req.body.user_email,
                psword:hashedPassword,
                user_name:req.body.user_name,
                user_type:req.body.user_type,
                user_nickname:req.body.user_nickname,
                university_id:req.body.university_id
            });
            const response = await user.register();
            console.log("registerrouter응답:",response);
            return res.json(response)
          
    },
    //로그인 상태
    loginStatus: async (req, res) => {

        const user = new User();
        let userInfo = await user.getUserInfo(req.user);
        console.log(userInfo);
        if (req.user) {
            return res.json({
                loginStatus: true,
                user_email: userInfo.user_email,
                user_name: userInfo.user_name,
                user_type: userInfo.user_type,
                user_nickname: userInfo.user_nickname,
                university_name: userInfo.university_name,
                university_id:userInfo.university_id,
                university_url:userInfo.university_url

            });
        }
        return res.json(userInfo)
    },
    //로그아웃
    logout: (req, res, next) => {
        req.logout(function (err) {
            if (err) { return next(err); }
            res.redirect('/');
        });

    },
    //이메일 인증
    emailAuth: (req, res)=>{
        const emailAdderess=req.body.email;
        console.log(emailAdderess)
        sendEmailWithAuthorization(emailAdderess)
            .then((authentication_code) => {
                console.log('Authentication code:', authentication_code);
                return res.json({
                    "status":201,
                    "authentication_code":authentication_code})
            })
            .catch((err) => {
                console.error('An error occurred:', err);
                return res.json({
                    "status":500,
                    "err":err}
                );
            });
    },

};

//제휴 파트
const partner = {
    getUniversityID: async (req, res) => {
        const partner = new Partner();
        const response = await partner.getUniversityID(req.params.university_url);
        return res.json(response);
    },
    getPartnerUni: async (req, res) => {
        const partner = new Partner();
        const university_id = await partner.getUniversityID(req.body.university_url);
        const response = await partner.getPartnerStores(university_id);
        return res.json(response);
    },
    getUniversityLocation: async (req, res) => {
        const partner = new Partner();
        const university_id = await partner.getUniversityID(req.body.university_url);
        const response = await partner.getUniversityLocation(university_id);
        return res.json(response);
    },
    getPartner: async (req, res) => {
        const partner = new Partner();
        const response = await partner.showUniversity(req.body.university_url);
        const university_id = await partner.getUniversityID(req.body.university_url);
        const university_location = await partner.getUniversityLocation(university_id);
        const university_uni = await partner.getPartnerStores(university_id);
        const obj = [];
        obj.push({ latitudeUni: university_location.latitude, longitudeUni: university_location.longitude });
        for (let i = 0; i < university_uni.length; i++) {
            obj.push(university_uni[i]);
        }
        return res.json(obj);
    },
    getUniversityID_name:async(req,res)=>{
        const partner = new Partner();
        const response = await partner.getUniversityID(req.params.university_url);
        return res.json(response);
    },
    uploadPartnerStore: async(req,res) => {
        const partner = new Partner();
        const storeName = req.body.storeName,
              store_location = req.body.store_location,
              latitude = req.body.latitude,
              longitude = req.body.longitude,
              content = req.body.content,
              startDate = req.body.startDate,
              endDate = req.body.endDate;
        const university_id = await partner.getUniversityID(req.body.university_url);
        const response = await partner.uploadPartnerStore(storeName, store_location, latitude, longitude, university_id, content, startDate, endDate);
        return res.json(response);
    }
};

// 소상공인 파트
const retailer = {
    retailer: async (req, res) => {
        res.render("store/retailer.html")
    },
}

//council 페이지
const result = {
    council : async (req, res) => {
        // console.log(req.params.universityname);
        // const council = new Council();
        // const response=await council.showUniversity(req.params.universityname);
        // console.log(response.university_name);
        // const response = await council.getUserName();
        //console.log(response);
        res.render("council/council.html");
    },

    getUniversityName: async (req, res) => {
        const council = new Council();
        const response = await council.getUniversityName(req.body.university_url);
        return res.json(response);
    },

    post : async(req, res)  => {
        res.render("home/post.html");
    },
    
    getImages : async (req, res) => {
        const council = new Council();
        const response = await council.getImages(req.body.university_id);
        return res.json(response);
    }
}

const post = {

    uploadPost:async(req,res)=>{
        const post =new Post(req.body);
        const response= await post.createPost();
        return res.json(response);
    },

    postAll: async (req, res) => {
        console.log(req.params.university_url);

        let university_url = req.params.university_url;
        const post = new Post();
        const response = await post.showPostListAll(university_url);
        console.log(response);
        return res.json(response);
    }
}


module.exports = {
    output,
    process,
    result,
    partner,
    post,
    retailer
};
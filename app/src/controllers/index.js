"use strict"

const express =require("express");
const router = express.Router();

const ctrl = require("./home.ctrl");

router.get("/",ctrl.output.home);
router.get("/login",ctrl.output.login);
router.get("/loginStatus",ctrl.process.loginStatus);
router.get("/signup",ctrl.output.signup);
router.get("/logout",ctrl.process.logout);
router.get("/mypage",ctrl.output.mypage);

//메일 인증
router.post("/auth/email",ctrl.process.emailAuth);
router.post("/register",ctrl.process.register);

// council 라우터
router.get("/council/:universityname",ctrl.result.council);
router.get("/post/:universityname",ctrl.output.post);
router.post("/getUniversityName", ctrl.result.getUniversityName);
router.post("/getImages", ctrl.result.getImages);

//
router.get("/showUniversityNameList/:university_name",ctrl.output.showUniversityNameList);
router.get("/showUniversityNameList",ctrl.output.showUniversityNameList);


// partner 라우터
router.get("/partner/:university_url",ctrl.output.partner);
router.get("/getUniversityID/:university_url",ctrl.partner.getUniversityID);
router.post("/getPartner",ctrl.partner.getPartner);
router.post("/getPartnerUni",ctrl.partner.getPartnerUni);
router.post("/getUniversityLocation",ctrl.partner.getUniversityLocation);
router.post("/uploadPartner",ctrl.partner.uploadPartnerStore);

router.get("/partnerUpdate/:university_url",ctrl.output.partnerForm);

// retailer 라우터
router.get("/retailer/:university_url",ctrl.retailer.retailer);

// router.post("/login",ctrl.process.login);
//council 페이지 라우팅
// router.get("/sungshin\", ctrl.result.council);

//post 라우터
router.get("/:university_url/postAll",ctrl.post.postAll);
router.get("/postform/:university_url",ctrl.output.postform);
router.get("/postviewer/:post_id",ctrl.output.postviewer);
router.get("/showPost/:post_id",ctrl.post.showPost);
router.post("/uploadPost",ctrl.post.uploadPost);
router.get("/showPostListbyCategory/:category/:university_url",ctrl.post.showPostListbyCategory);

//router.get("/sungshin/postAll",ctrl.output.post);

module.exports=router;



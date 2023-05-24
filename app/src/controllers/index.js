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

// council 라우터
router.get("/council/:universityname",ctrl.result.council);
router.get("/post",ctrl.result.post);

router.get("/showUniversityNameList/:university_name",ctrl.output.showUniversityNameList);
router.get("/showUniversityNameList",ctrl.output.showUniversityNameList);

router.post("/getUniversityName", ctrl.result.getUniversityName);
// partner 라우터
router.get("/partner/:university_url",ctrl.output.partner);
router.get("/getUniversityID/:university_url",ctrl.partner.getUniversityID);
router.post("/getPartner",ctrl.partner.getPartner);
router.post("/getPartnerUni",ctrl.partner.getPartnerUni);
router.post("/getUniversityLocation",ctrl.partner.getUniversityLocation);

// retailer 라우터
router.get("/retailer/:university_url",ctrl.retailer.retailer);

// router.post("/login",ctrl.process.login);
//council 페이지 라우팅
// router.get("/sungshin\", ctrl.result.council);

//post 라우터
router.get("/:university_url/postAll",ctrl.post.postAll);


//router.get("/sungshin/postAll",ctrl.output.post);

module.exports=router;




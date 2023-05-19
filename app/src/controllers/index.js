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
//council 페이지 라우트
router.get("/council/:universityname",ctrl.result.council);

router.get("/showUniversityNameList/:university_name",ctrl.output.showUniversityNameList);
router.get("/showUniversityNameList",ctrl.output.showUniversityNameList);

// partner 라우터
router.get("/partner",ctrl.output.partner);
router.get("/getUniversityID/:university_name",ctrl.partner.getUniversityID);
router.post("/getPartnerUni",ctrl.partner.getPartnerUni);
router.get("/getUniversityLocation/:university_id",ctrl.partner.getUniversityLocation);

// router.post("/login",ctrl.process.login);
//council 페이지 라우팅
// router.get("/sungshin\", ctrl.result.council);

//post 라우터
router.get("/:university_name/postAll",ctrl.post.postAll);


//router.get("/sungshin/postAll",ctrl.output.post);

module.exports=router;




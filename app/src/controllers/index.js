"use strict"

const express =require("express");
const router = express.Router();

const ctrl = require("./home.ctrl");

router.get("/",ctrl.output.home);
router.get("/login",ctrl.output.login);
router.get("/signup",ctrl.output.signup);
router.get("/showUniversityNameList/:university_name",ctrl.output.showUniversityNameList);
router.get("/:universityname",ctrl.output.council);
router.get("/council/:universityname",ctrl.result.council);
router.get("/sungshin/postAll",ctrl.output.post);
router.get("/showUniversityNameList",ctrl.output.showUniversityNameList);

// 제휴
router.get("/partner/:university_name",ctrl.output.partner);
router.get("/getUniversityID/:university_name",ctrl.partner.getUniversityID);
router.post("/getPartnerUni",ctrl.partner.getPartnerUni);


router.post("/login",ctrl.process.login);
//council 페이지 라우팅
// router.get("/sungshin\", ctrl.result.council);

module.exports=router;




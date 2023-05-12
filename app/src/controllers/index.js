"use strict"

const express =require("express");
const router = express.Router();

const ctrl = require("./home.ctrl");

router.get("/",ctrl.output.home);
router.get("/login",ctrl.output.login);
router.get("/signup",ctrl.output.signup);
<<<<<<< HEAD

//council 페이지 라우트
router.get("/council/:universityname",ctrl.result.council);
//router.get("/:universityname",ctrl.output.council);

=======
router.get("/showUniversityNameList/:university_name",ctrl.output.showUniversityNameList);
router.get("/:universityname",ctrl.output.council);
router.get("/council/:universityname",ctrl.result.council);
router.get("/sungshin/postAll",ctrl.output.post);
router.get("/showUniversityNameList",ctrl.output.showUniversityNameList);
>>>>>>> 0e5dfe0e6ac60f80969e3901c0442dd7b3658ac7

// 제휴
router.get("/partner/:university_name",ctrl.output.partner);
router.get("/getUniversityID/:university_name",ctrl.partner.getUniversityID);
router.post("/getPartnerUni",ctrl.partner.getPartnerUni);

<<<<<<< HEAD
=======

router.post("/login",ctrl.process.login);
//council 페이지 라우팅
// router.get("/sungshin\", ctrl.result.council);
>>>>>>> 0e5dfe0e6ac60f80969e3901c0442dd7b3658ac7

module.exports=router;




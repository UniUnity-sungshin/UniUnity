"use strict"

const express =require("express");
const router = express.Router();

const ctrl = require("./home.ctrl");

router.get("/",ctrl.output.home);
router.get("/login",ctrl.output.login);
router.get("/signup",ctrl.output.signup);
router.get("/showUniversityNameList",ctrl.output.showUniversityNameList);
router.get("/:universityname",ctrl.output.council);
router.get("/council/:universityname",ctrl.result.council);


router.post("/login",ctrl.process.login);
//council 페이지 라우팅
// router.get("/sungshin\", ctrl.result.council);

module.exports=router;




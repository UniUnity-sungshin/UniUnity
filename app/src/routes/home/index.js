"use strict"

const express =require("express");
const router = express.Router();

const ctrl = require("./home.ctrl");


router.get("/",ctrl.output.home);
router.get("/login",ctrl.output.login);
router.get("/register",ctrl.output.register);
router.get("/retailer",ctrl.output.retailer);
router.get("/partner",ctrl.output.partner);
router.get("/partner/:university",ctrl.output.partnerUni);

//council 페이지 라우팅
router.get("/sungshin", ctrl.result.council);
router.get("/sungshin/storeMap", ctrl.result.storemap);
router.get("/sungshin/affiliationMap", ctrl.result.affiliationmap);
router.get("/sungshin/myPage", ctrl.result.mypage);
router.get("/sungshin/moreNews", ctrl.result.morenews);
router.get("/sungshin/moreStore", ctrl.result.morestore);
router.get("/sungshin/moreSchool", ctrl.result.moreschool);
router.get("/sungshin/mainNews", ctrl.result.mainnews);

module.exports=router;
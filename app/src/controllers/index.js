"use strict"

const express =require("express");
const router = express.Router();

const ctrl = require("./home.ctrl");


router.get("/",ctrl.output.home);
router.get("/signin",ctrl.output.signin);
router.get("/signup",ctrl.output.signup);
router.get("/partner",ctrl.output.partner);
router.get("/getUniversityID/:university_name",ctrl.output.getUniversityID);
router.get("/getPartnerUni/:university_name",ctrl.output.getPartnerUni);
router.get("/partnerUni/:university_name",ctrl.output.partnerUni);

router.get("/showUniversityNameList",ctrl.output.showUniversityNameList);

module.exports=router;
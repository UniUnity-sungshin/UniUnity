"use strict"

const express =require("express");
const router = express.Router();

const ctrl = require("./home.ctrl");


router.get("/",ctrl.output.home);
router.get("/login",ctrl.output.login);
router.get("/register",ctrl.output.register);
router.get("/retailer",ctrl.output.retailer);
router.get("/partner",ctrl.output.partner);
// router.get("/partner/:university",ctrl.output.partnerUni);

router.post("/login",ctrl.process.login);
router.post("/register",ctrl.process.register);

module.exports=router;
"use strict"

const express =require("express");
const router = express.Router();

const ctrl = require("./home.ctrl");


router.get("/",ctrl.output.home);
router.get("/login",ctrl.output.login);
router.get("/signup",ctrl.output.signup);
router.get("/showUniversityNameList",ctrl.output.showUniversityNameList);


router.post("/login",ctrl.process.login);
// router.post('/login',
//   passport.authenticate('local', { failureRedirect: '/login', failureMessage: true }),
//   function(req, res) {
//     res.redirect('/' + req.user.universirty_id);
//   });

module.exports=router;
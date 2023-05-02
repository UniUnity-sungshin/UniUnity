"use strict"

// 모듈
const express = require("express");
const bodyParser =require("body-parser");
const app = express();

// 라우팅
const controllers = require("./src/controllers");
const errorController=require("./src/controllers/errorController");
//db
const uniunity_db = require("./config/db");

// 앱 셋팅
app.set("views","./src/views");
app.set("view engine","ejs");


app.use(express.static(`${__dirname}/src/public`));
app.use(bodyParser.json());
//URL을 통해 전달되는 데이터에 한글, 공백 등과 같은 문자가 포함될 경우 제대로 인식되지 않는 문제 해결
app.use(bodyParser.urlencoded({extended:true}));
app.use("/",controllers); //use -> 미들 웨어를 등록해주는 메서드

//에러처리를 위한 미들웨어 생성
app.use(errorController.logErrors);
app.use(errorController.respondNoResourceFound);
app.use(errorController.respondInternalEroor);


uniunity_db();

module.exports =app;
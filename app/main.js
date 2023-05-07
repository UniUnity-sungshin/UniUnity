"use strict"

// 모듈
const express = require("express");
const bodyParser =require("body-parser");
const app = express();

// 라우팅
const controllers = require("./src/controllers/index");
const errorController=require("./src/controllers/errorController");
//db
const uniunity_db = require("./config/db");

// 앱 셋팅
// 서버가 읽을 수 있도록 HTML 의 위치를 정의해줍니다.
app.set("views","./src/views");
// 서버가 HTML 렌더링을 할 때, EJS엔진을 사용하도록 설정합니다.
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

// 스타일(CSS) 적용하기
app.use(express.static(`${__dirname}/src/public`));
app.use(bodyParser.json());
//URL을 통해 전달되는 데이터에 한글, 공백 등과 같은 문자가 포함될 경우 제대로 인식되지 않는 문제 해결
app.use(bodyParser.urlencoded({extended:true}));
app.use("/",controllers); //use -> 미들 웨어를 등록해주는 메서드

//에러처리를 위한 미들웨어 생성
// app.use(errorController.logErrors);
// app.use(errorController.respondNoResourceFound);
// app.use(errorController.respondInternalEroor);

app.use(controllers);

module.exports =app;
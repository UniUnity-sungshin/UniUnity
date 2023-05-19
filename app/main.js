"use strict"

// 모듈
const express = require("express");
const bodyParser = require("body-parser");
// const passport = require("passport");
const app = express();
const pool = require('./config/db');
// 라우팅
const controllers = require("./src/controllers/index");
const errorController = require("./src/controllers/errorController");
const { delimiter } = require("ejs");

//세션이용
var session = require('express-session')
//세션을 파일에 저장
var FileStore = require('session-file-store')(session)

// 앱 셋팅
// 서버가 읽을 수 있도록 HTML 의 위치를 정의해줍니다.
app.set("views", "./src/views");
// 서버가 HTML 렌더링을 할 때, EJS엔진을 사용하도록 설정합니다.
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.set('view options', { delimiter: '<% %>' });

// 스타일(CSS) 적용하기
app.use(express.static(`${__dirname}/src/public`));
app.use(bodyParser.json());
//URL을 통해 전달되는 데이터에 한글, 공백 등과 같은 문자가 포함될 경우 제대로 인식되지 않는 문제 해결

app.use(bodyParser.urlencoded({ extended: true }));



//세션 사용
app.use(session({
  secret: 'asadlfkj!@#!@#dfgasdg',
  resave: false,
  saveUninitialized: true,
  store: new FileStore()
}))

//passport는 세션으로 내부적으로 사용하기 때문에 express-session을 활성화 시키는 코드 다음에 등장해야한다.!!
var passport = require('passport');
var LocalStrategy = require('passport-local');

const User = require("./src/models/User");

//passport를 설치한 것이고 express가 호출이 될 때마다 passport.initalize가 호출되면서 우리의 app에 개입됨
app.use(passport.initialize()); //passport미들웨어 등록
app.use(passport.session()); //passport가 내부적으로 세션 미들웨어를 쓰겠다.



app.post('/login', passport.authenticate('local', {
  successRedirect: '/',       //성공했을 때는 home으로
  failureRedirect: '/login' //실패했을 때는 다시 로그인 페이지로
}));

let userInfo;
//passport.js를 이용한 로그인 기능 구현
passport.use(new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'pwd'
  },
  async function (username, password, done) {
    console.log('LocalStrategy', username, password);

    let user=new User();
    userInfo=await user.getUserInfo(username);

    if(userInfo.loginStatus==true){
      if(username ===userInfo.user_email){
        console.log(1);
        if(password === userInfo.psword){
          console.log(2);
          return done(null,userInfo);
        }else{
          return done(null,false,{
            message:'Incorrect password.'
          })
        }
      }else{
        console.log(4);
        return done(null,false,{
          message:'Incorrect username.'
        })
      }
    }
    else{
      return done(null,false,{
        message: userInfo.msg
      })
    }
  }))
  


//세션을 처리하는 방법
passport.serializeUser(function (user, done) {
  console.log("serlialize입니다.");
  done(null, user.user_email);//두번째 인자에 user의 식별자를 넣어주기로 !약속!되어 있음
  //세션폴더의 세션 데이터 파일에 user의 식별자가 들어감
})

//로그인이 되면 페이지를 방문할 때마다 deserializeUser의 콜백이 호출하기로 약속 되어있음
//호출될때마다 사용자의 데이터를 저장하고 있는 authData에 들어있는 사용자의 실제데이터를 가져온다.
passport.deserializeUser(function (id, done) {
  console.log("deserialize입니당");
  done(null, userInfo);
  // User.findByID(id,function(err,user){
  //   done(err,user);
  // })
})


app.use("/", controllers); //use -> 미들 웨어를 등록해주는 메서드
//에러처리를 위한 미들웨어 생성
app.use(errorController.logErrors);
app.use(errorController.respondNoResourceFound);
app.use(errorController.respondInternalEroor);



module.exports = app;
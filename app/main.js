"use strict"

// 모듈
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

//에러 라우팅
const errorController = require("./src/controllers/errorController");
const { delimiter } = require("ejs");

//세션이용
var session = require('express-session')
//세션을 파일에 저장
var FileStore = require('session-file-store')(session)
//로그인 기능 
const User = require("./src/models/User");

const bcrypt = require('bcrypt');

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
  resave: true,
  saveUninitialized: false,
  store: new FileStore()
}))



//passport는 세션을 내부적으로 사용하기 때문에 express-session을 활성화 시키는 코드 다음에 등장해야한다.!!

var passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy;

//passport를 설치한 것이고 express가 호출이 될 때마다 passport.initalize가 호출되면서 우리의 app에 개입됨
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
  console.log('serializeUser', user);
  done(null, user.user_email);
});

passport.deserializeUser(function (id, done) {
  console.log('deserializeUser', id);
  done(null, id);
});

let userInfo;
passport.use(new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'pwd'
  },
  async function (username, password, done) {
    console.log('LocalStrategy', username, password);

    let user = new User();
    userInfo = await user.getUserInfo(username);
    if (!userInfo) {
      return done(null, false, {
        reason: '등록된 이메일이 없습니다.'
      });
    }

    if (username === userInfo.user_email) {
      if (await bcrypt.compare(password,userInfo.psword)) {
        return done(null, userInfo);
      } else {
        return done(null, false, {
          reason: '비밀번호가 틀렸습니다.'
        });
      }
    } else {
      return done(null, false, {
        reason: '등록된 이메일이 없습니다.'
      });
    }
  }
));



app.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (info) {
      const errorMessage = info.reason || 'Authentication failed';
      return res.send(`<script>alert("${errorMessage}"); window.location.href = "/login";</script>`);
    }

    return req.login(user, loginErr => { // 이 부분 callback 실행
      //console.log('req.login callback');
      if (loginErr) {
        return res.send(`<script>alert("Authentication failed"); window.location.href = "/login";</script>`);
      }
      const fillteredUser = { ...user.dataValues };
      delete fillteredUser.psword;
      return res.redirect('/');
    });
  })(req, res, next);
});

app.post('/register',async(req,res)=>{
  try{
    const hashedPassword=await bcrypt.hash(req.body.psword,10)
    const user=new User({
        user_email:req.body.user_email,
        psword:hashedPassword,
        user_name:req.body.user_name,
        user_type:req.body.user_type,
        user_nickname:req.body.user_nickname,
        university_id:req.body.university_id
    });
    user.register();
    res.redirect('/login')
  }catch{
    res.redirect('/register')
  }
})

app.use("/", require("./src/controllers/index")); //use -> 미들 웨어를 등록해주는 메서드

//에러처리를 위한 미들웨어 생성
app.use(errorController.logErrors);
app.use(errorController.respondNoResourceFound);
app.use(errorController.respondInternalEroor);




module.exports = app;
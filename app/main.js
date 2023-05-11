"use strict"

// 모듈
const express = require("express");
const bodyParser =require("body-parser");
// const passport = require("passport");
const app = express();
const pool=require('./config/db');
// 라우팅
const controllers = require("./src/controllers/index");
const errorController=require("./src/controllers/errorController");

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

// app.use(require('serve-static')(__dirname + '/src/public'));
// app.use(require('cookie-parser')());
// app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
// app.use(passport.initialize());
// app.use(passport.session());

app.use(bodyParser.urlencoded({extended:true}));
app.use("/",controllers); //use -> 미들 웨어를 등록해주는 메서드

//에러처리를 위한 미들웨어 생성
app.use(errorController.logErrors);
app.use(errorController.respondNoResourceFound);
app.use(errorController.respondInternalEroor);


// passport.serializeUser(function(user, done) {
//     console.log("serializeUser ", user)
//     done(null, user.ID);
//   });
  
//   passport.deserializeUser(function(id, done) {
//       console.log("deserializeUser id ", id)
//       var userinfo;
//       var sql = 'SELECT * FROM User WHERE uesr_email=?';
//       pool.getConnection((err,connection)=>{
//         if(err){
//             console.error('MySQL 연결 오류: ',err);
//             throw err;
//         }
    
//         });
    
//       pool.query(sql , [id], function (err, result) {
//         if(err) console.log('mysql 에러');     
       
//         console.log("deserializeUser mysql result : " , result);
//         var json = JSON.stringify(result[0]);
//         userinfo = JSON.parse(json);
//         done(null, userinfo);
//       })    
//   });

//   router.get('/login', function(req, res, next) {
//     var userId = "";
//     if(req.cookies['loginId'] !== undefined){
//       console.log(req.cookies['loginId']);
//       userId = req.cookies['rememberId'];
//     }
//     res.render('login', {userId: userId});
//   });
  
//   passport.use(new LocalStrategy({
//       usernameField: 'user_email',
//       passwordField: 'psword'
//     },
//     function(username, password, done) {
//       var sql = 'SELECT * FROM User WHERE user_email=? AND psword=?';
//       pool.query(sql , [user_email, psword], function (err, result) {
//         if(err) console.log('mysql 에러');  
  
//         // 입력받은 ID와 비밀번호에 일치하는 회원정보가 없는 경우   
//         if(result.length === 0){
//           console.log("결과 없음");
//           return done(null, false, { message: 'Incorrect' });
//         }else{
//           console.log(result);
//           var json = JSON.stringify(result[0]);
//           var userinfo = JSON.parse(json);
//           console.log("userinfo " + userinfo);
//           return done(null, userinfo);  // result값으로 받아진 회원정보를 return해줌
//         }
//       })
//     }
//   ));


module.exports =app;
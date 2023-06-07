"use strict"

// 모듈
const express = require("express");
const bodyParser = require("body-parser");
// const Multer=require('multer');
const FirebaseStorage=require('multer-firebase-storage');

const app = express();

//에러 라우팅
const errorController = require("./src/controllers/errorController");
require('dotenv').config();


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

const Multer = require('multer');
const { initializeApp } = require('firebase/app');
const { getStorage, ref, getDownloadURL} = require('firebase/storage');

// Firebase 구성 정보
const firebaseConfig = {
  apiKey: "AIzaSyD5E7ZajvnV2-iJbSa9CMt78ssUfPUIbEU",
  authDomain: "uniunity-383602.firebaseapp.com",
  projectId: "uniunity-383602",
  storageBucket: "uniunity-383602.appspot.com",
  messagingSenderId: "664017190069",
  appId: "1:664017190069:web:dbb0c0990980179f85d2fc"
};

// Firebase 초기화
initializeApp(firebaseConfig);

// Firebase Storage 초기화
const storage = getStorage();

//사진 업로드 
const multer = Multer({
  storage: FirebaseStorage({
    bucketName: 'uniunity-383602.appspot.com',
    credentials: {
      clientEmail: 'firebase-adminsdk-ckb05@uniunity-383602.iam.gserviceaccount.com',
      privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDVSAsNYj0iTjkv\nhQRkVwzh07BEvkuttJaSbO76HGx4Y3XgJ/rNEvNX1wvxG1XdJrhO2LE+vm7VIzps\n5yeeHQjKbkDhSDMOas7Ml754t/WdPrPzsSQ2r+cVNnE1G2am+fngeE+l7Ce7kAlS\nVoNr93mdTqBDxo8eo9xqeHAIa0k1qIy5QhBINkHh8x1ltxjXtNtWyvD+35JdNPOd\nIJpZUZaX6/MzzeuJix8zzOUbN+oCVZpuMBDENzabfd4d0F9lN2HYPYdk9c9syiRe\nrGGWfGymecDi+FgfywKddDY9PDHv5k8bN6RjVyvT/agLdCjIPy8fKyGiplNZBNzm\nAYQk+NexAgMBAAECggEAF/2+oIbIca9y51GDKPZR0KVLUrBFOwjxVw9B4oiH+xLV\nE53rrF3RWbQq97gndHUCjnv5lCE/vmH0FIP8BOEnN/4m9jB07c497O2000d+LW38\nOBFZDX3D9LLnER4/8dB0tzdRXkyuO378TXLF3cM8vuE1Tepr9vpftOpPT+MhnRNg\nDbxo9NpaK//5IThAnFEOPTkn2ukyc7lZqgcAzn6facCi9BmxvRlVOZZafvvcNWSn\nxjs4I4GV9iBs8L/6+zvGqDUN4IuN9sfO7n+fQlRZ86FxVhkF13aVyf+GeXttzWyy\nvzbhw5MtzbL88meryorsfYj0RLJPI5qsEviRF+uVQQKBgQDtQDbeyG/aaGEqMTyU\nMKDb9eC4Le0uFj70WXLKuMpAr8+CIMFfxpAKzYRcsq7/dfwRFTOFpu/baX0Ec3YL\n6efrosk8u+cIQzAW65QX+J/U0lZelBGu2fNYAR6CiQ2KMQXEmPFvs2gXkUmFS3mv\nCIBiNLy0FWz0ZK5uHVVXfXih1QKBgQDmIug8Jp9n8uXPDG0erWjrBPtFCZVHWmoS\nl/hxZe5WCFXI1gw0S0ceTJnJ7LCIKSRvRba7OCqNWYIQNsC1KJEZATyEzjv5Ocq/\nlVDCrFI8JxW847lhcU34GU19fw4JpK0kADQdRByXfos0wlF9+mhL/zd/jUYEUpcs\nVKpdzzQwbQKBgA/d7o2BvDFQL8dhmZqTkf6D+C55K9acOEOhQ9MY/rXKzEb4p9Ye\n8n02d3a3oIqHOn9t+o8itgHnkSveCPQNBay1q127d10PGUU/Jh1gTFgwZQRYRMJ7\n4xFsqbyzK8ulMayPSf5dckW5OsCGZrH1EJkAy+oDUNEbdqr4nT+HraytAoGAFEL6\ng2E7I6HFDeegK9VEqXx0yu0/EVsqf5yVqRY6V6TAOMBvrqL6Dfbci2SlXjeRF6Lh\npbYaOPuqcdcAPHLn43WyaFbn/NdTvG5e/+TAEL+4MDs0dRnOrYs8wVHQYJT5EXRb\nIkB+6++ePfTly9uiFx7POhGsGnFTEfoaTcwSYjkCgYAVTSjdpYYaEMXR12JD2DcY\nZlTuE1suz4cVoJZMhDSoMdO/QJHj4xGW95Oj/PQF+KecIviyNm7FR7Van3pMPcjP\n2Hktz3HOfQ974W2R2HmVv79SOBYx3LcAeVW5ZWi5r9nTDfIXdDOTb6RgqhHrIQZL\nUiGOukHcDedVRJLHwWhSaQ==\n-----END PRIVATE KEY-----\n",
      projectId: 'uniunity-383602'
    }
  })
})

app.post('/file', multer.single('file'), async (req, res) => {
  try{
      // 업로드할 파일 정보
      const file = req.file;

          // Firebase Storage에 파일 업로드
    const storageRef = ref(storage, file.originalname);

    // 파일의 공개적인 액세스 URL 생성
    const fileUrl = await getDownloadURL(storageRef);

    // 업로드 완료 메시지와 업로드한 파일의 URL 반환
    res.status(200).json({ success: true, fileUrl });
      } catch (error) {
      console.error('Error uploading file:', error);
      res.status(500).json({ error: 'Failed to upload file' });
      }
  })

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


app.use("/", require("./src/controllers/index")); //use -> 미들 웨어를 등록해주는 메서드

//에러처리를 위한 미들웨어 생성

app.use(errorController.logErrors);
app.use(errorController.respondNoResourceFound);
app.use(errorController.respondInternalEroor);




module.exports = app;

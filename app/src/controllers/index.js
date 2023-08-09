"use strict"

const express =require("express");
const router = express.Router();
const cors = require('cors');



const ctrl = require("./home.ctrl");

router.get("/",ctrl.output.home);
router.get("/login",ctrl.output.login);
router.get("/loginStatus",ctrl.process.loginStatus);
router.get("/signup/agreement",ctrl.output.agreement);
router.get("/signup/0",ctrl.output.signup); //마케팅 여부 false
router.get("/signup/1",ctrl.output.signup);//마케팅 여부 true

router.get("/logout",ctrl.process.logout);
router.get("/forgot/password",ctrl.output.forgotPassword)
router.get("/mypage",ctrl.output.mypage);
router.get("/mypage/modify/1",ctrl.output.modifyNickname);//닉네임변경
router.get("/mypage/modify/2",ctrl.output.modifyPsword); //비밀번호변경
router.get("/mypage/withdrawal",ctrl.output.withdrawal);//회원탈퇴
router.get("/mypage/community/post/:category",ctrl.output.myCommunityPost)


//닉네임 변경
router.post("/mypage/modify/1",ctrl.process.modifyNickname)
//비밀번호 변경1(마이페이지-현재 비밀번호를 아는 상태로 비밀번호 변경)
router.post("/mypage/modify/2",ctrl.process.modifyPsword1)
//비밀번호 변경2(이메일을 이용한 비밀번호 변경)
router.post("/mypage/modify/3",ctrl.process.modifyPsword2)

//회원 탈퇴
router.post("/mypage/withdrawal",ctrl.process.withdrawal)

//비밀번호 찾기
router.post("/forgot/password",ctrl.process.forgotPassword)

//회원가입시 이메일 중복확인
router.post("/signup/duplicateCheckEmail",ctrl.process.duplicateCheckEmail);

//메일 인증
router.post("/auth/email",ctrl.process.emailAuth);
router.post("/register",ctrl.process.register);

// council 라우터
router.get("/council/:universityname",ctrl.result.council);
router.get("/post/:universityname/:category",ctrl.output.post);
router.post("/getUniversityName", ctrl.result.getUniversityName);
router.post("/getCardNewsImageUrl", ctrl.result.getCardNewsImageUrl);



//학교 라우터
router.get("/showUniversityNameList/:university_name",ctrl.output.showUniversityNameList);
router.get("/showUniversityNameList",ctrl.output.showUniversityNameList);


// partner 라우터
router.get("/partner/:university_url",ctrl.output.partner);
router.get("/getUniversityID/:university_url",ctrl.partner.getUniversityID);
router.post("/getPartner",ctrl.partner.getPartner);
router.post("/getPartnerUni",ctrl.partner.getPartnerUni);
router.post("/getUniversityLocation",ctrl.partner.getUniversityLocation);
router.post("/uploadPartner",ctrl.partner.uploadPartnerStore);

router.get("/partnerUpdate/:university_url",ctrl.output.partnerForm);
router.get("/deleterStore/:storeID",ctrl.partner.DeletePartnerStore);

// retailer 라우터
router.get("/retailer/:university_url",ctrl.retailer.retailer);
router.get("/retailer/:university_url/:kind", ctrl.retailer.retailerKind);

// router.post("/login",ctrl.process.login);
//council 페이지 라우팅
// router.get("/sungshin\", ctrl.result.council);

//post 라우터
router.get("/postAll/:university_url",ctrl.post.postAll); //전체게시글 불러오기 API
router.get("/postform/:university_url",ctrl.output.postform);
router.get("/postviewer/:post_id",ctrl.output.postviewer);

router.get("/showPost/:post_id",ctrl.post.showPost);

router.post("/uploadPost",ctrl.post.uploadPost);
router.get("/showPostListbyCategory/:category/:university_url",ctrl.post.showPostListbyCategory);
router.get('/searchPost/:keyword',ctrl.post.searchPost);

router.get("/showPostListAll/:university_url",ctrl.output.post);

// 마이페이지
router.post("/mypage/community/post/:category",ctrl.post.myCommunityPost);
// router.get('/totalPosts', ctrl.post.getTotalPostsCount);//게시글총개수
router.delete('/doDeletePost/:post_id/:user_email', ctrl.post.DeletePost); //게시글 삭제
// 게시글 조회수 증가
router.post('/increaseViewCount/:post_id', ctrl.post.IncreaseViewCount);

// 마이페이지 -> 하트
router.post("/addHeart",ctrl.post.addHeart); // 하트 목록 추가하기
router.post("/checkHeart",ctrl.post.checkHeart); // 특정 user_email 과 post_id에 해당하는 heart_id 확인
router.delete("/deleteHeart/:heart_id",ctrl.post.deleteHeart); // 하트 목록 지우기

// 게시글 하트 개수 반환
router.get("/postHeartNum/:post_id",ctrl.post.postHeartNum);

// 마이페이지 -> 스크랩
// router.post("/addScrap",ctrl.post.addScrap); // 스크랩 목록 추가하기
// router.post("/checkScrap",ctrl.post.checkScrap); // 특정 user_email 과 post_id에 해당하는 scrap_id 확인
// router.delete("/deleteScrap/:scrap_id",ctrl.post.deleteScrap); // 스크랩 목록 지우기

// // 게시글 스크랩 개수 반환
// router.get("/postScrapNum/:post_id",ctrl.post.postScrapNum);

//댓글
router.get("/showComment/postviewer/:post_id",ctrl.comment.showCommentListbyPostID);//댓글 목록 보이기
router.post("/uploadComment/postviewer",ctrl.comment.uploadComment); //댓글 작성하기
router.post('/doDeleteComment/:comment_id', ctrl.comment.DeleteComment); //댓글 삭제



module.exports=router;



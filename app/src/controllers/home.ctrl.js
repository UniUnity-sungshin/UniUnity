"use strict"

const Partner = require("../models/Partner");
const User = require("../models/User");
const Council = require("../models/Council");
const Post = require("../models/Post");
const University = require("../models/University");
const sendEmailWithAuthorization = require("../../mailer");
const bcrypt = require('bcrypt');
const Comment = require('../models/Comment');
// const { getLatestPosts } = require("../public/js/post/post");

const output = {
    home: (req, res) => {
        res.render('home/mainpage.html');
    },
    login: (req, res) => {
        res.render('home/login.html');
    },
    signup: (req, res) => {
        res.render('home/signup.html');
    },
    mypage: (req, res) => {
        res.render('home/mypage.html');
    },
    modifyNickname: (req, res) => {
        res.render('home/modifyNickname.html');
    },
    withdrawal: (req, res) => {
        res.render('home/withdrawal.html');
    },
    modifyPsword: (req, res) => {
        res.render('home/modifyPsword.html');
    },
    agreement: (req, res) => {
        res.render('home/agreement.html');
    },
    showUniversityNameList: async (req, res) => {
        const university_name = new University();
        const response = await university_name.showUniversityNameList();
        return res.json(response);
    },
    post: (req, res) => {
        res.render('post/post.html');
    },
    postform: (req, res) => {
        res.render('post/postform.html');
    },
    postviewer: (req, res) => {
        res.render('post/postviewer.html');
    },
    myCommunityPost: (req, res) => {
        res.render('post/communityPost.html')
    },

    partner: (req, res) => {
        res.render("store/partner.html");
    },
    partnerForm: (req, res) => {
        res.render("store/uploadTest.html");
    },
    uploadComment: (req, res) => {
        res.render('post/postviewer.html');
    },
    showCommentListbyPostID: (req, res) => {
        res.render('post/postviewer.html');
    },
    forgotPassword:(req,res)=>{
        res.render('home/forgotPassword.html');
    }


}

//로그인 인증 process
const process = {

    //회원가입
    register: async (req, res) => {
        try {
            console.log(req.body);
            const hashedPassword = await bcrypt.hash(req.body.psword, 10)
            const user = new User({
                user_email: req.body.user_email,
                psword: hashedPassword,
                user_name: req.body.user_name,
                user_type: req.body.user_type,
                user_nickname: req.body.user_nickname,
                university_id: req.body.university_id,
                user_marketing: req.body.user_marketing,
            });
            const response = await user.register();
            return res.json(response)
        } catch (err) {
            return res.json(err)
        }


    },
    //로그인 상태
    loginStatus: async (req, res) => {
        const user = new User();
        let userInfo = await user.getUserInfo(req.user);
        console.log(userInfo);
        if (req.user) {
            return res.json({
                loginStatus: true,
                user_email: userInfo.user_email,
                user_name: userInfo.user_name,
                user_type: userInfo.user_type,
                user_nickname: userInfo.user_nickname,
                university_name: userInfo.university_name,
                university_id: userInfo.university_id,
                university_url: userInfo.university_url

            });
        }
        return res.json(userInfo)
    },
    //로그아웃
    logout: (req, res, next) => {
        try {
            req.logout(function (err) {
                if (err) { return next(err); }
                res.redirect('/');
            });
        } catch (err) {
            return res.json({
                "status": 500,
                "err": err
            });
        };
    },
    //닉네임 변경
    modifyNickname: async (req, res) => {
        const user = new User({
            user_email: req.body.user_email,
            user_nickname: req.body.user_nickname,
        });
        const response = await user.modifyNickname();
        return res.json(response)

    },
    //비밀번호 변경1(마이페이지-현재 비밀번호를 아는 상태로 비밀번호 변경)
    modifyPsword1: async (req, res) => {
        const hashedPassword = await bcrypt.hash(req.body.new_psword, 10)
        const user = new User({
            user_email: req.body.user_email,
            new_psword: hashedPassword,
            psword: req.body.psword
        });
        const response = await user.modifyPsword1();
        return res.json(response)
    },
    //비밀번호 변경2(이메일을 이용한 비밀번호 변경)
    modifyPsword2: async (req, res) => {
        const hashedPassword = await bcrypt.hash(req.body.new_psword, 10)
        const user = new User({
            user_email: req.body.user_email,
            new_psword: hashedPassword
        });
        const response = await user.modifyPsword2();
        return res.json(response)
    },
    //회원탈퇴 
    withdrawal: async (req, res) => {

        const user = new User({
            user_email: req.body.user_email,
            psword: req.body.psword,
        });
        const response = await user.withdrawalUser();

        req.logout(function (err) {
            if (err) { return next(err); }
            return res.json(response)
        });

    },
    //비밀번호 찾기
    forgotPassword: async (req, res) => {

    },

    duplicateCheckEmail: async (req, res) => {
        const user = new User({
            user_email: req.body.user_email
        })
        const response = await user.duplicateCheckEmail();
        return res.json(response)
    },

    //이메일 인증
    emailAuth: (req, res) => {
        const emailAdderess = req.body.email;
        sendEmailWithAuthorization(emailAdderess)
            .then((authentication_code) => {
                console.log('Authentication code:', authentication_code);
                return res.json({
                    "status": 201,
                    "authentication_code": authentication_code
                })
            })
            .catch((err) => {
                console.error('An error occurred:', err);
                return res.json({
                    "status": 500,
                    "err": err
                }
                );
            });
    },

};

//제휴 파트
const partner = {
    getUniversityID: async (req, res) => {
        const partner = new Partner();
        const response = await partner.getUniversityID(req.params.university_url);
        return res.json(response);
    },
    getPartnerUni: async (req, res) => {
        const partner = new Partner();
        const university_id = await partner.getUniversityID(req.body.university_url);
        const response = await partner.getPartnerStores(university_id);
        return res.json(response);
    },
    getUniversityLocation: async (req, res) => {
        const partner = new Partner();
        const university_id = await partner.getUniversityID(req.body.university_url);
        const response = await partner.getUniversityLocation(university_id);
        return res.json(response);
    },
    getPartner: async (req, res) => {
        const partner = new Partner();
        const response = await partner.showUniversity(req.body.university_url);
        const university_id = await partner.getUniversityID(req.body.university_url);
        const university_location = await partner.getUniversityLocation(university_id);
        const university_uni = await partner.getPartnerStores(university_id);
        const obj = [];
        obj.push({ latitudeUni: university_location.latitude, longitudeUni: university_location.longitude });
        for (let i = 0; i < university_uni.length; i++) {
            obj.push(university_uni[i]);
        }
        return res.json(obj);
    },
    getUniversityID_name: async (req, res) => {
        const partner = new Partner();
        const response = await partner.getUniversityID(req.params.university_url);
        return res.json(response);
    },
    uploadPartnerStore: async (req, res) => {
        const partner = new Partner();
        const storeName = req.body.storeName,
            store_location = req.body.store_location,
            latitude = req.body.latitude,
            longitude = req.body.longitude,
            content = req.body.content,
            startDate = req.body.startDate,
            endDate = req.body.endDate;
        const university_id = await partner.getUniversityID(req.body.university_url);
        const response = await partner.uploadPartnerStore(storeName, store_location, latitude, longitude, university_id, content, startDate, endDate);
        return res.json(response);
    },
    DeletePartnerStore: async (req, res) => {
        const partner = new Partner();
        const response = await partner.DeletePartnerStore(req.params.storeID);
        return res.json(response);
    }
};

// 소상공인 파트
const retailer = {
    retailer: async (req, res) => {
        res.render("store/retailer.html");
    },
    retailerKind: async (req, res) => {
        if (req.params.kind == 'all') {
            res.render("store/retailer.html");
        }
        else if (req.params.kind == 'food') {
            res.render("store/reatailerFood.html");
        }
        else if (req.params.kind == 'cafe') {
            res.render("store/retailerCafe.html")
        }
        else {
            res.render("store/retailer.html");
        }
    },
}

//council 페이지
const result = {
    council: async (req, res) => {
        res.render("council/council.html");
    },

    getUniversityName: async (req, res) => {
        const council = new Council();
        const response = await council.getUniversityName(req.body.university_url);
        return res.json(response);
    },

    post: async (req, res) => {
        res.render("home/post.html");
    },

    getCardNewsImageUrl: async (req, res) => {
        const council = new Council();
        const response = await council.getUniversityID(req.body.university_url);
        const response2 = await council.getCardNewsImageUrl(response);
        return res.json(response2);
    },

    getUniversityLocation: async (req, res) => {
        const partner = new Partner();
        const university_id = await partner.getUniversityID(req.body.university_url);
        const response = await partner.getUniversityLocation(university_id);
        return res.json(response);
    },



}


const post = {
    uploadPost: async (req, res) => {
        const post = new Post(req.body);
        const response = await post.createPost();
        return res.json(response);
    },

    postAll: async (req, res) => {
        console.log(req.params.university_url);

        let university_url = req.params.university_url;
        const post = new Post();
        const response = await post.showPostListAll(university_url);
        console.log(response);
        return res.json(response);
    },
    showPost: async (req, res) => {
        let post_id = req.params.post_id;
        const post = new Post();
        const response = await post.showPost(post_id);
        return res.json(response);

    },
    showPostListbyCategory: async (req, res) => {
        let university_url = req.params.university_url;
        let category = req.params.category;

        if (category === "chat")
            category = "잡담";
        else if (category === "affiliate_registration")
            category = "제휴 등록";
        else if (category === "affiliate_referral")
            category = "제휴 추천";
        else if (category === "affiliate_offer")
            category = "제휴 제안";
        else if (category === "announcement")
            category = "총학생회 공지사항";
        else if (category === "store_promotion")
            category = "가게 홍보";
        else {
            res.status(404).send({ success: false, err: "404 Not Found" });
        }
        //else return res.json({success:false ,err:"url 잘못입력"});
        const post = new Post();
        const response = await post.showPostListbyCategory(university_url, category);
        return res.json(response);

    },
    searchPost: async (req, res) => {
        const post = new Post();
        const response = await post.searchPost(req.params.keyword);
        return res.json(response);

    },
    //마이페이지) 커뮤니티
    myCommunityPost: async (req, res) => {
        const category = req.params.category;
        if (category === '1') { //내 게시글 목록
            const post = new Post(req.body);
            const response = await post.myCommunityPost();
            return res.json(response);
        }
        else if (category === '2') {//댓글 목록
            const post = new Post(req.body);
            const response = await post.myCommunityCommentPost();
            return res.json(response);
        } else if (category == '3') { //내 하트 게시글 목록
            const post = new Post(req.body);
            const response = await post.getUserHeartList();
            return res.json(response);
        } else if (category == '4') { //스크랩 목록
            const post = new Post(req.body);
            const response = await post.getUserScrapList();
            return res.json(response);
        }

    },
    DeletePost: async (req, res) => {
        let post_id = req.params.post_id;
        let user_email = req.params.user_email;

        try {
            const post = new Post();
            const response = await post.doDeletePost(post_id, user_email);
            return res.json(response);
        } catch (err) {
            console.error('게시글 삭제 실패:', err);
            return res.status(500).json({ error: '게시글 삭제에 실패하였습니다.' });
        }

    },

    IncreaseViewCount: async (req, res) => {
        let post_id = req.params.post_id;


        try {
            const post = new Post();
            const response = await post.showIncreaseViewCount(post_id);
            return res.json(response);
        } catch (err) {
            console.error('조회수 증가 실패:', err);
            return res.status(500).json({ error: '조회수 증가에 실패하였습니다.' });
        }
    },
    // getTotalPostsCount: async(req, res) => {
    //     const post = new Post();
    //     const response = await post.totalPostsCount();
    //     return res.json(response);
    // }
    // 마이페이지) 하트 기능
    addHeart: async (req, res) => {
        const post = new Post();
        const response = await post.addHeart(req.body);
        return res.json(response);
    },
    checkHeart: async (req, res) => {
        const post = new Post();
        const response = await post.checkHeart(req.body);
        return res.json(response);
    },
    deleteHeart: async (req, res) => {
        const post = new Post();
        const response = await post.deleteHeart(req.params.heart_id);
        return res.json(response);
    },
    // 게시글 하트 개수 확인
    postHeartNum: async (req, res) => {
        const post = new Post();
        const response = await post.postHeartNum(req.params.post_id);
        return res.json(response);
    },
    // 마이페이지) 스크랩 기능
    addScrap: async (req, res) => {
        const post = new Post();
        const response = await post.addScrap(req.body);
        return res.json(response);
    },
    checkScrap: async (req, res) => {
        const post = new Post();
        const response = await post.checkScrap(req.body);
        return res.json(response);
    },
    deleteScrap: async (req, res) => {
        const post = new Post();
        const response = await post.deleteScrap(req.params.scrap_id);
        return res.json(response);
    },
    // 게시글 스크랩 개수 확인
    postScrapNum: async (req, res) => {
        const post = new Post();
        const response = await post.postScrapNum(req.params.post_id);
        return res.json(response);
    },
    // 게시글 작성자 반환
    postWriter: async (req, res) => {
        const post = new Post();
        console.log("controller ")
        const response = await post.postWriter(req.params.post_id);
        return res.json(response);
    }
}

const comment = {
    //댓글 작성하기
    uploadComment: async (req, res) => {
        const comment = new Comment(req.body);
        const response = await comment.createComment();
        return res.json(response);
    },

    //이거 필요있나??
    showComment: async (req, res) => {
        let post_id = req.params.comment_id;
        const comment = new Comment();
        const response = await comment.showComment(post_id);
        return res.json(response);

    },

    showCommentListbyPostID: async (req, res) => {
        let post_id = req.params.post_id;
        // let comment_id = req.params.comment_id;
        const comment = new Comment();
        const response = await comment.showCommentListbyPostID(post_id);
        return res.json(response);

    },


    showCommentListAll: async (req, res) => {
        // let post_id = req.params.post_id;
        let comment_id = req.params.comment_id;
        // console.log(req.params.post_id);
        console.log(req.params.comment_id);

        const comment = new Comment();
        const response = await comment.showCommentListAll(comment_id); //post_id
        console.log(response);
        return res.json(response);
    },

    //댓글 삭제하기!!!
    deleteComment: async (req, res) => {
        let user_email = req.params.user_email;
        let comment_id = req.params.comment_id;
        let post_id =req.params.post_id;

        try {
            const comment = new Comment();
            const response = await comment.doDeleteComment(user_email,comment_id,post_id);
            return res.json(response);
        } catch (err) {
            console.error('댓글 삭제 실패:', err);
            return res.status(500).json({ error: '댓글 삭제에 실패하였습니다.' });
        }

    },
    postCommentNum: async (req, res) => {
        let post_id = req.params.post_id;
        try {
            const comment = new Comment();
            const response = await comment.postCommentNum(post_id);
            return res.json(response);
        } catch (err) {
            console.error('댓글 개수 받아오기 실패:', err);
            return res.status(500).json({ error: '댓글 개수 반영에 실패하였습니다.' });
        }
    },
    commentWriter: async (req, res) => {
        const comment = new Comment();
        console.log("controller ")
        const response = await comment.commentWriter(req.params.comment_id);
        return res.json(response);
    }
    // removeComment: function ($comment) {
    //     $.ajax({
    //         url: _apiServerUrl + '/remove/board/comment',
    //         xhrFields: {withCredentials: true},
    //         type: 'POST',
    //         data: {
    //             id: $comment.data('id')
    //         },
    //         success: function (data) {
    //             if (Number($('response', data).text())) {
    //                 $comment.remove();
    //             } else {
    //                 alert('삭제할 수 없습니다.');
    //             }
    //         }
    //     });
    // },

    //대댓글
    // createChildCommentForm: function ($comment) {
    //     var $commentForm = $articles.find('> article > div.comments > form.writecomment').filter(function () {
    //         return $(this).data('parentId') === $comment.data('id');
    //     });
    //     if ($commentForm.length === 0) {
    //         $commentForm = $articles.find('> article > div.comments > form.writecomment:not(.child)').clone().addClass('child').data('parentId', $comment.data('id'));
    //         $commentForm.find('input[name="text"]').attr('placeholder', '대댓글을 입력하세요.');
    //         var $beforeComment = $articles.find('> article > div.comments > article.child').filter(function () {
    //             return $(this).data('parentId') === $comment.data('id');
    //         }).last();
    //         if ($beforeComment.length === 0) {
    //             $beforeComment = $articles.find('> article > div.comments > article.parent').filter(function () {
    //                 return $(this).data('id') === $comment.data('id');
    //             });
    //         }
    //         $commentForm.insertAfter($beforeComment);
    //     }
    //     $commentForm.find('input[name="text"]').focus();
    // },




}


module.exports = {
    output,
    process,
    result,
    partner,
    post,
    retailer,
    comment
};

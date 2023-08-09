const PostStorage = require("./PostStorage");

class Post {
    constructor(body) {
        this.body = body;
    }
    //게시글 작성하기
    async createPost() {
        const client = this.body;
        try {
            const response = await PostStorage.savePost(client);
            console.log(response)
            const response2 = await PostStorage.saveImagePost(
                response.post_id,
                response.postInfo.post_content,
                response.formattedDateTime
            )
            return response2;
        } catch (err) {
            return { err }
        }
    }

    //post_id로 게시글 불러오기
    async showPost(post_id) {
        try {
            const response = await PostStorage.getPost(post_id);
            return response;
        } catch (err) {
            return { err }
        }

    }
    //최신순 포스트 리스트 불러오기
    async showPostListAll(university_url, page = 1, pageSize = 10) {
        try {
            let university_id = await PostStorage.getUniversityUrlToID(university_url);
            console.log(university_id);
            const response = await PostStorage.getPostListAll(university_id);
            console.log(response);
            return response;
        } catch (err) {
            return { success: false, msg: err };
        }
    }
    //카테고리별로 불러오기
    async showPostListbyCategory(university_url, category) {
        try {
            let university_id = await PostStorage.getUniversityUrlToID(university_url);
            const response = await PostStorage.getPostListbyCategory(university_id, category);
            return response;
        } catch (err) {
            return { success: false, msg: err };
        }
    }
    // 게시글 검색하기
    async searchPost(keyword) {
        try {
            const response = await PostStorage.searchPost(keyword);
            return response;
        } catch (err) {
            return { success: false, msg: err };
        }
    }

    //마이페이지-내가 작성한 게시글 보기
    async myCommunityPost() {
        try {
            console.log("myCommunityPost");
            const client = this.body;
            const response = await PostStorage.getMyPost(client);
            return response;
        } catch (err) {
            return {
                result: false,
                status: 500,
                msg: err
            };
        }
    }

    //마이페이지-내가 작성한 댓글 단 게시글 불러오기
    async myCommunityCommentPost() {
        try {
            const client = this.body;
            const response = await PostStorage.getMyCommentPost(client);
            return response;
        } catch (err) {
            return {
                result: false,
                status: 500,
                msg: err
            };
        }
    }

    //게시글 삭제하기
    async doDeletePost( post_id, user_email) {
        try {
            const response = await PostStorage.goDeletePost(post_id, user_email);
            return response;
        } catch (err) {
            return { err };
        }
    }
    
    //조회수 증가
    async showIncreaseViewCount(post_id) {
        try {
            const response = await PostStorage.getIncreaseViewCount(post_id);
            return response;
        } catch (err) {
            return{err};
        }
    }


    // 하트 기능 //
    // 마이페이지) 하트 저장
    async addHeart(heartInfo) {
        try {
            const response = await PostStorage.addHeart(heartInfo);
            return response;
        } catch (err) {
            return {
                result: false,
                status: 500,
                msg: err
            };
        }
    }

    // 마이페이지) 유저 하트 목록 보기
    async getUserHeartList() {
        try {
            const client = this.body;
            const response = await PostStorage.getUserHeartList(client);
            return response;
        } catch (err) {
            return {
                result: false,
                status: 500,
                msg: err
            };
        }
    }

    // 마이페이지) 특정 user_email 과 post_id에 해당하는 heart_id가 존재하는지 확인
    async checkHeart(heartInfo) {
        try {
            const response = await PostStorage.checkHeart(heartInfo);
            return response;
        } catch (err) {
            return {
                result: false,
                status: 500,
                msg: err
            };
        }
    }

    // 마이페이지) 하트 삭제
    async deleteHeart(heart_id) {
        try {
            const response = await PostStorage.deleteHeart(heart_id);
            return response;
        } catch (err) {
            return {
                result: false,
                status: 500,
                msg: err
            };
        }
    }

    // 해당 게시글에 하트 개수 반환
    async postHeartNum(post_id){
        try{
            const response = await PostStorage.postHeartNum(post_id);
            return response;
        } catch (err) {
            return {
                result: false,
                status: 500,
                msg: err
            };
        }
    }

    // 스크랩 기능 //
    // 마이페이지) 스크랩 저장
    async addScrap(scrapInfo) {
        try {
            const response = await PostStorage.addScrap(scrapInfo);
            return response;
        } catch (err) {
            return {
                result: false,
                status: 500,
                msg: err
            };
        }
    }

    // 마이페이지) 유저 스크랩 목록 보기
    async getUserScrapList() {
        try {
            const client = this.body;
            const response = await PostStorage.getUserScrapList(client);
            return response;
        } catch (err) {
            return {
                result: false,
                status: 500,
                msg: err
            };
        }
    }

    // 마이페이지) 특정 user_email 과 post_id에 해당하는 scrap_id가 존재하는지 확인
    async checkScrap(scrapInfo) {
        try {
            const response = await PostStorage.checkScrap(scrapInfo);
            return response;
        } catch (err) {
            return {
                result: false,
                status: 500,
                msg: err
            };
        }
    }

    // 마이페이지) 하트 삭제
    async deleteScrap(scrap_id) {
        try {
            const response = await PostStorage.deleteScrap(scrap_id);
            return response;
        } catch (err) {
            return {
                result: false,
                status: 500,
                msg: err
            };
        }
    }

    // 해당 게시글에 스크랩 개수 반환
    async postScrapNum(post_id){
        try{
            const response = await PostStorage.postScrapNum(post_id);
            return response;
        } catch (err) {
            return {
                result: false,
                status: 500,
                msg: err
            };
        }
    }
}






module.exports = Post


// Frontend에서 '제휴' 클릭 시 호출되는 함수
// function handleCooperationClick() {
// const category = '제휴';
// showPostListByCategory(category);
// }


// Frontend에서 카테고리 버튼 클릭 이벤트 핸들러
// function handleCategoryClick(category) {
//     const categoryValue = category; // 선택한 카테고리 값

//     // AJAX 또는 fetch 등의 방법을 사용하여 백엔드 API 호출
//     fetch('http://localhost:3000', {
//         method: 'POST',
//     body: JSON.stringify({ category: categoryValue }),
//     headers: {
//         'Content-Type': 'application/json'
//     }
// })
// .then(response => response.json())
// .then(data => {
//     // 받아온 데이터를 처리하는 로직 작성
//     // 예시: 데이터를 화면에 표시하는 함수 호출
//     displayPosts(data.posts);
// })
// .catch(error => {
//     console.error(error);
//     // 에러 처리
// });





module.exports = Post
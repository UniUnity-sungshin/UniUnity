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

            return response;
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
    //게시글 삭제하기
    async doDeletePost(post_id, user_email) {
        try {
          const response = await PostStorage.deletePost(post_id, user_email);
          return response;
        } catch (err) {
          return { err };
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

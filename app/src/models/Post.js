const PostStorage=require("./PostStorage");

class Post{
    constructor(body){
        this.body=body;
    }
    //포스트 작성하기
    async createPost(){
        const client = this.body;
        try{
            const response = await PostStorage.savePost(client);

            return response;
        }catch(err){
            return {err}
        }
    }

    //최신순 포스트 리스트 불러오기
    async showPostListAll(university_url){
        try{
            let university_id= await PostStorage.getUniversityUrlToID(university_url);
            const response=await PostStorage.getPostListAll(university_id);
            return response;
        }catch(err){
            return{success:false,msg:err};
        }
    }
    

}

module.exports=Post


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





module.exports=Post

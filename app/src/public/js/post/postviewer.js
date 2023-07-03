var currentUrl = window.location.href;
var post_id = currentUrl.split("/").pop();
console.log(post_id);



var userInfo; //유저정보

//작성자 회원 정보 불러오기
const loadloginData = async() => {
  const url = `${apiUrl}/loginStatus`;
    await fetch(url)
    .then((res) => res.json())
    .then(res => {
      console.log(res);
      userInfo = res;
    }
    )
}
var postInfo; //게시글 정보
//게시글 정보 불러오기
const loadPostData = async() => {
    const url = `${apiUrl}/showPost/${post_id}`;
    await fetch(url)
      .then((res) => res.json())
      .then(res => {
        console.log(res);
        postInfo=res;
        
        const postTitle = document.getElementById('post_title');
        const postCategory = document.getElementById("post_category");
        const postDate=document.getElementById("post_date");
        const viewCount=document.getElementById("view_count");
        const likeCount=document.getElementById("like_count");
        const commentCount=document.getElementById("comment_count");

        const userEmail=document.getElementById("user_email");


        postTitle.textContent=postInfo.post_title;
        postCategory.textContent=postInfo.category;
        postDate.textContent=postInfo.post_date;
        viewCount.textContent=`조회수 ${postInfo.view_count}`;
        likeCount.textContent=`좋아요 ${postInfo.like_count}개`;
        commentCount.textContent=`댓글 ${postInfo.comment_count}개`;
        userEmail.textContent=postInfo.user_email;

        const viewer = toastui.Editor.factory({
            el : document.querySelector(".toast-custom-viewer"),
            viewer : true,
            height:'1000px',
            initialValue : res.post_content
        
        });
      }
      )
  }
  
//page 로드 후 loadData()실행
window.addEventListener('DOMContentLoaded', async function()
{
  await loadloginData();
  await loadPostData();
});
var currentUrl = window.location.href;
var post_id = currentUrl.split("/").pop();
console.log(post_id);



var userInfo; //유저정보

//작성자 회원 정보 불러오기
const loadloginData = async() => {
  const url = `http://localhost:3000/loginStatus`;
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
    const url = `http://localhost:3000/showPost/${post_id}`;
    await fetch(url)
      .then((res) => res.json())
      .then(res => {
        console.log(res);
        postInfo=res;
        const postTitle = document.getElementById('post_title');
        postTitle.textContent=postInfo.post_title;
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
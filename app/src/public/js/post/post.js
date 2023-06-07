console.log("HI");
const writePostBtn = document.getElementById('wirte_post_btn');


let userInfo; //유저정보

//작성자 회원 정보 불러오기
const loadloginData = () => {
  const url = `http://localhost:3000/loginStatus`;
  fetch(url)
    .then((res) => res.json())
    .then(res => {
      console.log(res);
      userInfo = res;
    }
    )
}


writePostBtn.addEventListener('click', function() {

  if(userInfo.loginStatus){
    // 경로를 변경하고자 하는 URL로 설정합니다.
    var newLocation = `http://localhost:3000/postform/${userInfo.university_url}`;
    
    // 현재 창의 경로를 변경합니다.
    window.location.href = newLocation;
  }  
  else{
      alert("로그인 후에 게시글을 작성할 수 있습니다.");
  }

  });

  //page 로드 후 loadData()실행
window.addEventListener('DOMContentLoaded', function()
{
  loadloginData();
});
let userInfo; // 유저정보

// 작성자 회원 정보 불러오기
const loadloginData = () => {
  const url = `${apiUrl}/loginStatus`;
  fetch(url)
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      userInfo = res;
      setLoginHeader(res)
    })
};
//로그인(로그아웃), 회원가입(마이페이지)버튼
const loginStatusBtn=document.getElementById("loginStatusBtn");
const signUpBtn=document.getElementById("signUpBtn");

const setLoginHeader=(res)=>{
  if(res.loginStatus){
      loginStatusBtn.setAttribute("href", `${apiUrl}/logout`);
      loginStatusBtn.innerText="로그아웃"
      signUpBtn.setAttribute("href", `${apiUrl}/mypage`);
      signUpBtn.innerText="마이페이지"
  }
  else{
      loginStatusBtn.setAttribute("href", `${apiUrl}/login`);
      loginStatusBtn.innerText="로그인"
      signUpBtn.setAttribute("href", `${apiUrl}/signup`);
      signUpBtn.innerText="회원가입"
  }
  
}
const writePostBtn = document.getElementById('write_post_btn');
const brandNav= document.getElementById('navbar-brand');

writePostBtn.addEventListener('click', function () {
  if (userInfo.loginStatus) {
    // 경로를 변경하고자 하는 URL로 설정합니다.
    var newLocation = `${apiUrl}/postform/${userInfo.university_url}`;

    // 현재 창의 경로를 변경합니다.
    window.location.href = newLocation;
  } else {
    alert("로그인 후에 게시글을 작성할 수 있습니다.");
  }
});

var currentUrl = window.location.href;
var university_url = currentUrl.split("/").pop();

var universityColor=setUniversityColor(university_url) //학교 색상으로 변경
changeUniversityName(university_url) //학교 이름으로 변경

const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
  button.style.backgroundColor = universityColor;
  button.style.borderColor= universityColor;
});

function changeButtonColor(button, color) {
  button.style.backgroundColor = color;
  button.style.borderColor= color
}
//버튼 학교상징 색으로 바꾸기
function setUniversityColor(university_url){
  let universityColor
  if(university_url==="sungshin"){
    universityColor="#6a6fb3"
  }else if(university_url==="konkuk"){
    universityColor="#004a26"
  }else{
    universityColor="#FFD400" //Uniunity색상
  }
  return universityColor;
}
//학교 이름 바꾸기
function changeUniversityName(university_url){
  const universityNameElement = document.getElementById('university_name');
  if(university_url==="sungshin"){
    universityNameElement.textContent = '성신여자대학교 Unity'; 
  }else if(university_url==="konkuk"){
    universityNameElement.textContent = '건국대학교 Unity'; 
  }else{
    universityNameElement.textContent = 'Unity'; 
  }  
}


// 카테고리 버튼 요소들을 선택합니다.
const affiliateRegistrationBtn = document.getElementById('affiliate_registration');
const affiliateReferralBtn = document.getElementById('affiliate_referral');
const affiliateofferBtn = document.getElementById('affiliate_offer');
const announcementBtn = document.getElementById('announcement');
const chatBtn = document.getElementById('chat');
const storePromotionBtn = document.getElementById('store_promotion');

const row = document.querySelector('.row');
const col = document.querySelector('.col');

affiliateRegistrationBtn.addEventListener('click',function(){
    window.location.href = `${apiUrl}/partner/${university_url}`; // 제휴 등록은 제휴가게 페이지로 이동
        return; // 리다이렉션 후 함수 종료
})

// 카테고리 버튼 클릭 이벤트 리스너를 추가합니다.
announcementBtn.addEventListener('click', function () {
  fetchPosts("announcement", university_url);
});

affiliateReferralBtn.addEventListener('click', function () {
  fetchPosts("affiliate_referral", university_url);
});

affiliateofferBtn.addEventListener('click', function () {
  fetchPosts("affiliate_offer", university_url);
});

chatBtn.addEventListener('click', function () {
  fetchPosts("chat", university_url);
});

storePromotionBtn.addEventListener('click', function () {
  fetchPosts("store_promotion", university_url);
});

const fetchpostAllData = async () => {
  const blogEntriesDiv = document.querySelector(".blog-entries");

  if (!blogEntriesDiv) {
    console.error("blogEntriesDiv is null.");
    return;
  }

  // 기존의 게시글 요소들 제거
  while (blogEntriesDiv.firstChild) {
    blogEntriesDiv.removeChild(blogEntriesDiv.firstChild);
  }

  const url = `${apiUrl}/postAll/${university_url}`;
  const response = await fetch(url);

  const data = await response.json();
  for (var i = 0; i < data.length; i++) {
    var card = document.createElement('div');
    card.className = 'card mb-4';

    var cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    var date = document.createElement('div');
    date.className = 'small text-muted';
    date.textContent = data[i].post_date;

    var title = document.createElement('h2');
    title.className = 'card-title h4';
    title.textContent = data[i].post_title;

    var readMoreBtn = document.createElement('a');
    readMoreBtn.className = 'btn btn-primary';
    readMoreBtn.href = `${apiUrl}/postviewer/${data[i].post_id}`;
    readMoreBtn.id = `${data[i].post_id}`;
    readMoreBtn.textContent = 'Read more →';
    changeButtonColor(readMoreBtn, universityColor) 
    cardBody.appendChild(date);
    cardBody.appendChild(title);
    cardBody.appendChild(readMoreBtn);
    card.appendChild(cardBody);
    blogEntriesDiv.appendChild(card);

  }
}

// 게시글 불러오기 함수
const fetchPosts = async (category, university_url) => {
  const blogEntriesDiv = document.querySelector(".blog-entries");

  if (!blogEntriesDiv) {
    console.error("blogEntriesDiv is null.");
    return;
  }

  // 기존의 게시글 요소들 제거
  while (blogEntriesDiv.firstChild) {
    blogEntriesDiv.removeChild(blogEntriesDiv.firstChild);
  }

  try {
    const url = `${apiUrl}/showPostListbyCategory/${category}/${university_url}`;
    console.log(url);
    const response = await fetch(url);
    const data = await response.json();

    for (var i = 0; i < data.length; i++) {
      var card = document.createElement('div');
      card.className = 'card mb-4';

      var cardBody = document.createElement('div');
      cardBody.className = 'card-body';

      var date = document.createElement('div');
      date.className = 'small text-muted';
      date.textContent = data[i].post_date;

      var title = document.createElement('h2');
      title.className = 'card-title h4';
      title.textContent = data[i].post_title;
     
      var readMoreBtn = document.createElement('a');
      readMoreBtn.className = 'btn btn-primary';
      readMoreBtn.href = `${apiUrl}/postviewer/${data[i].post_id}`;
      readMoreBtn.id = data[i].post_id;
      readMoreBtn.textContent = 'Read more →';
      changeButtonColor(readMoreBtn, universityColor) 
      cardBody.appendChild(date);
      cardBody.appendChild(title);
      cardBody.appendChild(readMoreBtn);
      card.appendChild(cardBody);
      blogEntriesDiv.appendChild(card);

    }
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
};
//로고 클릭시 postAllData()실행
brandNav.addEventListener('click',function(){
  fetchpostAllData();
});

// university_url 값을 받아오는 함수
function getUniversityUrl() {
  const url = new URL(window.location.href);
  const universityUrl = url.pathname.split('/').pop();
  return universityUrl;
}

// 검색 기능
const postSearchBtn = document.querySelector('#postSearchBtn');
var university_posts = [];
const blogEntriesDiv = document.querySelector(".blog-entries");

function searchPost(){
  const universityUrl = getUniversityUrl();
  fetch(`${apiUrl}/getUniversityID/${universityUrl}`)
  .then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(response => {
    // university_id를 university_posts[0]에 저장
    university_posts.push(response);
    // 검색한 게시글 불러오기
    const keyword = document.getElementById('postSearchInput').value;
    fetch(`${apiUrl}/searchPost/${keyword}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      return res.json();
    })
    .then(res => {
      for(let i = 0; i < res.length; i++){
        if(String(res[i].university_id) == String(university_posts[0])){
          university_posts.push(res[i]);
        }
      }
      // 기존 게시글 지운 후 검색된 게시글 나열
      while (blogEntriesDiv.firstChild) {
        blogEntriesDiv.removeChild(blogEntriesDiv.firstChild);
      }
      for (var i = 0; i < res.length; i++) {
        var card = document.createElement('div');
        card.className = 'card mb-4';
  
        var cardBody = document.createElement('div');
        cardBody.className = 'card-body';
  
        var date = document.createElement('div');
        date.className = 'small text-muted';
        date.textContent = res[i].post_date;
  
        var title = document.createElement('h2');
        title.className = 'card-title h4';
        title.textContent = res[i].post_title;
       
        var readMoreBtn = document.createElement('a');
        readMoreBtn.className = 'btn btn-primary';
        readMoreBtn.href = `${apiUrl}/postviewer/${res[i].post_id}`;
        readMoreBtn.id = res[i].post_id;
        readMoreBtn.textContent = 'Read more →';
        changeButtonColor(readMoreBtn, universityColor) 
        cardBody.appendChild(date);
        cardBody.appendChild(title);
        cardBody.appendChild(readMoreBtn);
        card.appendChild(cardBody);
        blogEntriesDiv.appendChild(card);
  
      }

    })
    .catch((error) => {
      console.error('There has been a problem with your fetch operation:', error);
    });
    })
  .catch((error) => {
    console.error('There has been a problem with your fetch operation:', error);
  });
}

postSearchBtn.addEventListener('click',searchPost);
document.addEventListener('keydown', function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
  };
}, true);

// 페이지 로드 후 실행
window.addEventListener('DOMContentLoaded', function () {
  loadloginData();
  fetchpostAllData();
  
});
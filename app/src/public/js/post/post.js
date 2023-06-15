const writePostBtn = document.getElementById('write_post_btn');
let userInfo; // 유저정보

// 작성자 회원 정보 불러오기
const loadloginData = () => {
  const url = `http://localhost:8080/loginStatus`;
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
      loginStatusBtn.setAttribute("href", "http://localhost:8080/logout");
      loginStatusBtn.innerText="로그아웃"
      signUpBtn.setAttribute("href", "http://localhost:8080/mypage");
      signUpBtn.innerText="마이페이지"
  }
  else{
      loginStatusBtn.setAttribute("href", "http://localhost:8080/login");
      loginStatusBtn.innerText="로그인"
      signUpBtn.setAttribute("href", "http://localhost:8080/signup");
      signUpBtn.innerText="회원가입"
  }
  
}

// writePostBtn.addEventListener('click', function () {
//   if (userInfo.loginStatus) {
//     // 경로를 변경하고자 하는 URL로 설정합니다.
//     var newLocation = `http://localhost:3000/postform/${userInfo.university_url}`;

//     // 현재 창의 경로를 변경합니다.
//     window.location.href = newLocation;
//   } else {
//     alert("로그인 후에 게시글을 작성할 수 있습니다.");
//   }
// });

var currentUrl = window.location.href;
var university_url = currentUrl.split("/").pop();

// 카테고리 버튼 요소들을 선택합니다.
const affiliateRegistrationBtn = document.getElementById('affiliate_registration');
const affiliateReferralBtn = document.getElementById('affiliate_referral');
const affiliateofferBtn = document.getElementById('affiliate_offer');
const announcementBtn = document.getElementById('announcement');
const chatBtn = document.getElementById('chat');
const storePromotionBtn = document.getElementById('store_promotion');

const row = document.querySelector('.row');
const col = document.querySelector('.col');

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

  const url = `http://localhost:8080/postAll/${university_url}`;
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
    readMoreBtn.href = `http://localhost:8080/postviewer/${data[i].post_id}`;
    readMoreBtn.id = data[i].post_id;
    readMoreBtn.textContent = 'Read more →';

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
    const url = `http://localhost:8080/showPostListbyCategory/${category}/${university_url}`;
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
      readMoreBtn.href = `http://localhost:8080/postviewer/${data[i].post_id}`;
      readMoreBtn.id = data[i].post_id;
      readMoreBtn.textContent = 'Read more →';

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

// 페이지 로드 후 실행
window.addEventListener('DOMContentLoaded', function () {
  loadloginData();
  fetchpostAllData();
});







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
const loginStatusBtn = document.getElementById("loginStatusBtn");
const signUpBtn = document.getElementById("signUpBtn");
const navBar = document.getElementById("navbar-brand");

const setLoginHeader = (res) => {
  navBar.setAttribute("href", `${apiUrl}/showPostListAll/${university_url}`);
  if (res.loginStatus) {
    loginStatusBtn.setAttribute("href", `${apiUrl}/logout`);
    loginStatusBtn.innerText = "로그아웃"
    signUpBtn.setAttribute("href", `${apiUrl}/mypage`);
    signUpBtn.innerText = "마이페이지"
  }
  else {
    loginStatusBtn.setAttribute("href", `${apiUrl}/login`);
    loginStatusBtn.innerText = "로그인"
    signUpBtn.setAttribute("href", `${apiUrl}/signup`);
    signUpBtn.innerText = "회원가입"
  }

}
const writePostBtn = document.getElementById('write_post_btn');
const brandNav = document.getElementById('navbar-brand');

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

changeUniversityName(university_url) //학교 이름으로 변경

//학교 이름 바꾸기
function changeUniversityName(university_url) {
  const universityNameElement = document.getElementById('university_name');
  if (university_url === "sungshin") {
    universityNameElement.textContent = '성신여자대학교 Unity';
  } else if (university_url === "konkuk") {
    universityNameElement.textContent = '건국대학교 Unity';
  } else {
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

affiliateRegistrationBtn.addEventListener('click', function () {
  window.location.href = `${apiUrl}/partner/${university_url}`; // 제휴 등록은 제휴가게 페이지로 이동
  return; // 리다이렉션 후 함수 종료
})

let currentCategory = ""; // 선택한 카테고리를 기억하는 변수

// 카테고리 버튼 클릭 이벤트 리스너를 추가합니다.
announcementBtn.addEventListener('click', function () {
  currentCategory = "announcement"; // 선택한 카테고리 업데이트
  currentPage = 1;
  fetchPosts(currentCategory, university_url); // 해당 카테고리의 게시글 불러오기
});

affiliateReferralBtn.addEventListener('click', function () {
  currentCategory = "affiliate_referral"; // 선택한 카테고리 업데이트
  currentPage = 1;
  fetchPosts(currentCategory, university_url); // 해당 카테고리의 게시글 불러오기
});

affiliateofferBtn.addEventListener('click', function () {
  currentCategory = "affiliate_offer"; // 선택한 카테고리 업데이트
  currentPage = 1;
  fetchPosts(currentCategory, university_url); // 해당 카테고리의 게시글 불러오기
});

chatBtn.addEventListener('click', function () {
  currentCategory = "chat"; // 선택한 카테고리 업데이트
  currentPage = 1;
  fetchPosts(currentCategory, university_url); // 해당 카테고리의 게시글 불러오기
});

storePromotionBtn.addEventListener('click', function () {
  currentCategory = "store_promotion"; // 선택한 카테고리 업데이트
  currentPage = 1;
  fetchPosts(currentCategory, university_url); // 해당 카테고리의 게시글 불러오기
});

let currentPage = 1; // 현재 페이지 수
const postsPerPage = 10; // 한 페이지에 보여줄 게시글 수
let postsToShowLength = 0; // 현재 한 페이지에 보여줄 게시글 수
let dataLength = 0; // 보여줄 총 게시글 수

// 게시글 전체 보기
const fetchpostAllData = async () => {
  currentCategory = "";
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const url = `${apiUrl}/postAll/${university_url}`;
  const response = await fetch(url);
  const data = await response.json();
  dataLength = data.length;
  const postsToShow = data.slice(startIndex, endIndex);
  postsToShowLength = postsToShow.length;

  const cardContainer = document.getElementById("card_container");

  if (!cardContainer) {
    //console.error("card_container is null.");
    return;
  }

  // 기존의 게시글 요소들 제거
  while (cardContainer.firstChild) {
    cardContainer.removeChild(cardContainer.firstChild);
  }

  for (let i = 0; i < postsToShowLength; i++) {
    createCard(postsToShow[i]);
  }
  updatePagination(currentPage, postsToShowLength);
};


// 카테고리 선택시 게시글 불러오기 함수
const fetchPosts = async (category, university_url) => {
  console.log("currentCategory " + currentCategory);
  if (currentCategory === "") { // 카테고리 선택 안 했으면 모든 게시글 로드하도록
    fetchpostAllData();
    return;
  }

  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;

  const card_container = document.getElementById("card_container");

  if (!card_container) {
    console.error("card_container is null.");
    return;
  }

  // 기존의 게시글 요소들 제거
  while (card_container.firstChild) {
    card_container.removeChild(card_container.firstChild);
  }

  try {
    const url = `${apiUrl}/showPostListbyCategory/${category}/${university_url}`;
    console.log(url);
    const response = await fetch(url);
    const data = await response.json();
    dataLength = data.length;

    const postsToShow = data.slice(startIndex, endIndex);
    postsToShowLength = postsToShow.length;
    for (let i = 0; i < postsToShowLength; i++) {
      createCard(postsToShow[i]);
    }
    updatePagination(currentPage, postsToShowLength);
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
};

function createCard(data) {
  // console.log(data)
  // let post_title = document.getElementById('post_title').textContent = data.post_title;
  // let post_content = document.getElementById('post_content').textContent = data.post_content;
  // //게시글 제목이 30자이상이면 나머지 문자열 ...처리
  // if (data.post_title.length > 30) {
  //     post_title = truncateText('post_title', 30, data.post_title);
  // }
  // //게시글 내용이 100글자 이상이면 나머지 문자열 ...처리
  // if (data.post_content.length > 100) {
  //     post_content = truncateText('post_content', 100, data.post_content);
  // }

  const cardContainer = document.getElementById('card_container');

  // Create a new card element
  const cardElement = document.createElement('div');
  cardElement.classList.add('mb-4', 'card');

  // Fill in the card template with data
  cardElement.innerHTML = `
      <div class="card-body d-flex justify-content-between">
          <div>
              <div class="small text-muted">${data.post_date}</div>
              <h2 class="card-title h4 mt-2">${data.post_title}</h2>
          </div>
          <div>
          <a class="btn read-more-btn btn-outline-secondary" href="${apiUrl}/postviewer/${data.post_id}">게시글 보러가기 →</a>
          </div>
      </div>

      <div class="card-text ps-3 d-flex justify-content-between mb-2">
          <p class="small text-muted">${data.category}</p>
      </div>
      <div class="card-text ps-3 d-flex">
          <img width="24" height="24" src="https://img.icons8.com/color/48/filled-like.png" style="margin-right: 0.3rem;"  alt="filled-like" />
          <p class="small text-muted" style="margin-right: 1rem;" >${data.like_count}</p>
          <img width="24" height="24" src="https://img.icons8.com/fluency/48/filled-star.png" style="margin-right: 0.3rem; margin-bottom:0.3rem" alt="filled-star"/>
          <p class="small text-muted" style="margin-right: 1rem;">${data.scrap_count}</p>
          <img width="24" height="24" src="https://img.icons8.com/color/48/speech-bubble-with-dots.png" style="margin-right: 0.3rem;" alt="speech-bubble-with-dots"/>
          <p class="small text-muted" style="margin-right: 1rem;">${data.comment_count}</p>
          <img width="24" height="24" src="https://img.icons8.com/external-yogi-aprelliyanto-flat-yogi-aprelliyanto/32/external-click-marketing-and-seo-yogi-aprelliyanto-flat-yogi-aprelliyanto.png" style="margin-right: 0.3rem;" alt="external-click-marketing-and-seo-yogi-aprelliyanto-flat-yogi-aprelliyanto"/>
          <p class="small text-muted" style="margin-right: 1rem;">${data.view_count}</p>
          </div>
  `;
  // Append the card to the container
  cardContainer.appendChild(cardElement);
}

//로고 클릭시 postAllData()실행
brandNav.addEventListener('click', function () {
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
const cardContainer = document.getElementById("card_container");

function searchPost() {
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
          for (let i = 0; i < res.length; i++) {
            if (String(res[i].university_id) == String(university_posts[0])) {
              university_posts.push(res[i]);
            }
          }
          // 기존 게시글 지운 후 검색된 게시글 나열
          while (cardContainer.firstChild) {
            cardContainer.removeChild(cardContainer.firstChild);
          }
          for (var i = 0; i < res.length; i++) {
            createCard(res[i])
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

postSearchBtn.addEventListener('click', searchPost);
document.addEventListener('keydown', function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
  };
}, true);

// 페이지 로드 후 실행
window.addEventListener('DOMContentLoaded', function () {
  loadloginData();
  fetchPosts();
});

const previouspage = document.getElementById('first_page'); // 첫 번째 숫자 버튼
const currentpage = document.getElementById('second_page'); // 두 번째 숫자 버튼
const nextpage = document.getElementById('third_page'); // 세 번째 숫자 버튼
const pageBtns = document.getElementsByClassName("page-item");
const newer = document.getElementById('previous_page'); // 이전 버튼
const older = document.getElementById('next_page'); // 다음 버튼
const lastpage = document.getElementById('last_page'); // 마지막 15 페이지 버튼

// Add event listeners to each page button
for (let i = 0; i < pageBtns.length; i++) {
  pageBtns[i].addEventListener('click', function () {
    const clickedPageNum = parseInt(this.firstChild.innerText);
    if (!isNaN(clickedPageNum)) {
      goToPage(clickedPageNum);
    }
  });
}

// 페이지네이션 업데이트
function updatePagination(currentPage, postsToShowLength) {
  initializeBtns();
  if (dataLength <= 140) { // 총 게시글 140개 이하면 15페이지로 바로 가지 못하도록
    lastpage.classList.toggle('disabled');
  }
  if (dataLength <= 10) { // 총 게시글 10개 이하면 첫 페이지만 있도록
    currentpage.classList.toggle('disabled');
  }
  else if (dataLength <= 20) { // 20개 이하면 
    if (currentPage === 1) { // 첫 페이지일 때 세 번째 페이지로 이동하지 못하도록
      nextpage.classList.toggle('disabled');
    }
  }
  if (currentPage * postsPerPage > dataLength) { // 게시글 수보다 더 많은 페이지로는 이동하지 못하도록
    nextpage.classList.toggle('disabled');
    older.classList.toggle('disabled');
  }

  if (currentPage === 1) { // 현재 페이지가 1일 때
    currentpage.classList.remove('active');
    previouspage.classList.add('active');
    nextpage.classList.remove('active');
    previouspage.firstChild.innerText = 1;
    currentpage.firstChild.innerText = 2;
    nextpage.firstChild.innerText = 3;
  }
  else if (currentPage === 15) { // 현재 페이지가 15일 때
    currentpage.classList.remove('active');
    nextpage.classList.add('active');
    previouspage.classList.remove('active');
    previouspage.firstChild.innerText = 13;
    currentpage.firstChild.innerText = 14;
    nextpage.firstChild.innerText = 15;
  }
  else { // 그 외
    previouspage.firstChild.innerText = currentPage - 1;
    currentpage.firstChild.innerText = currentPage;
    nextpage.firstChild.innerText = currentPage + 1;

    // 모든 페이지에 active 속성 제거
    for (let i = 0; i < pageBtns.length; i++) {
      pageBtns[i].classList.remove('active');
    }
    // 현재 페이지에 active 속성 부여
    currentpage.classList.add('active');
  }
}

// 버튼 초기화
function initializeBtns() {
  previouspage.classList.remove('disabled');
  currentpage.classList.remove('disabled');
  nextpage.classList.remove('disabled');
  lastpage.classList.remove('disabled');
  newer.classList.remove('disabled');
  older.classList.remove('disabled');
}

// 특정 페이지 이동
function goToPage(pageNum) {
  currentPage = pageNum;
  console.log("Navigating to page: " + currentPage);
  fetchPosts(currentCategory, university_url);
}

// 다음 페이지로 이동 함수
function goToNextPage() {
  console.log("goToNextPage");
  // 다음 페이지 번호 계산
  currentPage = currentPage + 1;
  // 페이지네이션 클래스 변경
  if (currentPage <= 15) {
    goToPage(currentPage);
  }
}

// 이전 페이지로 이동 함수
function goToPrevPage() {
  console.log("goToPrevPage");
  // 다음 페이지 번호 계산
  currentPage = currentPage - 1;
  // 페이지네이션 클래스 변경
  if (currentPage >= 1) {
    goToPage(currentPage);
  }
}

// 다음/이전 페이지 이벤트리스너
document.addEventListener('DOMContentLoaded', function () {
newer.addEventListener('click', function () {
  if (currentPage >= 2) {
    goToPrevPage();
  }
})

older.addEventListener('click', function () {
  if (currentPage <= 14) {
    goToNextPage();
  }
})
})
// document.addEventListener('DOMContentLoaded', function() {
//   var newer = document.getElementById('newer');
//   var older = document.getElementById('older');
//   var currentPage = 2; // Assume you have defined currentPage somewhere.

//   if (newer) {
//     newer.addEventListener('click', function() {
//       if (currentPage >= 2) {
//         goToPrevPage();
//       }
//     });
//   } else {
//     console.error("Element with id 'newer' not found.");
//   }

//   if (older) {
//     older.addEventListener('click', function() {
//       if (currentPage <= 14) {
//         goToNextPage();
//       }
//     });
//   } else {
//     console.error("Element with id 'older' not found.");
//   }
// });

// your_controller_file_path.js
const doDeletePost = (req, res) => {
  const post_id = req.params.post_id;
  const user_email = req.body.user_email; // 요청 본문에서 user_email을 가져옵니다.

  // post_id와 user_email을 사용하여 게시글을 삭제하는 로직을 여기에 작성합니다.
  // 예를 들어, 게시글 삭제를 처리하는 deletePost 함수를 사용한다고 가정합니다.
  doDeletePost(post_id, user_email)
    .then(() => {
      res.status(200).json({ message: '게시글이 성공적으로 삭제되었습니다!' });
    })
    .catch((error) => {
      res.status(500).json({ error: '게시글 삭제 중에 오류가 발생했습니다.' });
    });
};



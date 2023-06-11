const { post } = require("request");
const { getPostListbyCategory } = require("../../../models/PostStorage");

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


writePostBtn.addEventListener('click', function () {

  if (userInfo.loginStatus) {
    // 경로를 변경하고자 하는 URL로 설정합니다.
    var newLocation = `http://localhost:3000/postform/${userInfo.university_url}`;

    // 현재 창의 경로를 변경합니다.
    window.location.href = newLocation;
  }
  else {
    alert("로그인 후에 게시글을 작성할 수 있습니다.");
  }

});


// // API를 호출하는 URL
// const url = `http://localhost:3000/showPostListbyCategory/${category}/${university_url}`;

// // API 호출 및 데이터 가져오기
// fetch(url)
//   .then(response => response.json())
//   .then(data => {
//     // Blog entries를 감싸는 div 요소
//     const blogEntriesDiv = document.createElement('div');
//     blogEntriesDiv.classList.add('col-lg-12');

//     // 데이터 배열을 순회하면서 HTML 코드 생성
//     data.forEach(item => {
//       // Non-featured blog posts를 감싸는 div 요소
//       const nestedRowDiv = document.createElement('div');
//       nestedRowDiv.classList.add('row');

//       // col-lg-4 요소
//       const colDiv = document.createElement('div');
//       colDiv.classList.add('col-lg-4');

//       // card mb-4 요소
//       const cardDiv = document.createElement('div');
//       cardDiv.classList.add('card', 'mb-4');

//       // card-body 요소
//       const cardBodyDiv = document.createElement('div');
//       cardBodyDiv.classList.add('card-body');

//       // small text-muted 요소 (날짜)
//       const dateDiv = document.createElement('div');
//       dateDiv.classList.add('small', 'text-muted');
//       dateDiv.textContent = item.post_date;
//       dateDiv.id = 'post_date'; // ID 추가

//       // card-title 요소 (제목)
//       const titleH2 = document.createElement('h2');
//       titleH2.classList.add('card-title', 'h4');
//       titleH2.textContent = item.post_title;
//       titleH2.id = 'post_title'; // ID 추가

//       // card-text 요소 (내용)
//       const contentP = document.createElement('p');
//       contentP.classList.add('card-text');
//       contentP.textContent = item.post_content;
//       contentP.id = 'post_content'; // ID 추가

//       // Read more 링크
//       const readMoreLink = document.createElement('a');
//       readMoreLink.classList.add('btn', 'btn-primary');
//       readMoreLink.href = '#!';
//       readMoreLink.textContent = 'Read more →';
//       readMoreLink.id = 'read_more_btn'; // ID 추가

//       // 요소들을 구조에 맞게 추가
//       cardBodyDiv.appendChild(dateDiv);
//       cardBodyDiv.appendChild(titleH2);
//       cardBodyDiv.appendChild(contentP);
//       cardBodyDiv.appendChild(readMoreLink);
//       cardDiv.appendChild(cardBodyDiv);
//       colDiv.appendChild(cardDiv);
//       nestedRowDiv.appendChild(colDiv);
//       blogEntriesDiv.appendChild(nestedRowDiv);
//     });

//     // 최종 생성된 HTML 코드를 원하는 위치에 추가
//     const container = document.getElementById('postid_'); // 컨테이너 요소의 ID를 지정해야 함
//     container.appendChild(blogEntriesDiv);
//   })
//   .catch(error => console.error('Error:', error));


//   //page 로드 후 loadData()실행
// window.addEventListener('DOMContentLoaded', function()
// {
//   loadloginData(getPostListbyCategory);
//   //게시글 불러오기 함수명
// }

// );


// // 카테고리 버튼 요소들을 선택합니다.
const newsBtn = document.getElementById('coop_news');
const studentBtn = document.getElementById('coop_student');
const retailerBtn = document.getElementById('coop_retailer');
const noticeBtn = document.getElementById('notice');
const chatBtn = document.getElementById('chat');
const storePrBtn = document.getElementById('store_pr');

// // 카테고리 버튼 클릭 이벤트 리스너를 추가합니다.
newsBtn.addEventListener('click', function() {
  fetchPosts(announcement)
  redirectToCategoryPage('총학생회 공지사항');
});

studentBtn.addEventListener('click', function() {
  redirectToCategoryPage('제휴 추천');
});

retailerBtn.addEventListener('click', function() {
  redirectToCategoryPage('제휴 제안');
});

noticeBtn.addEventListener('click', function() {
  redirectToCategoryPage('제휴 소식');
});

chatBtn.addEventListener('click', function() {
  redirectToCategoryPage('잡담');
});

storePrBtn.addEventListener('click', function() {
  redirectToCategoryPage('가게 홍보');
});

// // 카테고리 페이지로 이동하는 함수
// function redirectToCategoryPage(showPostListAll) {
//   // 경로를 변경하고자 하는 URL로 설정합니다.
//   const newLocation = `http://localhost:3000/post/${category}/${university_url}`;

//   // 현재 창의 경로를 변경합니다.
  window.location.href = newLocation;


function fetchPosts(category, university_url) {

  const url = `http://localhost:3000/showPostListbyCategory/${category}/${university_url}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      // 데이터 처리 및 HTML 코드 생성
      const blogEntriesDiv = document.createElement('div');
      blogEntriesDiv.classList.add('col-lg-12');

      data.forEach(item => {
        // HTML 코드 생성 과정 생략 (위의 코드 참고)

        // 요소들을 구조에 맞게 추가
        // ...

        blogEntriesDiv.appendChild(nestedRowDiv);
      });

      // 최종 생성된 HTML 코드를 원하는 위치에 추가
      const container = document.getElementById('your-container-id'); // 실제 컨테이너 ID로 대체해주세요
      container.appendChild(blogEntriesDiv);
    })
    .catch(error => console.error('Error:', error));
}




//API를 호출하는 URL
const url = `http://localhost:3000/showPostListbyCategory/${category}/${university_url}`;

// API 호출 및 데이터 가져오기
fetch(url)
  .then(response => response.json())
  .then(data => {
    // Blog entries를 감싸는 div 요소
    const blogEntriesDiv = document.createElement('div');
    blogEntriesDiv.classList.add('col-lg-12');

    // 데이터 배열을 순회하면서 HTML 코드 생성
    data.forEach(item => {
      // Non-featured blog posts를 감싸는 div 요소
      const nestedRowDiv = document.createElement('div');
      nestedRowDiv.classList.add('row');

      // col-lg-4 요소
      const colDiv = document.createElement('div');
      colDiv.classList.add('col-lg-4');

      // card mb-4 요소
      const cardDiv = document.createElement('div');
      cardDiv.classList.add('card', 'mb-4');

      // card-body 요소
      const cardBodyDiv = document.createElement('div');
      cardBodyDiv.classList.add('card-body');

      // small text-muted 요소 (날짜)
      const dateDiv = document.createElement('div');
      dateDiv.classList.add('small', 'text-muted');
      dateDiv.textContent = item.post_date;
      dateDiv.id = 'post_date'; // ID 추가

      // card-title 요소 (제목)
      const titleH2 = document.createElement('h2');
      titleH2.classList.add('card-title', 'h4');
      titleH2.textContent = item.post_title;
      titleH2.id = 'post_title'; // ID 추가

      // card-text 요소 (내용)
      const contentP = document.createElement('p');
      contentP.classList.add('card-text');
      contentP.textContent = item.post_content;
      contentP.id = 'post_content'; // ID 추가

      // Read more 링크
      const readMoreLink = document.createElement('a');
      readMoreLink.classList.add('btn', 'btn-primary');
      readMoreLink.href = '#!';
      readMoreLink.textContent = 'Read more →';
      readMoreLink.id = 'read_more_btn'; // ID 추가

      // 요소들을 구조에 맞게 추가
      cardBodyDiv.appendChild(dateDiv);
      cardBodyDiv.appendChild(titleH2);
      cardBodyDiv.appendChild(contentP);
      cardBodyDiv.appendChild(readMoreLink);
      cardDiv.appendChild(cardBodyDiv);
      colDiv.appendChild(cardDiv);
      nestedRowDiv.appendChild(colDiv);
      blogEntriesDiv.appendChild(nestedRowDiv);
    });

    // 최종 생성된 HTML 코드를 원하는 위치에 추가
    const container = document.getElementById(your - container - id); // 컨테이너 요소의 ID를 지정해야 함
    container.appendChild(blogEntriesDiv);
  })
  .catch(error => console.error('Error:', error));

// 게시글을 불러오는 함수 호출
fetchPosts();

// 페이지 로드 후 실행
window.addEventListener('DOMContentLoaded', function () {
  loadloginData();
});








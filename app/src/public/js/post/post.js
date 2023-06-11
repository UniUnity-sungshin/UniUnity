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
var currentUrl = window.location.href;
var university_url = currentUrl.split("/").pop();


// // 카테고리 버튼 요소들을 선택합니다.
const affiliateRegistrationBtn = document.getElementById('affiliate_registration');
const affiliateReferralBtn = document.getElementById('affiliate_referral');
const affiliateofferBtn = document.getElementById('affiliate_offer');
const announcementBtn = document.getElementById('announcement');
const chatBtn = document.getElementById('chat');
const storePromotionBtn = document.getElementById('store_promotion');

const postDateText = document.getElementById('post_date');
const postTitleText = document.getElementById('post_title');
const viewCountText = document.getElementById('view_count');
const likeCountText = document.getElementById('like_count');
const commnetCountText = document.getElementById('comment_count');
// // 카테고리 버튼 클릭 이벤트 리스너를 추가합니다.
announcementBtn.addEventListener('click', function () {
  fetchPosts("announcement", university_url)

});

affiliateReferralBtn.addEventListener('click', function () {
  fetchPosts("affiliate_referral", university_url)
});

affiliateofferBtn.addEventListener('click', function () {
  fetchPosts("affiliate_offer", university_url)
});

affiliateRegistrationBtn.addEventListener('click', function () {
  //제휴 등록 페이지로 이동
});

chatBtn.addEventListener('click', function () {
  fetchPosts("chat", university_url)
});

storePromotionBtn.addEventListener('click', function () {
  fetchPosts("store_promotion", university_url)
});

// // 카테고리 페이지로 이동하는 함수
// function redirectToCategoryPage(showPostListAll) {
//   // 경로를 변경하고자 하는 URL로 설정합니다.
//   const newLocation = `http://localhost:3000/post/${category}/${university_url}`;


// const fetchPostView =async


const fetchPosts = async (category, university_url) => {

  const url = `http://localhost:3000/showPostListbyCategory/${category}/${university_url}`;
  console.log(url);
  await fetch(url)
    .then(res => res.json())
    .then(data => {
      for (var i = 0; i < data.length; i++) {

        post_id =data[i].post_id;
        // <div class="row"> 요소 선택
        var row = document.querySelector('.row');
      
        // 새로운 <div class="col-lg-4"> 요소 생성
        var col = document.createElement('div');
        col.className = 'col-lg-4';
      
        // 새로운 <div class="card mb-4"> 요소 생성
        var card = document.createElement('div');
        card.className = 'card mb-4';
      
        // 새로운 <div class="card-body"> 요소 생성
        var cardBody = document.createElement('div');
        cardBody.className = 'card-body';
      
        // <div class="small text-muted" id="post_date"> 요소 생성
        var date = document.createElement('div');
        date.className = 'small text-muted';
        date.id = 'post_date';
        date.textContent = data[i].post_date;
      
        // <h2 class="card-title h4" id="post_title"> 요소 생성
        var title = document.createElement('h2');
        title.className = 'card-title h4';
        title.id = 'post_title';
        title.textContent = data[i].post_title;
      
        // <p class="card-text" id="post_content"> 요소 생성
        // var content = document.createElement('p');
        // content.className = 'card-text';
        // content.id = 'view_count';
        // content.textContent = `조회수:${data[i].view_count}`;

        // var content = document.createElement('p');
        // content.className = 'card-text';
        // content.id = 'like_count';
        // content.textContent = `좋아요:${data[i].like_count}`;

        // var content = document.createElement('p');
        // content.className = 'card-text';
        // content.id = 'comment_count';
        // content.textContent =`댓글수:${data[i].comment_count}`;
 
        // <a class="btn btn-primary" id="read_more_btn" href="#!"> 요소 생성
        var readMoreBtn = document.createElement('a');
        readMoreBtn.className = 'btn btn-primary';
        readMoreBtn.id = 'read_more_btn';
        readMoreBtn.href = '#!';
        readMoreBtn.textContent = 'Read more →';
      
        
        // 생성한 요소들을 상위 요소에 추가
        cardBody.appendChild(date);
        cardBody.appendChild(title);
        cardBody.appendChild(readMoreBtn);
        card.appendChild(cardBody);
        col.appendChild(card);
        row.appendChild(col);
      }

      // readMoreBtn.addEventListener('click', function () {
      //   console.log(post_id);
      //   //포스트 불러오기 fetch()
      // fetch함수->http://localhost:3000/postviewer/{post_id}

      // });


    })
    .catch(error => console.error('Error:', error));
}




// API 호출 및 데이터 가져오기
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
//     const container = document.getElementById(your - container - id); // 컨테이너 요소의 ID를 지정해야 함
//     container.appendChild(blogEntriesDiv);
//   })
//   .catch(error => console.error('Error:', error));

// // 게시글을 불러오는 함수 호출
// fetchPosts();

// 페이지 로드 후 실행
window.addEventListener('DOMContentLoaded', function () {
  loadloginData();
});








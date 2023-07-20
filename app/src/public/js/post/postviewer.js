var currentUrl = window.location.href;
var post_id = currentUrl.split("/").pop();
console.log(post_id);
// console.log(comment_id);

var userInfo; // 유저정보

// 작성자 회원 정보 불러오기
const loadloginData = async () => {
  const url = `${apiUrl}/loginStatus`;
  await fetch(url)
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      userInfo = res;
    })
    .catch((error) => {
      console.error('작성자 회원 정보 불러오기 오류', error);
    });
};

var postInfo; // 게시글 정보
// 게시글 정보 불러오기
const loadPostData = async () => {
  try {
    // const url = `${apiUrl}/showPost/${post_id}`;
    // await fetch(url)
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log(data);
    //     postInfo = data;
    const url = `${apiUrl}/showPost/${post_id}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    postInfo = data;

    const postTitle = document.getElementById('post_title');
    const postCategory = document.getElementById('post_category');
    const postDate = document.getElementById('post_date');
    const postContent = document.getElementById('post_content');
    const viewCount = document.getElementById('view_count');
    const likeCount = document.getElementById('like_count');
    const commentCount = document.getElementById('comment_count');

    const userEmail = document.getElementById('user_email');
    // const readMoreBtn = document.getElementById('read_more_btn');

    postTitle.textContent = postInfo.post_title;
    postCategory.textContent = postInfo.category;
    postDate.textContent = postInfo.post_date;
    postContent.textContent = postInfo.post_content;
    viewCount.textContent = `조회수 ${postInfo.view_count}`;
    likeCount.textContent = `좋아요 ${postInfo.like_count}개`;
    commentCount.textContent = `댓글 ${postInfo.comment_count}개`;
    userEmail.textContent = postInfo.user_email;




    //read more버튼 누르면 조회수 1 증가 -> db에 요청
    // async function increaseViewCount(post_id, view_count) {
    //   try {//increaseViewCount
    //     const url = `${apiUrl}/postviewer/${post_id}`;
    //     const response = await fetch(url, {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify({ view_count }),
    //     });
    //     const data = await response.json();
    //     return { success: true, view_count: data.view_count };
    //   } catch (error) {
    //     console.error('조회수 증가 요청 중 오류 발생', error);
    //     return { success: false, msg: error };
    //   }
    // }

    // // 이벤트리스너
    // readMoreBtn.addEventListener('click', async () => {
    //   try {
    //     // 서버에 조회수 증가 요청을 보내고, 증가된 조회수를 받아옵니다.
    //     const response = await increaseViewCount(post_id, postInfo.view_count);
    //     if (response.success) {
    //       // 조회수가 성공적으로 증가되었을 때의 동작을 작성합니다.
    //       postInfo.view_count = response.view_count;
    //       viewCount.textContent = `조회수 ${postInfo.view_count}`;
    //       await updateViewCountInDatabase(post_id, postInfo.view_count);
    //     } else {
    //       console.error('조회수 증가 실패');
    //     }
    //   } catch (error) {
    //     console.error('조회수 증가 요청 중 오류 발생', error);
    //   }
    // });

    // //업데이트된 조회수 받아오기
    // async function updateViewCountInDatabase(post_id, view_count) {
    //   try {
    //     const url = `${apiUrl}/postviewer/${post_id}`;
    //     const response = await fetch(url, {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify({ view_count }),
    //     });
    //     const data = await response.json();
    //     return { success: true, msg: data.msg };
    //   } catch (error) {
    //     console.error('데이터베이스 조회수 업데이트 중 오류 발생', error);
    //     return { success: false, msg: error };
    //   }
    // }


    const viewer = toastui.Editor.factory({
      el: document.querySelector('.toast-custom-viewer'),
      viewer: true,
      height: '1000px',
      initialValue: postInfo.post_content,
    });
  }
  catch (error)  {
  console.error('게시글 정보 불러오기 오류', error);
}

// page 로드 후 loadData() 실행
};


window.addEventListener('DOMContentLoaded', async function () {
  loadloginData();
  loadPostData();
});


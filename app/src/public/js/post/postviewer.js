var currentUrl = window.location.href;
var post_id = currentUrl.split("/").pop();
console.log(post_id);
// console.log(comment_id);

var userInfo; // 유저정보
var university_url;
var postWriterInfo;
const writeCommentBtn = document.getElementById('write_comment_btn');


// 작성자 회원 정보 불러오기
const loadloginData = async () => {
  const url = `${apiUrl}/loginStatus`;
  await fetch(url)
    .then((res) => res.json())
    .then((res) => {
      console.log("유저정보");
      console.log(res);
      userInfo = res;


    })
    .catch((error) => {
      console.error('작성자 회원 정보 불러오기 오류', error);
    });
};

// 게시글 작성자 이메일 가져오기
const postWriter = async (post_id) => {
  const url = `${apiUrl}/getPostWriter/${post_id}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    postWriterInfo = data;

  } catch (error) {
    console.error('게시글 작성자 정보 불러오기 오류', error);
  }
};


// 게시글 삭제 버튼 보이는 조건
async function showDeleteButtonIfNeeded() {
  await postWriter(post_id);
  console.log("postWriterInfo ", postWriterInfo.user_email);
  console.log("userInfo ", userInfo.user_email);
  if (userInfo.user_email === postWriterInfo.user_email) {
    deletePost.style.display = 'block'; // 해당 요소를 보이게 설정
  } else {
    deletePost.style.display = 'none'; // 해당 요소를 숨기게 설정
  }
} 


var postInfo; // 게시글 정보
// 게시글 정보 불러오기
const loadPostData = async () => {
  try {
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
    const scrapCount = document.getElementById('scrap_count');
    const commentCount = document.getElementById('comment_count');
    const deletePost = document.getElementById('delete');
    const userNickname = document.getElementById('user_nickname');
    // const readMoreBtn = document.getElementById('read_more_btn');

    postTitle.textContent = postInfo.post_title;
    postCategory.textContent = postInfo.category;
    postDate.textContent = postInfo.post_date;
    postContent.textContent = postInfo.post_content;
    viewCount.innerHTML = `<img width="24" height="24" src="https://img.icons8.com/external-yogi-aprelliyanto-flat-yogi-aprelliyanto/32/external-click-marketing-and-seo-yogi-aprelliyanto-flat-yogi-aprelliyanto.png" style="margin-right: 0.3rem;" alt="external-click-marketing-and-seo-yogi-aprelliyanto-flat-yogi-aprelliyanto"/> ${postInfo.view_count}`;
    likeCount.innerHTML = `<img width="24" height="24" src="https://img.icons8.com/color/48/filled-like.png" id="like_img" style="margin-right: 0.3rem;" alt="filled-like" /> ${postInfo.like_count}`;
    scrapCount.innerHTML = `<img width="24" height="24" src="https://img.icons8.com/fluency/48/filled-star.png" id="scrap_img" style="margin-right: 0.3rem; " alt="filled-star"/> ${postInfo.scrap_count}`
    commentCount.innerHTML = `<img width="24" height="24" src="https://img.icons8.com/color/48/speech-bubble-with-dots.png" style="margin-right: 0.3rem;" alt="speech-bubble-with-dots"/> ${postInfo.comment_count}`;
    userNickname.textContent = postInfo.user_nickname;
    deletePost.innerHTML = `<img width="24" height="24" src="https://img.icons8.com/?size=512&id=heybTkWFZ8KQ&format=png" style="margin-right: 0.3rem;" />`;

    // 화살표 버튼을 숨기거나 표시하는 함수
    function toggleCarouselButtons(visible) {
      const carouselButtons = document.querySelectorAll('.carousel-control-prev, .carousel-control-next');
      carouselButtons.forEach(button => {
        if (visible) {
          button.style.display = 'block';
        } else {
          button.style.display = 'none';
        }
      });
    }
    console.log(postContent.textContent);
    if (postInfo.category === "총학생회 공지사항") {
      toggleCarouselButtons(true);
      // // 게시글 내용에서 이미지 제거
      // const textContent = postInfo.post_content.replace(/<img[^>]+>/gi, '');
      // console.log("이미지 태그 제거된 본문");
      // console.log(textContent);

      // // text-only content
      // postContent.textContent = textContent;

      // 게시글 정보 로드 후, 이미지 URL 추출 및 카루셀 추가
      const htmlContent = postInfo.post_content;
      const regex = /<img\s+src="([^"]+)"\s+alt="[^"]+"\s+contenteditable="false">/gi;
      const imageUrls = [];
      let match;
      while ((match = regex.exec(htmlContent)) !== null) {
        imageUrls.push(match[1]);
      }
      // console.log(imageUrls.length);
      if (imageUrls.length === 0) {
        toggleCarouselButtons(false);
      }
      else if (imageUrls.length > 0) {
        const imageCarousel = document.getElementById('imageCarousel');
        const carouselInner = imageCarousel.querySelector('.carousel-inner');
        // imageCarousel.style.height = '400px';
        carouselInner.innerHTML = '';

        for (let i = 0; i < imageUrls.length; i++) {
          const imageUrl = imageUrls[i];
          console.log(imageUrls[i]);
          const carouselItem = document.createElement('div');
          carouselItem.classList.add('carousel-item');

          if (i === 0) {
            carouselItem.classList.add('active');
          }

          const imageElement = document.createElement('img');
          imageElement.src = imageUrl;
          imageElement.alt = `이미지 ${i + 1}`;

          carouselItem.appendChild(imageElement);
          carouselInner.appendChild(carouselItem);
        }
      }

      // 댓글 개수를 가져오는 함수
      async function fetchCommentNum(post_id) {
        try {
          const response = await fetch(`/postCommentNum/${post_id}`);
          if (!response.ok) {
            throw new Error('서버 응답이 올바르지 않습니다.');
          }
          const data = await response.json();
          if (data.status === 200) {
            return data.result; // 댓글 개수를 반환
          } else {
            throw new Error(data.msg);
          }
        } catch (error) {
          console.error('서버 응답 에러:', error);
          return -1; // 에러 발생 시 -1을 반환하거나 에러 처리 방식을 선택
        }
      }

      // 댓글 개수를 표시하는 함수
      async function displayCommentNum(post_id) {
        const commentCountElement = document.getElementById('comment_count'); // 댓글 개수를 표시할 HTML 요소 선택
        const commentCount = await fetchCommentNum(post_id); // 댓글 개수 가져오기
        if (commentCount >= 0) {
          commentCountElement.innerHTML = `<img width="24" height="24" src="https://img.icons8.com/color/48/speech-bubble-with-dots.png" style="margin-right: 0.3rem;" alt="speech-bubble-with-dots"/> ${commentCount}`;
        } else {
          commentCountElement.textContent = '댓글 개수를 가져오지 못했습니다.'; // 에러 처리 방식에 따라 메시지 표시
        }
      }

      // 페이지 로드 후 댓글 개수 표시
      window.addEventListener('DOMContentLoaded', function () {
        const post_id = postInfo.post_id; 
        displayCommentNum(post_id);
      });

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
        initialValue: postInfo.post_content.replace(/<img[^>]+>/gi, '')
      });
    }
    else {
      toggleCarouselButtons(false);
      const viewer = toastui.Editor.factory({
        el: document.querySelector('.toast-custom-viewer'),
        viewer: true,
        height: '1000px',
        initialValue: postInfo.post_content,
      });
    }
  }
  catch (error) {
    console.error('게시글 정보 불러오기 오류', error);
  }
  //********* 마이페이지 하트기능 **********//
// post_id 값을 받아오는 함수
function getPostID() {
  const url = new URL(window.location.href);
  const postID = url.pathname.split('/').pop();
  return postID;
}

const likeImg = document.querySelector('#like_img');

// 하트추가 기능
function addHeart() {
  if (userInfo.loginStatus === false) {
    alert("로그인 후에 기능을 사용할 수 있습니다.");
  }
  else {
    //사용자가 이미 해당 게시글에 하트를 눌렀는지 확인
    const postID = getPostID();
    const req = {
      post_id: postID,
      user_email: userInfo.user_email
    };
    fetch(`${apiUrl}/checkHeart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(res => {
        console.log(res);
        // 사용자가 해당게시글에 하트를 누르지 않았을 경우 -> 하트 추가
        if (res.result == false) {
          fetch(`${apiUrl}/addHeart`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(req),
          })
            .then((res) => {
              if (!res.ok) {
                throw new Error('Network response was not ok');
              }
              return res.json();
            })
            .then(res => {
              alert("하트 목록에 추가 되었습니다.");
            })
            .catch((error) => {
              console.error('There has been a problem with your fetch operation:', error);
            });
        }
        // 사용자가 해당게시글에 하트를 눌렀을 경우 -> 하트 삭제
        else {
          fetch(`${apiUrl}/deleteHeart/${res.result.heart_id}`)
            .then((res) => {
              if (!res.ok) {
                throw new Error('Network response was not ok');
              }
              return res.json();
            })
            .then(res => {
              alert("하트 목록에서 삭제 되었습니다.");
            })
            .catch((error) => {
              console.error('There has been a problem with your fetch operation:', error);
            });
        }
      })
      .catch((error) => {
        console.error('There has been a problem with your fetch operation:', error);
      });
  }
}

likeImg.addEventListener('click', function () {
  addHeart();
})

//********* 마이페이지 스크랩기능 **********//
const scrapImg = document.querySelector('#scrap_img');

// 스크랩추가 기능
function addScrap() {
  if (userInfo.loginStatus === false) {
    alert("로그인 후에 기능을 사용할 수 있습니다.");
  }
  else {
    //사용자가 이미 해당 게시글에 스크랩를 눌렀는지 확인
    const postID = getPostID();
    const req = {
      post_id: postID,
      user_email: userInfo.user_email
    };
    fetch(`${apiUrl}/checkScrap`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(res => {
        console.log(res);
        // 사용자가 해당게시글에 스크랩를 누르지 않았을 경우 -> 스크랩 추가
        if (res.result == false) {
          fetch(`${apiUrl}/addScrap`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(req),
          })
            .then((res) => {
              if (!res.ok) {
                throw new Error('Network response was not ok');
              }
              return res.json();
            })
            .then(res => {
              alert("스크랩 목록에 추가 되었습니다.");
            })
            .catch((error) => {
              console.error('There has been a problem with your fetch operation:', error);
            });
        }
        // 사용자가 해당게시글에 스크랩를 눌렀을 경우 -> 스크랩 삭제
        else {
          fetch(`${apiUrl}/deleteScrap/${res.result.scrap_id}`)
            .then((res) => {
              if (!res.ok) {
                throw new Error('Network response was not ok');
              }
              return res.json();
            })
            .then(res => {
              alert("스크랩 목록에서 삭제 되었습니다.");
            })
            .catch((error) => {
              console.error('There has been a problem with your fetch operation:', error);
            });
        }
      })
      .catch((error) => {
        console.error('There has been a problem with your fetch operation:', error);
      });
  }
}

scrapImg.addEventListener('click', function () {
  addScrap();
})
  // page 로드 후 loadData() 실행
};

window.addEventListener('DOMContentLoaded', async function () {
  await loadloginData();
  await loadPostData();
  fetchComments();//댓글 보기
  await showDeleteButtonIfNeeded();
});


var currentUrl = window.location.href;
var post_id = currentUrl.split("/").pop();
console.log(post_id);

var commentInfo; // 댓글정보

const fetchComments = async () => {
  const commentViewerContainer = document.querySelector("#commentViewer");

  if (!commentViewerContainer) {
    console.error("댓글을 표시할 수 없습니다");
    return;
  }

  try {
    const response = await fetch(`${apiUrl}/showComment/postviewer/${post_id}`);
    const data = await response.json();
    const deleteIconImageUrl = 'https://img.icons8.com/?size=512&id=heybTkWFZ8KQ&format=png';

    console.log(data); // 댓글 데이터 확인용 (콘솔 출력)

    // 댓글 컨테이너 초기화
    commentViewerContainer.innerHTML = "";

    data.forEach((comment) => {
      // 댓글 카드 생성
      const commentCardElement = document.createElement('div');
      commentCardElement.classList.add('card', 'p-4');

      // 댓글 정보를 담는 div 요소 생성
      const commentInfoElement = document.createElement('div');
      commentInfoElement.classList.add('row');

      // 유저 이메일 표시
      const userEmailElement = document.createElement('div');
      userEmailElement.classList.add('col-6');
      const userEmailParagraph = document.createElement('p');
      userEmailParagraph.classList.add('fs-4');
      userEmailParagraph.textContent = comment.user_email;
      userEmailElement.appendChild(userEmailParagraph);

      // 댓글 날짜와 좋아요 수를 담는 div 요소 생성
      const subdateLikeCountElement = document.createElement('div');
      subdateLikeCountElement.classList.add('row');
      subdateLikeCountElement.classList.add('col-6', 'text-end');

      // 댓글 날짜 담는 div 요소 생성
      const dateElement = document.createElement('div');
      dateElement.classList.add('col-6', 'text-end');

      // 좋아요 수를 담는 div 요소 생성
      const LikeCountElement = document.createElement('div');
      LikeCountElement.classList.add('col-6', 'text-end');

      // 댓글 날짜 표시
      const commentDateElement = document.createElement('p');
      commentDateElement.classList.add('fs-4');
      commentDateElement.textContent = comment.comment_date;

      // 좋아요 수 표시
      const likeCountElement = document.createElement('p');
      likeCountElement.classList.add('fs-4');
      likeCountElement.textContent = comment.like_count_comment;

      //댓글 삭제
      const deleteCommentElement = document.createElement('div');
      deleteCommentElement.classList.add('col', 'text-end');

      // 댓글 삭제 아이콘 이미지 생성 및 설정
      const deleteIconElement = document.createElement('img');
      deleteIconElement.width = 24;
      deleteIconElement.height = 24;
      deleteIconElement.src = deleteIconImageUrl;
      deleteIconElement.alt = 'Delete Comment';

      deleteIconElement.addEventListener("click", handleDeleteCommentClick);

      deleteCommentElement.appendChild(deleteIconElement);

      deleteCommentElement.appendChild(deleteIconElement);
      const deleteCommentContainer = document.getElementById("delete_comment");

      // 생성한 요소들을 date/LikeCountElement에 추가
      dateElement.appendChild(commentDateElement);
      LikeCountElement.appendChild(likeCountElement);

      subdateLikeCountElement.appendChild(dateElement);
      subdateLikeCountElement.appendChild(LikeCountElement);


      // 생성한 요소들을 commentInfoElement에 추가
      commentInfoElement.appendChild(userEmailElement);
      commentInfoElement.appendChild(subdateLikeCountElement);
      commentInfoElement.appendChild(deleteCommentElement);
      commentInfoElement.appendChild(userEmailElement);
      commentInfoElement.appendChild(subdateLikeCountElement);
      commentInfoElement.appendChild(deleteCommentElement);

      // 댓글 내용 표시
      const commentContentElement = document.createElement('p');
      commentContentElement.classList.add('fs-4');
      commentContentElement.textContent = comment.comment_content;

      // 생성한 요소들을 commentCardElement에 추가
      commentCardElement.appendChild(commentInfoElement);
      commentCardElement.appendChild(commentContentElement);

      // 댓글 컨테이너에 생성한 댓글 카드를 추가
      commentViewerContainer.appendChild(commentCardElement);
    });



  } catch (error) {
    console.error("댓글 불러오기 오류:", error);
  }
};


// const brandNav= document.getElementById('navbar-brand');



writeCommentBtn.addEventListener('click', function () {

  if (userInfo.loginStatus === false) {
    alert("로그인 후에 게시글을 작성할 수 있습니다.");
  }
  else {
    var commentContent = document.querySelector('.comment-form textarea').value;

    if (commentContent.trim().length > 0) {
      // 댓글 등록 API 호출
      fetch(`${apiUrl}/uploadComment/postviewer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          post_id: postInfo.post_id,
          user_email: userInfo.user_email,
          comment_content: commentContent,

        })
      })
        .then(response => response.json())
        .then(data => { //data.status === 201
          if (data.status === 201) {
            console.log(data);
            // 등록 성공한 경우, 등록한 댓글을 프론트엔드에 표시
            // const commentViewer = document.getElementById('comment_content');
            // const commentElement = document.createElement('p');
            // commentElement.textContent = commentContent;
            // commentViewer.appendChild(commentElement);
            fetchComments();


          } else {
            // 등록 실패한 경우, 오류 메시지를 표시하거나 다른 처리를 수행
            console.error('댓글 등록 실패:', data.err);
          }
        })
        .catch(error => {
          console.error('댓글 등록 실패:', error);
        });
    } else {
      alert("댓글 등록 실패.");
    }
  }

});


//버튼 학교상징 색으로 바꾸기
// function setUniversityColor_comment(university_url){
//     let universityColor
//     if(university_url==="sungshin"){
//       universityColor="#6a6fb3"
//     }else if(university_url==="konkuk"){
//       universityColor="#004a26"
//     }else{
//       universityColor="#FFD400" //Uniunity색상
//     }
//     return universityColor;
//   }

//댓글  불러오기
// const showCommentListbyPostID = async () => {
// try {

//   const url = `${apiUrl}/showComment/postviewer/${post_id}`;
//   const response = await fetch(url);
//   const res = await response.json();
//   console.log(res);
//   commentInfo = res;

//       const commentDate = document.getElementById('comment_date');
//       const commentContent = document.getElementById('comment_content');
//       const likeCount = document.getElementById('like_count_comment');
//       const userEmail = document.getElementById('user_email');

//       commentDate.textContent = commentInfo.comment_date;
//       commentContent.textContent = commentInfo.comment_content;
//       likeCount.textContent = `좋아요 ${commentInfo.like_count_comment}개`;
//       userEmail.textContent = commentInfo.user_email;
//     } catch (error){
//       console.error('Error: ');
//     }
//   };



// const changeButtonColorommentViewer = toastui.Editor.factory({
//     el: document.querySelector('.toast-custom-viewer'),
//     viewer: true,
//     height: '1000px',
//     initialValue: commentInfo.comment_content,
//   });

//게시글지우기
const fetchDeletePost = async (post_id, user_email) => {
  try {
    const response = await fetch(`/doDeletePost/${post_id}/${user_email}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }

    })


    if (!response.ok) {
      throw new Error('서버 응답이 올바르지 않습니다.');
    }

    const data = await response.json();

    if (data.result === true) {
      console.log(data);
      alert("게시글이 성공적으로 삭제되었습니다.");
      // 삭제 성공 후 추가 작업이 필요하면 이곳에 추가
      window.location.href = `${apiUrl}/showPostListALL/${userInfo.university_url}`;
    } else {
      console.error('게시글 삭제 실패:', data.err);
      alert("게시글 삭제에 실패하였습니다.");
    }
  } catch (error) {
    console.error('서버 응답 에러:', error);
    alert("서버 응답에 오류가 발생하였습니다.");
  }
};


function handleDeleteClick() {
  const confirmed = window.confirm("삭제하시겠습니까?");

  if (confirmed) {
    const post_id = postInfo.post_id;
    const user_email = userInfo.user_email;

    // 서버로 게시글 삭제 요청
    fetchDeletePost(post_id, user_email); // fetchDeletePost 함수를 호출하여 게시글 삭제
  } else {
    // 삭제 취소 시 처리
  }
}



// 게시글 삭제 아이콘 클릭 이벤트 리스너
const deletePost = document.getElementById("delete");
deletePost.addEventListener("click", handleDeleteClick);



//댓글 지우기
const fetchDeleteComment = async (user_email,comment_id) => {
  try {
    const response = await fetch(`/doDeleteComment/${user_email}/${comment_id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }

    })


    if (!response.ok) {
      throw new Error('서버 응답이 올바르지 않습니다.');
    }

    const data = await response.json();

    if (data.result === true) {
      console.log(data);
      alert("댓글이 성공적으로 삭제되었습니다.");
      window.location.href = `${apiUrl}/postviewer/${post_id}`;
    } else {
      console.error('댓글 삭제 실패:', data.err);
      alert("댓글 삭제에 실패하였습니다.");
    }
  } catch (error) {
    console.error('서버 응답 에러:', error);
    alert("서버 응답에 오류가 발생하였습니다.");
  }
};


function handleDeleteCommentClick() {
  const confirmed = window.confirm("삭제하시겠습니까?");

  if (confirmed) {
    const user_email = userInfo.user_email;
    const comment_id = commentInfo.comment_id

    // 서버로 게시글 삭제 요청
    fetchDeleteComment(user_email,comment_id);
  } else {
    // 삭제 취소 시 처리
  }
}



// 댓글 삭제 아이콘 클릭 이벤트 리스너
const deleteComment = document.getElementById("delete_comment");
deleteComment.addEventListener("click", handleDeleteCommentClick);
// var currentUrl = window.location.href;
// var post_id = currentUrl.split("/").pop();
// console.log(post_id);

// var commentInfo; // 댓글정보

// const fetchComments = async () => {
//   const commentViewerContainer = document.querySelector("#commentViewer");

//   if (!commentViewerContainer) {
//     console.error("댓글을 표시할 수 없습니다");
//     return;
//   }

//   try {
//     const response = await fetch(`${apiUrl}/showComment/postviewer/${post_id}`);
//     const data = await response.json();

//     console.log(data); // 댓글 데이터 확인용 (콘솔 출력)

//     // 댓글 컨테이너 초기화
//     commentViewerContainer.innerHTML = "";

//     data.forEach((comment) => {
//       // 댓글 카드 생성
//       const commentCardElement = document.createElement('div');
//       commentCardElement.classList.add('card', 'p-4');

//       // 유저 이메일 표시
//       const userEmailElement = document.createElement('p');
//       userEmailElement.classList.add('fs-4');
//       userEmailElement.textContent = comment.user_email;

//       // 댓글 날짜 표시
//       const commentDateElement = document.createElement('p');
//       commentDateElement.classList.add('fs-4');
//       commentDateElement.textContent = comment.comment_date;

//       // 좋아요 수 표시
//       const likeCountElement = document.createElement('p');
//       likeCountElement.classList.add('fs-4');
//       likeCountElement.textContent = comment.like_count_comment;

//       // 댓글 내용 표시
//       const commentContentElement = document.createElement('p');
//       commentContentElement.classList.add('fs-4');
//       commentContentElement.textContent = comment.comment_content;

//       // 생성한 요소들을 commentCardElement에 추가합니다.
//       commentCardElement.appendChild(userEmailElement);
//       commentCardElement.appendChild(commentDateElement);
//       commentCardElement.appendChild(likeCountElement);
//       commentCardElement.appendChild(commentContentElement);

//       // 댓글 컨테이너에 생성한 댓글 카드를 추가합니다.
//       commentViewerContainer.appendChild(commentCardElement);
//     });
//   } catch (error) {
//     console.error("댓글 불러오기 오류:", error);
//   }
// };


// // const fetchComments = async () => {
// //     const commentViewer= document.querySelector("#commentViewer");
  
// //     if (!commentViewer) {
// //       console.error("댓글을 표시할 수 없습니다");
// //       return;
// //     }

// //     try {
// //       const response = await fetch(`${apiUrl}/showComment/postviewer/${post_id}`);
// //       const data = await response.json();
  
// //       // 댓글 데이터를 받아와서 HTML에 표시하는 로직을 구현하세요.
// //       console.log(data); // 댓글 데이터 확인용 (콘솔 출력)
// //       const commentViewer = document.getElementById('comment_content');
// //       commentViewer.innerHTML = ""; // 기존 댓글 내용 초기화
  
// //       data.forEach((comment) => {
// //         console.log(comment);
// //         // const commentElement = document.createElement('p');
// //         // commentElement.textContent = comment.comment_content;
// //         // commentViewer.appendChild(commentElement);
// //       });
// //     } catch (error) {
// //       console.error("Error fetching comments:", error);
// //     }
// //   };


// const writeCommentBtn = document.getElementById('write_comment_btn');
// // const brandNav= document.getElementById('navbar-brand');

// writeCommentBtn.addEventListener('click', function () {
//     var commentContent = document.querySelector('.comment-form textarea').value;
  
//     if (commentContent.trim().length > 0) {
//           // 댓글 등록 API 호출
//     fetch(`${apiUrl}/uploadComment/postviewer/${post_id}`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         user_email:"20211125@sungshin.ac.kr",
//         comment_content: commentContent
//       })
//     })
//       .then(response => response.json())
//       .then(data => { //data.status === 201
//         if (data.status===201) {
//           // 등록 성공한 경우, 등록한 댓글을 프론트엔드에 표시
//           const commentViewer = document.getElementById('comment_content');
//           const commentElement = document.createElement('p');
//           commentElement.textContent = commentContent;
//           commentViewer.appendChild(commentElement);
//         } else {
//           // 등록 실패한 경우, 오류 메시지를 표시하거나 다른 처리를 수행
//           console.error('댓글 등록 실패:', data.err);
//         }
//       })
//       .catch(error => {
//         console.error('댓글 등록 실패:', error);
//       });
//   } else {
//     alert("댓글 등록 실패.");
//   }
// });
  
  
// //버튼 학교상징 색으로 바꾸기
// // function setUniversityColor_comment(university_url){
// //     let universityColor
// //     if(university_url==="sungshin"){
// //       universityColor="#6a6fb3"
// //     }else if(university_url==="konkuk"){
// //       universityColor="#004a26"
// //     }else{
// //       universityColor="#FFD400" //Uniunity색상
// //     }
// //     return universityColor;
// //   }

//   //댓글  불러오기
// // const showCommentListbyPostID = async () => {
//   // try {

//   //   const url = `${apiUrl}/showComment/postviewer/${post_id}`;
//   //   const response = await fetch(url);
//   //   const res = await response.json();
//   //   console.log(res);
//   //   commentInfo = res;
  
//   //       const commentDate = document.getElementById('comment_date');
//   //       const commentContent = document.getElementById('comment_content');
//   //       const likeCount = document.getElementById('like_count_comment');
//   //       const userEmail = document.getElementById('user_email');
  
//   //       commentDate.textContent = commentInfo.comment_date;
//   //       commentContent.textContent = commentInfo.comment_content;
//   //       likeCount.textContent = `좋아요 ${commentInfo.like_count_comment}개`;
//   //       userEmail.textContent = commentInfo.user_email;
//   //     } catch (error){
//   //       console.error('Error: ');
//   //     }
//   //   };
  

  
// // const changeButtonColorommentViewer = toastui.Editor.factory({
// //     el: document.querySelector('.toast-custom-viewer'),
// //     viewer: true,
// //     height: '1000px',
// //     initialValue: commentInfo.comment_content,
// //   });

//   window.addEventListener('DOMContentLoaded', () => {
//     fetchComments();//댓글 보기
//   });
let userInfo; // 유저정보

// 작성자 회원 정보 불러오기
const loadloginData = () => {
  const url = `${apiUrl}/loginStatus`;
  fetch(url)
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      userInfo = res;

    })
};

const fetchChangeNickname = async (event) => {
  event.preventDefault(); // 기본 폼 제출 동작을 중단합니다. 닉네임 값이 입력되지 않으면 중단
  const nicknameElement = document.getElementById('nickname');
  console.log(nicknameElement.value);
  console.log(!nicknameElement.value)
  if (!nicknameElement.value) {
    alert('닉네임을 입력해주세요.');
    return 
  }
  else {
    const req = {
      user_email: userInfo.user_email,
      user_nickname: nicknameElement.value
    }
    console.log(req)

    await fetch(`${apiUrl}/mypage/modify/1`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    })
      .then((res) => res.json())
      .then(res => {
        console.log(res);
        if (res.status === 200) {
          alert('닉네임 변경이 완료되었습니다.');
          window.location.href = "/mypage"; // 리다이렉션 처리
        } else {
          alert("서버의 문제로 닉네임변경에 실패했습니다. 다시 시도해주세요.");
        }
      })
      .catch((error) => {
        console.error("Error: ", error);
        alert("서버의 문제로 닉네임변경에 실패했습니다. 다시 시도해주세요.");
      })
  }

}

// 페이지 로드 후 실행
window.addEventListener('DOMContentLoaded', function () {
  loadloginData();

});


let userInfo; // 유저정보

// 작성자 회원 정보 불러오기
const loadloginData = () => {
    const url = `${apiUrl}/loginStatus`;
    fetch(url)
        .then((res) => res.json())
        .then((res) => {
            userInfo = res;

        })
};

//유효한 비밀번호 확인
function validatePassword(password) {
    // 비밀번호의 길이가 8에서 20 사이인지 확인
    if (password.length < 8 || password.length > 20) {
        return false;
    }

    // 비밀번호에 문자와 숫자가 포함되어 있는지 확인
    if (!/\d/.test(password) || !/[a-zA-Z]/.test(password)) {
        return false;
    }

    // 비밀번호에 공백, 특수 문자 또는 이모티콘이 포함되어 있는지 확인
    if (/\s/.test(password) || /[^a-zA-Z0-9]/.test(password)) {
        return false;
    }

    // 모든 조건을 만족하면 true 반환
    return true;
}

const fetchChangePsword = async (event) => {
    event.preventDefault(); // 기본 폼 제출 동작을 중단합니다. 비밀번호 폼이 입력되지 않으면 중단
    const newPwdElement = document.getElementById('new_pwd');
    const newPwdCheckElement =  document.getElementById('new_pwd_check');
    const pwdElement = document.getElementById('pwd');

    if (!newPwdElement.value) {
        alert('새 비밀번호를 입력해주세요.');
        return
    }
    else if(!newPwdCheckElement.value){
        alert('새 비밀번호 확인을 입력해주세요.');
        return
    }
    else if(!validatePassword(newPwdElement.value)){
        alert('유효하지 않은 비밀번호를 입력하셨습니다.');
        return
    }
    else if(newPwdElement.value!=newPwdCheckElement.value){
        alert('새 비밀번호 확인을 실패하셨습니다.');
        return
    } 
    else if(!pwdElement.value){
        alert('현재 비밀번호를 입력해주세요.');
        return
    }
    else if(pwdElement.value===newPwdElement.value){
        alert('현재 비밀번호와 다른 새 비밀번호를 입력해주세요.');
        return
    }    
    else {
        const req = {
            user_email: userInfo.user_email,
            psword:pwdElement.value,
            new_psword:newPwdCheckElement.value
        }
        await fetch(`${apiUrl}/mypage/modify/2`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(req),
        })
            .then((res) => res.json())
            .then(res => {
                if (res.status === 200) {
                    alert('비밀번호 변경이 완료되었습니다.');
                    window.location.href = "/mypage"; // 리다이렉션 처리
                }else if(res.status === 400){ //비밀번호가 틀렸을 경우
                    alert(`${res.err}`);
                } 
                else {
                    alert("서버의 문제로 비밀번호 변경에 실패했습니다. 다시 시도해주세요.");
                }
            })
            .catch((error) => {
                console.error("Error: ", error);
                alert("서버의 문제로 비밀번호 변경에 실패했습니다. 다시 시도해주세요.");
            })
    }

}

// 페이지 로드 후 실행
window.addEventListener('DOMContentLoaded', function () {
    loadloginData();

});


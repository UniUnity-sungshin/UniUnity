let userInfo;

var findBtnElement = document.getElementById("findBtn");

const emailElement = document.getElementById('email');

const fetchForgotPassword = async (event) => {
    event.preventDefault(); // 기본 폼 제출 동작을 중단합니다. 비밀번호 값이 입력되지 않으면 중단

    if (!emailElement.value) {
        alert('이메일을 입력해주세요.');
        return
    }
    else {
        const req = {
            user_email: emailElement.value,
        }

        await fetch(`${apiUrl}/signup/duplicateCheckEmail`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(req),
        })
            .then((res) => res.json())
            .then(res => {
                if (res.status === 200 && res.result === false) {
                    alert('가입하신 이메일로 인증코드를 발송하였습니다. 인증코드를 입력해주세요.');
                } else {
                    alert("입력하신 아이디를 찾을 수 없습니다.");
                }
            })
            .catch((error) => {
                alert("서버의 문제로 비밀번호 찾기에 실패했습니다. 다시 시도해주세요.");
            })
    }

}

// "다음" 버튼에 클릭 이벤트를 추가합니다.
const findBtn = document.getElementById('findBtn');

findBtn.addEventListener('click',() => {
    showEmailAuthentication() //이메일 인증코드창 활성화
    sendAuthEmail() //이메일 인증코드 보내기 
});


// "다음" 버튼을 클릭했을 때 이벤트를 처리하는 함수입니다.
function showEmailAuthentication() {
    const emailAuthGroup = document.getElementById('emailAuthGroup');

    findBtn.style.display='none';
    emailAuthGroup.style.display = 'block';
}

let authenticationCode;
let emailAuthChecked=false;     //이메일 인증 체크
function sendAuthEmail() {
    const req = {
        email: emailElement.value
    };

    fetch(`${apiUrl}/auth/email`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
    })
        .then((res) => res.json())
        .then(res => {
            if (res.status = 201) {
                authenticationCode = res.authentication_code;
            } else {
                console.error("Error", res.err);
            }
        })
        .catch(error => {
            console.error("Error: ", error);
        })
}

//인증코드 확인하기
function compareAuthenticationCode() {
    const authenticationInputText = document.getElementById('emailAuthentication').value;

    if (authenticationInputText === authenticationCode) {
        // 인증번호가 일치하는 경우의 동작을 수행합니다.
        alert('인증이 확인되었습니다.');
        showresetPassword() //새 비밀번호 설정 화면
      
    } else {
        // 인증번호가 일치하지 않는 경우의 동작을 수행합니다.
        alert('인증번호가 일치하지 않습니다. 인증번호를 다시 입력해주세요.');
    }
}
const confirmAuthEmailBtn = document.getElementById('confirmAuthEmailBtn');


confirmAuthEmailBtn.addEventListener('click',() => {
    compareAuthenticationCode() //인증코드 확인하기
});


// "인증 확인" 버튼을 클릭했을 때 이벤트를 처리하는 함수입니다.
function showresetPassword() {
    const resetPasswordGroup = document.getElementById('resetPasswordGroup');

    confirmAuthEmailBtn.style.display='none';
    resetPasswordGroup.style.display = 'block';
}

const modifyBtn = document.getElementById('modifyBtn');

modifyBtn.addEventListener('click',() => {
    fetchChangePsword() //비밀번호 재설정
});

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

    if (!newPwdElement.value) {
        alert('새 비밀번호를 입력해주세요.');
        return
    }
    else if(!newPwdCheckElement.value){
        alert('새 비밀번호 확인을 입력해주세요.');
        return
    }
    else if(!validatePassword(newPwdElement.value)){
        alert(`유효하지 않은 비밀번호를 입력하셨습니다. 비밀번호는 8-20자 길이로 문자와 숫자를 포함해야 하며,
        공백, 특수 문자 또는 그림 이모티콘을 포함하지 않습니다.`);
        return
    }
    else if(newPwdElement.value!=newPwdCheckElement.value){
        alert('새 비밀번호 확인을 실패하셨습니다.');
        return
    }   
    else {
        const req = {
            user_email: emailElement.value,
            new_psword:newPwdCheckElement.value
        }
        await fetch(`${apiUrl}/mypage/modify/3`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(req),
        })
            .then((res) => res.json())
            .then(res => {
                if (res.status === 200) {
                    alert('비밀번호 변경이 완료되었습니다. 로그인 화면으로 이동합니다.');
                    window.location.href = `${apiUrl}/login`; // 리다이렉션 처리
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

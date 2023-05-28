var selectElement = document.getElementById('univ_select');
var emailUrlSpan = document.getElementById("email_url");
var checkbox1 = document.getElementById("inlineCheckbox1");
var checkbox2 = document.getElementById("inlineCheckbox2");
var selectElement2 = document.getElementById('email_url_select');

var emailElement = document.getElementById('email');
var nicknameElement = document.getElementById('user_nickname');
var nameElement = document.getElementById('user_name');
var passwordInput = document.getElementById("password");
var confirmPasswordInput = document.getElementById("confirmPassword");
var registerBtn = document.getElementById("registerBtn");
var backBtn = document.getElementById("backBtn");

//처음으로 버튼
backBtn.addEventListener('click', () => {
  window.location.href = '/';
});


var universitySearchList = [];
const loadData = async () => {
    const url = `http://localhost:3000/showUniversityNameList`;
    await fetch(url, {
        headers: {
            'Cookie': `connect.sid=${document.cookie}` // connect.sid 쿠키를 요청 헤더에 포함
        }
    })
        .then((res) => res.json())
        .then(res => {
            addSelectUniversityMenu(res);
        }
        )
}
//학교 추가
const addSelectUniversityMenu = (suggestArr) => {
    let i = 0;
    suggestArr.forEach((el, idx) => {
        universitySearchList.push(el);
        let option = document.createElement('option');
        option.value = i++;
        option.textContent = el.university_name;
        selectElement.appendChild(option);
    }
    )
}

var selectedValue = "";
selectElement.addEventListener('change', function () {
    selectedValue = this.value;
    let university_checked = selectedValue != "대학교 선택 ▼";
    console.log(university_checked);
    if (university_checked) {
        checkbox1.disabled = false;
        checkbox2.disabled = false;
    } else {
        checkbox1.disabled = true;
        checkbox2.disabled = true;
    }

});
//유저 선택
checkbox1.addEventListener("change", function () {
    if (checkbox1.checked) {
        checkbox2.disabled = true;
        checkbox2.checked = false;
        while (selectElement2.firstChild) {
            selectElement2.removeChild(selectElement2.firstChild);
        }
        let option = document.createElement('option');
        if (!selectedValue) {
            option.value = `@`;
            option.textContent = `@`;
            selectElement2.appendChild(option);
        } else {
            option.value = `@${universitySearchList[selectedValue].university_url}.ac.kr`;
            option.textContent = `@${universitySearchList[selectedValue].university_url}.ac.kr`;
            selectElement2.appendChild(option);
        }

    } else {
        checkbox2.disabled = false;

    }
});

checkbox2.addEventListener("change", function () {
    if (checkbox2.checked && !checkbox1.checked) {
        checkbox1.disabled = true;
        checkbox1.checked = false;
        while (selectElement2.firstChild) {
            selectElement2.removeChild(selectElement2.firstChild);
        }
        let gmailoption = document.createElement('option');
        let naveroption = document.createElement('option');
        gmailoption.value = '@gmail.com';
        gmailoption.textContent = '@gmail.com';
        selectElement2.appendChild(gmailoption);

        naveroption.value = '@naver.com';
        naveroption.textContent = '@naver.com';
        selectElement2.appendChild(naveroption);
    } else {
        checkbox1.disabled = false;
    }
});

//유효한 비밀번호 확인
function validatePassword(password) {
    console.log(password)
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

//비밀번호 입력할때마다 유효한 비밀번호인지 확인하기 위해 매번 실행되는 메소드
let passwordChecked = false;    //비밀번호 유효성 체크

function validatePasswordInput() {
    var password = passwordInput.value;
    var isValid = validatePassword(password);

    if (isValid) {
        passwordChecked = true;
    } else {
        passwordChecked = false;
    }

}

//비밀번호 확인
let passwordConfirmChecked = false; //비밀번호 확인 체크


function validateConfirmPasswordInput() {

    var password = passwordInput.value;
    var confirmPassword = confirmPasswordInput.value;


    if (password === confirmPassword) {
        console.log("password:", password)
        console.log("confirmPassword:", confirmPassword)
        passwordConfirmChecked = true;
    } else {
        passwordConfirmChecked = false;
    }
}

//이메일로 인증코드 보내기

const sendAuthEmailBtn = document.getElementById('sendAuthEmailBtn');
const confirmAuthEmailBtn = document.getElementById('confirmAuthEmailBtn');

let authenticationCode;
let emailAuthChecked=false;     //이메일 인증 체크
function sendAuthEmail() {
    const selectedEmailDomain = selectElement2.value;
    console.log(selectedEmailDomain)
    const req = {
        email: `${emailElement.value}${selectedEmailDomain}`
    };

    fetch(`http://localhost:3000/auth/email`, {
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
sendAuthEmailBtn.addEventListener('click', sendAuthEmail);

//인증코드 확인하기
function compareAuthenticationCode() {
    const authenticationInputText = document.getElementById('authenticationInputText').value;

    if (authenticationInputText === authenticationCode) {
        // 인증번호가 일치하는 경우의 동작을 수행합니다.
        alert('인증이 확인되었습니다.');
        confirmAuthEmailBtn.disabled=true;
        sendAuthEmailBtn.disabled=true;
        emailAuthChecked=true;

    } else {
        // 인증번호가 일치하지 않는 경우의 동작을 수행합니다.
        alert('인증번호가 일치하지 않습니다. 인증번호를 다시 입력해주세요.');
    }
}
confirmAuthEmailBtn.addEventListener('click', compareAuthenticationCode);

function register() {
    const usertype=checkbox1.checked?"학생":"상인";
    const selectedEmailDomain = selectElement2.value;

    if(!emailAuthChecked) {
        alert('이메일 인증을 완료하지 않았습니다');
        return;
    }
    else if(!passwordChecked) {
        alert('유효하지 않은 비밀번호를 입력하셨습니다.');
        return;
    }
    else if(!passwordConfirmChecked) {
        alert('비밀번호 확인을 실패하셨습니다.');
        return;
    }
    else if(!nicknameElement.value){
        alert('닉네임을 입력해주세요.');
        return;
    } 
    else if(!nameElement.value) {
        alert('이름을 입력해주세요.');
        return;
    }
    else{
        const req = {
            user_email: `${emailElement.value}${selectedEmailDomain}`,
            user_name:nameElement.value,
            user_type:usertype,
            psword:confirmPasswordInput.value,
            user_nickname:nicknameElement.value,
            university_id:parseInt(selectedValue)+1
        };
        console.log(req);
    
        fetch(`http://localhost:3000/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(req),
        })
        .then((res) => res.json())
        .then(res => {
            if (res.status === 201) {
              console.log("회원가입 완료");
              window.location.href = "/login"; // 리다이렉션 처리
            } else {
              alert("서버의 문제로 회원가입에 실패했습니다. 다시 시도해주세요.");
            }
          })
          .catch((error) => {
            console.error("Error: ", error);
            alert("서버의 문제로 회원가입에 실패했습니다. 다시 시도해주세요.");
          })
    }
    
}
registerBtn.addEventListener('click',register);









//mainpage 로드 후 loadData()실행
window.addEventListener('DOMContentLoaded', function () {
    loadData();
});

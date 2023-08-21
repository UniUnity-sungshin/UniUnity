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

var confirmEmailBtn=document.getElementById("confirmEmailBtn")

var backBtn = document.getElementById("backBtn");

const navBar=document.getElementById("navbar");
navBar.setAttribute("href", `${apiUrl}`);

//처음으로 버튼
backBtn.addEventListener('click', () => {
  window.location.href = '/';
});

// // 현재 URL 가져오기
var currentURL = window.location.href;
// URL을 '/' 기준으로 분리
var urlParts = currentURL.split('/');
// 배열의 마지막 요소(숫자) 가져오기
var isCheckedMarketing = urlParts[urlParts.length - 1];


const ul = document.querySelector(".pop_rel_keywords");
const searchInput = document.querySelector(".search_input");
const relContainer = document.querySelector(".rel_search");

var universitySearchList = [];
const loadData = async() => {
    const url = `${apiUrl}/showUniversityNameList`;
    await fetch(url,{
        headers:{
            'Cookie': `connect.sid=${document.cookie}` // connect.sid 쿠키를 요청 헤더에 포함
        }
    })
        .then((res) => res.json())
        .then(res => {
            if(res.success==true){
                searchUniversityName(res.result);
            }
            else{
                // ul.appendChild("서버 오류로 점검 중 입니다. 잠시 후 이용해주세요");
            }
         
        }
    )
}

const searchUniversityName = (suggestArr) => {
    ul.innerHTML = "";
    suggestArr.forEach((el, idx) => {
        // el : {universityname : "성신여자대학교"}
        universitySearchList.push(el);
        //console.log(el.university_name);
        }
    )
   
}


//mainpage 로드 후 loadData()실행
window.addEventListener('DOMContentLoaded', function()
{
    loadData();
   
});
var selectedValue = "";
const checkInput = () => {

    const input = searchInput.value;
    while(ul.hasChildNodes()){
        ul.removeChild(ul.firstChild);
    }
    if(input==""){ //input이 빈문자열일 경우에 모든 학교리스트 반환(keyup)
        universitySearchList.forEach((el)=>{
            const li=document.createElement("li");
                const a = document.createElement("a");
                ul.appendChild(li);
                li.appendChild(a);
                a.innerHTML=el.university_name;

                // 클릭 이벤트 리스너를 추가하여 클릭 시 검색 입력란에 값을 넣도록 합니다.
            li.addEventListener("click", () => {
                searchInput.value = a.innerHTML;
                selectedValue=searchInput.value;
                // change 이벤트를 강제로 발생시킴
                const changeEvent = new Event('change', { bubbles: true });
                searchInput.dispatchEvent(changeEvent);

                while(ul.hasChildNodes()){
                    ul.removeChild(ul.firstChild);
                }
            });
        })
    }
    else{
        universitySearchList.forEach((el) => {
            if (el.university_name.indexOf(input) >= 0) {
                const li=document.createElement("li");
                const a = document.createElement("a");
                ul.appendChild(li);
                li.appendChild(a);
                a.innerHTML=el.university_name;

                // 클릭 이벤트 리스너를 추가하여 클릭 시 검색 입력란에 값을 넣도록 합니다.
                li.addEventListener("click", () => {
                    searchInput.value = a.innerHTML;
                    selectedValue=searchInput.value;
                    // change 이벤트를 강제로 발생시킴
                    const changeEvent = new Event('change', { bubbles: true });
                    searchInput.dispatchEvent(changeEvent);

                    while(ul.hasChildNodes()){
                        ul.removeChild(ul.firstChild);
                    }
                });
            }
        })
    }
}
searchInput.addEventListener("keyup", checkInput);
searchInput.addEventListener("click", (event) => {
    if (event.target.tagName === "li") {
        searchInput.value = event.target.firstChild.innerHTML;
    }
});
 //input이 빈 문자열일 경우에 모든 학교리스트 반환(mousedown)
searchInput.addEventListener("mousedown", (event) => {
    while(ul.hasChildNodes()){
        ul.removeChild(ul.firstChild);
    }
    universitySearchList.forEach((el)=>{
        const li=document.createElement("li");
            const a = document.createElement("a");
            ul.appendChild(li);
            li.appendChild(a);
            a.innerHTML=el.university_name;
             // 클릭 이벤트 리스너를 추가하여 클릭 시 검색 입력란에 값을 넣도록 합니다.
            li.addEventListener("click", () => {
                searchInput.value = a.innerHTML;
                selectedValue=searchInput.value;
                // change 이벤트를 강제로 발생시킴
                const changeEvent = new Event('change', { bubbles: true });
                searchInput.dispatchEvent(changeEvent);

                while(ul.hasChildNodes()){
                    ul.removeChild(ul.firstChild);
                }
            });
    })
});


searchInput.addEventListener('change', function () {
    selectedValue = this.value;
    let university_checked = selectedValue !=  "";
 
    if (university_checked) {
        checkbox1.disabled = false;
        checkbox2.disabled = false;
    } else {
        checkbox1.disabled = true;
        checkbox2.disabled = true;
    }

});

const universitySearchUrlListMap=(universitySearchList)=>{
    // 빈 맵(Map) 생성
    const universityUrlMap = new Map();

    // universityData 배열의 각 요소를 맵에 추가
    universitySearchList.forEach(item => {
        universityUrlMap.set(item.university_name, item.university_url);
    });
    return universityUrlMap
}

const universitySearchIdListMap=(universitySearchList)=>{
    // 빈 맵(Map) 생성
    const universityIdMap = new Map();

    // universityData 배열의 각 요소를 맵에 추가
    universitySearchList.forEach(item => {
        universityIdMap.set(item.university_name, item.university_id);
    });
    return universityIdMap
}



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
            const universityUrlMap= universitySearchUrlListMap(universitySearchList)
        
            option.value = `@${universityUrlMap.get(selectedValue)}.ac.kr`;
            option.textContent = `@${universityUrlMap.get(selectedValue)}.ac.kr`;
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

var duplicateEmailChecked=false;

function duplicateCheckEmail(){
    const selectedEmailDomain = selectElement2.value;
    if(!emailElement.value || !selectedEmailDomain){
        alert("이메일을 입력해주세요")
    }

    const req = {
        user_email: `${emailElement.value}${selectedEmailDomain}`
    };

    fetch(`${apiUrl}/signup/duplicateCheckEmail`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
    })
        .then((res) => res.json())
        .then(res => {
            if (res.msg === "사용가능한 이메일입니다.") {
                duplicateEmailChecked=true;
                alert(res.msg)

            } else {
                duplicateEmailChecked=false;
                alert(res.msg)
            }
        })
        .catch(error => {
            console.error("Error: ", error);
        })


}

//처음으로 버튼
confirmEmailBtn.addEventListener('click',duplicateCheckEmail)

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

// //비밀번호 입력할때마다 유효한 비밀번호인지 확인하기 위해 매번 실행되는 메소드
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

// //비밀번호 확인
let passwordConfirmChecked = false; //비밀번호 확인 체크

function validateConfirmPasswordInput() {

    var password = passwordInput.value;
    var confirmPassword = confirmPasswordInput.value;


    if (password === confirmPassword) {
        passwordConfirmChecked = true;
    } else {
        passwordConfirmChecked = false;
    }
}

// //이메일로 인증코드 보내기

const sendAuthEmailBtn = document.getElementById('sendAuthEmailBtn');
const confirmAuthEmailBtn = document.getElementById('confirmAuthEmailBtn');

let authenticationCode;
let emailAuthChecked=false;     //이메일 인증 체크
function sendAuthEmail() {
    const selectedEmailDomain = selectElement2.value;
    const req = {
        email: `${emailElement.value}${selectedEmailDomain}`
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
                alert("인증코드를 발송하였습니다. 인증코드를 입력해주세요.")
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

// //인증코드 확인하기
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
    const universityIdMap=universitySearchIdListMap(universitySearchList)

    const usertype=checkbox1.checked?"학생":"상인";
    const selectedEmailDomain = selectElement2.value;

    if(!emailAuthChecked) {
        alert('이메일 인증을 완료하지 않았습니다');
        return;
    }
    else if(!duplicateEmailChecked){
        alert('이메일 중복 인증을 하지않았습니다.');
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
            university_id:universityIdMap.get(selectedValue),
            user_marketing:isCheckedMarketing
        };
    
        fetch(`${apiUrl}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(req),
        })
        .then((res) => res.json())
        .then(res => {
            if (res.status === 201) {
              alert("회원가입이 완료되었습니다! 로그인 페이지로 이동합니다.")
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









// //mainpage 로드 후 loadData()실행
// window.addEventListener('DOMContentLoaded', function () {
//     loadData();
// });

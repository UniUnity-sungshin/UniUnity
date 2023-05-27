var selectElement = document.getElementById('univ_select');
var emailUrlSpan = document.getElementById("email_url");
var checkbox1 = document.getElementById("inlineCheckbox1");
var checkbox2 = document.getElementById("inlineCheckbox2");
var selectElement2 = document.getElementById('email_url_select');



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

var selectedValue="";
selectElement.addEventListener('change', function () {
    selectedValue = this.value;
    let university_checked= selectedValue!="대학교 선택 ▼";
    console.log(university_checked);
    if(university_checked){
        checkbox1.disabled=false;
        checkbox2.disabled=false;
    }else{
        checkbox1.disabled=true;
        checkbox2.disabled=true;
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

//비밀번호 확인
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
  let passwordChecked=false;

  function validatePasswordInput() {
    var passwordInput = document.getElementById("password");
    var password = passwordInput.value;
    
    var isValid = validatePassword(password);
    
    if (isValid) {
        passwordChecked=true;
    } else {
        passwordChecked=false;
    }
  
  }

  let passwordConfirmChecked=false;
  

  function validateConfirmPasswordInput() {
    var passwordInput = document.getElementById("password");
    var confirmPasswordInput = document.getElementById("confirmPassword");
    var password = passwordInput.value;
    var confirmPassword = confirmPasswordInput.value;
  
    
    if (password === confirmPassword) {
        console.log("password:",password)
        console.log("confirmPassword:",confirmPassword)
        passwordConfirmChecked=true;
    } else {
        passwordConfirmChecked=false;
    }
  }

  
  
  
  
  
  
  



//mainpage 로드 후 loadData()실행
window.addEventListener('DOMContentLoaded', function () {
    loadData();
});

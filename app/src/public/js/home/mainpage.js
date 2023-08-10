const ul = document.querySelector(".pop_rel_keywords");
const searchInput = document.querySelector(".search_input");
const relContainer = document.querySelector(".rel_search");

//로그인(로그아웃), 회원가입(마이페이지)버튼
const loginStatusBtn=document.getElementById("loginStatusBtn");
const signUpBtn=document.getElementById("signUpBtn");
const navBar=document.getElementById("navbar-brand");

let universitySearchList = [];


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
                ul.appendChild("서버 오류로 점검 중 입니다. 잠시 후 이용해주세요");
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

const loadloginData = async() => {
    const url = `${apiUrl}/loginStatus`;
    await fetch(url,{
        headers:{
            'Cookie': `connect.sid=${document.cookie}` // connect.sid 쿠키를 요청 헤더에 포함
    }})
        .then((res) => res.json())
        .then(res => {

            setLoginHeader(res);
        }
    )
}


const setLoginHeader=(res)=>{
    navBar.setAttribute("href", `${apiUrl}`);
    if(res.loginStatus==true){
        loginStatusBtn.setAttribute("href", `${apiUrl}/logout`);
        loginStatusBtn.innerText="로그아웃"
        signUpBtn.setAttribute("href", `${apiUrl}/mypage`);
        signUpBtn.innerText="마이페이지"
    }
    else{
        loginStatusBtn.setAttribute("href", `${apiUrl}/login`);
        loginStatusBtn.innerText="로그인"
        signUpBtn.setAttribute("href", `${apiUrl}/signup/agreement`);
        signUpBtn.innerText="회원가입"
    }
    
}

//mainpage 로드 후 loadData()실행
window.addEventListener('DOMContentLoaded', function()
{
    loadData();
    loadloginData();
});

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
                a.href=`/council/${el.university_url}`;
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
                a.href=`/council/${el.university_url}`;
            }
        })
    }
}
searchInput.addEventListener("keyup", checkInput);

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
            a.href=`/council/${el.university_url}`;
    })
});


const ul = document.querySelector(".pop_rel_keywords");
const searchInput = document.querySelector(".search_input");
const relContainer = document.querySelector(".rel_search");

//로그인(로그아웃), 회원가입(마이페이지)버튼
const loginStatusBtn=document.getElementById("loginStatusBtn");
const signUpBtn=document.getElementById("signUpBtn");

let universitySearchList = [];


const loadData = async() => {
    const url = `http://localhost:3000/showUniversityNameList`;
    await fetch(url)
        .then((res) => res.json())
        .then(res => {
            fillSearch(res);
        }
    )
}

const fillSearch = (suggestArr) => {
    ul.innerHTML = "";
    suggestArr.forEach((el, idx) => {
        // el : {universityname : "성신여자대학교"}
        universitySearchList.push(el);
        //console.log(el.university_name);
        }
    )
}

const loadloginData = async() => {
    const url = `http://localhost:3000/loginStatus`;
    await fetch(url)
        .then((res) => res.json())
        .then(res => {

            setLoginHeader(res);
        }
    )
}


const setLoginHeader=(res)=>{
    //console.log(res.loginStatus);
    if(res.loginStatus==true){
        loginStatusBtn.setAttribute("href", "http://localhost:3000/logout");
        loginStatusBtn.innerText="로그아웃"
        signUpBtn.setAttribute("href", "http://localhost:3000/mypage");
        signUpBtn.innerText="마이페이지"
    }
    else{
        loginStatusBtn.setAttribute("href", "http://localhost:3000/login");
        loginStatusBtn.innerText="로그인"
        signUpBtn.setAttribute("href", "http://localhost:3000/signup");
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
    if(input==""){ //input이 빈문자열일 경우에도 indexOf()반환값이 0 이기 때문에 예외처리 해줘야함
        return ;
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
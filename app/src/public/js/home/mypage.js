//로그인(로그아웃), 회원가입(마이페이지)버튼
const loginStatusBtn=document.getElementById("loginStatusBtn");
const signUpBtn=document.getElementById("signUpBtn");

const user_email=document.getElementById("user_email");
const user_type=document.getElementById("user_type");
const user_name=document.getElementById("user_name");
const university_name=document.getElementById("university_name");


const loadloginData = () => {
    const url = `${apiUrl}/loginStatus`;
    fetch(url)
        .then((res) => res.json())
        .then(res => {
            console.log(res);
            setLoginHeader(res);
        }
    )
}

const setLoginHeader=(res)=>{
    if(res.loginStatus){
        user_email.innerText=res.user_email
        user_type.innerText=res.user_type
        user_name.innerText=res.user_name
        university_name.innerText=res.university_name
        loginStatusBtn.setAttribute("href", `${apiUrl}logout`);
        loginStatusBtn.innerText="로그아웃"
        signUpBtn.setAttribute("href", `${apiUrl}/mypage`);
        signUpBtn.innerText="마이페이지"
    }
    else{
        loginStatusBtn.setAttribute("href", `${apiUrl}/login`);
        loginStatusBtn.innerText="로그인"
        signUpBtn.setAttribute("href", `${apiUrl}/signup`);
        signUpBtn.innerText="회원가입"
    }
    
}

// 로드 후 loadData()실행
window.addEventListener('DOMContentLoaded', function()
{
    loadloginData();
});

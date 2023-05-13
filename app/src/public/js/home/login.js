"use strict";

const user_email=document.querySelector("#user_email")
const psword=document.querySelector("#psword");
const loginBtn=document.querySelector("#loginBtn");

loginBtn.addEventListener("click",login);

function login(event) {
    event.preventDefault(); // 기본 동작 막기
    event.stopPropagation(); // 이벤트 전파 막기
    const req={
        user_email:user_email.value,
        psword:psword.value
    };
    console.log(req);
    fetch("/login",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(req) //object를 json형태로 바꿔줌
    })
    .then(res=>res.json())
    .then((res)=>{
        console.log(res);
        if(res.success){
            location.href="/";
        }else{
            console.log(res);
            console.log(res.msg);
            alert(res.msg);
            location.href="/login"
        }
    })
}
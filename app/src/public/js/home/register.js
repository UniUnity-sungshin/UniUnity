"use strict";

const id = document.querySelector("#id"),
 name =document.querySelector("#name"),
 psword =document.querySelector("#psword"),
 confirmPsword=document.querySelector("#confirm-psword"),
 registerBtn =document.querySelector("#button");
console.log("Hello regisiter");
registerBtn.addEventListener("click",register);
function register(){
    if(!id.value)return alert("아이디를 입력해주십시오.");
    if(psword.value!==confirmPsword.value){
        return alert("비밀번호가 일치하지 않습니다.");
    }
    const req={
        id : id.value,
        name : name.value,
        psword : psword.value,
    };
    console.log(req);

    fetch("/register",{
        method:"POST",
        headers:{
            "Content-Type" :"application/json",
        },
        body:JSON.stringify(req),
    })
    .then((res)=>res.json())
    .then((res)=>{
        if(res.success){
            location.href ="/login";
        }else{
            alert(res.msg);
        }
    })
    .catch((err)=>{
        console.log(err);
        console.error("회원가입 중 에러 발생");
    });
}

/* res.json()의 반환 값은 Promise다.
기본 res의 반환 값은 Response스트림인데,
json()메서드를 통해 Response(응답) 스트림을 읽을 수 있다.
Response는 데이터가 모두 받아진 상태가 아니다.
json()으로 Response스트림을 가져와 완료될 때까지 읽는다.
다 읽은 body의 텍스트를 Promise형태로 반환한다.
*/
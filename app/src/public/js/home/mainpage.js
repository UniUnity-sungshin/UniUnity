const ul = document.querySelector(".pop_rel_keywords");
const searchInput = document.querySelector(".search_input");
const relContainer = document.querySelector(".rel_search");
let cache = `http://localhost:3000/search/universityname/`;

let universityNameList = [];

const loadData = () => {
    const url = `http://localhost:3000/showUniversityNameList`;
    fetch(url)
        .then((res) => res.json())
        .then(res => {
            console.log(res);
            fillSearch(res);
        })
    // }
}
const fillSearch = (suggestArr) => {
    ul.innerHTML = "";
    suggestArr.forEach((el, idx) => {
        // el : {universityname : "성신여자대학교"}
        universityNameList.push(el.university_name);
        //console.log(el.university_name);
    })
    universityNameList.push('ㄱㅓㄴㄱㅜㄱㄷㅐㅎㅏㄱㄱㅛ');
}

//mainpage 로드 후 loadData()실행
window.addEventListener('DOMContentLoaded', function()
{
    loadData();
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
        universityNameList.forEach((university_name) => {
            if (university_name.indexOf(input) >= 0) {
                const li=document.createElement("li");
                li.innerHTML=university_name;
                ul.appendChild(li);
            }
        })
    }
    
}

searchInput.addEventListener("keyup", checkInput);

 


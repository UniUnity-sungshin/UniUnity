
// select 요소를 가져옵니다.
var selectElement = document.getElementById('univ_select');

// option 요소를 생성합니다.
var optionElement = document.createElement('option');
optionElement.value = "4"; // option의 값을 설정합니다.
optionElement.textContent = "서강대학교"; // option에 표시할 텍스트를 설정합니다.

// option을 select 요소에 추가합니다.
selectElement.appendChild(optionElement);
let universitySearchList = [];
const loadData = async() => {
    const url = `http://localhost:3000/showUniversityNameList`;
    await fetch(url,{
        headers:{
            'Cookie': `connect.sid=${document.cookie}` // connect.sid 쿠키를 요청 헤더에 포함
        }
    })
        .then((res) => res.json())
        .then(res => {
            fillSearch(res);
        }
    )
}

const fillSearch = (suggestArr) => {
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


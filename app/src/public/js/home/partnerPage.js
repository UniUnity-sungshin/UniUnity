"use strict";

// const { error } = require("console");
// const { reject } = require("underscore");


// 중심좌표 -> 선택 대학교의 좌표
function setUniversityMap(){
    
}

// 고정 지도 코드
// ===========================================================================================
var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
    mapOption = { 
        center: new kakao.maps.LatLng(37.5912999, 127.0221068), // 지도의 중심좌표 - 현재 성신여대 좌표
        level: 3 // 지도의 확대 레벨
    };

var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

//********* 지도 이동 이벤트 *********//
function setCenter() {            
    // 이동할 위도 경도 위치를 생성합니다 
    var moveLatLon = new kakao.maps.LatLng(33.452613, 126.570888);
               
    // 지도 중심을 이동 시킵니다
    map.setCenter(moveLatLon);
}

function panTo() {
    // 이동할 위도 경도 위치를 생성합니다 
    var moveLatLon = new kakao.maps.LatLng(33.450580, 126.574942);
               
    // 지도 중심을 부드럽게 이동시킵니다
    // 만약 이동할 거리가 지도 화면보다 크면 부드러운 효과 없이 이동합니다
    map.panTo(moveLatLon);            
}        
// ===========================================================================================


// ********* 여러개의 마커 제어 ********* //
// 학교별 제휴 가게 정보 마커로 나타내기

// ********* HTML에 표시될 가게 정보 ********* //
const storeName = document.querySelector('#storeName'),
      storeAdr = document.querySelector('#storeAdr'),
    //   storeClass = document.querySelector('#storeClass'),
    //   storePartnerBool = document.querySelector('#storePartnerBool'),
      partnerContent = document.querySelector('#partnerContent'),
      eventDate = document.querySelector('#eventDate');
const partnerMapSerch = document.querySelector('#partnerMapSerch'),
      searchBtn = document.querySelector('#serchBtn');
const storeInfoTextBox = document.querySelectorAll(".storeInfoTextBox");

// 검색 버튼 클릭 시 해당 대학의 페이지로 넘어가야함
searchBtn.addEventListener("click", partnerLoad);

let stores = [];
let positions = [];


function partnerLoad(){
    // const universityName = partnerMapSerch.value;
    const req = {
        university_name: partnerMapSerch.value
    };

    fetch(`http://localhost:3000/getPartnerUni`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
    })
    .then((res) => res.json())
    .then(res => {
        
        // 새로운 객체 생성
        for(let i = 0; i < res.length; i++){
            const obj = {
                storeID: res[i].storeID,
                storeName: res[i].storeName,
                store_location: res[i].store_location,
                university_id: res[i].university_id,
                content: res[i].content,
                startDate: res[i].startDate,
                endDate: res[i].endDate
            };
            stores.push(obj);
            // 객체의 좌표 부분은 따로 저장
            let idx = 0;
            positions.push(new kakao.maps.LatLng(parseFloat(res[i].latitude),parseFloat(res[i].longitude)));
        };
        // console.log(res);
    })
    .catch(error => {
        console.error("Error: ", error);
    })
    // 아래 for문 안에 marker에 관한 이벤트 모두 집어 넣기
    for (let i = 0; i < positions.length; i ++) {
        // 마커를 생성합니다
        let marker = new kakao.maps.Marker({
            map: map, // 마커를 표시할 지도
            position: positions[i] // 마커의 위치
        });
        // 마커 click, mouseover, mouseout 시에 이벤트 발생
        kakao.maps.event.addListener(marker, 'click', function(){
            storeName.innerHTML = stores[i].storeName;
            storeAdr.innerHTML = stores[i].store_location;
            partnerContent.innerHTML = stores[i].content;
            eventDate.innerHTML = stores[i].startDate + stores[i].endDate;
        });
        // kakao.maps.event.addListener(marker,'mouseover',function(){
        //     for(let i = 0; i < storeInfoTextBox.length; i++){
        //         storeInfoTextBox[i].style.display = "block";
        //     }
        //     storeName.innerHTML = stores[i].storeName;
        //     storeAdr.innerHTML = stores[i].store_location;
        //     partnerContent.innerHTML = stores[i].content;
        //     eventDate.innerHTML = stores[i].startDate + stores[i].endDate;
        // })
        // kakao.maps.event.addListener(marker,'mouseout', function(){
        //     for(let i = 0; i < storeInfoTextBox.length; i++){
        //         storeInfoTextBox[i].style.display = "none";
        //     }
        // });
    }
}
    











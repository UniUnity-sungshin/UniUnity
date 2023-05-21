"use strict";

// 기본 좌표 저징 지도 코드
// ===========================================================================================
var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
    mapOption = { 
        center: new kakao.maps.LatLng(37.5667, 126.9783),
        level: 3 // 지도의 확대 레벨
    };

var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다
// ===========================================================================================
// 검색창 버전 => university_url을 모두 university_name으로 변경해야 함


// university_url 값을 받아오는 함수
function getUniversityUrl() {
    // 현재 페이지의 URL에서 경로(pathname) 부분을 추출
    const path = window.location.pathname;
  
    // 경로에서 universityUrl 값을 추출
    const pathParts = path.split('/');
    const universityUrl = pathParts[pathParts.length - 1];
    return universityUrl;
}

// ********* HTML에 표시될 가게 정보 ********* //
const storeName = document.querySelector('#storeName'),
      storeAdr = document.querySelector('#storeAdr'),
      partnerContent = document.querySelector('#partnerContent'),
      eventDate = document.querySelector('#eventDate');
const storeInfoTextBox = document.querySelectorAll(".storeInfoTextBox"),
    searchBtn = document.querySelector('#serchBtn'),
    partnerMapSerch = document.querySelector("#partnerMapSerch");
    
let center = [];
let stores = [];
let positions = [];


function setCenter(map,latitude,longitude) {            
    // 이동할 위도 경도 위치를 생성합니다 
    var moveLatLon = new kakao.maps.LatLng(latitude,longitude);
                    
    // 지도 중심을 이동 시킵니다
    map.setCenter(moveLatLon);
}

function partnerLoad(){
    const universityUrl = getUniversityUrl();
    // req의 university_url을 검색창 input을 통해 받아오는 경우 -> 작동 O
    // req의 university_url를 getUniversityUrl()를 통해 /partner/:sungshin_url을 통해 sungshin_url을 받아오는 경우 -> 작동 X
    // 1. 작동 되는 코드
    const req = {
        university_url: partnerMapSerch.value
    };
    // 2. 작동 안되는 코드
    // const req = {
    //     university_url:universityUrl
    // };

    fetch(`http://localhost:3000/getPartner`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
    })
    .then((res) => res.json())
    .then(res => {
        center.push(res[0]);
        setCenter(map,parseFloat(center[0].latitudeUni),parseFloat(center[0].longitudeUni));
        // 새로운 객체 생성
        for(let i = 1; i < res.length; i++){
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
            positions.push(new kakao.maps.LatLng(parseFloat(res[i].latitude),parseFloat(res[i].longitude)));
            for (let i = 0; i < positions.length; i ++) {
                // 마커를 생성합니다
                let marker = new kakao.maps.Marker({
                    map: map, // 마커를 표시할 지도
                    position: positions[i] // 마커의 위치
                });
                // 마커 click, mouseover, mouseout 시에 이벤트 발생
                kakao.maps.event.addListener(marker, 'click', function(){
                    for(let i = 0; i < storeInfoTextBox.length; i++){
                        storeInfoTextBox[i].style.display = "block";
                    }
                    storeName.innerHTML = stores[i].storeName;
                    storeAdr.innerHTML = stores[i].store_location;
                    partnerContent.innerHTML = stores[i].content;
                    eventDate.innerHTML = stores[i].startDate + " ~ " + stores[i].endDate;
                });
            }
        };
    })
    .catch(error => {
        console.error("Error: ", error);
    })
}

// 1. 작동 되는 코드
// 검색 버튼을 클릭 시 실행 -> partnerLoad 잘 실행 됨
searchBtn.addEventListener("click", partnerLoad); 

// 2. 작동 안되는 코드
// 페이지 로드 시 partnerLoad 실행 되도록 함 -> "Failed to fetch" 에러 발생
// window.addEventListener('DOMContentLoaded', partnerLoad);








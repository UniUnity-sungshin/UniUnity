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

function centerChange(){
    const universityUrl = getUniversityUrl();
    const req = {
        university_url:universityUrl
    };

    fetch(`http://localhost:3000/getUniversityLocation`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
    }).then((res) => res.json())
    .then(res => {
        setCenter(map,parseFloat(res.latitude),parseFloat(res.longitude));
    })
}

function partnerLoad(){
    centerChange();
    const universityUrl = getUniversityUrl();
    const req = {
        university_url:universityUrl
    };

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
        };
        for (let i = 0; i < positions.length; i ++) {
            // 마커를 생성합니다
            let marker = new kakao.maps.Marker({
                map: map, // 마커를 표시할 지도
                position: positions[i] // 마커의 위치
            });
            console.log();
            // 목록에 동적으로 추가
            const li = document.createElement("li");
            li.setAttribute('id',stores[i].storeName);
            const textNode = document.createTextNode(stores[i].storeName);
            li.appendChild(textNode);
            document.getElementById('storeList').appendChild(li);
            // 마커 click, mouseover, mouseout 시에 이벤트 발생
            kakao.maps.event.addListener(marker, 'click', function(){
                for(let j = 0; j < storeInfoTextBox.length; j++){
                    storeInfoTextBox[j].style.display = "block";
                }
                storeName.innerHTML = stores[i].storeName;
                storeAdr.innerHTML = stores[i].store_location;
                partnerContent.innerHTML = stores[i].content;
                eventDate.innerHTML = stores[i].startDate + " ~ " + stores[i].endDate;
            });
            li.addEventListener('click',function(){
                for(let j = 0; j < storeInfoTextBox.length; j++){
                    storeInfoTextBox[j].style.display = "block";
                }
                storeName.innerHTML = stores[i].storeName;
                storeAdr.innerHTML = stores[i].store_location;
                partnerContent.innerHTML = stores[i].content;
                eventDate.innerHTML = stores[i].startDate + " ~ " + stores[i].endDate;
            })
        }
    })
    .catch(error => {
        console.error("Error: ", error);
    })
}

window.addEventListener('DOMContentLoaded', partnerLoad);
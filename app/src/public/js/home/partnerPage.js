"use strict";

const { error } = require("console");
const { reject } = require("underscore");


// 중심좌표 -> 선택 대학교의 좌표


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
// 마커를 표시할 위치와 내용을 가지고 있는 객체 배열입니다 
// let positions = [
//     {
//         latlng: new kakao.maps.LatLng(33.450705, 126.570677)
//     },
//     {
//         content: '<div>생태연못</div>', 
//         latlng: new kakao.maps.LatLng(33.450936, 126.569477)
//     },
//     {
//         content: '<div>텃밭</div>', 
//         latlng: new kakao.maps.LatLng(33.450879, 126.569940)
//     },
//     {
//         content: '<div>근린공원</div>',
//         latlng: new kakao.maps.LatLng(33.451393, 126.570738)
//     }
// ];


// ********* HTML에 표시될 가게 정보 ********* //
const storeName = document.querySelector('#storeName'),
      storeAdr = document.querySelector('#storeAdr'),
      storeClass = document.querySelector('#storeClass'),
      storePartnerBool = document.querySelector('#storePartnerBool'),
      partnerContent = document.querySelector('#partnerContent'),
      eventDate = document.querySelector('#eventDate');
const partnerMapSerch = document.querySelector('#partnerMapSerch'),
      searchBtn = document.querySelector('#serchBtn');

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
        const obj = {
            storeID: res.storeID,
            storeName: res.storeName,
            store_location: res.store_location,
            latitude: res.latitude,
            longitude: res.longitude,
            university_id: res.university_id,
            content: res.content,
            startDate: res.startDate,
            endDate: res.endDate
        };
        // 객체를 stores 배열에 추가
        stores.push(obj);
        // 객체의 좌표 부분은 따로 저장
        positions.push(new kakao.maps.LatLng(obj.latitude,obj.longitude));
        console.log(res);
    })
    .catch(error => {
        console.error("Error: ", error);
    })
}

// const loadData = () => {
//     const url = `http://localhost:3000/getPartnerUni`;
//     fetch(url)
//         .then((res) => res.json())
//         .then(res => {
//             console.log(res);
//             fillSearch(res);
//         }).catch(error => {
//             console.log("partnerPage.js fetch error.")
//         })
// }

// const fillSearch = (suggestArr) => {
//     ul.innerHTML = "";
//     suggestArr.forEach((el, idx) => {
//         stores.push(el);
//         positions.push(new kakao.maps.LatLng(el.latitude,el.longitude));
//     })
// }

// mouseover,mouseout 시에 이벤트 발생
for (var i = 0; i < positions.length; i ++) {
    // 마커를 생성합니다
    var marker = new kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: positions[i] // 마커의 위치
    });

    // 마커에 표시할 인포윈도우를 생성합니다 
    var infowindow = new kakao.maps.InfoWindow({
        // content: stores[i] // 인포윈도우에 표시할 내용
    });

    // 마커에 mouseover 이벤트와 mouseout 이벤트를 등록합니다
    // 이벤트 리스너로는 클로저를 만들어 등록합니다 
    // for문에서 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됩니다
    kakao.maps.event.addListener(marker, 'mouseover', makeOverListener(map, marker, infowindow));
    kakao.maps.event.addListener(marker, 'mouseout', makeOutListener(infowindow));
}

// 인포윈도우를 표시하는 클로저를 만드는 함수입니다 
function makeOverListener(map, marker, infowindow) {
    return function() {
        infowindow.open(map, marker);
    };
}

// 인포윈도우를 닫는 클로저를 만드는 함수입니다 
function makeOutListener(infowindow) {
    return function() {
        infowindow.close();
    };
}





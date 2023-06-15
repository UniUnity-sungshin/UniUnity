"use strict";

// 기본 좌표 저징 지도 코드
// ===========================================================================================
var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
    mapOption = {
        center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
    };  

// 지도를 생성합니다    
var map = new kakao.maps.Map(mapContainer, mapOption); 
// ===========================================================================================

const storeUploadBtn = document.querySelector('#uploadBtn'),
      BtnAddr = document.querySelector('#serchBtnAddr'),
      BtnContent = document.querySelector('#serchBtnContent');
const storeName = document.querySelector('#storeName'),
      store_location = document.querySelector('#store_location'),
      content = document.querySelector('#content'),
      startDate = document.querySelector('#startDate'),
      endDate = document.querySelector('#endDate');
var getlatitude, getlongitude;

// university_url 값을 받아오는 함수
function getUniversityUrl() {
    // 현재 페이지의 URL에서 경로(pathname) 부분을 추출
    const path = window.location.pathname;
  
    // 경로에서 universityUrl 값을 추출
    const pathParts = path.split('/');
    const universityUrl = pathParts[pathParts.length - 1];
    return universityUrl;
}

function setCenter(map,latitude,longitude) {
    // 이동할 위도 경도 위치를 생성합니다
    var moveLatLon = new kakao.maps.LatLng(latitude,longitude);

    // 지도 중심을 이동 시킵니다
    map.setCenter(moveLatLon);
}

// 학교별로 중심좌표 이동시키기
function centerChange(){
    const universityUrl = getUniversityUrl();
    const req = {
        university_url:universityUrl
    };

    fetch(`${apiUrl}/getUniversityLocation`, {
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

// 주소-좌표 변환 객체를 생성합니다
var geocoder = new kakao.maps.services.Geocoder();

BtnAddr.addEventListener('click',function(){
    // 주소로 좌표를 검색합니다
    geocoder.addressSearch(store_location.value, function(result, status) {

        // 정상적으로 검색이 완료됐으면 
        if (status === kakao.maps.services.Status.OK) {

            var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
            getlatitude = parseFloat(result[0].y);
            getlongitude = parseFloat(result[0].x);

            // 결과값으로 받은 위치를 마커로 표시합니다
            var marker = new kakao.maps.Marker({
                map: map,
                position: coords
            });

            // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
            map.setCenter(coords);
        } 
    });    
})


function updateStore(){
    const universityUrl = getUniversityUrl();
    const req = {
        storeName: storeName.value,
        store_location: store_location.value,
        latitude: getlatitude,
        longitude: getlongitude,
        content: content.value,
        startDate: startDate.value,
        endDate: endDate.value,
        university_url: universityUrl
    };

    fetch(`${apiUrl}/uploadPartner`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
    })
    .then((res) => res.json())
    .then(res => {
        console.log(res);
    })
}

window.addEventListener('DOMContentLoaded', centerChange); // 이건 '제휴 가게 등록하기' 버튼 클릭 시 함수 실행으로 추후에 변경하기
storeUploadBtn.addEventListener('click',updateStore);
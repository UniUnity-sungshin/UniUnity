"use strict";

const serviceKey = 'p0%2BHQGnCYhn4J%2BB0BJpY5cOD0thCQ29az7PS9MQ4gLwPqbZrSns3eFy4VZ%2BUSc95PAkZUjK%2FGiir%2FcMk1FAq4A%3D%3D';
const endPoint = 'http://apis.data.go.kr/B553077/api/open/sdsc2/';

// 고정 지도 코드
// ===========================================================================================
var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
    mapOption = { 
        center: new kakao.maps.LatLng(37.5667, 126.9783),
        level: 3 // 지도의 확대 레벨
    };

var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다
// ===========================================================================================

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

var stores = [];
var positions = [];

const storeName = document.querySelector('#storeName'),
      storeAdr = document.querySelector('#storeAdr'),
      storeClass = document.querySelector('#storeClass'),
      storeItem = document.querySelector('#storeItem');
const storeInfoTextBox = document.querySelectorAll(".storeInfoTextBox");

// 지도가 이동, 확대, 축소로 인해 지도영역이 변경되면 마지막 파라미터로 넘어온 함수를 호출하도록 이벤트를 등록합니다
kakao.maps.event.addListener(map, 'bounds_changed', function() {             
            
    // 지도 영역정보를 얻어옵니다 
    var bounds = map.getBounds();
    
    // 영역정보의 남서쪽 정보를 얻어옵니다 
    // swLatlng.La = 서쪽 경도좌표값 = minx
    // swLatlng.Ma = 남쪽 경도좌표값 = miny
    var swLatlng = bounds.getSouthWest();
    var minx = swLatlng.La.toString(),
        miny = swLatlng.Ma.toString();

    // 영역정보의 북동쪽 정보를 얻어옵니다 
    // neLatlng.La = 동쪽 경도좌표값 = maxx
    // neLatlng.Ma = 북쪽 경도좌표값 = maxy
    var neLatlng = bounds.getNorthEast();
    var maxx = neLatlng.La.toString(),
        maxy = neLatlng.Ma.toString();

    var url = endPoint + 'storeListInRectangle' + '?serviceKey=' + serviceKey + '&pageNo=1' + '&numOfRows=10' + 
            '&minx=' + minx + '&miny=' + miny + '&maxx=' + maxx + '&maxy=' + maxy + '&type=json';
    fetch(url)
    .then((res) => res.json())
    .then(res => {
        for(let i = 0; i < res.body.items.length; i++){
            const obj = {
                storeName: res.body.items[i].bizesNm,
                store_location: res.body.items[i].rdnmAdr,
                storeClass: res.body.items[i].indsLclsNm,
                storeItem: res.body.items[i].indsSclsNm,
                ksicNm: res.body.items[i].ksicNm
            };
            stores.push(obj);
            positions.push(new kakao.maps.LatLng(res.body.items[i].lat,res.body.items[i].lon));
        }
    })
    .catch(error => {
        console.log('Error:', error);
    });
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
            storeClass.innerHTML = stores[i].storeClass + " " + stores[i].storeItem;
            storeItem.innerHTML = stores[i].ksicNm;
        });
    }
});

function getFood(){

}

function getCafe(){
    
}



function retailerLoad(){
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

window.addEventListener('DOMContentLoaded', retailerLoad);
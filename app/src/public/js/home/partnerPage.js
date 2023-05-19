"use strict";

// 고정 지도 코드
// ===========================================================================================
var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
    mapOption = { 
        center: new kakao.maps.LatLng(37.5667, 126.9783),
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

// const { resolve } = require("path");
// const { error } = require("console");
// const { reject } = require("underscore");

// ********* 여러개의 마커 제어 ********* //
// 학교별 제휴 가게 정보 마커로 나타내기

// ********* HTML에 표시될 가게 정보 ********* //
// const storeName = document.querySelector('#storeName'),
//       storeAdr = document.querySelector('#storeAdr'),
//       partnerContent = document.querySelector('#partnerContent'),
//       eventDate = document.querySelector('#eventDate');
// const storeInfoTextBox = document.querySelectorAll(".storeInfoTextBox");

// let stores = [];
// let positions = [];

// window.addEventListener('DOMContentLoaded', load);

// Function to fetch university location
// async function fetchUniversityLocation() {
//     try {
//       const urlParams = window.location.pathname.split('/');
//       const universityUrl = urlParams[urlParams.length - 1];
  
//       const response = await fetch(`http://localhost:3000/getUniversityLocation`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ university_url: universityUrl }),
//       });
  
//       if (!response.ok) {
//         throw new Error('Failed to fetch university location.');
//       }
  
//       const data = await response.json();
//       return data;
//     } catch (error) {
//       console.error(error);
//       return null;
//     }
//   }

// // Function to initialize partner page
// async function initPartnerPage() {
//   // Fetch university location
//   const universityLocation = await fetchUniversityLocation();
//   if (!universityLocation) {
//     console.error('Failed to get university location.');
//     return;
//   }

//   // Use universityLocation.latitude and universityLocation.longitude as needed
//   const latitude = universityLocation.latitude;
//   const longitude = universityLocation.longitude;

//   console.log(latitude);
//   console.log(longitude);

//   // Perform additional actions or rendering using latitude and longitude
//   // ...
// }

// // Call the initialization function
// initPartnerPage();

//======================================================================



// // university_url 값을 받아오는 함수
// function getUniversityUrl() {
//     // 현재 페이지의 URL에서 경로(pathname) 부분을 추출
//     const path = window.location.pathname;
  
//     // 경로에서 universityUrl 값을 추출
//     const pathParts = path.split('/');
//     const universityUrl = pathParts[pathParts.length - 1];
//     return universityUrl;
// }

// const getCenterLocation = () => {
//     const universityUrl = getUniversityUrl();
//     const req = {
//         university_url: universityUrl
//     };
//     // 대학 위치 정보 가져오기
//     fetch(`http://localhost:3000/getUniversityLocation`,{
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(req),
//     })
//     .then((res) => res.json())
//     .then(res => {
//         resolve(res);
//         // return res;
//     })
//     .catch(error => {
//         console.error('Error: (Getting University Center Location)', error);
//         // reject(error);
//     }); 
// }

// university_url 값을 받아와서 partner.html 페이지 로드
// function loadPartnerPage() {
//     const universityUrl = getUniversityUrl();
//     // console.log(typeof(universityUrl));
//     // university_url 값에 따라 로드할 페이지 경로를 결정
//     const partnerPagePath = `/partner/${universityUrl}`;

//     // let center;
//     fetch("http://localhost:3000/getUniversityLocation/sungshin", {
//         method: "GET",
//         // body: JSON.stringify({
//         //   university_url: universityUrl
//         // }),
//       })
//       .then((res) => res.json())
//       .then((res) => {
//         // center.latitude = res.latitude,
//         // center.longitude = res.longitude
//         console(res);
//     }).catch(error => {
//         console.error('Error: (Getting University Center Location)', error);
//     });
    
//     var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
//         mapOption = { 
//             center: new kakao.maps.LatLng(37.591877, 127.018463),
//             level: 3 // 지도의 확대 레벨
//         };

//     var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

//     //********* 지도 이동 이벤트 *********//
//     function setCenter() {            
//         // 이동할 위도 경도 위치를 생성합니다 
//         var moveLatLon = new kakao.maps.LatLng(33.452613, 126.570888);
                
//         // 지도 중심을 이동 시킵니다
//         map.setCenter(moveLatLon);
//     }

//     function panTo() {
//         // 이동할 위도 경도 위치를 생성합니다 
//         var moveLatLon = new kakao.maps.LatLng(33.450580, 126.574942);
                
//         // 지도 중심을 부드럽게 이동시킵니다
//         // 만약 이동할 거리가 지도 화면보다 크면 부드러운 효과 없이 이동합니다
//         map.panTo(moveLatLon);            
//     } 
//     // partner.html 페이지 로드
//     const partnerContainer = document.getElementById('#body_container');
//     partnerContainer.innerHTML = `<object type="text/html" data="${partnerPagePath}" width="100%" height="100%"></object>`;
    
// }


// // 페이지 로드 시 loadPartnerPage 함수 실행
// window.addEventListener('DOMContentLoaded', loadPartnerPage);




//==========================================================================================================================
// 검색창 버전 => university_url을 모두 university_name으로 변경해야 함



// ********* HTML에 표시될 가게 정보 ********* //
const storeName = document.querySelector('#storeName'),
      storeAdr = document.querySelector('#storeAdr'),
      partnerContent = document.querySelector('#partnerContent'),
      eventDate = document.querySelector('#eventDate');
const storeInfoTextBox = document.querySelectorAll(".storeInfoTextBox"),
    searchBtn = document.querySelector('#serchBtn'),
    partnerMapSerch = document.querySelector("#partnerMapSerch");
    
var center;
let stores = [];
let positions = [];

searchBtn.addEventListener("click", partnerLoad);  


function partnerLoad(){
    // const universityUrl = getUniversityUrl();
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
            for(let i = 0; i < storeInfoTextBox.length; i++){
                storeInfoTextBox[i].style.display = "block";
            }
            storeName.innerHTML = stores[i].storeName;
            storeAdr.innerHTML = stores[i].store_location;
            partnerContent.innerHTML = stores[i].content;
            eventDate.innerHTML = stores[i].startDate + " ~ " + stores[i].endDate;
        });
    }
    
    fetch(`http://localhost:3000/getUniversityLocation`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
    })
    .then((res) => res.json())
    .then((res) => {
        center = res;
        let latitude = parseFloat(center.latitude),
            longitudu = parseFloat(center.longitude);
        var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
            mapOption = { 
                center: new kakao.maps.LatLng(latitude, longitudu),
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
    }).catch(error => {
        console.error('Error: (Getting University Center Location)', error);
    });
}












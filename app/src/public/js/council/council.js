const serviceKey = 'p0%2BHQGnCYhn4J%2BB0BJpY5cOD0thCQ29az7PS9MQ4gLwPqbZrSns3eFy4VZ%2BUSc95PAkZUjK%2FGiir%2FcMk1FAq4A%3D%3D';
const endPoint = 'http://apis.data.go.kr/B553077/api/open/sdsc2/';

// 지도
var mapContainer = document.getElementById('map'),
mapOption = { 
  center: new kakao.maps.LatLng(37.5912999, 127.0221068), // 지도의 중심좌표
  level: 3 // 지도의 확대 레벨
};

var map = new kakao.maps.Map(mapContainer, mapOption); // 지도 생성

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
    var positions = [];
  for(let i = 0; i < res.body.items.length; i++) {
      
      positions.push(new kakao.maps.LatLng(res.body.items[i].lat,res.body.items[i].lon));
  }

  for (let i = 0; i < positions.length; i ++) {
    // 마커를 생성합니다
    let marker = new kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: positions[i] // 마커의 위치
    });
  }
})
.catch(error => {
 console.log('Error:', error);
});
})
var swiperContainer = document.querySelector('.swiper-container');

swiperContainer.addEventListener('click', function(event) {
  if (!event.target.classList.contains('swiper-button-prev') && !event.target.classList.contains('swiper-button-next')) {
    event.stopPropagation();
  }
});

// 슬라이더 버튼
var prevButton = document.querySelector('.swiper-button-prev');
var nextButton = document.querySelector('.swiper-button-next');

// 다음 버튼 클릭시
nextButton.addEventListener('click', function () {
  mySwiper.slideToNext();
});

// 이전 버튼 클릭시
prevButton.addEventListener('click', function () {
  mySwiper.slideToPrev();
});

// 슬라이더 정보
var mySwiper = new Swiper('.swiper-container', {
  wrapperClass: 'swiper-wrapper',
  slideClass: 'swiper-slide',
  navigation: {
  prevEl: '.swiper-button-prev',
  nextEl: '.swiper-button-next',
  },
  loop: true,
  slidesPerView: 3,
  centerSlides: true,
  spaceBetween: 20,
});

// university_url 값을 받아오는 함수
function getUniversityUrl() {
  // 현재 페이지의 URL에서 경로(pathname) 부분을 추출
  const path = window.location.pathname;

  // 경로에서 universityUrl 값을 추출
  const pathParts = path.split('/');
  const universityUrl = pathParts[pathParts.length - 1];
  return universityUrl;
}

const universityName = document.querySelector("#universityName");
const userName = document.querySelector("#userName");
const slide1 = document.querySelector("#img1");
const slide2 = document.querySelector("#img2");
const slide3 = document.querySelector("#img3");
const slide4 = document.querySelector("#img4");
const slide5 = document.querySelector("#img5");


var Uniname = [];

function councilLoad(){
  const universityUrl = getUniversityUrl();
  const req = {
    university_url: universityUrl
  };

  fetch(`http://localhost:3000/getUniversityName`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req),
  })
  .then((res) => res.json())
  .then(res => {
    Uniname.push(res.university_name);
    universityName.innerHTML = Uniname[0];
  })
  fetch(`http://localhost:3000/getImages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req),
  })
  .then((res) => res.json())
  .then(res => {
    const imageUrls = res.map(obj => obj.image_url); // 이미지 URL 배열
    // 이미지 URL을 각각의 swiper-slide에 할당
    slide1.src = imageUrls[0];
    slide2.src = imageUrls[1];
    slide3.src = imageUrls[2];
    slide4.src = imageUrls[3];
    slide5.src = imageUrls[4];
  })
}

window.addEventListener('DOMContentLoaded', councilLoad);


 


// 현재 URL의 경로 일부 가져오기 (council 뒤의 학교 이름 추출함)
function getDynamicValueFromURL() {
var path = window.location.pathname;
var regex = /\/council\/([a-zA-Z]+)/; // /council/ 다음에 있는 영어 문자열을 추출하는 정규식
var matches = path.match(regex);
if (matches && matches.length > 1) {
  return matches[1];
} else {
  return null;
}
}

// 새로운 url 만들기
function generateDynamicURL(linkId, userschool) {
  var dynamicValue;

  // linkId에 따라 동적 값을 할당하는 로직을 구현합니다.
  if (linkId === "retailer") {
    dynamicValue = "retailer/" + userschool;
  } else if (linkId === "partner") {
    dynamicValue = "partner/" + userschool;
  } else if (linkId === "mypage") {
    dynamicValue = "mypage/" + userschool;
  } else if (linkId === "news") {
    dynamicValue = "post/" + userschool;
  }

  return "http://localhost:3000/" + dynamicValue;
}

// 새로운 url로 업데이트
function updateDynamicLinks() {
  var userschool = getDynamicValueFromURL();
      if (!userschool) {
        console.log("영어 문자열이 URL에서 추출되지 않았습니다.");
        return;
      }

  var link1 = document.getElementById("main_retailer");
  var link2 = document.getElementById("partner");
  var link3 = document.getElementById("mypage");
  var link4 = document.getElementById("news");
  var link5 = document.getElementById("more_retailer");

  link1.href = generateDynamicURL("retailer",userschool);
  link1.textContent = "소상공인 가게 지도";

  link2.href = generateDynamicURL("partner",userschool);
  link2.textContent = "제휴 지도";

  link3.href = generateDynamicURL("mypage",userschool);
  link3.textContent = "마이페이지";

  link4.href = generateDynamicURL("news",userschool);
  link4.textContent = "더보기 ►";

  link5.href = generateDynamicURL("retailer",userschool);
  link5.textContent = "더보기 ►";
}

// 동적 링크 업데이트 함수를 호출합니다.
updateDynamicLinks();
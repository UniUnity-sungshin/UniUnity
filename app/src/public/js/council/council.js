// 지도
var mapContainer = document.getElementById('map'),
mapOption = { 
    center: new kakao.maps.LatLng(37.5912999, 127.0221068), // 지도의 중심좌표
    level: 3 // 지도의 확대 레벨
};

var map = new kakao.maps.Map(mapContainer, mapOption); // 지도 생성

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
  slidesPerView: 3.5,
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
}

window.addEventListener('DOMContentLoaded', councilLoad);
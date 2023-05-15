
// swiper 요소
const sliderElements = document.querySelectorAll('.swiper-slide');
// swiper 버튼
const arrowLeft = document.querySelector('.swiper-button-prev');
const arrowRight = document.querySelector('.swiper-button-next');

// 지도
var mapContainer = document.getElementById('map'),
               mapOption = { 
                   center: new kakao.maps.LatLng(37.5912999, 127.0221068), // 지도의 중심좌표
                   level: 3 // 지도의 확대 레벨
               };

           var map = new kakao.maps.Map(mapContainer, mapOption); // 지도 생성

// swiper 현재 요소 페이지
let current = 0;

// swiper 요소 안 보이게
const reset = () => {
    sliderElements.forEach((el) => el.style.display = 'none');
};

// 왼쪽 버튼 눌렀을 때 함수
const slideLeft = () => {
    reset();
    sliderElements[current-1].style.display = 'block';
    current--;
};

// 오른쪽 버튼 눌렀을 때 함수
const slideRight = () => {
    reset();
    sliderElements[current+1].style.display = 'block';
    current++;
};

// 오른쪽 버튼 눌렀을 때
arrowRight.addEventListener('click', function() {
    if (current === sliderElements.length-1) {
        current = -1;
    }
    slideRight();
})

// 왼쪽 버튼 눌렀을 때
arrowLeft.addEventListener('click', function() {
    if (current === 0) {
        current = sliderElements.length;
    }
    slideLeft();
})
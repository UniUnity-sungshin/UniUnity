// university_url 값을 받아오는 함수
function getUniversityUrl() {
  // 현재 페이지의 URL에서 경로(pathname) 부분을 추출
  const path = window.location.pathname;

  // 경로에서 universityUrl 값을 추출
  const pathParts = path.split('/');
  const universityUrl = pathParts[pathParts.length - 1];
  return universityUrl;
}

// 지도
var mapContainer = document.getElementById('map'),
               mapOption = { 
                   center: new kakao.maps.LatLng(37.5912999, 127.0221068), // 지도의 중심좌표
                   level: 3 // 지도의 확대 레벨
               };

           var map = new kakao.maps.Map(mapContainer, mapOption); // 지도 생성

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
  
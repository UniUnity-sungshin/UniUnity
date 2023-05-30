//글 에디터
const Editor = toastui.Editor;



const editor = new Editor({
    el: document.querySelector('#editor'),
    height: '500px',
    initialEditType: 'wysiwyg',
    previewStyle: 'vertical'
  });
  
  editor.getMarkdown();


  
//카테고리 선택
var selectedValue = "";
  var selectPostCategoryElement = document.getElementById('select_post_category');
  selectPostCategoryElement.addEventListener('change', function () {
    selectedValue = this.value;
    console.log(selectedValue); //제휴 소식은 선택시 콘솔에 1로 나옴

});


// 제휴가게 등록하기 폼
// ===========================================================================================
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


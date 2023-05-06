"use strict";

var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
               mapOption = { 
                   center: new kakao.maps.LatLng(37.5912999, 127.0221068), // 지도의 중심좌표
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

           //********* 지도 클릭 시 마커 표시 이벤트 *********//
           // 지도에 클릭 이벤트를 등록합니다
           // 지도를 클릭하면 마지막 파라미터로 넘어온 함수를 호출합니다
           kakao.maps.event.addListener(map, 'click', function(mouseEvent) {        
               
               // 클릭한 위도, 경도 정보를 가져옵니다 
               var latlng = mouseEvent.latLng; 
               
               // 마커 위치를 클릭한 위치로 옮깁니다
               marker.setPosition(latlng);
           });

           //********* 지도 마커 클릭 이벤트 *********//
           // 마커를 표시할 위치입니다 
           var position =  new kakao.maps.LatLng(33.450701, 126.570667);

           // 마커를 생성합니다
           var marker = new kakao.maps.Marker({
           position: position,
           clickable: true // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정합니다
           });

           // 아래 코드는 위의 마커를 생성하는 코드에서 clickable: true 와 같이
           // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정합니다
           // marker.setClickable(true);

           // 마커를 지도에 표시합니다.
           marker.setMap(map);

           // 마커를 클릭했을 때 마커 위에 표시할 인포윈도우를 생성합니다
           var iwContent = '<div style="padding:5px;">Hello World!</div>', // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
               iwRemoveable = true; // removeable 속성을 ture 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다

           // 인포윈도우를 생성합니다
           var infowindow = new kakao.maps.InfoWindow({
               content : iwContent,
               removable : iwRemoveable
           });

           // 마커에 클릭이벤트를 등록합니다
           kakao.maps.event.addListener(marker, 'click', function() {
               // 마커 위에 인포윈도우를 표시합니다
               infowindow.open(map, marker);  
           });

function retailer(){

    fetch("/retailer",{
        method:"GET",
        headers:{
            "Content-Type" :"application/json",
        },
        body:JSON.stringify(req),
    })
    .then((res)=>res.json())
    .then((res)=>{
        if(res.success){
            location.href ="/";
        }else{
            alert(res.msg);
        }
    })
    .catch((err)=>{
        console.log(err);
    });
}

// app.get('/retailer', function(req, res){
//     request(test, function(error, response, body){
//       if(error){
//         console.log(error)
//       }
//       let obj = JSON.parse(body);
//       // 콘솔에 찍어보기
//       console.log(obj.body.items[0].trarNo);
//     })
//   })
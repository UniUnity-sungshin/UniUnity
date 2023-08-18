//로그인(로그아웃), 회원가입(마이페이지)버튼
const loginStatusBtn = document.getElementById("loginStatusBtn");
const signUpBtn = document.getElementById("signUpBtn");

const user_email = document.getElementById("user_email");
const user_nickname = document.getElementById("user_nickname");
const user_type = document.getElementById("user_type");
const user_name = document.getElementById("user_name");
const university_name = document.getElementById("university_name");
const navBar = document.getElementById("navbar");


//회원로그인 정보 불러오기
const loadloginData = () => {
  const url = `${apiUrl}/loginStatus`;
  fetch(url)
    .then((res) => res.json())
    .then(res => {
      userInfo = res;
      setLoginHeader(res);
    }
    )
}
const setLoginHeader = (res) => {
  navBar.setAttribute("href", `${apiUrl}`);
  if (res.loginStatus) {
    loginStatusBtn.setAttribute("href", `${apiUrl}/logout`);
    loginStatusBtn.innerText = "로그아웃"
    signUpBtn.setAttribute("href", `${apiUrl}/mypage`);
    signUpBtn.innerText = "마이페이지"
  }
  else {
    loginStatusBtn.setAttribute("href", `${apiUrl}/login`);
    loginStatusBtn.innerText = "로그인"
    signUpBtn.setAttribute("href", `${apiUrl}/signup/agreement`);
    signUpBtn.innerText = "회원가입"
  }

}
// 기본 좌표 저징 지도 코드
// ===========================================================================================
var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
  mapOption = {
    center: new kakao.maps.LatLng(37.5667, 126.9783),
    level: 3 // 지도의 확대 레벨
  };

var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다
// ===========================================================================================
// 검색창 버전 => university_url을 모두 university_name으로 변경해야 함


// university_url 값을 받아오는 함수
function getUniversityUrl() {
  const url = new URL(window.location.href);
  const universityUrl = url.pathname.split('/').pop();
  return universityUrl;
}

// ********* HTML에 표시될 가게 정보 ********* //
const storeName = document.querySelector('#storeName'),
  storeAdr = document.querySelector('#storeAdr'),
  partnerContent = document.querySelector('#partnerContent'),
  eventDate = document.querySelector('#eventDate');
const storeInfoTextBox = document.querySelectorAll(".storeInfoTextBox"),
  searchBtn = document.querySelector('#serchBtn'),
  partnerMapSerch = document.querySelector("#partnerMapSerch");
const universityName = document.getElementById("universityName");
let center;
let stores = [];
let positions = [];
var Uniname = [];


function setCenter(map, latitude, longitude) {
  // 이동할 위도 경도 위치를 생성합니다
  var moveLatLon = new kakao.maps.LatLng(latitude, longitude);

  // 지도 중심을 이동 시킵니다
  map.setCenter(moveLatLon);
}

function getUniversityName() {
  const universityUrl = getUniversityUrl();
  const req = {
    university_url: universityUrl
  };
  fetch(`${apiUrl}/getUniversityName`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      return res.json();
    })
    .then(res => {
      Uniname.push(res.university_name);
      universityName.textContent = Uniname[0];
    })
    .catch((error) => {
      console.error('There has been a problem with your fetch operation:', error);
    });
}

function partnerLoad() {
  const universityUrl = getUniversityUrl();
  const req = {
    university_url: universityUrl,
  };
  fetch(`${apiUrl}/getPartner`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      console.log(`${apiUrl}/getPartner fetch`);
      return res.json();
    })
    .then(res => {
      center = []; // center 배열 초기화
      center.push(res[0]);
      setCenter(map, parseFloat(center[0].latitudeUni), parseFloat(center[0].longitudeUni));
      var now = new Date();
      var nowYear = (now.getFullYear()).toString();
      var nowMonth;
      if ((now.getMonth() + 1) < 10) {
        nowMonth = "0" + (now.getMonth() + 1).toString();
      } else {
        nowMonth = (now.getMonth() + 1).toString();
      }
      var nowDate;
      if ((now.getDate()) < 10) {
        nowDate = "0" + (now.getDate()).toString();
      } else {
        nowDate = (now.getDate()).toString();
      }
      const nowString = nowYear + "-" + nowMonth + "-" + nowDate;
      // 새로운 객체 생성
      for (let i = 1; i < res.length; i++) {
        const obj = {
          storeID: res[i].storeID,
          storeName: res[i].storeName,
          store_location: res[i].store_location,
          university_id: res[i].university_id,
          content: res[i].content,
          startDate: res[i].startDate,
          endDate: res[i].endDate
        };
        // 제휴 종료일자가 오늘 보다 이전 날짜인 제휴 가게는 표시가 되지 않도록 함
        if (obj.endDate >= nowString) {
          stores.push(obj);
          // 객체의 좌표 부분은 따로 저장
          positions.push(new kakao.maps.LatLng(parseFloat(res[i].latitude), parseFloat(res[i].longitude)));
        }
      };
      for (let i = 0; i < positions.length; i++) {
        // 마커를 생성합니다
        let marker = new kakao.maps.Marker({
          map: map, // 마커를 표시할 지도
          position: positions[i] // 마커의 위치
        });
        // 목록에 동적으로 추가
        const li = document.createElement("li");
        li.setAttribute('id', stores[i].storeName);
        const textNode = document.createTextNode(stores[i].storeName);
        li.appendChild(textNode);
        document.getElementById('storeList').appendChild(li);
        // 마커 click, mouseover, mouseout 시에 이벤트 발생
        kakao.maps.event.addListener(marker, 'click', function () {
          for (let j = 0; j < storeInfoTextBox.length; j++) {
            storeInfoTextBox[j].style.display = "block";
          }
          storeName.innerHTML = stores[i].storeName;
          storeAdr.innerHTML = stores[i].store_location;
          partnerContent.innerHTML = stores[i].content;
          eventDate.innerHTML = stores[i].startDate + " ~ " + stores[i].endDate;
        });
        li.addEventListener('click', function () {
          for (let j = 0; j < storeInfoTextBox.length; j++) {
            storeInfoTextBox[j].style.display = "block";
          }
          storeName.innerHTML = stores[i].storeName;
          storeAdr.innerHTML = stores[i].store_location;
          partnerContent.innerHTML = stores[i].content;
          eventDate.innerHTML = stores[i].startDate + " ~ " + stores[i].endDate;
        })
      }
    })
    .catch((error) => {
      console.error('There has been a problem with your fetch operation:', error);
    });
}

window.addEventListener('load', function () {
  getUniversityName();
  updateDynamicLinks();
  loadloginData();
  partnerLoad();
});

// 현재 URL의 경로 일부 가져오기 (partner 뒤의 학교 이름 추출함)
function getDynamicValueFromURL() {
  var path = window.location.pathname;
  var regex = /\/partner\/([a-zA-Z]+)/; // /partner/ 다음에 있는 영어 문자열을 추출하는 정규식
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
  } else if (linkId === "more_news") {
    dynamicValue = "showPostListAll/" + userschool;
  } else if (linkId === "news") {
    dynamicValue = "showPostListAll/" + userschool;
  } else if (linkId === "council") {
    dynamicValue = "council/" + userschool;
  }

  return `${apiUrl}/` + dynamicValue;
}


// 새로운 url로 업데이트
async function updateDynamicLinks() {
  var userschool = getDynamicValueFromURL();
  if (!userschool) {
    console.log("영어 문자열이 URL에서 추출되지 않았습니다.");
    return;
  }
  var link1 = document.getElementById("main_retailer");
  var link2 = document.getElementById("partner");
  var link3 = document.getElementById("news");

  universityName.addEventListener("click", function () {
    var link = generateDynamicURL("council", userschool);
    window.location.href = link;
  })
  link1.addEventListener("click", function () {
    // 버튼을 클릭하면 이동할 링크 주소를 설정하세요.
    var link = generateDynamicURL("retailer", userschool);
    window.location.href = link;
  });

  link2.addEventListener("click", function () {
    // 버튼을 클릭하면 이동할 링크 주소를 설정하세요.
    var link = generateDynamicURL("partner", userschool);
    window.location.href = link;
  });

  link3.addEventListener("click", function () {
    // 버튼을 클릭하면 이동할 링크 주소를 설정하세요.
    var link = generateDynamicURL("news", userschool);
    window.location.href = link;
  });

}


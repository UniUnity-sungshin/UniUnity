let userInfo; // 유저정보
//로그인(로그아웃), 회원가입(마이페이지)버튼
const loginStatusBtn = document.getElementById("loginStatusBtn");
const signUpBtn = document.getElementById("signUpBtn");
const navBar = document.getElementById("navbar");

const fetchLoginData = async () => {
    const url = `${apiUrl}/loginStatus`;
    await fetch(url)
        .then((res) => res.json())
        .then(res => {
            console.log(res);
            userInfo = res;
            setLoginHeader(res)
        }
        )
}

const setLoginHeader = (res) => {
    navBar.setAttribute("href", `${apiUrl}`);
    if (res.loginStatus) {
        loginStatusBtn.setAttribute("href", `${apiUrl}/logout`);
        loginStatusBtn.innerText = "로그아웃"
        signUpBtn.setAttribute("href", `${apiUrl}/council/${res.university_url}`);
        signUpBtn.innerText = "나의학교"
    }
    else {
        alert('로그인 세션이 만료되었습니다. 다시 로그인해주세요.');
        window.location.href = "/login"; // 리다이렉션 처리
    }

}

const fetchPostData = async () => {
    let frontend_url = window.location.href;
    let category = frontend_url.split('/')[6];
    let req = {
        user_email: userInfo.user_email
    }
    const url = `${apiUrl}/mypage/community/post/${category}`;
    await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
    })
        .then((res) => res.json())
        .then(res => {
            console.log(res)
            if (res.status === 200) {
                res.result.forEach((data) =>createCard(data));
                
            } else {
                alert("서버의 문제로 게시글 관리 접근에 실패했습니다. 다시 시도해주세요.");
            }
        })
        .catch((error) => {
            console.error("Error: ", error);
            alert("서버의 문제로 게시글 관리 접근에 실패했습니다. 다시 시도해주세요.");
        })

}
function truncateText(elementId, maxLength, data) {
    const element = document.getElementById(elementId);
    console.log(element)
    if (element) {
        if (data.length > maxLength) {
            element.textContent = data.slice(0, maxLength) + '...';
        }
    }
}


// Function to create a card element with data and append it to the container
function createCard(data) {
    // console.log(data)
    // let post_title = document.getElementById('post_title').textContent = data.post_title;
    // let post_content = document.getElementById('post_content').textContent = data.post_content;
    // //게시글 제목이 30자이상이면 나머지 문자열 ...처리
    // if (data.post_title.length > 30) {
    //     post_title = truncateText('post_title', 30, data.post_title);
    // }
    // //게시글 내용이 100글자 이상이면 나머지 문자열 ...처리
    // if (data.post_content.length > 100) {
    //     post_content = truncateText('post_content', 100, data.post_content);
    // }


    const cardContainer = document.getElementById('card_container');

    // Create a new card element
    const cardElement = document.createElement('div');
    cardElement.classList.add('mt-2', 'mb-3', 'card');

    // Fill in the card template with data
    cardElement.innerHTML = `
        <div class="card-body d-flex justify-content-between">
            <div>
                <div class="small text-muted">${data.post_date}</div>
                <h2 class="card-title h4 mt-2">${data.post_title}</h2>
            </div>
            <a class="btn btn-primary" href="${apiUrl}/postviewer/${data.post_id}" style="margin-top: 0.5rem;">Read more →</a>
        </div>

        <div class="card-text ps-3 d-flex justify-content-between">
            <p class="small text-muted">${data.category}</p>
        </div>
        <div class="card-text ps-3 d-flex">
            <img width="24" height="24" src="https://img.icons8.com/color/48/filled-like.png" style="margin-right: 0.3rem;"  alt="filled-like" />
            <p class="small text-muted" style="margin-right: 1rem;" >${data.like_count}</p>
            <img width="24" height="24" src="https://img.icons8.com/fluency/48/filled-star.png" style="margin-right: 0.3rem; margin-bottom:0.3rem" alt="filled-star"/>
            <p class="small text-muted" style="margin-right: 1rem;">${data.scrap_count}</p>
            <img width="24" height="24" src="https://img.icons8.com/color/48/speech-bubble-with-dots.png" style="margin-right: 0.3rem;" alt="speech-bubble-with-dots"/>
            <p class="small text-muted" style="margin-right: 1rem;">${data.comment_count}</p>
        </div>
    `;
    // Append the card to the container
    cardContainer.appendChild(cardElement);
}



// function updatePostData(data) {
//     var card = document.createElement('div');
//     card.className = 'card mb-3';

//     var cardBody = document.createElement('div');
//     cardBody.className = 'card-body d-flex justify-content-between';

//     document.getElementById('post_date').textContent = data.post_date;
//     document.getElementById('post_category').textContent = data.post_category;
//     document.getElementById('comment_count').textContent = data.comment_count;
//     document.getElementById('like_count').textContent = data.like_count;
//     // document.getElementById('scrap_count').textContent = data.scrap_count;


// }

// 로드 후 loadData()실행
window.addEventListener('DOMContentLoaded', async function () {
    await fetchLoginData();
    await fetchPostData();

});

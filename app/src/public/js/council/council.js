// let db = require('../../../../config/db');

// const getUniName = (req, res) => {
//     var universityName;
//     var universityURL = document.location.pathname;
//     var sql = `SELECT university_name FROM University WHERE university_url = ${universityName}`;
//     db.query(sql, function(err, results, field) {
//         universityName = results;
//         console.log(universityName);
//     })
// };

const sliderElements = document.querySelectorAll('.swiper-slide');
const arrowLeft = document.querySelector('.swiper-button-prev');
const arrowRight = document.querySelector('.swiper-button-next');

// const loadData = () => {
//     const url = `http://localhost:3000/council/sungshin`;
//     fetch(url)
//         .then((res) => res.json())
//         .then(res => {
//             console.log(res);
//             fillSearch(res);
//         })
//     // }
// }
// const fillSearch = (suggestArr) => {
//     ul.innerHTML = "";
//     suggestArr.forEach((el, idx) => {
//         // el : {universityname : "성신여자대학교"}
//         //universitySearchList.push(el);
//         //console.log(el.university_name);
//     })
// }

// //mainpage 로드 후 loadData()실행
// window.addEventListener('DOMContentLoaded', function()
// {
//     loadData();
// });

let current = 0;

const reset = () => {
    sliderElements.forEach((el) => el.style.display = 'none');
};

const slideLeft = () => {
    reset();
    sliderElements[current-1].style.display = 'block';
    current--;
};

const slideRight = () => {
    reset();
    sliderElements[current+1].style.display = 'block';
    current++;
};

arrowRight.addEventListener('click', function() {
    if (current === sliderElements.length-1) {
        current = -1;
    }
    slideRight();
    getUniName();
})

arrowLeft.addEventListener('click', function() {
    if (current === 0) {
        current = sliderElements.length;
    }
    slideLeft();
})
const navBar=document.getElementById("navbar");
navBar.setAttribute("href", `${apiUrl}`);

const agreeToAllCheckbox = document.getElementById("flexCheckDefault");
const allCheckboxes = document.querySelectorAll(".form-check-input");
const marketingCheckbox = document.getElementById("flexCheckDefault4");

var isCheckedMarketing=false;
marketingCheckbox.addEventListener("change",function(){
     isCheckedMarketing=this.checked;
})
agreeToAllCheckbox.addEventListener("change", function () {
    const isChecked = this.checked;
    allCheckboxes.forEach((checkbox) => {
        checkbox.checked = isChecked;
    });

    const termsCard1 = document.getElementById("termsCard1");
    const termsCard2 = document.getElementById("termsCard2");
    const termsCard3 = document.getElementById("termsCard3");

    if (isChecked) {
        termsCard1.style.display = "none";
        termsCard2.style.display = "none";
        termsCard3.style.display = "none";
        isCheckedMarketing=true
    } else {
        termsCard1.style.display = "block";
        termsCard2.style.display = "block";
        termsCard3.style.display = "block";
    }
});

const nextButton = document.getElementById('nextBtn')

nextButton.addEventListener("click", function () {
    const allChecked = Array.from(allCheckboxes).every(checkbox => checkbox.checked);
    
    if (!allChecked) {
        if(!isCheckedMarketing){
             // 페이지 이동할 URL
             const signupURL = `${apiUrl}/signup/0`;
             // 페이지 이동
             window.location.href = signupURL;
        }else{
            alert("모든 약관에 동의해야 회원가입을 진행할 수 있습니다.");
        }
    } 
    
    else {
        // 페이지 이동할 URL
        const signupURL = `${apiUrl}/signup/1`;
        // 페이지 이동
        window.location.href = signupURL;
    }
});







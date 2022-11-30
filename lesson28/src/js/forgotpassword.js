import { checkFormValidityInBlur } from "./modules/validation";
import { Chance } from "chance";
const chance = new Chance();

const emailOfInput = document.querySelector(".js-form-email");
const submitButton = document.querySelector(".js-submit-button");

emailOfInput.addEventListener("blur", (e) => {
    e.target.classList.add("invalid");
    checkFormValidityInBlur(submitButton, e.target);
});

const tryToSubmit = async() => {
    let result;
    try {
        result = await checkToRegistered();
        localStorage.setItem("token", result.token);
    } catch(rejectObj) {
        result = rejectObj;
        submitButton.nextElementSibling.textContent = "メールアドレスが見つかりませんでした。";
        submitButton.disabled = true;
    } finally {
        if(result.token) {
            window.location.href = "./register/password.html";
        }
    }
}

const checkToRegistered = () => {
    return new Promise((resolve, reject) => {
        const registeredData = JSON.parse(localStorage.getItem("registeredData"));
        
        if (emailOfInput.value === registeredData.email) {
            resolve({ token: chance.apple_token(), ok: true, code: 200 });
        } else {
            reject({ ok: false, code: 401 });
        }
    })
}

submitButton.addEventListener("click", tryToSubmit);

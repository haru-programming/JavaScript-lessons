import { checkFormValidityInBlur } from "./modules/validation";
import { Chance } from "chance";
const chance = new Chance();

const userIdOfInput = document.querySelector(".js-form-userid");
const passwordOfInput = document.querySelector(".js-form-password");
const formElements = [userIdOfInput,passwordOfInput];
const submitButton = document.querySelector(".js-submit-button");

formElements.forEach(element => {
    element.classList.add("invalid");

    element.addEventListener("blur", (e) => {
        checkFormValidityInBlur(submitButton, e.target);
    });
});

const tryToLogin = async() => {
    let result;
    try {
        result = await checkToRegistered();
        localStorage.setItem("token", result.token);
    } catch(rejectObj) {
        result = rejectObj;
    } finally {
        window.location.href = result.token ? "./index.html" : "./notautherize.html";
    }
}

const checkToRegistered = () => {
    return new Promise((resolve, reject) => {
        const inputsValues = {
            userId: userIdOfInput.value,
            password: passwordOfInput.value
        }
        const registeredData = JSON.parse(localStorage.getItem("registeredData"));

        if ((inputsValues.userId === registeredData.name || inputsValues.userId === registeredData.email) && (inputsValues.password === registeredData.password)) {
            resolve({ token: chance.apple_token(), ok: true, code: 200 });
        } else {
            reject({ ok: false, code: 401 });
        }
    })
}

submitButton.addEventListener("click", tryToLogin);

import { checkFormValidityInBlur } from "./modules/validation";
import { togglePasswordDisplay } from "./modules/togglepassword";

const passwordOfInput = document.querySelector(".js-form-password");
const confirmPasswordOfInput = document.querySelector(".js-form-confirm-password");
const currentPasswordOfInput = document.querySelector(".js-form-current-password");
const formElements = [passwordOfInput, confirmPasswordOfInput, currentPasswordOfInput];
const errorOfConfirmPassword = confirmPasswordOfInput.nextElementSibling;
const eyeIcons = document.querySelectorAll(".js-eye-icon");
const submitButton = document.querySelector(".js-submit-button");

const isMatchPasswordFields = () => passwordOfInput.value === confirmPasswordOfInput.value;
const isMatchRegisteredPassword = (userData) => currentPasswordOfInput.value === userData.password;
const checkFormValidityToEnableSubmitButton = () => submitButton.disabled = passwordOfInput.value !== confirmPasswordOfInput.value;

formElements.forEach(element => {
    element.classList.add("invalid");

    element.addEventListener("blur", () => {
        checkFormValidityInBlur(submitButton, element);

        if (passwordOfInput.value && confirmPasswordOfInput.value) errorOfConfirmPassword.textContent = isMatchPasswordFields() ? "" : "上記のPasswordと異なります。もう一度入力してください。";
        if (document.getElementsByClassName("invalid").length === 0) {
            checkFormValidityToEnableSubmitButton();
        };
    });
});

eyeIcons.forEach(icon => {
    icon.addEventListener("click", (e) => togglePasswordDisplay(e.target))
})

const changePassword = (userData) => {
    userData.password = passwordOfInput.value;
    localStorage.setItem("registeredData", JSON.stringify(userData));
}

submitButton.addEventListener("click", () => {
    const token = localStorage.getItem("token");
    const registeredData = JSON.parse(localStorage.getItem("registeredData"));

    if(!token) {
        window.location.href = "./notautherize.html";
        return;
    }

    if(!registeredData) {
        localStorage.removeItem("token");
        window.location.href = "./notautherize.html";
        return;
    }

    if(!isMatchRegisteredPassword(registeredData)){
        currentPasswordOfInput.nextElementSibling.textContent = "パスワードが一致しません";
        submitButton.disabled = true;
        return;
    }

    changePassword(registeredData);
    const urlParameter = `?token=${token}`;
    window.location.href = `./reset-password-done.html${urlParameter}`;
});

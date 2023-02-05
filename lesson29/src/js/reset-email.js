import { checkFormValidityInBlur } from "./modules/validation";
import { togglePasswordDisplay } from "./modules/togglepassword";

const emailOfInput = document.querySelector(".js-form-email");
const confirmEmailOfInput = document.querySelector(".js-form-confirm-email");
const passwordOfInput = document.querySelector(".js-form-password");
const formElements = [emailOfInput, confirmEmailOfInput, passwordOfInput];
const errorOfConfirmEmail = document.querySelector('[data-name="confirm-email-error"]');
const eyeIcons = document.querySelectorAll(".js-eye-icon");
const submitButton = document.querySelector(".js-submit-button");

const isMatchEmailFields = () => emailOfInput.value === confirmEmailOfInput.value;
const isMatchRegisteredPassword = (userData) => passwordOfInput.value === userData.password;
const checkFormValidityToEnableSubmitButton = () => submitButton.disabled = (emailOfInput.value !== confirmEmailOfInput.value);

formElements.forEach(element => {
    element.classList.add("invalid");

    element.addEventListener("blur", () => {
        checkFormValidityInBlur(submitButton, element);

        if (emailOfInput.value && confirmEmailOfInput.value) errorOfConfirmEmail.textContent = isMatchEmailFields() ? "" : "上記のE-mailアドレスと異なります。もう一度入力してください。";
        if (document.getElementsByClassName("invalid").length === 0) {
            checkFormValidityToEnableSubmitButton();
        };
    });
});

eyeIcons.forEach(icon => {
    icon.addEventListener("click", (e) => togglePasswordDisplay(e.target))
})

const changeEmail = (userData) => {
    userData.email = emailOfInput.value;
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
        document.querySelector('[data-name="current-password-error"]').textContent = "パスワードが一致しません";
        submitButton.disabled = true;
        return;
    }

    changeEmail(registeredData);
    const urlParameter = `?token=${token}`;
    window.location.href = `./reset-email-done.html${urlParameter}`;
});

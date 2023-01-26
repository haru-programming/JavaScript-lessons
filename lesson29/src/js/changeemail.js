import { checkFormValidityInBlur } from "./modules/validation";
import { togglePasswordDisplay } from "./modules/togglepassword";

const emailOfInput = document.querySelector(".js-form-email");
const confirmEmailOfInput = document.querySelector(".js-form-confirm-email");
const passwordOfInput = document.querySelector(".js-form-password");
const formElements = [emailOfInput, confirmEmailOfInput, passwordOfInput];
const errorOfConfirmEmail = confirmEmailOfInput.nextElementSibling;
const eyeIcons = document.querySelectorAll(".js-eye-icon");
const submitButton = document.querySelector(".js-submit-button");

const isMatchEmailFields = () => emailOfInput.value === confirmEmailOfInput.value;
const isMatchRegisteredPassword = () => {
    const registeredData = JSON.parse(localStorage.getItem("registeredData"));
    return passwordOfInput.value === registeredData.password;
}
const checkFormValidityToEnableSubmitButton = () => submitButton.disabled = (emailOfInput.value !== confirmEmailOfInput.value) || !isMatchRegisteredPassword();

formElements.forEach(element => {
    element.classList.add("invalid");

    element.addEventListener("blur", () => {
        checkFormValidityInBlur(submitButton, element);

        if (emailOfInput.value && confirmEmailOfInput.value) errorOfConfirmEmail.textContent = isMatchEmailFields() ? "" : "上記のE-mailアドレスと異なります。もう一度入力してください。";
        if (document.getElementsByClassName("invalid").length === 0) {
            passwordOfInput.nextElementSibling.textContent = isMatchRegisteredPassword() ? "" : "一致するアカウントが見つかりません";
            checkFormValidityToEnableSubmitButton();
        };
    });
});

eyeIcons.forEach(icon => {
    icon.addEventListener("click", (e) => togglePasswordDisplay(e.target))
})

const changeEmail = () => {
    const userData = JSON.parse(localStorage.getItem("registeredData"));
    userData.email = emailOfInput.value;
    localStorage.setItem("registeredData", JSON.stringify(userData));
}

submitButton.addEventListener("click", () => {
    changeEmail();
    const token = localStorage.getItem("token");
    if(!token) {
        window.location.href = "./notautherize.html";
        return;
    }
    const urlParameter = `?token=${token}`;
    window.location.href = `./resetmaildone.html${urlParameter}`;
});

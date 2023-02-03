import { checkFormValidityInBlur } from "./modules/validation";
import { togglePasswordDisplay } from "./modules/togglepassword";
import { Chance } from "chance";
const chance = new Chance();

const urlParameter = Object.fromEntries(new URLSearchParams(window.location.search));
const currentPageToken = urlParameter.token;
const registeredToken = localStorage.getItem("passwordReissueToken");

if(currentPageToken !== registeredToken) window.location.href = "./../notautherize.html";


const passwordOfInput = document.querySelector(".js-form-password");
const confirmPasswordOfInput = document.querySelector(".js-form-confirm-password");
const formElements = [passwordOfInput, confirmPasswordOfInput];
const errorOfConfirmPassword = confirmPasswordOfInput.nextElementSibling;
const submitButton = document.querySelector(".js-submit-button");
const eyeIcons = document.querySelectorAll(".js-eye-icon");

const isMatchPasswordFields = () => passwordOfInput.value === confirmPasswordOfInput.value;
const checkFormValidityToEnableSubmitButton = () => submitButton.disabled = passwordOfInput.value !== confirmPasswordOfInput.value;

formElements.forEach(element => {
    element.classList.add("invalid");

    element.addEventListener("blur", () => {
        checkFormValidityInBlur(submitButton, element);

        if (document.getElementsByClassName("invalid").length === 0) {
            errorOfConfirmPassword.textContent = isMatchPasswordFields() ? "" : "上記のpasswordと異なります。もう一度入力してください。";
            checkFormValidityToEnableSubmitButton();
        }
    });
});

eyeIcons.forEach(icon => {
    icon.addEventListener("click", (e) => togglePasswordDisplay(e.target))
})

const changePassword = () => {
    const passwordValue = passwordOfInput.value;
    const userData = JSON.parse(localStorage.getItem("registeredData"));
    userData.password = passwordValue;
    localStorage.setItem("registeredData", JSON.stringify(userData));
}

submitButton.addEventListener("click", () => {
    changePassword();

    const token = chance.apple_token();
    const newUrlParameter = `?token=${token}`;

    localStorage.setItem("passwordReissueToken", token);
    window.location.href = `./password-done.html${newUrlParameter}`;
});

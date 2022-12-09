import { checkFormValidityInBlur } from "./modules/validation";

const urlParameter = Object.fromEntries(new URLSearchParams(window.location.search));
const currentPageToken = urlParameter.token;
const registeredToken = localStorage.getItem("passwordReissueToken");

if(currentPageToken !== registeredToken) window.location.href = "./../notautherize.html";


const passwordOfInput = document.querySelector(".js-form-password");
const confirmPasswordOfInput = document.querySelector(".js-form-confirm-password");
const formElements = [passwordOfInput, confirmPasswordOfInput];
const submitButton = document.querySelector(".js-submit-button");
const eyeIcons = document.querySelectorAll(".js-eye-icon");

formElements.forEach(element => {
    element.classList.add("invalid");

    element.addEventListener("blur", (e) => {
        checkFormValidityInBlur(submitButton, e.target);
    });
});

eyeIcons.forEach(icon => {
    icon.addEventListener("click", (e) => togglePasswordDisplay(e.target))
})

const togglePasswordDisplay = target => {
    const selectedInput = target.nextElementSibling;
    if (selectedInput.type === "password"){
        selectedInput.type = "text";
        target.classList.add("is-open");
    } else {
        selectedInput.type = "password";
        target.classList.remove("is-open");
    }
}

submitButton.addEventListener("click", () => {
    checkFormValidityInBlur(submitButton, confirmPasswordOfInput);
    console.log("submitされました。この後はまだ未実装です。");
})




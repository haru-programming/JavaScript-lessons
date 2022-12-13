import { isEmptyOfInput } from "./modules/validation";

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

const showErrorMessage = () => errorOfConfirmPassword.textContent = passwordOfInput.value !== confirmPasswordOfInput.value ? "上記のpasswordと異なります。もう一度入力してください。" : "";
const checkFormValidityToEnableSubmitButton = () => submitButton.disabled = passwordOfInput.value !== confirmPasswordOfInput.value;

formElements.forEach(element => {
    element.addEventListener("blur", () => {
        element.nextElementSibling.textContent = "";

        if (isEmptyOfInput(element)) {
            element.nextElementSibling.textContent = "入力してください";
            return;
        }
    
        if ((element.name === "password" && confirmPasswordOfInput.value) || (element.name === "confirmPassword")){
            showErrorMessage();
            checkFormValidityToEnableSubmitButton();
        }
    });
});

eyeIcons.forEach(icon => {
    icon.addEventListener("click", (e) => togglePasswordDisplay(e.target))
})

const togglePasswordDisplay = target => {
    const selectedInput = target.nextElementSibling;
    selectedInput.type = selectedInput.type === "password" ? "text" : "password";
    target.classList.toggle("is-open");
}

submitButton.addEventListener("click", () => {
    checkFormValidityToEnableSubmitButton();
    console.log("submitされました。この後はまだ未実装です。");
})

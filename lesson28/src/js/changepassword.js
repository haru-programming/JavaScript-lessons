import { checkFormValidityInBlur } from "./modules/validation";

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

const showErrorMessageWhenNotMatchInputsValues = () => errorOfConfirmPassword.textContent = passwordOfInput.value !== confirmPasswordOfInput.value ? "上記のpasswordと異なります。もう一度入力してください。": "";
const checkFormValidityToEnableSubmitButton = (element) => {
    if(checkFormValidityInBlur(submitButton, element)){
        submitButton.disabled = passwordOfInput.value !== confirmPasswordOfInput.value;
    }
}

formElements.forEach(element => {
    element.classList.add("invalid");

    element.addEventListener("blur", () => {
        checkFormValidityInBlur(submitButton, element);

        if (passwordOfInput.value && confirmPasswordOfInput.value) {
            showErrorMessageWhenNotMatchInputsValues();
            checkFormValidityToEnableSubmitButton(element);
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
    console.log("submitされました。この後はまだ未実装です。");
})

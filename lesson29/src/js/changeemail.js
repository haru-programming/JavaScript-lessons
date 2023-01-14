import { checkFormValidityInBlur } from "./modules/validation";

const emailOfInput = document.querySelector(".js-form-email");
const confirmEmailOfInput = document.querySelector(".js-form-confirm-email");
const passwordOfInput = document.querySelector(".js-form-password");
const formElements = [emailOfInput, confirmEmailOfInput, passwordOfInput];
const errorOfConfirmEmail = confirmEmailOfInput.nextElementSibling;
const submitButton = document.querySelector(".js-submit-button");

const isMatchEmailFields = () => emailOfInput.value === confirmEmailOfInput.value;
const checkFormValidityToEnableSubmitButton = () => submitButton.disabled = emailOfInput.value !== confirmEmailOfInput.value;

formElements.forEach(element => {
    element.classList.add("invalid");

    element.addEventListener("blur", () => {
        checkFormValidityInBlur(submitButton, element);

        if (emailOfInput.value && confirmEmailOfInput.value) errorOfConfirmEmail.textContent = isMatchEmailFields() ? "" : "上記のE-mailアドレスと異なります。もう一度入力してください。";
        if (document.getElementsByClassName("invalid").length === 0) checkFormValidityToEnableSubmitButton();
    });
});

submitButton.addEventListener("click", () => console.log("まだ未実装です"));

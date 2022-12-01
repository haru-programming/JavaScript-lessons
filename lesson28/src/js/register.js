import { showErrorMessage,checkFormValidityInBlur, checkFormValidityToEnableSubmitButton } from "./modules/validation";

const bodyElement = document.querySelector("body");
const checkboxLink = document.getElementById("js-checkbox-link");
const modalCloseButton = document.getElementById("js-modal-close-button");
const modalInner = document.getElementById("js-modal-inner");
const submitButton = document.querySelector(".js-submit-button");

const openModal = () => {
    document.getElementById("js-modal-area").classList.add("is-active");
    bodyElement.classList.add("fixed");
    document.getElementById("js-modal-contents").scrollTop = 0;
};

const closeModal = () => {
    document.getElementById("js-modal-area").classList.remove("is-active");
    bodyElement.classList.remove("fixed");
};

checkboxLink.addEventListener("click", openModal);
checkboxLink.addEventListener("keypress", openModal);
modalCloseButton.addEventListener("click", closeModal);

//モーダル以外の部分を押すとモーダルが閉じる
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("js-modal")) closeModal();
});

//スクロールが一番下に行ったらチェックボックスをcheckedにする
const observerTarget = document.getElementById("js-last-sentence");
const observerOptions = {
    root: modalInner,
    threshold: 1.0
};
const checkbox = document.getElementById("js-checkbox");

const setCheckedAttributeToCheckbox = ([entry]) => {
    const invalidItems = document.getElementsByClassName("invalid");
    if (entry.isIntersecting) {
        checkbox.checked = true;
        checkbox.disabled = false;
        checkbox.classList.remove("invalid");
        checkFormValidityToEnableSubmitButton(submitButton,invalidItems);
    }
};

const observer = new IntersectionObserver(setCheckedAttributeToCheckbox, observerOptions);
observer.observe(observerTarget);

const nameOfInput = document.querySelector(".js-form-name");
const emailOfInput = document.querySelector(".js-form-email");
const passwordOfInput = document.querySelector(".js-form-password");
const formElements = [nameOfInput, emailOfInput, passwordOfInput];

formElements.forEach(element => {
    element.classList.add("invalid");
    
    element.addEventListener("blur", (e) => {
        checkFormValidityInBlur(submitButton, e.target);
    });
});

checkbox.addEventListener("input", () => {
    const invalidItems = document.getElementsByClassName("invalid");
    submitButton.disabled = !checkbox.checked;
    checkbox.checked? checkbox.classList.remove("invalid") : checkbox.classList.add("invalid");
    checkFormValidityToEnableSubmitButton(submitButton,invalidItems);
})

submitButton.addEventListener("click", (e) => {
    e.preventDefault();

    const inputsData = {
        name: nameOfInput.value,
        email: emailOfInput.value,
        password: passwordOfInput.value
    };
    const registeredData = JSON.parse(localStorage.getItem("registeredData"));

    if (registeredData && inputsData.email === registeredData.email) {
        submitButton.disabled = true;
        showErrorMessage(e.target);
        return;
    }

    localStorage.setItem("registeredData", JSON.stringify(inputsData));
    window.location.href = "./register-done.html";
});

import { validationOptions } from "./validation-options";

const bodyElement = document.querySelector("body");
const checkboxLink = document.getElementById("js-checkbox-link");
const modalCloseButton = document.getElementById("js-modal-close-button");
const modalInner = document.getElementById("js-modal-inner");
const submitButton = document.getElementById("js-submit-button");

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

modalCloseButton.addEventListener("click", () => {
    closeModal();
    checkFormValidityToEnableSubmitButton();
});

//モーダル以外の部分を押すとモーダルが閉じる
document.addEventListener("click", (e) => {
    if(e.target.classList.contains("js-modal")){
        closeModal();
        checkFormValidityToEnableSubmitButton();
    }
});

//スクロールが一番下に行ったらチェックボックスをcheckedにする
const observerTarget = document.getElementById("js-last-sentence");
const observerOptions = {
    root: modalInner,
    threshold: 1.0
};
const checkbox = document.getElementById("js-checkbox");

const setCheckedAttributeToCheckbox = ([entry]) => {
    if (entry.isIntersecting) {
        checkbox.checked = true;
        checkbox.disabled = false;
    }
};

const observer = new IntersectionObserver(setCheckedAttributeToCheckbox, observerOptions);
observer.observe(observerTarget);

const nameOfInput = document.querySelector(".js-form-name");
const emailOfInput = document.querySelector(".js-form-email");
const passwordOfInput = document.querySelector(".js-form-password");
const formElements = [nameOfInput, emailOfInput, passwordOfInput];

const addInvalidClass = target => target.classList.add("invalid");
const removeInvalidClass = target => target.classList.remove("invalid");
const showErrorMessage = target => target.nextElementSibling.textContent = validationOptions[target.id].errorMessage;
const isEmptyOfInput = target => target.value.trim() === "";
const isValidFormInput = target => validationOptions[target.id].isValid(target);

const isValidInputAndCheckbox = () => {
    const invalidItems = document.getElementsByClassName("invalid");
    return invalidItems.length === 0 && checkbox.checked;
};

const checkFormValidityToEnableSubmitButton = () => submitButton.disabled = isValidInputAndCheckbox() ? false : true;

const checkFormValidityInBlur = (target) => {
    submitButton.disabled = true;

    if (isEmptyOfInput(target)) {
        addInvalidClass(target);
        target.nextElementSibling.textContent = "入力してください";
        return;
    }
    if (!isValidFormInput(target)) {
        showErrorMessage(target);
        addInvalidClass(target);
        return;
    }

    target.nextElementSibling.textContent = "";
    removeInvalidClass(target);
    checkFormValidityToEnableSubmitButton();
};

formElements.forEach(element => {
    element.classList.add("invalid");
    
    element.addEventListener("blur", (e) => {
        checkFormValidityInBlur(e.target);
    });
});

checkbox.addEventListener("input", () => {
    submitButton.disabled = !checkbox.checked;
    checkFormValidityToEnableSubmitButton();
})

submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    if (isValidInputAndCheckbox()) window.location.href = "./register-done.html";
});

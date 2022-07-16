const bodyElement = document.querySelector("body");
const checkboxLink = document.getElementById("js-checkbox-link");
const modalCloseButton = document.getElementById("js-modal-close-button");
const modalInner = document.getElementById("js-modal-inner");
const submitButton = document.getElementById("js-submit-button");

const openModal = () => {
    document.getElementById("js-modal-area").classList.add("is-active");
    bodyElement.classList.add("fixed");
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

const checkFormToNotEmpty = target => {
    if (target.value.trim() === "") target.nextElementSibling.textContent = "入力してください";
};

const checkFormNameValidation = () => {
    const upperLimitOfText = 15;
    const nameErrorText = document.getElementById("js-name-error");

    if (nameOfInput.value.length > upperLimitOfText) {
        nameErrorText.textContent = "ユーザー名は15文字以内で入力してください";
        nameOfInput.classList.add("invalid");
    } else {
        nameErrorText.textContent = "";
        nameOfInput.classList.remove("invalid");
    }
};

const checkFormEmailValidation = () => {
    const emailErrorText = document.getElementById("js-email-error");
    emailErrorText.textContent = "";
    if (emailOfInput.validity.typeMismatch) emailErrorText.textContent = "メールアドレスの形式になっていません";
};

const checkFormPasswordValidation = () => {
    const passwordErrorText = document.getElementById("js-password-error");
    const passwordPattern = /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)[a-zA-Z\d]{8,}$/;

    if (passwordPattern.test(passwordOfInput.value)) {
        passwordErrorText.textContent = "";
        passwordOfInput.classList.remove("invalid");
    } else {
        passwordErrorText.textContent = "8文字以上の大小の英数字を交ぜたものにしてください";
        passwordOfInput.classList.add("invalid");
    }
};

const isValidFormInput = () => {
    const form = document.getElementById("js-form");
    const invalidItem = document.getElementsByClassName("invalid");

    return form.checkValidity() && invalidItem.length === 0 && checkbox.checked;
};

const checkFormValidityToEnableSubmitButton = () => {
    if (isValidFormInput()) {
        submitButton.disabled = false;
    } else {
        submitButton.disabled = true;
    }
};

nameOfInput.addEventListener("blur", checkFormNameValidation);
emailOfInput.addEventListener("blur", checkFormEmailValidation);
passwordOfInput.addEventListener("blur", checkFormPasswordValidation);

formElements.forEach(element => {
    element.addEventListener("blur", (e) => {
        checkFormToNotEmpty(e.currentTarget);
        checkFormValidityToEnableSubmitButton();
    })
});

submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    if (isValidFormInput()) window.location.href = "./register-done.html";
});

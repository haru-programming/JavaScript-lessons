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

const validationTerms = {
    upperLimitOfText: 15,
    passwordPattern: /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)[a-zA-Z\d]{8,}$/
}

const validationOptions = {
    name: {
        isValid: () => {
            return nameOfInput.value.length < validationTerms.upperLimitOfText;
        },
        errorMessage: "ユーザー名は15文字以内で入力してください",
    },
    email: {
        isValid: () => {
            return emailOfInput.validity.valid;
        },
        errorMessage: "メールアドレスの形式になっていません",
    },
    password: {
        isValid: () => {
            return validationTerms.passwordPattern.test(passwordOfInput.value);
        },
        errorMessage: "8文字以上の大小の英数字を交ぜたものにしてください",
    }
};

const showErrorMessage = target => {
    let message;
    switch (target.id) {
        case "name":
            message = validationOptions.name.errorMessage;
            break;

        case "email":
            message = validationOptions.email.errorMessage;
            break;

        case "password":
            message = validationOptions.password.errorMessage;
            break;

        default:
            break;
    }
    target.nextElementSibling.textContent = message;
};

const addInvalidClass = (target) => target.classList.add("invalid");
const removeInvalidClass = (target) => target.classList.remove("invalid");

const checkFormValidation = target => {
    target.nextElementSibling.textContent = "";

    switch (target.id) {
        case "name":
            if(validationOptions.name.isValid()) {
                removeInvalidClass(target);
                return;
            }
            showErrorMessage(target);
            addInvalidClass(target);
            break;

        case "email":
            if(validationOptions.email.isValid()) {
                removeInvalidClass(target);
                return;
            }
            showErrorMessage(target);
            addInvalidClass(target);
            break;

        case "password":
            if(validationOptions.password.isValid()) {
                removeInvalidClass(target);
                return;
            }
            showErrorMessage(target);
            addInvalidClass(target);
            break;

        default :
            break;
    }
};

const isValidFormInput = () => {
    const form = document.getElementById("js-form");
    const invalidItem = document.getElementsByClassName("invalid");

    return form.checkValidity() && invalidItem.length === 0 && checkbox.checked;
};

const checkFormValidityToEnableSubmitButton = () => submitButton.disabled = isValidFormInput() ? false : true;

formElements.forEach(element => {
    element.addEventListener("blur", (e) => {
        checkFormValidation(e.currentTarget);
        checkFormToNotEmpty(e.currentTarget);
        checkFormValidityToEnableSubmitButton();
    })
});

submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    if (isValidFormInput()) window.location.href = "./register-done.html";
});

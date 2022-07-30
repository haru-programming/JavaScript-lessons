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

const validationTerms = {
    name: {
        upperLimitOfText: 15
    },
    password: {
        pattern: /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)[a-zA-Z\d]{8,}$/
    }
}

const validationOptions = {
    name: {
        isValid: () => {
            return nameOfInput.value.length < validationTerms.name.upperLimitOfText;
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
            return validationTerms.password.pattern.test(passwordOfInput.value);
        },
        errorMessage: "8文字以上の大小の英数字を交ぜたものにしてください",
    }
};

const addInvalidClass = target => target.classList.add("invalid");
const removeInvalidClass = target => target.classList.remove("invalid");
const showErrorMessage = target => target.nextElementSibling.textContent = validationOptions[target.id].errorMessage;
const isNotEmptyOfInput = target => target.value.trim() === ""? false: true;
const isValidFormInput = target => validationOptions[target.id].isValid()? true: false;

const isValidInputAndCheckbox = () => {
    const invalidItem = document.getElementsByClassName("invalid");
    return invalidItem.length === 0 && checkbox.checked;
};

const checkFormValidityToEnableSubmitButton = () => submitButton.disabled = isValidInputAndCheckbox() ? false : true;

formElements.forEach(element => {
    element.addEventListener("blur", (e) => {
        const target = e.target;
        submitButton.disabled = true;

        if (!isNotEmptyOfInput(target)) {
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
    });
});

checkbox.addEventListener("input", () => {
    if (!checkbox.checked) {
        submitButton.disabled = true;
        checkbox.disabled = true;
    }
})

submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    if (isValidInputAndCheckbox()) window.location.href = "./register-done.html";
});

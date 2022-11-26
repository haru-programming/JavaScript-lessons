const validationTerms = {
    name: {
        upperLimitOfText: 15
    },
    password: {
        pattern: /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)[a-zA-Z\d]{8,}$/
    }
}

export const validationOptions = {
    name: {
        isValid: (target) => {
            return target.value.length < validationTerms.name.upperLimitOfText;
        },
        errorMessage: "ユーザー名は15文字以内で入力してください",
    },
    email: {
        isValid: (target) => {
            return target.validity.valid;
        },
        errorMessage: "メールアドレスの形式になっていません",
    },
    password: {
        isValid: (target) => {
            return validationTerms.password.pattern.test(target.value);
        },
        errorMessage: "8文字以上の大小の英数字を交ぜたものにしてください",
    },
    userId: {
        isValid: () => {
            return true;
        },
    },
    submitButton: {
        errorMessage: "既に登録済みのメールアドレスです",
    }
};

const addInvalidClass = target => target.classList.add("invalid");
const removeInvalidClass = target => target.classList.remove("invalid");
export const showErrorMessage = target => target.nextElementSibling.textContent = validationOptions[target.id].errorMessage;
const removeErrorMessage = target => target.nextElementSibling.textContent = "";
const isEmptyOfInput = target => target.value.trim() === "";
const isValidFormInput = target => validationOptions[target.id].isValid(target);

export const checkFormValidityToEnableSubmitButton = button => {
    const invalidItems = document.getElementsByClassName("invalid");
    button.disabled = invalidItems.length > 0;
}

export const checkFormValidityInBlur = (button, target) => {
    button.disabled = true;
    removeErrorMessage(button);

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

    removeErrorMessage(target);
    removeInvalidClass(target);
    checkFormValidityToEnableSubmitButton(button);
};

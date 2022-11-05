import { validationOptions } from "./validation";

const userIdOfInput = document.querySelector(".js-form-userid");
const passwordOfInput = document.querySelector(".js-form-password");
const formElements = [userIdOfInput,passwordOfInput];
const submitButton = document.getElementById("js-submit-button");

const addInvalidClass = target => target.classList.add("invalid");
const removeInvalidClass = target => target.classList.remove("invalid");
const showErrorMessage = target => target.nextElementSibling.textContent = validationOptions[target.id].errorMessage;
const isEmptyOfInput = target => target.value.trim() === "";
const isValidFormInput = target => validationOptions[target.id].isValid();

const checkFormValidityToEnableSubmitButton = () => {
    const invalidItem = document.getElementsByClassName("invalid");
    submitButton.disabled = invalidItem.length === 0 ? false : true;
}

formElements.forEach(element => {
    element.classList.add("invalid");

    element.addEventListener("blur", (e) => {
        checkFormValidityInBlur(e.target);
    });
});

const checkFormValidityInBlur = (target) => {
    submitButton.disabled = true;

    if (isEmptyOfInput(target)) {
        addInvalidClass(target);
        target.nextElementSibling.textContent = "入力してください";
        return;
    }

    if (target.id === "password" && !isValidFormInput(target)) {
        showErrorMessage(target);
        addInvalidClass(target);
        return;
    }

    target.nextElementSibling.textContent = "";
    removeInvalidClass(target);
    checkFormValidityToEnableSubmitButton();
};

const tryToLogin = async() => {
    let result;
    try {
        result = await checkToRegistered();
    } catch(rejectObj) {
        result = rejectObj;
    } finally {
        window.location.href = result.token ? "./loginuserpage.html" : "./notautherize.html";
    }
}

const checkToRegistered = () => {
    return new Promise((resolve, reject) => {
        const inputsValues = {
            userId: document.querySelector(".js-form-userid").value,
            password: document.querySelector(".js-form-password").value
        }
        const registeredData = {
            name: "takeda",
            email : "abcdefg@gmail.com",
            password : "N302aoe3"
        }

        if ((inputsValues.userId === registeredData.name || inputsValues.userId === registeredData.email) && (inputsValues.password === registeredData.password)) {
            resolve({ token: "fafae92rfjafa03", ok: true, code: 200 });
        } else {
            reject({ ok: false, code: 401 });
        }
    })
}

submitButton.addEventListener("click", tryToLogin);

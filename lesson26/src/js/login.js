import { validationOptions } from "./modules/validation-options";
import { Chance } from "chance";
const chance = new Chance();

if (localStorage.getItem("token")) window.location.href = "./loginuserpage.html";

const userIdOfInput = document.querySelector(".js-form-userid");
const passwordOfInput = document.querySelector(".js-form-password");
const formElements = [userIdOfInput,passwordOfInput];
const submitButton = document.getElementById("js-submit-button");

const addInvalidClass = target => target.classList.add("invalid");
const removeInvalidClass = target => target.classList.remove("invalid");
const showErrorMessage = target => target.nextElementSibling.textContent = validationOptions[target.id].errorMessage;
const isEmptyOfInput = target => target.value.trim() === "";
const isValidFormInput = target => validationOptions[target.id].isValid(target);

const checkFormValidityToEnableSubmitButton = () => {
    const invalidItems = document.getElementsByClassName("invalid");
    submitButton.disabled = invalidItems.length > 0;
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
        localStorage.setItem("token", result.token);
    } catch(rejectObj) {
        result = rejectObj;
    } finally {
        window.location.href = result.token ? "./loginuserpage.html" : "./notautherize.html";
    }
}

const checkToRegistered = () => {
    return new Promise((resolve, reject) => {
        const inputsValues = {
            userId: userIdOfInput.value,
            password: passwordOfInput.value
        }
        const registeredData = {
            name: "takeda",
            email : "abcdefg@gmail.com",
            password : "N302aoe3"
        }

        if ((inputsValues.userId === registeredData.name || inputsValues.userId === registeredData.email) && (inputsValues.password === registeredData.password)) {
            resolve({ token: chance.apple_token(), ok: true, code: 200 });
        } else {
            reject({ ok: false, code: 401 });
        }
    })
}

submitButton.addEventListener("click", tryToLogin);

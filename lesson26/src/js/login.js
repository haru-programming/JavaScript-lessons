const userIdOfInput = document.querySelector(".js-form-userid");
const passwordOfInput = document.querySelector(".js-form-password");
const formElements = [userIdOfInput,passwordOfInput];
const submitButton = document.getElementById("js-submit-button");

const isNotEmptyOfInput = target => target.value.trim() !== "";
const isNotEmptyOfAllInput = () => {
    let result = false;
    formElements.forEach(element => {
        element.value.trim() !== "" ? result = true : result = false;
    })
    return result;
}

const checkFormValidityToEnableSubmitButton = () => submitButton.disabled = isNotEmptyOfAllInput() ? false : true;

formElements.forEach(element => {
    element.addEventListener("blur", (e) => {
        checkFormValidityInBlur(e.target);
    });
});

const checkFormValidityInBlur = target => {
    submitButton.disabled = true;

    if (!isNotEmptyOfInput(target)) {
        target.nextElementSibling.textContent = "入力してください";
        return;
    }

    target.nextElementSibling.textContent = "";
    checkFormValidityToEnableSubmitButton();
};

const getInputValueAndTryLogin = () => {
    const inputsValues = {
        userId: document.querySelector(".js-form-userid").value,
        password: document.querySelector(".js-form-password").value
    }
    tryToLogin(inputsValues);
}

const tryToLogin = async(inputsValues) => {
    let result;
    try {
        result = await checkToRegistered(inputsValues);
    } catch(rejectObj) {
        result = rejectObj;
    } finally {
        result.token? window.location.href = "./loginuserpage.html" : window.location.href = "./notautherize.html";
    }
}

const checkToRegistered = (inputData) => {
    return new Promise((resolve, reject) => {
        const registeredData = {
            name: "takeda",
            email : "abcdefg@gmail.com",
            password : "N302aoe3"
        }

        if (inputData.userId === registeredData.name || inputData.userId === registeredData.email && inputData.password === registeredData.password) {
            resolve({ token: "fafae92rfjafa03", ok: true, code: 200 });
        } else {
            reject({ ok: false, code: 401 });
        }
    })
}

submitButton.addEventListener("click", getInputValueAndTryLogin);

import { checkFormValidityInBlur, confirmIfCanSubmit } from "./modules/validation";
import { togglePasswordDisplay } from "./modules/togglepassword";

const userIdOfInput = document.querySelector(".js-form-userid");
const passwordOfInput = document.querySelector(".js-form-password");
const formElements = [userIdOfInput, passwordOfInput];
const eyeIcon = document.querySelector(".js-eye-icon");
const errorOfPassword = document.querySelector('[data-name="password-error"]');
const submitButton = document.querySelector(".js-submit-button");
const invalidItems = document.getElementsByClassName("invalid");

formElements.forEach(element => {
    element.classList.add("invalid");

    element.addEventListener("blur", (e) => {
        if (e.relatedTarget === eyeIcon) {
            if (passwordOfInput.value && errorOfPassword.textContent === "入力してください") errorOfPassword.textContent = "";
            return;
        }

        checkFormValidityInBlur(submitButton, e.target);
        confirmIfCanSubmit(submitButton, invalidItems);
    });
});

eyeIcon.addEventListener("click", togglePasswordDisplay);
eyeIcon.addEventListener("blur", (e) => {
    if (e.relatedTarget === passwordOfInput) return;
    checkFormValidityInBlur(submitButton, passwordOfInput);

    if (invalidItems > 0) return;
    confirmIfCanSubmit(submitButton, invalidItems);
});

const url = "https://652dc444f9afa8ef4b27cca3.mockapi.io/users";


const displayInfo = (target, error) => {
    const p = document.createElement("p");
    p.textContent = error;
    target.appendChild(p);
};

const displayErrorStatus = (target, response) => {
    const p = document.createElement("p");
    p.textContent = `${response.status}:${response.statusText}`;
    target.appendChild(p);
};

const fetchData = async (api) => {
    try {
        const response = await fetch(api);

        if (response.ok) {
            return await response.json();
        } else {
            console.error(`${response.status}:${response.statusText}`);
            displayErrorStatus(errorArea, response);
        }

    } catch (error) {
        displayInfo(errorArea, error);
    }
};

const fetchRegisteredData = async () => {
    const data = await fetchData(url);
    if (!data) return;

    if (data.length) {
        return data;
    }
};

const checkToRegistered = async () => {
    const registeredUsers = await fetchRegisteredData();
    const user = registeredUsers.find(user => user.name === userIdOfInput || user.email === userIdOfInput);

    if (user && user.password === passwordOfInput) {
        return { token: user.userId, ok: true, code: 200 };
    } else {
        throw { ok: false, code: 401 };
    }
}

const tryToLogin = async () => {
    try {
        const result = await checkToRegistered();
        localStorage.setItem("token", result.token);
        window.location.href = "./logged-in.html";
    } catch (rejectObj) {
        console.error('Login failed:', rejectObj);
        window.location.href = "./notautherize.html";
    }
}


submitButton.addEventListener("click", tryToLogin);

const checkboxLink = document.getElementById("js-checkbox-link");
const modalCloseButton = document.getElementById("js-modal-close-button");
const modalInner = document.getElementById("js-modal-inner");
const submitButton = document.getElementById("js-submit-button");

const openModal = () => {
    document.getElementById("js-modal-area").classList.add("is-active");
};

const closeModal = () => {
    document.getElementById("js-modal-area").classList.remove("is-active");
};

checkboxLink.addEventListener("click", openModal);
modalCloseButton.addEventListener("click", closeModal);

//モーダル以外の部分を押すとモーダルが閉じる
document.addEventListener("click", (e) => {
    e.target.classList.contains("js-modal") && closeModal();
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

submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    if (checkbox.checked) window.location.href = "./register-done.html";
});

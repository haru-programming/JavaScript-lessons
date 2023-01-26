export const togglePasswordDisplay = target => {
    const selectedInput = target.nextElementSibling;

    if (selectedInput.type === "password"){
        selectedInput.type = "text";
        target.setAttribute("aria-label", "パスワードを非表示にします");
    } else {
        selectedInput.type = "password";
        target.setAttribute("aria-label", "パスワードを表示します");
    }
    target.classList.toggle("is-open");
}

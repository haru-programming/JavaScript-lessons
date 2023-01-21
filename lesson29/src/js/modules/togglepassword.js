export const togglePasswordDisplay = target => {
    const selectedInput = target.nextElementSibling;
    selectedInput.type = selectedInput.type === "password" ? "text" : "password";
    target.classList.toggle("is-open");
}

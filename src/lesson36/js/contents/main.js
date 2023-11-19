const userMenuButton = document.getElementById("js-user-menu-button");
const logoutButton = document.getElementById("js-logout-button");
const menuCloseButton = document.getElementById("js-close-icon");
const userMenu = document.getElementById("js-user-menu");

const toggleUserMenu = () => userMenu.classList.toggle("is-active");

userMenuButton.addEventListener("click", () => {
    toggleUserMenu();
});
menuCloseButton.addEventListener("click", toggleUserMenu);

logoutButton.addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.href = "./index.html";
});

if (!localStorage.getItem("token")) window.location.href = "./index.html";

const logoutButton = document.getElementById("js-logout-button");

logoutButton.addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.href = "./index.html";
});

const urlParameter = Object.fromEntries(new URLSearchParams(window.location.search));
const currentPageToken = urlParameter.token;
const registeredToken = localStorage.getItem("token");

if(currentPageToken !== registeredToken) {
    localStorage.removeItem("token");
    window.location.href = "./../notautherize.html";
}

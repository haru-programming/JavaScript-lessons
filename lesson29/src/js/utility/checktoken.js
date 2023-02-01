const urlParameter = Object.fromEntries(new URLSearchParams(window.location.search));
const currentPageToken = urlParameter.token;
const registeredToken = localStorage.getItem("token");

if (!registeredToken){
    window.location.href = "./../notautherize.html";
    return;
}

if (registeredToken && currentPageToken !== registeredToken) {
    localStorage.removeItem("token");
    window.location.href = "./../notautherize.html";
}

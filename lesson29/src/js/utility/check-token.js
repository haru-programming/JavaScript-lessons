const urlParameter = Object.fromEntries(new URLSearchParams(window.location.search));
const currentPageToken = urlParameter.token;
const registeredToken = localStorage.getItem("token");
const isMismatchToken = () => currentPageToken !== registeredToken;

if (!registeredToken || !currentPageToken){
    window.location.href = "./../notautherize.html";
}

if (isMismatchToken()) {
    localStorage.removeItem("token");
    window.location.href = "./../notautherize.html";
}

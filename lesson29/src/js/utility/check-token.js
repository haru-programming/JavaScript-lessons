const urlParameter = Object.fromEntries(new URLSearchParams(window.location.search));
const currentPageToken = urlParameter.token;
const registeredToken = localStorage.getItem("token");

if (!registeredToken || !currentPageToken){
    window.location.href = "./../notautherize.html";
}

if (currentPageToken !== registeredToken) {
    localStorage.removeItem("token");
    window.location.href = "./../notautherize.html";
}

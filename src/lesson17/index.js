const ul = document.getElementById("js-pict-list");
const previousButton = document.getElementById("js-button-previous");
const nextButton = document.getElementById("js-button-next");

function addLoading() {
    const img = document.createElement("img");
    const imgWrapper = document.createElement("div");
    img.src = "/assets/img/loading-circle.gif";
    img.id = "js-loading";
    imgWrapper.classList.add("loading");
    ul.appendChild(imgWrapper).appendChild(img);
}

function removeLoading() {
    document.getElementById("js-loading").remove();
}

async function fetchData(api) {
    const response = await fetch(api);
    const json = await response.json();

    if(!response.ok){
        console.error(`${response.status}:${response.statusText}`);
    }
    return json.data;
}

async function fetchImgData() {
    return new Promise((resolve) => {
        setTimeout(() => resolve(fetchData("https://mocki.io/v1/82e4e264-5a2d-4ebd-9814-7e63e47fb80b")), 3000);
    });
}

async function getImgData() {
    addLoading();
    try {
        return await fetchImgData();
    } catch(e) {
        createErrorMessage(e);
    } finally {
        removeLoading();
    }
}

function createErrorMessage(error) {
    const p = document.createElement("p");
    p.classList.add("slideshow__error");
    p.textContent = error;
    console.error(error);
    ul.appendChild(p);
}

function renderListsOfImg(data) {
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < data.length; i++) {
        const li = document.createElement("li");
        const img = document.createElement("img");

        li.classList.add("slideshow__pict-item","js-slideshow-item");
        li.dataset.index = `${i}`;
        img.src = data[i].img;
        img.alt = data[i].alt;
    
        //JSONデータでdisplay:trueの場合はis-activeを付与
        data[i].display && li.classList.add("is-active");

        fragment.appendChild(li).appendChild(img);
    }
    ul.appendChild(fragment);
}

function init(data) {
    const allofCountElement = document.getElementById("js-counter-all");
    
    allofCountElement.textContent = data.length;
    incrementCurrentIndex();
    toggleButtonDisabled(data.length);
}

function toggleButtonDisabled(length) {
    const currentIndex = getCurrentIndex();
    const firstIndex = 0;
    const lastIndex = length - 1;

    previousButton.disabled = currentIndex === firstIndex;
    nextButton.disabled = currentIndex === lastIndex;
}

function getCurrentIndex() {
    const activeImg = document.querySelector(".is-active");
    return Number(activeImg.dataset.index);
}

function incrementCurrentIndex() {
    const currentCountElement = document.getElementById("js-counter-current");
    currentCountElement.textContent = getCurrentIndex() + 1;
}

function switchImg(direct) {
    const activeImg = document.querySelector(".is-active");
    activeImg.classList.remove("is-active");
    activeImg[direct].classList.add("is-active");
}

const addEventListenerForNextButton = (length) => {
    nextButton.addEventListener ("click", () => {
        switchImg("nextElementSibling");
        incrementCurrentIndex();
        toggleButtonDisabled(length);
    })
}

const addEventListenerForPreviousButton = (length) => {
    previousButton.addEventListener ("click", () => {
        switchImg("previousElementSibling");
        incrementCurrentIndex();
        toggleButtonDisabled(length);
    })
}

async function addSlide() {
    const data = await getImgData();

    if(data){
        renderListsOfImg(data);
        init(data);
        addEventListenerForNextButton(data.length);
        addEventListenerForPreviousButton(data.length);
    }
}

addSlide();

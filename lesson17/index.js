const ul = document.getElementById("js-pict-list");
const previousButton = document.getElementById("js-button-previous");
const nextButton = document.getElementById("js-button-next");

function addLoading() {
    const img = document.createElement("img");
    const imgWrapper = document.createElement("div");
    img.src = "loading-circle.gif";
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
        setTimeout(() => resolve(fetchData("https://mocki.io/v1/2db56900-1359-4d61-bd4c-d477c01b0122")), 3000);
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
    const allIndex = data.length;
    
    allofCountElement.textContent = allIndex;
    getCurrentCountOfImg();
    toggleButtonDisabled(data);
}

function toggleButtonDisabled(data) {
    const currentIndex = `${getCurrentIndex()}`;
    const firstIndex = "0";
    const lastIndex = `${data.length -1}`;

    //最初の画像の時は、disabledを付与。それ以外の時は外す。
    if (currentIndex === firstIndex) {
        previousButton.setAttribute("disabled",true);
    } else {
        previousButton.removeAttribute("disabled",true);
    }

    //最後の画像の時は、disabledを付与。それ以外の時は外す。
    if (currentIndex === lastIndex) {
        nextButton.setAttribute("disabled",true);
    } else {
        nextButton.removeAttribute("disabled",true);
    }
}

function getCurrentIndex() {
    const activeImg = document.querySelector(".is-active");
    return Number(activeImg.dataset.index);
}

function getCurrentCountOfImg() {
    const currentCountElement = document.getElementById("js-counter-current");
    currentCountElement.textContent = getCurrentIndex() + 1;
}

function switchImg(direct) {
    const activeImg = document.querySelector(".is-active");
    activeImg.classList.remove("is-active");
    activeImg[direct].classList.add("is-active");
}

const clickedEventInNextButton = (data) => {
    nextButton.addEventListener ("click", () => {
        switchImg("nextElementSibling");
        getCurrentCountOfImg();
        toggleButtonDisabled(data);
    })
}

const clickedEventInPreviousButton = (data) => {
    previousButton.addEventListener ("click", () => {
        switchImg("previousElementSibling");
        getCurrentCountOfImg();
        toggleButtonDisabled(data);
    })
}

async function addSlide() {
    const data = await getImgData();

    if(data){
        renderListsOfImg(data);
        init(data);
        clickedEventInNextButton(data);
        clickedEventInPreviousButton(data);
    }
}

addSlide();

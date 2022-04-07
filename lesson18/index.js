const ul = document.getElementById("js-pict-list");
const pagination = document.getElementById("js-pagination");
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

function renderListOfImg(data) {
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

function renderListOfPagination(data) {
    const paginationList = document.getElementById("js-pagination-list");
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < data.length; i++) {
        const li = document.createElement("li");
        const Button = document.createElement("button");

        li.classList.add("pagination__item","js-pagination-item");
        li.dataset.index = `${i}`;
        Button.classList.add("pagination__btn","js-pagination-btn");
        Button.dataset.index = `${i}`;

        //JSONデータでdisplay:trueの場合はis-activeを付与
        data[i].display && li.classList.add("is-active");

        fragment.appendChild(li).appendChild(Button);
    }
    pagination.insertAdjacentElement("afterbegin",paginationList).appendChild(fragment);
}

function init(data) {
    const allofCountElement = document.getElementById("js-counter-all");
    
    allofCountElement.textContent = data.length;
    incrementCurrentIndex(getCurrentIndex());
    toggleButtonDisabled(data.length);
}

function toggleButtonDisabled(dataLength) {
    const currentIndex = getCurrentIndex();
    const firstIndex = 0;
    const lastIndex = dataLength - 1;

    previousButton.disabled = currentIndex === firstIndex;
    nextButton.disabled = currentIndex === lastIndex;
}

function getCurrentIndex() {
    const activeImg = ul.querySelector(".is-active");
    return Number(activeImg.dataset.index);
}

function incrementCurrentIndex(number) {
    const currentCountElement = document.getElementById("js-counter-current");
    currentCountElement.textContent = ++number;
}

function switchImg(number) {
    const activeImg = ul.querySelector(".is-active");
    const imgItems = [...document.getElementsByClassName("js-slideshow-item")];
    activeImg.classList.remove("is-active");
    imgItems[number].classList.add("is-active");
}

function switchPagination(number) {
    const ul = document.getElementById("js-pagination-list");
    const paginationItems = [...document.getElementsByClassName("js-pagination-item")];
    const activeItem = ul.querySelector(".is-active");
    activeItem.classList.remove("is-active");
    paginationItems[number].classList.add("is-active");
}

const addEventListenerForButton = (dataLength) => {
    const buttons = document.querySelectorAll(".js-button-arrow");

    buttons.forEach((button) => {
        button.addEventListener ("click", (e) => {
            let currentIndex = getCurrentIndex();
            e.currentTarget.id === "js-button-next" ? ++currentIndex : --currentIndex;

            switchImg(currentIndex);
            switchPagination(currentIndex);
            incrementCurrentIndex(currentIndex);
            toggleButtonDisabled(dataLength);
            initAutoMoveSlide(dataLength);
        })
    })
}

const addEventListenerForPagination = (dataLength) => {
    const paginationList = document.getElementById("js-pagination-list");

    paginationList.addEventListener ("click", (e) => {

        //buttonとbuttonの間はクリック対象外にする
        if (e.currentTarget === e.target) {
            return;
        }

        const clickedItemIndex = Number(e.target.dataset.index);

        switchImg(clickedItemIndex);
        switchPagination(clickedItemIndex);
        incrementCurrentIndex(clickedItemIndex);
        toggleButtonDisabled(dataLength);
        initAutoMoveSlide(dataLength);
    })
}

//タイマー停止用のID
const intervalCount = { count: 0 };

function autoMoveSlide(dataLength) {

    intervalCount.count = setInterval(() => {
        let currentIndex = getCurrentIndex();
        currentIndex++;
    
        if (currentIndex === dataLength) {
            currentIndex = 0;
        }
    
        switchImg(currentIndex);
        switchPagination(currentIndex);
        incrementCurrentIndex(currentIndex);
        toggleButtonDisabled(dataLength);
    }, 3000);
}

function initAutoMoveSlide(dataLength) {
    clearInterval(intervalCount.count);
    autoMoveSlide(dataLength);
}

async function addSlide() {
    const data = await getImgData();

    if(data){
        renderListOfImg(data);
        renderListOfPagination(data);
        init(data);
        addEventListenerForButton(data.length);
        addEventListenerForPagination(data.length);
        autoMoveSlide(data.length);
    }
}

addSlide();

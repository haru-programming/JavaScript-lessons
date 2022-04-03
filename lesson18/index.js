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
    const activeImg = ul.querySelector(".is-active");
    return Number(activeImg.dataset.index);
}

function incrementCurrentIndex() {
    const currentCountElement = document.getElementById("js-counter-current");
    currentCountElement.textContent = getCurrentIndex() + 1;
}

function switchImg(direct) {
    const activeImg = ul.querySelector(".is-active");
    activeImg.classList.remove("is-active");
    activeImg[direct].classList.add("is-active");
}

function switchPagination(direct) {
    const ul = document.getElementById("js-pagination-list");
    const activeItem = ul.querySelector(".is-active");
    activeItem.classList.remove("is-active");
    activeItem[direct].classList.add("is-active");
}

const addEventListenerForNextButton = (length) => {
    nextButton.addEventListener ("click", () => {
        switchImg("nextElementSibling");
        switchPagination("nextElementSibling");
        incrementCurrentIndex();
        toggleButtonDisabled(length);
    })
}

const addEventListenerForPreviousButton = (length) => {
    previousButton.addEventListener ("click", () => {
        switchImg("previousElementSibling");
        switchPagination("previousElementSibling");
        incrementCurrentIndex();
        toggleButtonDisabled(length);
    })
}

const addEventListenerForPagination = (length) => {
    const PaginationList = document.getElementById("js-pagination-list");

    PaginationList.addEventListener ("click", (e) => {

        //buttonとbuttonの間はクリック対象外にする
        if (PaginationList && e.currentTarget !== e.target) {
            const clickedItemIndex = e.target.dataset.index;

            //dotを切り替える
            const activeItem = PaginationList.querySelector(".is-active");
            const paginationItems = Array.from(document.getElementsByClassName("js-pagination-item"));
            activeItem.classList.remove("is-active");
            paginationItems[clickedItemIndex].classList.add("is-active");

            //数字のページネーションを切り替える
            const currentCountElement = document.getElementById("js-counter-current");
            currentCountElement.textContent = Number(clickedItemIndex) + 1;

            //画像を切り替える
            const activeImg = ul.querySelector(".is-active");
            const imgItems = Array.from(document.getElementsByClassName("js-slideshow-item"));
            activeImg.classList.remove("is-active");
            imgItems[clickedItemIndex].classList.add("is-active");

            toggleButtonDisabled(length);
        }
    })
}


async function addSlide() {
    const data = await getImgData();

    if(data){
        renderListOfImg(data);
        renderListOfPagination(data);
        init(data);
        addEventListenerForNextButton(data.length);
        addEventListenerForPreviousButton(data.length);
        addEventListenerForPagination(data.length);
    }
}

addSlide();

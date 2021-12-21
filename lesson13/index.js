const button = document.getElementById("js-button");
const modalOpenButton = document.getElementById("js-modalOpen");
const modalCloseButton = document.getElementById("js-modalClose");
const modal = document.getElementById("js-modal");
const div = document.getElementById("js-contents");
const ul = document.getElementById("js-lists");

function addLoading() {
    const img = document.createElement("img");
    img.src = "loading-circle.gif";
    img.id = "js-loading";
    div.appendChild(img);
}

function removeLoading() {
    const img = document.getElementById("js-loading");
    div.removeChild(img);
}

async function fetchData() {
    try {
        const json = await (await fetch("https://myjson.dit.upm.es/api/bins/7ctn")).json();
        return json.data;
    } catch (e) {
        throw new Error(e);
    }
}

async function fetchListData() {
    addLoading();
    try {
        const data = await fetchData();
        if (data.length === 0) {
            throw new Error("データが空です");
        }
        return data;
    } catch (e) {
        createErrorMessage(e);
    } finally {
        removeLoading();
    }
}

function createErrorMessage(e) {
    const li = document.createElement("li");
    li.textContent = `エラー内容:${e.message}`;
    ul.appendChild(li);
    console.error(e.message);
}

async function addList() {
    const fragment = document.createDocumentFragment();
    const values = await fetchListData();

    if (values) {
        values.forEach((value) => {
            const li = document.createElement("li");
            const anchor = document.createElement("a");
            const img = document.createElement("img");

            anchor.textContent = value.text;
            anchor.href = `/${value.to}`;
            img.src = value.img;
            img.alt = value.alt;

            li.appendChild(anchor).insertAdjacentElement("afterbegin", img);
            fragment.appendChild(li);
        });
        ul.appendChild(fragment);
    }
}

function init() {
    ul.textContent = '';
    div.appendChild(button);
}

modalOpenButton.addEventListener('click', () => {
    modal.classList.add('is-active');
})

modalCloseButton.addEventListener('click', () => {
    modal.classList.remove('is-active');
    init();
})

button.addEventListener('click', () => {
    addList();
    button.remove();
})

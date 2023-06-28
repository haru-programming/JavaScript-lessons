const button = document.getElementById("js-button");
const div = document.getElementById("js-contents");
const ul = document.getElementById("js-lists");

function addLoading() {
    const img = document.createElement("img");
    img.src = "/assets/img/loading-circle.gif";
    img.id = "js-loading"
    div.appendChild(img);
};

function removeLoading() {
    const img = document.getElementById("js-loading");
    div.removeChild(img);
};

async function fetchData() {
    try {
        const json = await (await fetch("https://mocki.io/v1/4794a474-cbac-43f2-aa37-15a9777b8185")).json();
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
};

function createErrorMessage(e) {
    const li = document.createElement("li");
    li.textContent = `エラー内容:${e.message}`;
    ul.appendChild(li);
    console.error(e.message);
};

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
};

button.addEventListener('click', () => {
    addList();
    button.remove();
});

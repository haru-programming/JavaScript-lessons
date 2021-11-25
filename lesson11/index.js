const ul = document.getElementById("js-lists");

function addLoading() {
    const li = document.createElement("li");
    const img = document.createElement("img");
    li.id = "js-loading";
    img.src = "loading-circle.gif";

    ul.appendChild(li).appendChild(img);
};

function removeLoading() {
    const li = document.getElementById("js-loading");
    ul.removeChild(li);
};

async function fetchData() {
    try{
        const responseApi = await fetch("https://myjson.dit.upm.es/api/bins/7ctn");
        const json = await responseApi.json();
        return json.data;
    } catch(e) {
        throw new Error('データを取得できませんでした');
    }
};

async function fetchListData() {
    addLoading();
    try {
        return await fetchData();
    } catch(e) {
        console.error(e.message);
    } finally {
        removeLoading();
    }
};

async function addList() {
    const fragment = document.createDocumentFragment();
    const values = await fetchListData();

    values.forEach(value => {
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
};

addList();

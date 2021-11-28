const ul = document.getElementById("js-lists");
const div = document.getElementById("js-contents");

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
        // const responseApi = await fetch("https://myjson.dit.upm.es/api/bins/7ctn");
        const responseApi = await fetch("https://myjson.dit.upm.es/api/bins/bu5z");//空の配列
        const json = await responseApi.json();
        return json.data;
    } catch(e) {
        throw new Error('データを取得できませんでした');
    }
};

async function fetchListData() {
    addLoading();
    const data = await fetchData();

    try {
        if (data.length === 0) {
            div.textContent = "エラー：データが存在しません";
            throw new Error("データが空です");
        }
        return data;
    } catch (e) {
        console.error(e.message);
        if (data.length === !0) {
            div.textContent = "エラー：データを取得できませんでした";
        }
    } finally {
        console.log(document.getElementById("js-loading"));
        removeLoading();
    }
};

async function addList() {
    const fragment = document.createDocumentFragment();
    const values = await fetchListData();

    if (values) {
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
    }
};

addList();

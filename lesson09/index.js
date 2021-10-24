const ul = document.getElementById("js-lists");

const attributes = [
    { to: "bookmark.html", img: "1.png", alt: "画像1", text: "ブックマーク" },
    { to: "message.html", img: "2.png", alt: "画像2", text: "メッセージ" }
];

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
}

function fetchListData() {
    addLoading();
    return new Promise(resolve => {
        setTimeout(() => resolve(attributes), 3000);
    });
}

async function addList() {
    const fragment = document.createDocumentFragment();

    const values = await fetchListData();
    removeLoading();

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

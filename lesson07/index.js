const ul = document.getElementById("js-lists");

function receiveData() {
    const attributes = [
        { to: "bookmark.html", img: "1.png", alt: "画像1", text: "ブックマーク" },
        { to: "message.html", img: "2.png", alt: "画像2", text: "メッセージ" }
    ];
    return attributes;
};

function addLoading() {
    const li = document.createElement("li");
    const img = document.createElement("img");
    li.id = "js-loading";
    li.style.listStyle = "none";
    img.src = "loading-circle.gif";

    return ul.appendChild(li).appendChild(img);
};

function removeLoading() {
    const li = document.getElementById("js-loading");
    return ul.removeChild(li);
}

function displayLoading() {
    return promise = new Promise(resolve => {
        addLoading();
        setTimeout(() => resolve(receiveData()), 3000);
    });
}

displayLoading().then(values => {
    removeLoading();

    const fragment = document.createDocumentFragment();

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
});


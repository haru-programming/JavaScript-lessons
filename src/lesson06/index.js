const attributes = [
    { to: "bookmark.html", img: "/assets/img/1.png", alt: "画像1", text: "ブックマーク" },
    { to: "message.html", img: "/assets/img/2.png", alt: "画像2", text: "メッセージ" }
];

const ul = document.getElementById("js-lists");

const fragment = document.createDocumentFragment();

const promise = new Promise(resolve => {
    setTimeout(() => resolve(attributes), 3000);
});

promise.then(values => {
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


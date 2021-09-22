const attributes = [
    { to: "bookmark.html", img: "1.png", alt: "画像1", text: "ブックマーク" },
    { to: "message.html", img: "2.png", alt: "画像2", text: "メッセージ" }
];

const ul = document.getElementById("js-lists");

const fragment = document.createDocumentFragment();

const promise = new Promise(resolve => {
    setTimeout(() => resolve(attributes), 3000);
}).then(attributes => {
    attributes.forEach(attribute => {
        const li = document.createElement("li");
        const anchor = document.createElement("a");
        const img = document.createElement("img");
    
        anchor.textContent = attribute.text;
        anchor.href = `/${attribute.to}`;
        img.src = attribute.img;
        img.alt = attribute.alt;
    
        li.appendChild(anchor).insertAdjacentElement("afterbegin", img);
        fragment.appendChild(li);
    });
    ul.appendChild(fragment);
});


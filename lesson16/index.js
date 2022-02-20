const tabNav = document.getElementById("js-tabNav");

async function fetchData() {
    try{
        const api = "https://myjson.dit.upm.es/api/bins/amqx";
        // const api = "http://myjson.dit.upm.es/api/bins/ack9";//エラー確認用の空配列
        const response = await fetch(api);
        const json = await response.json();
        return json.data;
    } catch(e) {
        throw new Error("サーバーエラーです");
    }
}

async function fetchArrayData() {
    try {
        const data = await fetchData();
        if (data.length === 0) throw new Error("No data");
        return data;
    } catch(e) {
        createErrorMessage(e);
    }
}

function createErrorMessage(e) {
    const p = document.createElement("p");
    p.textContent = `エラー内容:${e.message}`;
    tabNav.appendChild(p);
    console.error(e.message);
}

async function createTabNav(values) {
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < values.length; i++) {
        const li = document.createElement("li");
        const button = document.createElement("button");

        li.classList.add("tab__nav-item");
        li.id = `js-tabNavItem${i+1}`;
        button.classList.add("tab__nav-button","js-tabNavButton");
        button.id = `${values[i].category}`;
        button.dataset.index = `${i}`;
        button.textContent = values[i].category;

        fragment.appendChild(li).appendChild(button);
    }
    tabNav.appendChild(fragment);
}

function createTabContainer() {
    const div = document.createElement("div");
    div.classList.add("tab");
    div.id = "js-tab";
    div.appendChild(tabNav.parentNode.replaceChild(div, tabNav));
}

function createTabContents() {
    const tabContainer = document.getElementById("js-tab");
    const tabContents = document.createElement("div");
    const tabContentsInner = document.createElement("div");

    tabContents.classList.add("tab__contents");
    tabContents.id = "js-tabContents";
    tabContentsInner.classList.add("tab__contents-inner");
    tabContentsInner.id = "js-tabContentsInner";

    tabContainer.insertAdjacentElement("beforeend", tabContents);
    tabContents.appendChild(tabContentsInner);
}

function appendArticlesTitleFragment(values) {
    const fragment = document.createDocumentFragment();
    const articleTitles = values.map(value => value.title);
    const articleComments = values.map(value => value.comments);

    //記事タイトルの数だけliを追加
    for (let i = 0; i < articleTitles.length; i++) {
        const li = document.createElement("li");
        const a = document.createElement("a");
        const numberOfComments = articleComments[i].length;

        li.classList.add("tab__contents-item","js-tabContentsItem");
        a.classList.add("tab__contents-link");
        a.href = "#";
        a.textContent = articleTitles[i];

        fragment.appendChild(li).appendChild(a);

        //コメントがあれば件数とアイコンを表示
        if (numberOfComments > 0) {
            const commentInfo = createCommentInfo(articleComments[i]);
            li.appendChild(commentInfo);
        }
    }
    return fragment;
}

function createCommentInfo(values) {
    const fragment = document.createDocumentFragment();
    const commentIconWrapper = document.createElement("div");
    const commentIcon = document.createElement("img");
    const commentLength = document.createElement("div");

    commentIcon.src = "./img/icon-comment.svg";
    commentIconWrapper.classList.add("tab__contents-icon");
    commentLength.classList.add("tab__contents-info");

    commentLength.textContent = `${values.length}件`;
    commentIconWrapper.appendChild(commentIcon);

    fragment.appendChild(commentIconWrapper).insertAdjacentElement("afterend", commentLength)
    return fragment;
}

async function createArticleContents(data) {
    const values = data.map((value) => value.articles);
    const tabContents = document.getElementById("js-tabContents");
    const tabContentsInner = document.getElementById("js-tabContentsInner");

    //記事データの数だけulを作成
    for (let i = 0; i < values.length; i++) {
        const ul = document.createElement("ul");
        ul.id = `js-${data[i].category}-contents`;
        ul.classList.add("tab__contents-list", "js-tabContentsList");

        const articleTitlesFragment = appendArticlesTitleFragment(values[i]);
        const contentsImgFragment = createImgFragments(data[i]);

        tabContents.appendChild(tabContentsInner).appendChild(ul).appendChild(articleTitlesFragment);
        tabContentsInner.appendChild(contentsImgFragment);
    }
}

function createImgFragments(data) {
    const fragment = document.createDocumentFragment();
    const imgWrapper = document.createElement("div");
    const img = document.createElement("img");

    imgWrapper.classList.add("tab__img-wrapper", "js-contentsImgWrapper");
    imgWrapper.id = `js-${data.category}-imgWrapper`
    img.classList.add("tab__img");
    img.src = `${data.img}`;

    fragment.appendChild(imgWrapper).appendChild(img);

    return fragment;
}

async function fetchInitDisplayData(values) {
    const initDisplayData = values.find(value => value.display === true);
    const initDisplayCategory = initDisplayData.category;
    const navButton = document.getElementById(initDisplayCategory);
    const tabContentsItem = document.getElementById(`js-${initDisplayCategory}-contents`);
    const tabContentsImg = document.getElementById(`js-${initDisplayCategory}-imgWrapper`);

    navButton.classList.add("is-active");
    tabContentsItem.classList.add("is-active");
    tabContentsImg.classList.add("is-active");
}

async function addTabContents() {
    const data = await fetchArrayData();

    createTabNav(data);
    createTabContainer();
    createTabContents();
    createArticleContents(data);
    fetchInitDisplayData(data);
}

addTabContents();

//タブの内容を切り替える
tabNav.addEventListener("click", (e) => {
    const tabNavItem = document.getElementsByClassName("js-tabNavButton");
    const tabContents = document.getElementsByClassName("js-tabContentsList");
    const tabImg = document.getElementsByClassName("js-contentsImgWrapper");
    const clickedTabIndex = e.target.dataset.index;

    //全てのis-activeを削除
    for(let i = 0; i < tabNavItem.length; i++) {
        tabNavItem[i].classList.remove("is-active");
    }

    for(let i = 0; i < tabContents.length; i++) {
        tabContents[i].classList.remove("is-active");
    }

    for(let i = 0; i < tabImg.length; i++) {
        tabImg[i].classList.remove("is-active");
    }

    //選択したタブにis-activeを追加
    e.target.classList.add("is-active");
    tabContents[clickedTabIndex].classList.add("is-active");
    tabImg[clickedTabIndex].classList.add("is-active");
})

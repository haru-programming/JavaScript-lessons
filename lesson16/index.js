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
        if (data.length === 0) {
            tabNav.textContent = "データが空です";
            console.log("データが空です");
        }
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

function appendArticlesTitleFragment(values) {
    const fragment = document.createDocumentFragment();
    const articleTitles = values.map(value => value.title);
    const articleComments = values.map(value => value.comments);

    //記事タイトルの数だけliを追加
    for (let i = 0; i < articleTitles.length; i++) {
        const li = document.createElement("li");
        const a = document.createElement("a");
        const numberOfComments = articleComments[i].length;

        li.classList.add("tab__contents-item");
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
    const tabContainer = document.getElementById("js-tab");

    //記事データの数だけulを作成
    for (let i = 0; i < values.length; i++) {
        const tabContents = document.createElement("div");
        const tabContentsInner = document.createElement("div");
        const ul = document.createElement("ul");

        tabContents.classList.add("tab__contents","js-tabContents");
        tabContents.id = `js-${data[i].category}-contents`;
        tabContentsInner.classList.add("tab__contents-inner");
        ul.classList.add("tab__contents-list");

        const articleTitlesFragment = appendArticlesTitleFragment(values[i]);
        const contentsImgFragment = createImgFragments(data[i]);

        tabContainer.appendChild(tabContents).appendChild(tabContentsInner).appendChild(ul).appendChild(articleTitlesFragment);
        tabContentsInner.appendChild(contentsImgFragment);
    }
}

function createImgFragments(data) {
    const fragment = document.createDocumentFragment();
    const imgWrapper = document.createElement("div");
    const img = document.createElement("img");

    imgWrapper.classList.add("tab__img-wrapper");
    img.classList.add("tab__img");
    img.src = `${data.img}`;

    fragment.appendChild(imgWrapper).appendChild(img);

    return fragment;
}

async function fetchInitDisplayData(values) {
    const initDisplayData = values.find(value => value.display);
    const initDisplayCategory = initDisplayData.category;
    const navButton = document.getElementById(initDisplayCategory);
    const tabContents = document.getElementById(`js-${initDisplayCategory}-contents`);

    navButton.classList.add("is-active");
    tabContents.classList.add("is-active");
}

async function addTabContents() {
    const data = await fetchArrayData();

    if(data){
        createTabNav(data);
        createTabContainer();
        createArticleContents(data);
        fetchInitDisplayData(data);
    }
}

addTabContents();

//タブの内容を切り替える
tabNav.addEventListener("click", (e) => {
    const tabContents = document.getElementsByClassName("js-tabContents");
    const tabNavItem = document.getElementsByClassName("tab__nav-item");
    const activeNav = tabNav.querySelector(".is-active");
    const clickedTabIndex = e.target.dataset.index;
    
    if (activeNav && tabNavItem[clickedTabIndex]) {

        //全てのis-activeを削除
        activeNav.classList.remove("is-active");
        tabContents[activeNav.dataset.index].classList.remove("is-active");

        //選択したタブにis-activeを追加
        e.target.classList.add("is-active");
        tabContents[clickedTabIndex].classList.add("is-active");
    }
})

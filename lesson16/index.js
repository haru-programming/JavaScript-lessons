const tabNav = document.getElementById("js-tabNav");

async function fetchData() {
    const api = "https://myjson.dit.upm.es/api/bins/6u5z";
    const response = await fetch(api);
    const json = await response.json();
    return json.data;
}

async function fetchArticleData() {
    const data = await fetchData();
    const articles = data.map(value => value.articles);
    return articles;
}

async function createTabNav() {
    const fragment = document.createDocumentFragment();
    const values = await fetchData();

    for (let i = 0; i < values.length; i++) {
        const li = document.createElement("li");
        const button = document.createElement("button");

        li.classList.add("tab__nav-item");
        li.id = `js-tabNavItem${i+1}`;
        button.classList.add("tab__nav-button");
        button.id = `js-tabNavButton${i+1}`;
        button.textContent = values[i].category;

        li.appendChild(button);
        fragment.appendChild(li);
    }
    tabNav.appendChild(fragment);

    // TODO 今回のPRで「どのカテゴリタブを初期表示時に選んでいるかはデータとして持っている」を実装していないため仮に作ってある。後で実装する
    const tabNavItem = document.getElementById("js-tabNavButton1");
    tabNavItem.classList.add("is-active");
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
    const imgWrapper = document.createElement("div");
    const img = document.createElement("img");

    tabContents.classList.add("tab__contents");
    tabContents.id = "js-tabContents";
    tabContentsInner.classList.add("tab__contents-inner");
    tabContentsInner.id = "js-tabContentsInner";

    imgWrapper.classList.add("tab__img-wrapper");
    img.classList.add("tab__img");

    tabContainer.insertAdjacentElement("beforeend", tabContents);
    tabContents.appendChild(tabContentsInner);
    tabContents.insertAdjacentElement("beforeend", imgWrapper);
}

async function createArticleTitle() {
    const values = await fetchArticleData();
    const tabContents = document.getElementById("js-tabContents");
    const tabContentsInner = document.getElementById("js-tabContentsInner");
    
    //記事データの数だけulを作成
    for(let i = 0; i < values.length; i++){
        const ul = document.createElement("ul");
        const articleTitle = values[i].map(value => value.title);

        ul.id = `js-tabContentsList${i+1}`;
        ul.classList.add("tab__contents-list");

        const fragment = document.createDocumentFragment();

        //記事タイトルの数だけliとaを作成
        for(let i = 0; i < articleTitle.length; i++) {
            const li = document.createElement("li");
            const a = document.createElement("a");

            li.classList.add("tab__contents-item");
            a.classList.add("tab__contents-link");
            a.href = "#";
            a.insertAdjacentHTML("beforeend", articleTitle[i]);

            li.appendChild(a);
            fragment.appendChild(li);
        }
        tabContents.appendChild(tabContentsInner).appendChild(ul).appendChild(fragment);
    }

    // TODO 今回のPRで「どのカテゴリタブを初期表示時に選んでいるかはデータとして持っている」を実装していないため仮に作ってある。後で実装する
    const tabContentsItem = document.getElementById("js-tabContentsList1");
    tabContentsItem.classList.add("is-show");
}

function addTabContents() {
    createTabNav();
    createTabContainer();
    createTabContents();
    createArticleTitle();
}

addTabContents();

//タブの内容を切り替える
tabNav.addEventListener("click", (e) => {
    const activeTabItem = document.getElementsByClassName("is-active")[0];
    const activeTabContent = document.getElementsByClassName("is-show")[0];
    const tabNavItem = document.getElementsByClassName("tab__nav-button");
    const tabContents = document.getElementsByClassName("tab__contents-list");
    const arrayTabs = Array.prototype.slice.call(tabNavItem);
    const ClickedTabIndex = arrayTabs.indexOf(e.target);

    activeTabItem.classList.remove("is-active");
    e.target.classList.add("is-active");
    activeTabContent.classList.remove("is-show");
    tabContents[ClickedTabIndex].classList.add("is-show");
})

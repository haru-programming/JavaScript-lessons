const tabNav = document.getElementById("js-tabNav");
const json = {
    "data": [
        {
            "id": "81f55329-9212-41b6-a71b-c7c02bcdee54",
            "category": "news",
            "display": true,
            "img": "/img/img-news.png",
            "articles": [
            {
                "id": "89e779dd-a096-4ef4-b810-9a8f0a80ef18",
                "date": "2021-10-30",
                "title": "news title 01",
                "comments": [
                    {
                        "id": "6b999dda-f0cb-443a-abe1-9158cc537ad9",
                        "name": "takeda",
                        "text": "It's so hard, my head is going to explode."
                    },
                    {
                        "id": "6b999dda-f0cb-443a-abe1-9158cc537ad8",
                        "name": "yamada",
                        "text": "It's so hard, my head is going to explode."
                    },
                    {
                        "id": "6b999dda-f0cb-443a-abe1-9158cc537ad7",
                        "name": "takahashi",
                        "text": "It's so hard, my head is going to explode."
                    }    
                ]
            },
            {
                "id": "89e779dd-a096-4ef4-b810-9a8f0a80ef19",
                "date": "2021-11-30",
                "title": "news title 02",
                "comments": [

                ]
            },
            {
                "id": "89e779dd-a096-4ef4-b810-9a8f0a80ef20",
                "date": "2021-12-30",
                "title": "news title 03",
                "comments": [
    
                ]
            },
            {
                "id": "89e779dd-a096-4ef4-b810-9a8f0a80ef21",
                "date": "2022-1-3",
                "title": "news title 04",
                "comments": [
    
                ]
            }
            ]
        },
        {
            "id": "91f55329-9212-41b6-a71b-c7c02bcdee54",
            "category": "economy",
            "display": false,
            "img": "/img/img-economy.png",
            "articles": [
            {
                "id": "99e779dd-a096-4ef4-b810-9a8f0a80ef18",
                "date": "2021-10-30",
                "title": "economy title 01",
                "comments": [
    
                ]
            },
            {
                "id": "99e779dd-a096-4ef4-b810-9a8f0a80ef19",
                "date": "2021-11-30",
                "title": "economy title 02",
                "comments": [
                    {
                        "id": "5a999dda-f0cb-443a-abe1-9158cc537ad9",
                        "name": "takeda",
                        "text": "It's so hard, my head is going to explode."
                    },
                    {
                        "id": "5a999dda-f0cb-443a-abe1-9158cc537ad8",
                        "name": "yamada",
                        "text": "It's so hard, my head is going to explode."
                    }
                ]
            },
            {
                "id": "99e779dd-a096-4ef4-b810-9a8f0a80ef20",
                "date": "2021-12-30",
                "title": "economy title 03",
                "comments": [
    
                ]
            },
            {
                "id": "99e779dd-a096-4ef4-b810-9a8f0a80ef21",
                "date": "2022-1-3",
                "title": "economy title 04",
                "comments": [
    
                ]
            }
            ]
        },
        {
            "id": "61f55329-9212-41b6-a71b-c7c02bcdee54",
            "category": "entertainment",
            "display": false,
            "img": "/img/img-entertainment.png",
            "articles": [
            {
                "id": "69e779dd-a096-4ef4-b810-9a8f0a80ef18",
                "date": "2021-10-30",
                "title": "entertainment title 01",
                "comments": [
    
                ]
            },
            {
                "id": "69e779dd-a096-4ef4-b810-9a8f0a80ef19",
                "date": "2021-11-30",
                "title": "entertainment title 02",
                "comments": [

                ]
            },
            {
                "id": "69e779dd-a096-4ef4-b810-9a8f0a80ef20",
                "date": "2021-12-30",
                "title": "entertainment title 03",
                "comments": [
                    {
                        "id": "6b999dda-f0cb-443a-abe1-9158cc537ad9",
                        "name": "takeda",
                        "text": "It's so hard, my head is going to explode."
                    }
                ]
            },
            {
                "id": "69e779dd-a096-4ef4-b810-9a8f0a80ef21",
                "date": "2022-1-3",
                "title": "entertainment title 04",
                "comments": [
    
                ]
            }
            ]
        },
        {
            "id": "21f55329-9212-41b6-a71b-c7c02bcdee54",
            "category": "domestic",
            "display": false,
            "img": "/img/img-domestic.png",
            "articles": [
            {
                "id": "29e779dd-a096-4ef4-b810-9a8f0a80ef18",
                "date": "2021-10-30",
                "title": "domestic title 01",
                "comments": [
    
                ]
            },
            {
                "id": "29e779dd-a096-4ef4-b810-9a8f0a80ef19",
                "date": "2021-11-30",
                "title": "domestic title 02",
                "comments": [

                ]
            },
            {
                "id": "29e779dd-a096-4ef4-b810-9a8f0a80ef20",
                "date": "2021-12-30",
                "title": "domestic title 03",
                "comments": [
    
                ]
            },
            {
                "id": "29e779dd-a096-4ef4-b810-9a8f0a80ef21",
                "date": "2022-1-3",
                "title": "domestic title 04",
                "comments": [
                    {
                        "id": "6b999dda-f0cb-443a-abe1-9158cc537ad9",
                        "name": "takeda",
                        "text": "It's so hard, my head is going to explode."
                    },
                    {
                        "id": "6b999dda-f0cb-443a-abe1-9158cc537ad8",
                        "name": "yamada",
                        "text": "It's so hard, my head is going to explode."
                    },
                    {
                        "id": "6b999dda-f0cb-443a-abe1-9158cc537ad7",
                        "name": "takahashi",
                        "text": "It's so hard, my head is going to explode."
                    }
                ]
            }
            ]
        }
    ]
}

async function fetchData() {
    //myjson不具合のためコメントアウト
    // const api = "https://myjson.dit.upm.es/api/bins/6u5z";
    // const response = await fetch(api);
    // const json = await response.json();
    // return json.data;
    return json.data;
}

async function createTabNav(values) {
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < values.length; i++) {
        const li = document.createElement("li");
        const button = document.createElement("button");

        li.classList.add("tab__nav-item");
        li.id = `js-tabNavItem${i+1}`;
        button.classList.add("tab__nav-button","js-tabNavButton");
        button.id = `js-tabNavButton${i+1}`;
        button.dataset.index = `${i}`;
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

function appendFragment(values) {
    const fragment = document.createDocumentFragment();

    let articleTitles = [];
    values.forEach((e) => {
        articleTitles.push(e.title);
    });

    let articleComments = [];
    values.forEach((e) => {
        articleComments.push(e.comments);
    });

    //記事タイトルの数だけliを追加
    for (let i = 0; i < articleTitles.length; i++) {
        const li = document.createElement("li");
        const a = document.createElement("a");
        const commentIconWrapper = document.createElement("div");
        const commentIcon = document.createElement("img");
        const commentLength = document.createElement("div");
        const numberOfComments = articleComments[i].length;

        li.classList.add("tab__contents-item","js-tabContentsItem");
        a.classList.add("tab__contents-link");
        a.href = "#";
        a.insertAdjacentHTML("beforeend", articleTitles[i]);
        commentIcon.src = "./img/icon-comment.svg";
        commentIconWrapper.classList.add("tab__contents-icon");
        commentLength.classList.add("tab__contents-info");

        li.appendChild(a);
        fragment.appendChild(li);

        //コメントがあれば件数とアイコンを表示
        if (numberOfComments > 0) {
            commentLength.insertAdjacentHTML("beforeend", `${articleComments[i].length}件`);
            commentIconWrapper.appendChild(commentIcon);
            li.insertAdjacentElement("beforeend", commentIconWrapper);
            li.insertAdjacentElement("beforeend", commentLength);
        }
    }
    return fragment;
}

async function createArticleTitle(data) {
    const values = data.map((value) => value.articles);
    const tabContents = document.getElementById("js-tabContents");
    const tabContentsInner = document.getElementById("js-tabContentsInner");

    //記事データの数だけulを作成
    for (let i = 0; i < values.length; i++) {
        const ul = document.createElement("ul");
        ul.id = `js-tabContentsList${i+1}`;
        ul.classList.add("tab__contents-list", "js-tabContentsList");

        const fragment = appendFragment(values[i]);

        tabContents.appendChild(tabContentsInner).appendChild(ul).appendChild(fragment);
    }

    // TODO 今回のPRで「どのカテゴリタブを初期表示時に選んでいるかはデータとして持っている」を実装していないため仮に作ってある。後で実装する
    const tabContentsItem = document.getElementById("js-tabContentsList1");
    tabContentsItem.classList.add("is-show");
}

async function addTabContents() {
    const data = await fetchData();

    createTabNav(data);
    createTabContainer();
    createTabContents();
    createArticleTitle(data);
}

addTabContents();

//タブの内容を切り替える
tabNav.addEventListener("click", (e) => {
    const activeTabItem = document.getElementsByClassName("is-active")[0];
    const activeTabContent = document.getElementsByClassName("is-show")[0];
    const tabContents = document.getElementsByClassName("js-tabContentsList");
    const clickedTabIndex = e.target.dataset.index;

    activeTabItem.classList.remove("is-active");
    e.target.classList.add("is-active");
    activeTabContent.classList.remove("is-show");
    tabContents[clickedTabIndex].classList.add("is-show");
})

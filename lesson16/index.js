import { format, differenceInCalendarDays } from "date-fns";
const tabNav = document.getElementById("js-tabNav");

const jsonData = [
    {
        "id": "81f55329-9212-41b6-a71b-c7c02bcdee54",
        "category": "news",
        "display": true,
        "img": "/img/img-news.png",
        "articles": [
            {
                "id": "89e779dd-a096-4ef4-b810-9a8f0a80ef18",
                "date": "2022-03-02",
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
                "date": "2022-03-08",
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
                "date": "2022-03-08",
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
                "date": "2022-03-08",
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
                "date": "2022-03-08",
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

async function fetchData(api) {
    try{
        // const response = await fetch(api);
        // const json = await response.json();
        // return json.data;

        //myjsonエラーのため一時的な対応
        return jsonData;
    } catch(e) {
        throw new Error("サーバーエラーです");
    }
}

async function fetchArrayData() {
    try {
        // const data = await fetchData("https://myjson.dit.upm.es/api/bins/48cr");
        // if (data.length === 0) {
        //     tabNav.textContent = "データが空です";
        //     console.log("データが空です");
        // }

        //myjsonエラーのため一時的な対応
        if (jsonData.length === 0) {
            tabNav.textContent = "データが空です";
            console.log("データが空です");
        }
        return jsonData;
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

function isNewArrival(date) {
    const today = format(new Date(), "yyyy,MM,dd");
    const articleDate = format(new Date(date), "yyyy,MM,dd");
    const periodFromSubmission = differenceInCalendarDays(new Date(today), new Date(articleDate));
    const newArrival = periodFromSubmission <= 3;
    return newArrival;
}

function createTabNav(values) {
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < values.length; i++) {
        const li = document.createElement("li");
        const button = document.createElement("button");

        li.classList.add("tab__nav-item");
        li.id = `js-tabNavItem${i+1}`;
        button.classList.add("tab__nav-button","js-tabNavButton");
        button.dataset.index = `${i}`;
        button.textContent = values[i].category;

        //JSONデータでdisplayがtrueのカテゴリの場合はis-activeを付与
        values[i].display && button.classList.add("is-active");

        fragment.appendChild(li).appendChild(button);
    }

    tabNav.appendChild(fragment);

    //タブの切り替え
    for (let i = 0; i < values.length; i++) {
        const button = document.getElementsByClassName("js-tabNavButton");
        button[i].addEventListener("click", toggleTabs);
    }
}

const toggleTabs = (e) => {
    const tabContents = document.getElementsByClassName("js-tabContents");
    const activeNav = tabNav.querySelector(".is-active");
    const clickedTabIndex = e.target.dataset.index;

    //全てのis-activeを削除
    activeNav.classList.remove("is-active");
    tabContents[activeNav.dataset.index].classList.remove("is-active");

    //選択したタブにis-activeを追加
    e.target.classList.add("is-active");
    tabContents[clickedTabIndex].classList.add("is-active");
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
    const articleDate = values.map(value => value.date);

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

        //3日以内の投稿であればnewアイコンを表示
        isNewArrival(articleDate[i]) && li.insertAdjacentElement("beforeend", createNewIcon());
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

function createNewIcon() {
    const div = document.createElement("div");
    const img = document.createElement("img");
    div.classList.add("tab__contents-new");
    img.src = "./img/icon-new.svg";
    
    div.appendChild(img);
    return div;
}

function createArticleContents(data) {
    const values = data.map(value => value.articles);
    const tabContainer = document.getElementById("js-tab");

    //記事データの数だけulを作成
    for (let i = 0; i < values.length; i++) {
        const tabContents = document.createElement("div");
        const tabContentsInner = document.createElement("div");
        const ul = document.createElement("ul");

        tabContents.classList.add("tab__contents","js-tabContents");
        tabContentsInner.classList.add("tab__contents-inner");
        ul.classList.add("tab__contents-list");

        //JSONデータでdisplayがtrueのカテゴリの場合はis-activeを付与
        data[i].display && tabContents.classList.add("is-active");

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

async function addTabContents() {
    const data = await fetchArrayData();

    if(data){
        createTabNav(data);
        createArticleContents(data);
    }
}

createTabContainer();
addTabContents();

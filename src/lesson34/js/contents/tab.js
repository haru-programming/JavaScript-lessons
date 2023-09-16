import { format, differenceInCalendarDays } from "date-fns";
import { createElementWithClassName } from "../modules/create-element";

const url = "https://mocki.io/v1/759610d7-71f5-414a-982e-ac00ffd64206";
// const url = "https://mocki.io/v1/8cc57c74-d671-48ac-b59f-d3dfb73ec8c1"; //No data
// const url = "https://httpstat.us/503"; // 503 error
// const url = "https://mocki.io/v1/fafafafa"; // Failed to fetch

const tabNav = document.getElementById("js-tabNav");


const addLoading = (target) => {
    const img =createElementWithClassName('img', 'loading js-loading');
    img.src = "/assets/img/loading-circle.gif";
    target.appendChild(img);
}

const removeLoading = () => document.querySelector(".js-loading").remove();

const displayInfo = (target, error) => {
    const p = document.createElement("p");
    p.textContent = error;
    target.appendChild(p);
};

const displayErrorStatus = (target, response) => {
    const p = document.createElement("p");
    p.textContent = `${response.status}:${response.statusText}`;
    target.appendChild(p);
};

const fetchData = async(api) => {
    addLoading(tabNav);
    try {
        const response = await fetch(api);

        if (response.ok) {
            return await response.json();
        } else {
            console.error(`${response.status}:${response.statusText}`);
            displayErrorStatus(tabNav, response);
        }
        
    } catch (error) {
        displayInfo(tabNav, error);
    } finally {
        removeLoading();
    }
};

const init = async() => {
    const data = await fetchData(url);

    if (!data) return;
    if (!data.length) {
        displayInfo(tabNav, "no data");
    } else {
        createTabNav(data);
        createTabContainer();
        createArticleContents(data);
    }
};

const isNewArrival = (date) => {
    const today = format(new Date(), "yyyy,MM,dd");
    const articleDate = format(new Date(date), "yyyy,MM,dd");
    const periodFromSubmission = differenceInCalendarDays(new Date(today), new Date(articleDate));
    const specificPeriod = 3;
    const newArrival = periodFromSubmission <= specificPeriod;
    return newArrival;
};

const createTabNav = (values) => {
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < values.length; i++) {
        const li = createElementWithClassName("li", "tab__nav-item");
        const button = createElementWithClassName("button", "tab__nav-button js-tabNavButton");

        li.id = `js-tabNavItem${i+1}`;
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
};

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

const createTabContainer = () => {
    const div = createElementWithClassName("div", "tab");
    div.id = "js-tab";
    div.appendChild(tabNav.parentNode.replaceChild(div, tabNav));
}

const appendArticlesTitleFragment = (values) => {
    const fragment = document.createDocumentFragment();
    const articleTitles = values.map(value => value.title);
    const articleComments = values.map(value => value.comments);
    const articleDate = values.map(value => value.date);

      //記事タイトルの数だけliを追加
    for (let i = 0; i < articleTitles.length; i++) {
        const li = createElementWithClassName("li", "tab__contents-item");
        const a = createElementWithClassName("a", "tab__contents-link link");
        const numberOfComments = articleComments[i].length;

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
};

const createCommentInfo = (values) => {
    const fragment = document.createDocumentFragment();
    const commentIconWrapper = createElementWithClassName("div", "tab__contents-icon");
    const commentIcon = document.createElement("img");
    const commentLength = createElementWithClassName("div", "tab__contents-info");

    commentIcon.src = "/assets/img/icon-comment.svg";
    commentLength.textContent = `${values.length}件`;
    commentIconWrapper.appendChild(commentIcon);

    fragment.appendChild(commentIconWrapper).insertAdjacentElement("afterend", commentLength)
    return fragment;
}

const createNewIcon = () => {
    const div = createElementWithClassName("div", "tab__contents-new");
    const img = document.createElement("img");

    img.src = "/assets/img/icon-new.svg";
    div.appendChild(img);
    return div;
};

const createArticleContents = (data) => {
    const values = data.map(value => value.articles);
    const tabContainer = document.getElementById("js-tab");

    //記事データの数だけulを作成
    for (let i = 0; i < values.length; i++) {
        const tabContents = createElementWithClassName("div", "tab__contents js-tabContents");
        const tabContentsInner = createElementWithClassName("div", "tab__contents-inner");
        const ul = createElementWithClassName("ul", "tab__contents-list");

        //JSONデータでdisplayがtrueのカテゴリの場合はis-activeを付与
        data[i].display && tabContents.classList.add("is-active");

        const articleTitlesFragment = appendArticlesTitleFragment(values[i]);
        const contentsImgFragment = createImgFragments(data[i]);

        tabContainer.appendChild(tabContents).appendChild(tabContentsInner).appendChild(ul).appendChild(articleTitlesFragment);
        tabContentsInner.appendChild(contentsImgFragment);
    }
};

const createImgFragments = (data) => {
    const fragment = document.createDocumentFragment();
    const imgWrapper = createElementWithClassName("div", "tab__img-wrapper");
    const img = createElementWithClassName("img", "tab__img");

    img.src = `${data.img}`;
    fragment.appendChild(imgWrapper).appendChild(img);

    return fragment;
};

init();

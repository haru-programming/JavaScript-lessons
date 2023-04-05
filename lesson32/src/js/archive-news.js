import { createElementWithClassName } from "./modules/create-element";

const newsContent = document.getElementById("js-news-body");

const url = "https://mocki.io/v1/ed12946a-89d7-4c90-98bb-8eadcf76e165";
// const url = "https://mocki.io/v1/8cc57c74-d671-48ac-b59f-d3dfb73ec8c1"; //No data
// const url = "https://httpstat.us/503"; // 503 error
// const url = "https://mocki.io/v1/fafafafa"; // Failed to fetch


const addLoading = (target) => {
    const img = document.createElement("img");
    img.src = "./img/loading-circle.gif";
    img.id = "js-loading";
    target.appendChild(img);
}

const removeLoading = () => document.getElementById("js-loading").remove();

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
    addLoading(newsContent);
    try {
        const response = await fetch(api);

        if (response.ok) {
            return await response.json();
        } else {
            console.error(`${response.status}:${response.statusText}`);
            displayErrorStatus(newsContent, response);
        }
        
    } catch (error) {
        displayInfo(newsContent, error);
    } finally {
        removeLoading();
    }
};

const init = async() => {
    const data = await fetchData(url);

    if (!data) return;
    if (!data.length) {
        displayInfo(newsContent, "no data");
    } else {
        renderCategories(data);
        renderNewsList(data);
    }
};

const createOptionElements = data => {
    const fragment = document.createDocumentFragment();
    data.forEach(({category}) => {
        const optionElement = document.createElement("option");
        optionElement.value = category;
        optionElement.textContent = category;
        fragment.appendChild(optionElement);
    })
    return fragment;
};

const renderCategories = data => {
    const selectElement = document.getElementById("js-select-category");
    selectElement.appendChild(createOptionElements(data));
};

const createNewsCards = data => {
    const fragment = document.createDocumentFragment();
    data.articles.forEach(article => {
        const newsItem = createElementWithClassName("li", "news__item");
        const thumbnailWrapper = createElementWithClassName("div", "news__item-thumbnail-wrap");
        const thumbnail = createElementWithClassName("img", "news__item-thumbnail");
        const infoArea = createElementWithClassName("div", "news__item-info");
        const categoryLabel = createElementWithClassName("p", "news__item-category");
        const date = createElementWithClassName("p", "news__item-date");
        const title = createElementWithClassName("h3", "news__item-title"); 
        const titleLink = createElementWithClassName("a", "news__item-link");
        
        thumbnail.src = article.img;
        thumbnail.alt = "";
        categoryLabel.textContent = data.category;
        date.textContent = article.date;
        titleLink.textContent = article.title;
        titleLink.href = "#";
        titleLink.classList.add("link");

        thumbnailWrapper.appendChild(thumbnail);
        infoArea.appendChild(categoryLabel).after(date);
        title.appendChild(titleLink);
        fragment.appendChild(newsItem).appendChild(title).after(infoArea, thumbnailWrapper);
    })
    return fragment;
};

const renderNewsList = data => {
    const newsList = createElementWithClassName("ul", "news__list");
    const fragment = document.createDocumentFragment();
    data.forEach(item => {
        fragment.appendChild(createNewsCards(item));
    })
    newsContent.appendChild(newsList).appendChild(fragment);
};

init();
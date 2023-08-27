import { createElementWithClassName } from "./modules/create-element";

const url = "https://mocki.io/v1/759610d7-71f5-414a-982e-ac00ffd64206";
// const url = "https://mocki.io/v1/8cc57c74-d671-48ac-b59f-d3dfb73ec8c1"; //No data
// const url = "https://httpstat.us/503"; // 503 error
// const url = "https://mocki.io/v1/fafafafa"; // Failed to fetch

const articleWrapper = document.getElementById("js-article");

const addLoading = (target) => {
    const img =createElementWithClassName('img', 'loading');
    img.src = "/assets/img/loading-circle.gif";
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
    addLoading(articleWrapper);
    try {
        const response = await fetch(api);

        if (response.ok) {
            return await response.json();
        } else {
            console.error(`${response.status}:${response.statusText}`);
            displayErrorStatus(articleWrapper, response);
        }
        
    } catch (error) {
        displayInfo(articleWrapper, error);
    } finally {
        removeLoading();
    }
};

const init = async() => {
    const data = await fetchData(url);

    if (!data) return;
    if (!data.length) {
        displayInfo(articleWrapper, "no data");
    } else {
        renderArticle(data);
        addEventListenerForFavoriteButton(data);
    }
};

const urlParameter = Object.fromEntries(new URLSearchParams(window.location.search));

const getArticleData = data => {
    const articles = data.map(item => item.articles);
    let targetData;
    articles.forEach(article => {
        article.forEach(item => {
            if(item.id === urlParameter.id) targetData = item;
        });
    });
    return targetData;
}

const findCategoryById = (data, targetId) => {
    for (const item of data) {
        for (const article of item.articles) {
            if (article.id === targetId) {
                return item.category;
            }
        }
    }
}

const setTitle = data => document.querySelector('title').textContent = `${data.title}`;

const createCategoryLabel = data => {
    const categoryLabel = createElementWithClassName('p', 'category');
    const articleId = urlParameter.id;
    categoryLabel.textContent = findCategoryById(data, articleId);
    return categoryLabel;
}

const createArticleHead = data => {
    const articleHead = createElementWithClassName('div', 'article__head');
    const title = createElementWithClassName('h1', 'article__title');
    const favoriteButton = createElementWithClassName('button', 'article__btn');
    const favoriteImg = document.createElement('img');

    title.textContent = data.title;
    favoriteButton.type = "button";
    favoriteButton.id = "js-favorite-button";
    favoriteImg.src = '/assets/img/icon-star.png';
    favoriteImg.alt = 'お気に入りに追加';
    favoriteButton.appendChild(favoriteImg);

    articleHead.appendChild(title).after(favoriteButton);
    return articleHead;
};

const createArticleInfo = data => {
    const articleInfo = createElementWithClassName('div', 'article__info js-article-info');
    const date = createElementWithClassName('time', 'article__date');

    date.textContent = `${data.date}`;
    articleInfo.appendChild(date);
    return articleInfo;
}

const createArticleContents = data => {
    const articleContents = createElementWithClassName('p', 'article__text');
    articleContents.textContent = `${data.content}`;
    return articleContents;
}

const createThumbnail = data => {
    const thumbnailWrapper = createElementWithClassName("picture", "article__thumbnail");
    const thumbnailWebp = document.createElement("source");
    const thumbnailJpg = document.createElement("img");
    const noImgSrc = "/assets/img/no-img.jpg";

    thumbnailJpg.alt = "";
    thumbnailJpg.src = data.img || noImgSrc;
    thumbnailWrapper.appendChild(thumbnailJpg);

    if(data.webp){
        thumbnailWebp.srcset = data.webp;
        thumbnailWrapper.insertAdjacentElement("afterbegin", thumbnailWebp);
    }
    return thumbnailWrapper;
};

const renderCategory = data => document.querySelector('.js-article-info').insertAdjacentElement('beforeend', createCategoryLabel(data));

const changeButtonDisabled = target => {
    const starImage = target.firstElementChild;
    target.disabled = true;
    starImage.src = '/assets/img/icon-star-done.png';
}

const getRegisteredFavoriteData = () => {
    let registeredFavoriteData;
    try {
        registeredFavoriteData = JSON.parse(localStorage.getItem('registeredFavoriteData'));
    } catch (error) {
        console.log(`jsonパースでエラーが発生しました: ${error}`);
        displayInfo(articleWrapper,'エラーが発生しました');
        return;
    }

    return registeredFavoriteData;
}

const createFavoriteData = data => {
    const favoriteData = {
        'id': data.id,
        'date': data.date,
        'title': data.title,
        'img': data.img,
        'webp': data.webp
    }
    
    const registeredFavoriteData = getRegisteredFavoriteData();
    const newFavoriteData = registeredFavoriteData !== null ? [...registeredFavoriteData, favoriteData] : [favoriteData];
    return newFavoriteData;
}

const saveArticleData = data => {
    const targetData = getArticleData(data);
    localStorage.setItem("registeredFavoriteData", JSON.stringify(createFavoriteData(targetData)));
}

const isRegisteredData = () => {
    const registeredFavoriteData = getRegisteredFavoriteData();
    return registeredFavoriteData !== null && registeredFavoriteData.some(item => item.id === urlParameter.id);
}

const renderArticle = data => {
    const targetData = getArticleData(data);
    const articleElement = document.getElementById('js-article');

    setTitle(targetData);
    articleElement.appendChild(createArticleHead(targetData)).after(createArticleInfo(targetData));
    articleElement.appendChild(createArticleContents(targetData)).after(createThumbnail(targetData));
    renderCategory(data);

    if(isRegisteredData()){
        const favoriteButton = document.getElementById('js-favorite-button');
        changeButtonDisabled(favoriteButton);
    }
}

const addEventListenerForFavoriteButton = data => {
    const favoriteButton = document.getElementById('js-favorite-button');

    favoriteButton.addEventListener('click', (e) => {
        if(e.target.disabled) return;

        changeButtonDisabled(e.target);
        saveArticleData(data);
    })
}

init();

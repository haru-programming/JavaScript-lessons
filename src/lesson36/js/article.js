import { add } from "date-fns";
import { createElementWithClassName } from "./modules/create-element";

const articlesUrl = "https://mocki.io/v1/759610d7-71f5-414a-982e-ac00ffd64206";
const contentsUrl = 'https://api.javascripttutorial.net/v1/quotes/';

const apiOptions = {
  currentPage : 0,
  limit : 10,
};

const observerOptions = { 
  threshold: 1.0,
  rootMargin: "0px",
};

const createApiUrl = (url, page, limit) => {
  const params = new URLSearchParams();
  params.append('page', page);
  params.append('limit', limit);
  return `${url}?${params}`;
};

const articleWrapper = document.getElementById("js-article");

const addLoading = (target) => {
    const img =createElementWithClassName('img', 'loading bottom');
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

const initArticle = async() => {
    const data = await fetchData(articlesUrl);

    if (!data) return;
    if (!data.length) {
        displayInfo(articleWrapper, "no data");
    } else {
        renderArticle(data);
        addEventListenerForFavoriteButton(data);
    }
};

const initContents = async() => {
    let url = createApiUrl(contentsUrl, apiOptions.currentPage, apiOptions.limit);
    const contentsData = await fetchData(url);
    const data = contentsData.data;

    if (!data) return;
    if (!data.length) {
        displayInfo(articleWrapper, "no data");
    } else {
        const articleList = createElementWithClassName('ul', 'article__list js-article-list');
        articleWrapper.appendChild(articleList);
        renderContents(data);
        observer.observe(document.querySelector('.js-article-list').lastElementChild);
    }
};

const updateContents = async() => {
    let url = createApiUrl(contentsUrl, apiOptions.currentPage, apiOptions.limit);
    const contentsData = await fetchData(url);
    const data = contentsData.data;

    if (!data) return;
    if (!data.length) {
        displayInfo(articleWrapper, "no data");
    } else {
        renderContents(data);
        observer.observe(document.querySelector('.js-article-list').lastElementChild);
    }
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {

        if (entry.isIntersecting) {
        addLoading(articleWrapper);
        observer.unobserve(entry.target);

            setTimeout(async () => {
              apiOptions.currentPage++;
                if(apiOptions.currentPage <= apiOptions.limit) updateContents();
                removeLoading(articleWrapper);
            }, 500);
        }
    });
}, observerOptions);

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
    let registeredFavoriteData = null;
    try {
        registeredFavoriteData = JSON.parse(localStorage.getItem('registeredFavoriteData'));
    } catch (error) {
        console.log(`jsonパースでエラーが発生しました: ${error}`);
        displayInfo(articleWrapper,'エラーが発生しました');
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
    const firstChild = articleElement.firstElementChild;
    setTitle(targetData);

    const fragment = document.createDocumentFragment();

    fragment.appendChild(createArticleHead(targetData)).after(createThumbnail(targetData), createArticleInfo(targetData));
    articleElement.insertBefore(fragment, firstChild);
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


const createContents = (data) => {
  const fragment = document.createDocumentFragment();

  if(data){
    data.forEach(article => {
      const articleItem = createElementWithClassName('li', 'article__item');
      const authorArea = createElementWithClassName('p', 'article__author');
      const quoteArea = createElementWithClassName('p', 'article__quote');
      authorArea.textContent = article.author;
      quoteArea.textContent = article.quote;
      fragment.appendChild(articleItem).appendChild(authorArea).after(quoteArea);
    })
    return fragment;
  }
}

const renderContents = (data) => document.querySelector('.js-article-list').appendChild(createContents(data));

initArticle();
initContents();

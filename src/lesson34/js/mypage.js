import { createElementWithClassName } from "./modules/create-element";

const articleWrapper = document.getElementById("js-mypage");

const displayInfo = (target, error) => {
  const p = document.createElement("p");
  p.textContent = error;
  target.appendChild(p);
};

const getFavoriteData = () => {
    let favoriteData = null;
    try {
      favoriteData = JSON.parse(localStorage.getItem('registeredFavoriteData'));
    } catch (error) {
        console.log(`jsonパースでエラーが発生しました: ${error}`);
        displayInfo(articleWrapper,'エラーが発生しました');
    }
    return favoriteData;
};

const init = () => {
  const favoriteData = getFavoriteData();
  if (favoriteData === null ) return;

  renderArticleList(favoriteData);
};

const createArticleCards = data => {
  const fragment = document.createDocumentFragment();

  const newsItem = createElementWithClassName("li", "news__item");
  const infoArea = createElementWithClassName("div", "news__item-info");
  const date = createElementWithClassName("p", "news__item-date");
  const title = createElementWithClassName("h3", "news__item-title"); 
  const titleLink = createElementWithClassName("a", "news__item-link");
  const hrefWithId = `./article.html?id=${data.id}`;

  date.textContent = data.date;
  titleLink.textContent = data.title;
  titleLink.href = hrefWithId;
  titleLink.classList.add("link");

  infoArea.appendChild(date);
  title.appendChild(titleLink);
  fragment.appendChild(newsItem).appendChild(title).after(infoArea, createThumbnail(data));
  return fragment;
};

const createThumbnail = article => {
  const thumbnailWrapper = createElementWithClassName("picture", "news__item-thumbnail-wrap");
  const thumbnailWebp = createElementWithClassName("source", "news__item-thumbnail");
  const thumbnailJpg = createElementWithClassName("img", "news__item-thumbnail");
  const noImgSrc = "/assets/img/no-img.jpg";

  thumbnailJpg.alt = "";
  thumbnailJpg.src = article.img || noImgSrc;
  thumbnailWrapper.appendChild(thumbnailJpg);

  if(article.webp){
    thumbnailWebp.srcset = article.webp;
    thumbnailWrapper.insertAdjacentElement("afterbegin", thumbnailWebp);
  }
  return thumbnailWrapper;
};

const renderArticleList = data => {
  const articleList = createElementWithClassName("ul", "news__list");
  
  const fragment = document.createDocumentFragment();
  data.forEach(item => {
      fragment.appendChild(createArticleCards(item));
  })
  articleWrapper.appendChild(articleList).appendChild(fragment);
};

init();

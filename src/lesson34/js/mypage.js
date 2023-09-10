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
  if (favoriteData.length === 0) {
    displayInfo(articleWrapper,'お気に入り記事がありません。');
    return;
  }
  renderArticleList(favoriteData);
  addEventListenerForRemoveFavoriteButton();
};

const createArticleCards = data => {
  const fragment = document.createDocumentFragment();

  const newsItem = createElementWithClassName("li", "news__item js-article");
  const infoArea = createElementWithClassName("div", "news__item-info");
  const date = createElementWithClassName("p", "news__item-date");
  const title = createElementWithClassName("h3", "news__item-title"); 
  const titleLink = createElementWithClassName("a", "news__item-link js-article-link");
  const hrefWithId = `./article.html?id=${data.id}`;

  date.textContent = data.date;
  titleLink.textContent = data.title;
  titleLink.href = hrefWithId;
  titleLink.classList.add("link");

  infoArea.appendChild(date);
  title.appendChild(titleLink);
  fragment.appendChild(newsItem).appendChild(title).after(infoArea, createThumbnail(data), createRemoveFavoriteButton());
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

const createRemoveFavoriteButton = () => {
  const removeFavoriteButton = createElementWithClassName("button", "news__button js-remove-favorite-button");
  removeFavoriteButton.type = "button";
  removeFavoriteButton.textContent = "お気に入りから削除";
  return removeFavoriteButton;
}

const renderArticleList = data => {
  const articleList = createElementWithClassName("ul", "news__list js-article-list");
  
  const fragment = document.createDocumentFragment();
  data.forEach(item => {
      fragment.appendChild(createArticleCards(item));
  })
  articleWrapper.appendChild(articleList).appendChild(fragment);
};

const getArticleId = target => {
  const targetArticle = target.closest(".js-article");
  const targetArticleLink = targetArticle.querySelector(".js-article-link").href;
  const regex = /id=([^&]+)/;
  const articleID = targetArticleLink.match(regex)[1];
  return articleID;
}

const deleteArticleData = target => {
  let registeredFavoriteData = getFavoriteData();
  const targetIndex = registeredFavoriteData.findIndex(item => item.id === getArticleId(target));

  registeredFavoriteData.splice(targetIndex, 1);
  localStorage.setItem("registeredFavoriteData", JSON.stringify(registeredFavoriteData));
  target.closest(".js-article").remove();
}

const addEventListenerForRemoveFavoriteButton = () => {
  const articleList = document.querySelector(".js-article-list");

  articleList.addEventListener("click", (e) => {
    deleteArticleData(e.target);

    if (getFavoriteData().length === 0) {
      displayInfo(articleWrapper,'お気に入り記事がありません。');
    }
  });
};

init();

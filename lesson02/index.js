'use strict';

const ul = document.getElementById('js-lists');
const li = document.createElement('li');
const anchor = document.createElement('a');
const img = document.createElement('img');

anchor.textContent = "これです";
anchor.href = "1.html";
img.src = "bookmark.png";
img.alt = "ブックマーク";

ul.appendChild(li);
li.appendChild(anchor);
anchor.insertAdjacentElement('afterbegin',img);

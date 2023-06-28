'use strict';

document.addEventListener('DOMContentLoaded', function() {
    const attributes = [
        { to: 'a1.html', text: 'a1'},
        { to: 'a2.html', text: 'a2'},
    ]

    const ul = document.getElementById('js-lists');
    const arrayLength = attributes.length;

    const fragment = document.createDocumentFragment();

    for(let i = 0; i < arrayLength; i++) {

        const attribute = attributes[i];
        const li = document.createElement('li');
        const anchor = document.createElement('a');
        const img = document.createElement('img');

        anchor.textContent = attribute.text;
        anchor.href = attribute.to;
        img.src = "/assets/img/bookmark.png";
        img.alt = "ブックマーク";
        
        li.appendChild(anchor).insertAdjacentElement('afterbegin',img);
        fragment.appendChild(li);
    }

    ul.appendChild(fragment);
});

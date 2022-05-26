const parent = document.querySelector("body");
const tableTitlesData = {
    "userId": "ID",
    "name": "名前",
    "gender": "性別",
    "age": "年齢"
}

const createElementWithClassName = (type, className) => {
    const element = document.createElement(type);
    element.className = className;
    return element;
};

const addLoading = () => {
    const img = document.createElement("img");
    const imgWrapper = createElementWithClassName("div", "loading");

    img.src = "loading-circle.gif";
    imgWrapper.id = "js-loading";
    parent.appendChild(imgWrapper).appendChild(img);
};

const removeLoading = () => document.getElementById("js-loading").remove();

const fetchData = async(endpoint) => {
    const response = await fetch(endpoint);

    if(!response.ok){
        const errorMessage = `${response.status}:${response.statusText}`;
        parent.appendChild(createErrorMessage(errorMessage));
        console.error(errorMessage);
        return;
    }
    return await response.json();
};

const fetchUserData = async() => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(fetchData("https://mocki.io/v1/7e46c380-0c0b-47ad-8e8f-75b68d1363a2")), 3000);
        // setTimeout(() => resolve(fetchData("https://mocki.io/v1/f12ae2d1-310d-4120-8749-47773d65e236")), 3000);//空配列
        // setTimeout(() => resolve(fetchData("https://httpstat.us/503")), 3000);//503 error
    })
};

const getUserData = async() => {
    addLoading();
    try {
        const json = await fetchUserData();
        if (!json) return;

        const data = json.data;

        if (data.length === 0) {
            parent.appendChild(createErrorMessage("まだデータがありません"));
            console.log("まだデータがありません");
            return;
        }
        return data;

    } catch(e) {
        console.error(e);
        parent.appendChild(createErrorMessage(e));
    } finally {
        removeLoading();
    }
};

const init = async() => {
    const data = await getUserData();
    
    if (data) {
        renderTable(data);
        renderSortButton();
        setButtonForInitDisplay();
        addEventListenerForSortButtons(data)
    }
};

const createErrorMessage = text => {
    const errorText = createElementWithClassName("p", "error-message");
    errorText.textContent = text;
    return errorText;
};

const renderTable = data => {
    const table = createElementWithClassName("table", "table");
    const titleKeys = Object.keys(tableTitlesData);
    const titleNames = Object.values(tableTitlesData);
    const tableHead = createTableHead(titleNames);
    const tableBody = createTableBody(data, titleKeys);

    parent.appendChild(table).appendChild(tableHead).after(tableBody);
};

const createTableHead = titlesData => {
    const tableHead = document.createElement("thead");
    const tr = createElementWithClassName("tr", "table__row");
    const fragment = document.createDocumentFragment();
    
    for(let i = 0; i < titlesData.length; i++){
        const th = createElementWithClassName("th", "table__title js-table-title");
        th.textContent = titlesData[i];
        fragment.appendChild(th);
    }
    tableHead.appendChild(tr).appendChild(fragment);

    return tableHead;
};

const createTableBody = (data, keys) => {
    const tableBody = document.createElement("tbody");
    const fragment = document.createDocumentFragment();

    for(let i = 0; i < data.length; i++){
        const tr = createElementWithClassName("tr", "table__row js-table-row");
        const td = createTableContents(data[i], keys);
        fragment.appendChild(tr).appendChild(td);
    }
    tableBody.appendChild(fragment);

    return tableBody;
};

const createTableContents = (data, keys) => {
    const fragment = document.createDocumentFragment();

    for(let i = 0; i < keys.length; i++){
        const td = createElementWithClassName("td", "table__contents js-table-contents");
        td.textContent = data[keys[i]];
        fragment.appendChild(td);
    }

    return fragment;
};

const createSortButtons = () => {
    const ul = createElementWithClassName("ul", "sort-buttons");
    ul.id = "js-sort-buttons";

    const buttonConfig = [
        { src: "../img/icon-both.svg", alt: "昇順に並び替える", dataSet: "default"},
        { src: "../img/icon-asc.svg", alt: "降順に並び替える", dataSet: "asc"},
        { src: "../img/icon-desc.svg", alt: "順不同に並び替える", dataSet: "desc"}
    ]

    const fragment = document.createDocumentFragment();
    buttonConfig.forEach(item => {
        const li = createElementWithClassName("li", "sort-buttons__item js-sort-button-item");
        const button = createElementWithClassName("button", "sort-buttons__btn");
        const img = createElementWithClassName("img", "sort-buttons__img");

        li.dataset.buttonStatus = item.dataSet;
        img.src = item.src;
        img.alt = item.alt;
        fragment.appendChild(li).appendChild(button).appendChild(img);
    })
    ul.appendChild(fragment);
    return ul;
};

const renderSortButton = () => {
    const sortTarget = [...document.querySelectorAll(".js-table-title")].filter(el => el.textContent === "ID" || el.textContent === "年齢");
    
    if(sortTarget) {
        sortTarget.forEach(el => {
            el.classList.add("is-target");
            el.insertAdjacentElement('beforeend', createSortButtons());
        })
    }
};

const setButtonForInitDisplay = () => {
    const defaultButtons = [...document.querySelectorAll('[data-button-status="default"]')];
    defaultButtons.forEach(button => {
        button.classList.add("is-active");
    })
}

const addEventListenerForSortButtons = data => {
    const sortButtons = [...document.querySelectorAll(".is-target")];

    sortButtons.forEach(sortButton => {
        sortButton.addEventListener("click", (e) => {
            const activeColumn = e.currentTarget;

            switchSortButtons(activeColumn);
            
            const trArray = [...document.querySelectorAll(".js-table-row")];
            const sortData = createSortingData(data, activeColumn);
    
            trArray.forEach((tr, index) => {
                const tdItems = tr.children;
                changeTableContents(tdItems, sortData[index]);
            })
        });
    })
};

const initButtonStatus = () => {
    // const activeButtons = document.querySelectorAll(".is-active")

    // activeButtons.forEach(button => {
    //     button.querySelector("[data-button-status='default']").classList.add("is-active");
    // })
}

const switchSortButtons = target => {
    const activeButton = target.querySelector(".is-active");
    const sortStatus = activeButton.dataset.buttonStatus;

    activeButton.classList.remove("is-active");

    switch (sortStatus) {
        case "desc":
            target.querySelector("[data-button-status='default']").classList.add("is-active");
            break;
        case "asc":
            target.querySelector("[data-button-status='desc']").classList.add("is-active");
            break;
        default:
            target.querySelector("[data-button-status='asc']").classList.add("is-active");
            break;
    }
};

const createSortingData = (data, target) => {
    const currentButtonStatus = target.querySelector(".is-active").dataset.buttonStatus;
    const currentColumnName = target.textContent;

    const key = Object.keys(tableTitlesData).find(key => tableTitlesData[key] === currentColumnName);

    if (currentButtonStatus === "asc") {
        return [...data].sort((firstEl, secondEl) => firstEl[key] - secondEl[key]);
    } 
    if (currentButtonStatus === "desc") {
        return [...data].sort((firstEl, secondEl) => secondEl[key] - firstEl[key]);
    } 
    return data;
};

const changeTableContents = (items, data) => {
    const titleKeys = Object.keys(tableTitlesData);

    for(let i = 0; i < titleKeys.length; i++){
        items[i].textContent = data[titleKeys[i]];
    }
};

init();

const parent = document.querySelector("body");

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

const removeLoading = () => {
    document.getElementById("js-loading").remove();
};

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
        setTimeout(() => resolve(fetchData("https://mocki.io/v1/8853f6f1-f1f0-4db3-9788-668933e2f788")), 3000);
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
            parent.textContent = "まだデータがありません";
            console.log("まだデータがありません");
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
    data && renderTable(data);
};

const createErrorMessage = (text) => {
    const errorText = createElementWithClassName("p", "error-message");
    errorText.textContent = text;
    return errorText;
};

const renderTable = async(data) => {
    const tableTitlesData = {
        "userId": "ID",
        "name": "名前",
        "gender": "性別",
        "age": "年齢"
    }

    const table = createElementWithClassName("table", "table");
    const titleKeys = Object.keys(tableTitlesData);
    const titleNames = Object.values(tableTitlesData);
    const tableHead = createTableHead(titleNames);
    const tableBody = createTableBody(data, titleKeys);

    parent.appendChild(table).appendChild(tableHead).after(tableBody);
};


const createTableHead = (titlesData) => {
    const tableHead = document.createElement("thead");
    const tr = createElementWithClassName("tr", "table__row");
    const fragment = document.createDocumentFragment();
    
    for(let i = 0; i < titlesData.length; i++){
        const th = createElementWithClassName("th", "table__title");
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
        const tr = createElementWithClassName("tr", "table__row");
        const td = createTableContents(data[i], keys);
        fragment.appendChild(tr).appendChild(td);
    }
    tableBody.appendChild(fragment);

    return tableBody;
};

const createTableContents = (data, keys) => {
    const fragment = document.createDocumentFragment();

    for(let i = 0; i < keys.length; i++){
        const td = createElementWithClassName("td", "table__contents");
        td.textContent = data[keys[i]];
        fragment.appendChild(td);
    }

    return fragment;
};

init();

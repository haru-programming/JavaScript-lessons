const newsContent = document.getElementById("js-news-body");

const url = "https://mocki.io/v1/6cb2582d-1e91-4777-a963-729425ae5962";
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
        renderOptionElements(data);
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

const renderOptionElements = data => {
    const selectElement = document.getElementById("js-select-category");
    selectElement.appendChild(createOptionElements(data));
};


init();

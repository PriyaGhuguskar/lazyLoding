const resultsContainer = document.getElementById("contwrapper");
const loader = document.getElementById("loader");
let page = 1;

const fetchData = async () => {
    loader.style.display = "block";

    const resp = await fetch('https://dummyjson.com/quotes');
    const datas = await resp.json();
    const maindata = datas.quotes;
    loader.style.display = "none";
    // console.log(datas);


    if (datas.length === 0) {
        window.removeEventListener("scroll", lazyLoad);
        return;
    }

    maindata.forEach(item => {
        const resultItem = document.createElement("div");
        resultItem.classList.add("quote-container");
        resultItem.innerHTML =
            `<p class="author">${item.author}</p>
             <div class="quote-details">“ ${item.quote}. ”
            </div>`;
        resultsContainer.appendChild(resultItem);
    });
    page++;
};


const lazyLoad = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 10) {
        fetchData();
    }
};

fetchData();

window.addEventListener("scroll", lazyLoad);
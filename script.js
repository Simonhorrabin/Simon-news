const container = document.querySelector(".container");
const optionsContainer = document.querySelector(".options-container");

const country = "us";
 // Replace with your actual API key
let category = "general";

let requestUrl = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}`;

const categories = ["general", "business", "entertainment", "health", "science", "sports", "technology"];

const generateUI = (articles) => {
    container.innerHTML = "";
    for (let item of articles) {
        let card = document.createElement("div");
        card.classList.add("news-card");
        card.innerHTML = `
            <div class="news-image-container">
                <img src="${item.urlToImage ? item.urlToImage : 'newspaper.jpg'}" alt="News Image" />
            </div>
            <div class="news-content">
                <div class="news-title">${item.title}</div>
                <div class="news-description">
                    ${item.description || item.content || "No description available."}
                </div>
                <a href="${item.url}" target="_blank" class="view-button">Read More</a>
            </div>`;
        container.appendChild(card);
    }
};

const getNews = async () => {
    try {
        container.innerHTML = '<div class="loader">Loading...</div>';  // Displaying loading spinner
        let response = await fetch(requestUrl);
        if (!response.ok) throw new Error("Data unavailable");
        let data = await response.json();
        generateUI(data.articles);
    } catch (error) {
        container.innerHTML = "Failed to load news. Try again later.";
        console.error(error);
    }
};

const generateCategoryButtons = () => {
    optionsContainer.innerHTML = "";  // Clear previous buttons
    categories.forEach((cat) => {
        const button = document.createElement("button");
        button.textContent = cat;
        button.addEventListener("click", () => {
            category = cat;
            requestUrl = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}`;
            getNews();
        });
        optionsContainer.appendChild(button);
    });
};

// Generate category buttons on page load
generateCategoryButtons();

// Fetch news on page load
getNews();

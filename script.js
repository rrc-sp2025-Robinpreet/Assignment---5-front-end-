/* 
Name - Robinpreet Kaur 
Date - 01-11-2025
*/ 

const API_KEY = "74d85b12933843ecbe31a087577d4682"; 

const form = document.getElementById("searchForm");
const keywordInput = document.getElementById("keyword");
const resultsSection = document.getElementById("results");

form.addEventListener("submit", async (e) => {
  e.preventDefault(); // stops form from refreshing the page

  const keyword = keywordInput.value.trim();
  if (!keyword) {
    resultsSection.innerHTML = "<p>Please enter a keyword.</p>";
    return;
  }

  resultsSection.innerHTML = "<p>Loading results...</p>";

  try {
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${encodeURIComponent(
        keyword
      )}&apiKey=${API_KEY}`
    );

    if (!response.ok) throw new Error("Network response was not ok");

    const data = await response.json();

    if (data.articles.length === 0) {
      resultsSection.innerHTML = "<p>No results found.</p>";
      return;
    }

    resultsSection.innerHTML = data.articles
      .map(
        (article) => `
        <article class="news-card">
          ${article.urlToImage ? `<img src="${article.urlToImage}" alt="News image" style="width:100%; border-radius:8px; margin-bottom:10px;">` : ""}
          <h2>${article.title}</h2>
          <p>${article.description || "No description available."}</p>
          <a href="${article.url}" target="_blank">Read more</a>
        </article>
      `
      )
      .join("");
  } catch (error) {
    resultsSection.innerHTML = `<p>Error: ${error.message}</p>`;
    console.error("Error fetching news:", error);
  }
});

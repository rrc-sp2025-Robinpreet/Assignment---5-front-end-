/* 
Name - Robinpreet Kaur 
Date - 01-11-2025
*/ 

const API_KEY = "74d85b12933843ecbe31a087577d4682"; 
const BASE_URL = "https://newsapi.org/v2/everything";

const form = document.getElementById("search-form"); 
const queryInput = document.getElementById("query");
const statusEl = document.getElementById("status");
const resultsEl = document.getElementById("results");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const query = queryInput.value.trim();

  if (!query) {
    statusEl.textContent = "Please enter a keyword.";
    return;
  }

  resultsEl.innerHTML = "";
  statusEl.textContent = "Searching...";
  form.querySelector("button").disabled = true;

  try {
    const articles = await fetchNews(query);
    renderResults(articles);
  } catch (error) {
    console.error(error);
    statusEl.textContent = "Error: Could not load news articles.";
  } finally {
    form.querySelector("button").disabled = false;
  }
});

async function fetchNews(query) {
  const url = `${BASE_URL}?q=${encodeURIComponent(query)}&pageSize=10&sortBy=publishedAt&apiKey=${API_KEY}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Network response was not ok (${response.status})`);
  }

  const data = await response.json();

  if (data.status !== "ok") {
    throw new Error(data.message || "API returned an error.");
  }

  return data.articles;
}

function renderResults(articles) {
  if (!articles || articles.length === 0) {
    statusEl.textContent = "No results found.";
    return;
  }

  statusEl.textContent = `Showing ${articles.length} articles.`;

  const html = articles
    .map(
      (a) => `
      <article class="article">
        ${a.urlToImage ? `<img src="${a.urlToImage}" alt="News image">` : ""}
        <h3><a href="${a.url}" target="_blank">${a.title}</a></h3>
        <p>${a.description || "No description available."}</p>
        <small><strong>${a.source.name}</strong> – ${new Date(a.publishedAt).toLocaleString()}</small>
      </article>`
    )
    .join("");

  resultsEl.innerHTML = html;
}

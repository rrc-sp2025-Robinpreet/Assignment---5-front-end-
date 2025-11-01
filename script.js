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


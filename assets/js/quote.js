// quote.js — loads ../api/quotes/index.json and displays one random quote.
// Designed to be used from widgets/random-quote.html

async function fetchQuotes() {
  try {
    // relative path from widgets/random-quote.html to /api/quotes/index.json
    const res = await fetch("../api/quotes/index.json", {cache: "no-cache"});
    if (!res.ok) throw new Error("Failed to fetch quotes");
    const data = await res.json();
    return Array.isArray(data.quotes) ? data.quotes : [];
  } catch (err) {
    console.error("DevPlayground quote error:", err);
    return ["Error loading quote — try again later."];
  }
}

function pickRandom(arr) {
  if (!arr.length) return "";
  return arr[Math.floor(Math.random() * arr.length)];
}

async function showQuote() {
  const quoteEl = document.getElementById("quote");
  const quotes = await fetchQuotes();
  const q = pickRandom(quotes);
  // Single-line expectation: keep it on one line if possible.
  // But we preserve whitespace for multiline quotes as required.
  quoteEl.textContent = q;
}

// Display on load
showQuote();

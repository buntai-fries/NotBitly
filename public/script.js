// script.js
const form = document.getElementById("shorten-form");
const resultEl = document.getElementById("result");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const urlInput = document.getElementById("url");
  const longUrl = urlInput.value.trim();

  if (!longUrl) {
    resultEl.textContent = "Please enter a URL.";
    return;
  }

  try {
    const res = await fetch("/api/shorten", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: longUrl }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      resultEl.textContent = "Error: " + (err.error || res.statusText);
      return;
    }

    const data = await res.json();
    resultEl.innerHTML = `
      Short URL: <a href="${data.shortUrl}" target="_blank" rel="noopener noreferrer">
        ${data.shortUrl}
      </a>
    `;
  } catch (e) {
    console.error(e);
    resultEl.textContent = "Network error";
  }
});

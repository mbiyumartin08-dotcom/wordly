
const form = document.getElementById("search-form");
const input = document.getElementById("word-input");
const message = document.getElementById("message");

const API_URL = "https://api.dictionaryapi.dev/api/v2/entries/en/";


form.addEventListener("submit", handleSearch);

function handleSearch(event) {
  event.preventDefault(); 
  const word = input.value.trim();

  if (word === "") {
    showMessage("Please type a word to search.");
    return;
  }

  getWord(word);
}


async function getWord(word) {
  showMessage("Searching...", false);

  try {
    const response = await fetch(API_URL + encodeURIComponent(word));

    if (!response.ok) {
      throw new Error("Word not found. Check the spelling and try again.");
    }

    const data = await response.json();
    console.log(data);
    showMessage(""); 
  } catch (error) {
    showMessage(error.message);
  }
}


function showMessage(text, isError = true) {
  message.textContent = text;
  message.className = isError ? "error" : "";
}
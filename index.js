const form = document.getElementById("search-form");
const input = document.getElementById("word-input");
const message = document.getElementById("error-message");
const results = document.getElementById("results");

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
  results.innerHTML = ""; 

  try {
    const response = await fetch(API_URL + encodeURIComponent(word));

    if (!response.ok) {
      throw new Error("Word not found. Check the spelling and try again.");
    }

    const data = await response.json();
    showMessage("");
    displayWord(data[0]);
  } catch (error) {
    if (error instanceof TypeError) {
      showMessage("Could not reach the dictionary service. Try again later.");
    } else {
      showMessage(error.message);
    }
  }
}



function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}

function displayWord(entry) {
  const header = el("div", "word-header");
  header.appendChild(el("h2", "word-title", entry.word));

  const phoneticText =
    entry.phonetic || entry.phonetics.find((p) => p.text)?.text;
  if (phoneticText) {
    header.appendChild(el("span", "phonetic", phoneticText));
  }

  const audioUrl = entry.phonetics.find((p) => p.audio)?.audio;
  if (audioUrl) {
    const audioBtn = el("button", "audio-btn", " Listen");
    audioBtn.type = "button";
    audioBtn.setAttribute("aria-label", `Play pronunciation of ${entry.word}`);
    audioBtn.addEventListener("click", () => new Audio(audioUrl).play());
    header.appendChild(audioBtn);
  } else {
    header.appendChild(el("span", "phonetic", "(no audio available)"));
  }
  results.appendChild(header);

  // One card per meaning (noun, verb, ...)
  entry.meanings.forEach((meaning) => {
    results.appendChild(buildMeaningCard(meaning));
  });

  if (entry.sourceUrls?.length) {
    const source = el("p", "source", "Source: ");
    const link = el("a", "", entry.sourceUrls[0]);
    link.href = entry.sourceUrls[0];
    link.target = "_blank";
    link.rel = "noopener";
    source.appendChild(link);
    results.appendChild(source);
  }
}

function buildMeaningCard(meaning) {
  const card = el("article", "meaning-card");
  card.appendChild(el("span", "part-of-speech", meaning.partOfSpeech));

  const list = el("ol", "definition-list");
  meaning.definitions.forEach((def) => {
    const item = el("li", "", def.definition);
    if (def.example) {
      item.appendChild(el("span", "example", `"${def.example}"`));
    }
    list.appendChild(item);
  });
  card.appendChild(list);

  const synonyms = el("div", "synonyms");
  if (meaning.synonyms.length > 0) {
    synonyms.appendChild(el("strong", "", "Synonyms: "));
    meaning.synonyms.forEach((s) => {
      synonyms.appendChild(el("span", "synonym-tag", s));
    });
  } else {
    synonyms.appendChild(el("em", "", "No synonyms available."));
  }
  card.appendChild(synonyms);

  return card;
}

function showMessage(text, isError = true) {
  message.textContent = text;
  message.className = isError ? "error" : "";
}
# Wordly

This is an online language learning platform that allows users to search for words, view their definitions, and save 
their favorite terms for future reference. Wordly is a fast, user-friendly, and dynamic dictionary interface that integrates
seamlessly with Wordly’s language tools. 


## Features

- **Word search**: type a word and press Enter or click Search
- **Full definitions**: every meaning grouped by part of speech (noun, verb, interjection...)
- **Example sentences** shown under each definition when available
- **Synonyms** displayed as tags, with a friendly message when there are none
- **Audio pronunciation** with a Listen button, plus the phonetic spelling
- **Saved words**: save and remove favourites, stored in the browser with `localStorage` so they survive a refresh
- **Click a saved word** to look it up again instantly
- **Error handling** for empty searches, unknown words and network failures
- **Responsive layout** that works on phones and desktops
- **Accessible**: semantic HTML, ARIA labels and live regions for screen readers

## Tech stack

| Part | Used for |
|---|---|
| HTML | Page structure with semantic elements |
| CSS | Layout (Flexbox), CSS variables, hover effects, media queries |
| JavaScript  | `fetch`, `async/await`, DOM manipulation, `localStorage` |
| [Free Dictionary API](https://dictionaryapi.dev/) | Word data |

## Project structure

```
wordly/
├── index.html    # Page structure: search form, results, saved words
├── style.css     # All styling
├── script.js     # Fetching, rendering, and saved-word logic
└── README.md
```

## Getting started


## How it works

1. The form's `submit` event is intercepted with `event.preventDefault()` so the page never reloads.
2. The input is trimmed and validated. Empty searches show a message instead of calling the API.
3. `fetch` requests `https://api.dictionaryapi.dev/api/v2/entries/en/<word>`.
4. The JSON response is parsed. Each word has many meanings, and each meaning has many definitions, so nested loops build the page.
5. The results are created with `document.createElement` and inserted into the `#results` section, replacing the previous word.
6. Saved words live in an array that is written to `localStorage`. Every change updates the array, saves it, then re-renders the list.



## Known limitations

- The Free Dictionary API is a free public service and is sometimes slow or unavailable, which shows the network error message.
- Only English words are supported.
- Saved words are stored per browser, so they do not sync between devices.

## Future improvements

- Dark mode toggle
- Search history
- Autocomplete suggestions
- Support for other languages
- A "Clear all saved words" button

## Credits

- Word data from the [Free Dictionary API](https://dictionaryapi.dev/)

## Author

Anaya Martin 

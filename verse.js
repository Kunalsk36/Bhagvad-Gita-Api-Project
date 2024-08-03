let nextBtn = document.querySelector("#nextBtn");
let prevBtn = document.querySelector("#previousBtn");
let slug = document.querySelector("#slug");
let versetransliteration = document.querySelector("#versetransliteration");
let translation = document.querySelector("#translation");
let titleElement = document.querySelector("title");
let loadingElement = document.querySelector("#loading");
let container = document.querySelector(".container");
var nextBtnDiv = nextBtn.parentElement;
var prevBtnDiv = prevBtn.parentElement;
let chapterNumber;
let verseNumber;

const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": "1e4b87b93amsh8227d9fa5dfa58ap1aaf59jsne0209a5fbdb1",
    "x-rapidapi-host": "bhagavad-gita3.p.rapidapi.com",
  },
};

const getQueryParams = () => {
  const params = new URLSearchParams(window.location.search);
  return {
    chapter_number: params.get("chapter_number"),
    verse_number: params.get("verse_number"),
  };
};

// Set the chapterNumber variable based on the query parameter
const init = () => {
  const { chapter_number, verse_number } = getQueryParams();
  chapterNumber = chapter_number; // Use chapter_number as chapterNumber
  verseNumber = verse_number - 1;
};

init();

let verses = [];
const getAllVerses = async () => {
  try {
    showLoading();
    const response = await fetch(
      `https://bhagavad-gita3.p.rapidapi.com/v2/chapters/${chapterNumber}/verses/`,
      options
    );
    const result = await response.json();
    hideLoading();
    verses = result;
    updateVerseContent(verses[verseNumber]);
  } catch (error) {
    console.error(error);
    showLoading();
    loadingElement.innerText =
      "Something went wrong. Please try again by refreshing the page.";
  }
};

const updateVerseContent = (data) => {
  titleElement.textContent = `Chapter ${data.chapter_number} : Verse ${data.verse_number}`;
  slug.textContent = `Chapter ${data.chapter_number} : Verse ${data.verse_number}`;
  versetransliteration.textContent = data.transliteration;
  translation.textContent = data.translations[4].description;
};

const showLoading = () => {
  loadingElement.style.display = "block";
  container.style.display = "none";
};

const hideLoading = () => {
  loadingElement.style.display = "none";
  container.style.display = "flex";
};

prevBtn.addEventListener("click", () => {
  if (verseNumber > 0) {
    verseNumber--;
  } else {
    verseNumber = verses.length - 1; // Loop to the last verse
  }
  updateVerseContent(verses[verseNumber]);
});

nextBtn.addEventListener("click", () => {
  if (verseNumber < verses.length - 1) {
    verseNumber++;
  } else {
    verseNumber = 0; // Loop to the first verse
  }
  updateVerseContent(verses[verseNumber]);
});

function addArrowEventListeners(arrowDiv) {
  arrowDiv.addEventListener("mousedown", function () {
    arrowDiv.classList.add("active");
  });

  arrowDiv.addEventListener("mouseup", function () {
    arrowDiv.classList.remove("active");
  });

  arrowDiv.addEventListener("mouseleave", function () {
    arrowDiv.classList.remove("active");
  });
}

addArrowEventListeners(nextBtnDiv);
addArrowEventListeners(prevBtnDiv);

getAllVerses();

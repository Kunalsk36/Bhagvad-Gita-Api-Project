let nextBtn = document.querySelector("#nextBtn");
let prevBtn = document.querySelector("#previousBtn");
let chapterNo = document.querySelector("#chapterNo");
let chapterName = document.querySelector("#chapterName");
let description = document.querySelector("#description");
let titleElement = document.querySelector("title");
let loadingElement = document.querySelector("#loading");
var nextBtnDiv = nextBtn.parentElement;
var prevBtnDiv = prevBtn.parentElement;
let currentIndex;

const url =
  "https://bhagavad-gita3.p.rapidapi.com/v2/chapters/?skip=0&limit=18";
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
    chapter_number: params.get("chapter_number") - 1,
  };
};

// Set the currentIndex variable based on the query parameter
const init = () => {
  const { chapter_number } = getQueryParams();
  currentIndex = chapter_number; // Use chapter_number as currentIndex
};

init();

let chapters = [];

const getAllChapters = async () => {
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    chapters = result;
    updateChapterContent(chapters[currentIndex]);
    getAllData(currentIndex + 1); // Pass currentIndex + 1 to getAllData
  } catch (error) {
    console.error(error);
    showLoading();
    loadingElement.innerText =
      "Something went wrong. Please try again by refreshing the page.";
  }
};

const updateChapterContent = (data) => {
  titleElement.textContent = `Chapter ${data.chapter_number}`;
  chapterNo.textContent = `Chapter ${data.chapter_number}`;
  chapterName.textContent = data.name_translated;
  description.textContent = data.chapter_summary;
};

prevBtn.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
  } else {
    currentIndex = chapters.length - 1; // Loop to the last chapter
  }
  updateChapterContent(chapters[currentIndex]);
  getAllData(currentIndex + 1); // Pass currentIndex + 1 to getAllData
});

nextBtn.addEventListener("click", () => {
  if (currentIndex < chapters.length - 1) {
    currentIndex++;
  } else {
    currentIndex = 0; // Loop to the first chapter
  }
  updateChapterContent(chapters[currentIndex]);
  getAllData(currentIndex + 1); // Pass currentIndex + 1 to getAllData
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

// Initial load
getAllChapters();

const updateVerses = async (chapterNum) => {
  try {
    showLoading();
    const versesContainer = document.querySelector(".verseContainer");

    // Clear previous verses
    versesContainer.innerHTML = "";
    const response = await fetch(
      `https://bhagavad-gita3.p.rapidapi.com/v2/chapters/${chapterNum}/verses/`,
      options
    );
    const result = await response.json(); // Parse the JSON response
    hideLoading();
    // Create a heading for the chapter
    const chapterHeading = document.createElement("h2");
    chapterHeading.textContent = `Chapter ${chapterNum} : ${result.length} Verses`;
    versesContainer.appendChild(chapterHeading);

    result.forEach((verse) => {
      const { verse_number, transliteration } = verse;

      // Create elements to display the data
      const verseDiv = document.createElement("div");
      verseDiv.className = "verse";

      const verseNoEl = document.createElement("p");
      verseNoEl.setAttribute("class", "verseNumber");
      verseNoEl.textContent = `Verse ${verse_number}`;

      const verseTextEl = document.createElement("p");
      verseTextEl.setAttribute("class", "verseNumber");
      verseTextEl.textContent = transliteration;

      // Append elements to the verse div
      verseDiv.appendChild(verseNoEl);
      verseDiv.appendChild(verseTextEl);

      // Append verse div to the container
      versesContainer.appendChild(verseDiv);
    });
  } catch (error) {
    console.error(error);
    showLoading();
    loadingElement.innerText =
      "Something went wrong. Please try again by refreshing the page.";
  }
};

const showLoading = () => {
  loadingElement.style.display = "block";
};

const hideLoading = () => {
  loadingElement.style.display = "none";
};

async function getAllData(c) {
  await updateVerses(c);
}
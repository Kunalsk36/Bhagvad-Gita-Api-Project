let loadingElement = document.querySelector("#loading");

const url =
  "https://bhagavad-gita3.p.rapidapi.com/v2/chapters/?skip=0&limit=18";
const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": "1e4b87b93amsh8227d9fa5dfa58ap1aaf59jsne0209a5fbdb1",
    "x-rapidapi-host": "bhagavad-gita3.p.rapidapi.com",
  },
};

const getAllChapters = async () => {
  try {
    showLoading();
    const response = await fetch(url, options);
    const result = await response.json();
    const container = document.querySelector(".container");
    hideLoading();
    result.forEach((info) => {
      const { chapter_number, name_translated, chapter_summary, verses_count } =
        info;

      const infoDiv = document.createElement("div");
      infoDiv.className = "info";

      const chapterNo = document.createElement("p");
      chapterNo.setAttribute("id", "chapterNo");
      chapterNo.textContent = `Chapter ${chapter_number}:`;

      const chapterName = document.createElement("p");
      chapterName.setAttribute("id", "chapterName");
      chapterName.textContent = name_translated;

      const chapterSummary = document.createElement("p");
      chapterSummary.setAttribute("id", "description");
      chapterSummary.textContent = chapter_summary;

      const versesCount = document.createElement("p");
      versesCount.setAttribute("id", "totalVerses");
      versesCount.textContent = `${verses_count} verses`;

      infoDiv.appendChild(chapterNo);
      infoDiv.appendChild(chapterName);
      infoDiv.appendChild(chapterSummary);
      infoDiv.appendChild(versesCount);

      container.appendChild(infoDiv);

      infoDiv.addEventListener("click", () => handleClick(chapter_number));
    });
  } catch (error) {
    console.error(error);
    showLoading();
    loadingElement.innerText =
      "Something went wrong. Please try again by refreshing the page.";
  }
};

const handleClick = (chapter_number) => {
  window.location.href = `chapter.html?chapter_number=${chapter_number}`;
};

const showLoading = () => {
  loadingElement.style.display = "block";
};

const hideLoading = () => {
  loadingElement.style.display = "none";
};

getAllChapters();
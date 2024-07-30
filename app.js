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
    const response = await fetch(url, options);
    const result = await response.json();
    const container = document.querySelector(".container");

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
    });
    console.log(result);
  } catch (error) {
    console.error(error);
  }
};

getAllChapters();
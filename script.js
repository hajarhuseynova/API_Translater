const fromLanguage = document.getElementById("fromLanguage");
const toLanguage = document.getElementById("toLanguage");
const btnTranslate = document.getElementById("btnTranslate");
const fromText = document.getElementById("fromText");
const toText = document.getElementById("toText");
const exchange = document.querySelector(".exchange");
const icons = document.querySelectorAll(".icons");

for (const lang in languages) {
  let option = `
    <option value="${lang}">${languages[lang]}</option>
    `;
  fromLanguage.insertAdjacentHTML("beforeend", option);
  toLanguage.insertAdjacentHTML("beforeend", option);

  fromLanguage.value = "tr-TR";
  toLanguage.value = "en-GB";
}
btnTranslate.addEventListener("click", function () {
  const from = fromLanguage.value;
  const to = toLanguage.value;
  const text = fromText.value;

  const url = `https://api.mymemory.translated.net/get?q=${text}&langpair=${from}|${to}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      toText.value = data.responseData.translatedText;
    });
});
exchange.addEventListener("click", function () {
  let text = fromText.value;
  fromText.value = toText.value;
  toText.value = text;

  let lang = fromLanguage.value;
  fromLanguage.value = toLanguage.value;
  toLanguage.value = lang;
});

for (const icon of icons) {
  icon.addEventListener("click", function (element) {
    if (element.target.classList.contains("fa-copy")) {
      if (element.target.id == "from") {
        navigator.clipboard.writeText(fromText.value);
      } else {
        navigator.clipboard.writeText(toText.value);
      }
    } else {
      let utterance;
      if (element.target.id == "from") {
        utterance = new SpeechSynthesisUtterance(fromText.value);
        utterance.lang = fromLanguage.value;
      } else {
        utterance = new SpeechSynthesisUtterance(toText.value);
        utterance.lang = toLanguage.value;
      }
      speechSynthesis.speak(utterance);
    }
  });
}

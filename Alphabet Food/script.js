const form = document.getElementById("form");
const input = document.getElementById("letter");
const img = document.getElementById("result");
const msg = document.getElementById("msg");
const label = document.getElementById("label");

// 입력 정리: 대문자 + A-Z만 + 1글자
input.addEventListener("input", () => {
  input.value = (input.value || "")
    .toUpperCase()
    .replace(/[^A-Z]/g, "")
    .slice(0, 1);
});

function setMessage(text, isError = false) {
  msg.textContent = text;
  msg.classList.toggle("error", isError);
}

function show(letter) {
  img.classList.remove("show");
  img.alt = "";
  setMessage("");
  label.textContent = letter ? `Letter: ${letter}` : "—";

  if (!letter) {
    setMessage("Type one letter A–Z.", true);
    return;
  }

  const candidates = [
    `Images/${letter}.jpg`,
    `Images/${letter}.JPG`,
    `Images/${letter}.png`,
    `Images/${letter}.webp`,
  ];

  let i = 0;

  function tryNext() {
    if (i >= candidates.length) {
      img.classList.remove("show");
      setMessage(`No image found for "${letter}".`, true);
      return;
    }

    const src = candidates[i++];

    img.onload = () => {
      img.alt = `Food image for letter ${letter}`;
      img.classList.add("show");
      setMessage("");
    };

    img.onerror = tryNext;

    img.src = src + `?v=${Date.now()}`;
  }

  tryNext();
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  show(input.value);
});
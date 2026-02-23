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

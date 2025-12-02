// Get all entry cards and preview elements
const cards = document.querySelectorAll(".entry-card");
const previewTitle = document.getElementById("preview-title");
const previewText = document.getElementById("preview-text");

const defaultTitle = previewTitle.textContent;
const defaultText = previewText.textContent;

// Hover → update preview text
cards.forEach((card) => {
  card.addEventListener("mouseenter", () => {
    const t = card.dataset.previewTitle;
    const p = card.dataset.previewText;

    if (t) previewTitle.textContent = t;
    if (p) previewText.textContent = p;
  });

  card.addEventListener("mouseleave", () => {
    previewTitle.textContent = defaultTitle;
    previewText.textContent = defaultText;
  });

  // CLICK → go to that card's link
  card.addEventListener("click", () => {
    const link = card.querySelector(".entry-link");
    if (link && link.href) {
      window.location.href = link.href;
    }
  });
});

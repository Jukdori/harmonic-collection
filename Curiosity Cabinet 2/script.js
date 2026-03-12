const rowData = {
  1: {
    emoji: "😌",
    label: "calm",
    message: "quiet things can still hold meaning"
  },
  2: {
    emoji: "😅",
    label: "social awkwardness",
    message: "connection often begins with discomfort"
  },
  3: {
    emoji: "😭",
    label: "nostalgia",
    message: "some feelings only return when we look back"
  },
  4: {
    emoji: "🤔",
    label: "curiosity",
    message: "questions are small doors to wonder"
  },
  5: {
    emoji: "😁",
    label: "joy",
    message: "happiness grows when shared"
  }
};

const overlay = document.getElementById("emotionOverlay");
const overlayEmoji = document.getElementById("overlayEmoji");
const overlayName = document.getElementById("overlayName");
const overlayMessage = document.getElementById("overlayMessage");
const closeOverlay = document.getElementById("closeOverlay");

const revealedRows = new Set();

function showOverlay(rowNumber) {
  const data = rowData[rowNumber];
  overlayEmoji.textContent = data.emoji;
  overlayName.textContent = data.label;
  overlayMessage.textContent = data.message;
  overlay.classList.add("show");
  overlay.setAttribute("aria-hidden", "false");
}

function hideOverlay() {
  overlay.classList.remove("show");
  overlay.setAttribute("aria-hidden", "true");
}

closeOverlay.addEventListener("click", hideOverlay);

overlay.addEventListener("click", (event) => {
  if (event.target === overlay) {
    hideOverlay();
  }
});

for (let i = 1; i <= 5; i++) {
  const cards = document.querySelectorAll(`.row${i}`);
  const label = document.getElementById(`label${i}`);

  cards.forEach((card) => {
    card.addEventListener("toggle", () => {
      const opened = [...cards].filter((c) => c.open).length;

      if (opened === 5) {
        label.classList.add("revealed", `row${i}`);
        label.innerHTML = `
          <div class="label-inner">
            <div>${rowData[i].emoji} ${rowData[i].label}</div>
            <div style="font-size:0.88rem; font-weight:500; line-height:1.5; margin-top:8px;">
              ${rowData[i].message}
            </div>
          </div>
        `;

        if (!revealedRows.has(i)) {
          revealedRows.add(i);
          showOverlay(i);
        }
      } else {
        label.className = "row-label";
        label.innerHTML = `<div class="label-inner">drawer 0${i}</div>`;
        revealedRows.delete(i);
      }
    });
  });


const rowData = {
  1: {
    key: "calm",
    emoji: "😌",
    label: "calm",
    message: "quiet things can still hold meaning"
  },
  2: {
    key: "awkward",
    emoji: "😅",
    label: "social awkwardness",
    message: "connection often begins with discomfort"
  },
  3: {
    key: "nostalgia",
    emoji: "😭",
    label: "nostalgia",
    message: "some feelings only return when we look back"
  },
  4: {
    key: "curiosity",
    emoji: "🤔",
    label: "curiosity",
    message: "questions are small doors to wonder"
  },
  5: {
    key: "joy",
    emoji: "😁",
    label: "joy",
    message: "happiness grows when shared"
  }
};

const overlay = document.getElementById("emotionOverlay");
const overlayCard = document.getElementById("overlayCard");
const overlayEmoji = document.getElementById("overlayEmoji");
const overlayName = document.getElementById("overlayName");
const overlayMessage = document.getElementById("overlayMessage");
const closeOverlay = document.getElementById("closeOverlay");
const unlockedCount = document.getElementById("unlockedCount");

const revealedRows = new Set();

function updateUnlockedCount() {
  unlockedCount.textContent = revealedRows.size;
}

function showOverlay(rowNumber) {
  const data = rowData[rowNumber];

  overlayCard.classList.remove("calm", "awkward", "nostalgia", "curiosity", "joy");
  overlayCard.classList.add(data.key);

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
          <div class="label-stamp">${rowData[i].emoji} ${rowData[i].label}</div>
          <div class="label-sub">unlocked</div>
        `;

        if (!revealedRows.has(i)) {
          revealedRows.add(i);
          updateUnlockedCount();
          showOverlay(i);
        }
      } else {
        label.className = "row-label";
        label.innerHTML = `
          <div class="label-stamp">drawer 0${i}</div>
          <div class="label-sub">sealed</div>
        `;

        if (revealedRows.has(i)) {
          revealedRows.delete(i);
          updateUnlockedCount();
        }
      }
    });
  });
}

updateUnlockedCount();
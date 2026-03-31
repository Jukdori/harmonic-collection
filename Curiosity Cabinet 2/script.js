const letters = ["B", "I", "N", "G", "O"];

const boardData = [
  {
    key: "calm",
    emoji: "😌",
    label: "calm",
    message: "quiet things can still hold meaning",
    clues: [
      ["rain = calm?", "Soft rain lowers noise and slows the body."],
      ["quiet mornings?", "Low stimulation makes space feel precious."],
      ["warm drinks?", "Warm routines create a small feeling of safety."],
      ["window seat?", "You can watch the world without entering it."],
      ["slow days?", "Less pressure makes simple moments feel softer."]
    ]
  },
  {
    key: "awkward",
    emoji: "😅",
    label: "social awkwardness",
    message: "connection often begins with discomfort",
    clues: [
      ["wave back?", "Social reflexes often move before thought."],
      ["nervous laugh?", "Laughter can release tension when you freeze."],
      ["replay talks?", "The mind edits awkward moments after they pass."],
      ["forget names?", "Attention goes to survival, not memory."],
      ["long silence?", "Embarrassment stretches time."]
    ]
  },
  {
    key: "nostalgia",
    emoji: "😭",
    label: "nostalgia",
    message: "some feelings only return when we look back",
    clues: [
      ["old songs?", "Music stores mood better than language."],
      ["memory smells?", "Scent reaches memory fast and deeply."],
      ["reread texts?", "Old words hold versions of people and self."],
      ["childhood places?", "Growing changes both scale and memory."],
      ["miss people at night?", "Quiet leaves more room for feeling."]
    ]
  },
  {
    key: "curiosity",
    emoji: "🤔",
    label: "curiosity",
    message: "questions are small doors to wonder",
    clues: [
      ["open fridge?", "Sometimes you want interruption, not food."],
      ["google at 2am?", "Night gives random thoughts more volume."],
      ["click anyway?", "Curiosity rewards possibility before answers."],
      ["distracted?", "The brain keeps hunting novelty."],
      ["random thoughts?", "Loose associations rise when the mind drifts."]
    ]
  },
  {
    key: "joy",
    emoji: "😁",
    label: "joy",
    message: "happiness grows when shared",
    clues: [
      ["mirror smiles?", "Faces copy faces almost automatically."],
      ["group laughter?", "Shared joy feels bigger than private joy."],
      ["tiny wins?", "Completion makes effort feel visible."],
      ["pets help?", "Softness and presence lower stress quickly."],
      ["sunlight?", "Light changes mood, energy, and attention."]
    ]
  }
];

const boardGrid = document.getElementById("boardGrid");
const unlockedCount = document.getElementById("unlockedCount");

const overlay = document.getElementById("emotionOverlay");
const overlayCard = document.getElementById("overlayCard");
const overlayEmoji = document.getElementById("overlayEmoji");
const overlayName = document.getElementById("overlayName");
const overlayMessage = document.getElementById("overlayMessage");
const closeOverlay = document.getElementById("closeOverlay");

const revealedRows = new Set();

function renderBoard() {
  const corner = document.createElement("div");
  corner.className = "board-corner";
  corner.textContent = "BINGO";
  boardGrid.appendChild(corner);

  letters.forEach((letter) => {
    const header = document.createElement("div");
    header.className = "column-header";
    header.textContent = letter;
    boardGrid.appendChild(header);
  });

  boardData.forEach((row, rowIndex) => {
    const plaque = document.createElement("div");
    plaque.className = "row-plaque";
    plaque.id = `plaque-${rowIndex + 1}`;
    plaque.innerHTML = `
      <div class="plaque-title">drawer 0${rowIndex + 1}</div>
      <div class="plaque-sub">locked</div>
    `;
    boardGrid.appendChild(plaque);

    row.clues.forEach((clue, colIndex) => {
      const cell = document.createElement("details");
      cell.className = `cell row${rowIndex + 1}`;
      cell.dataset.row = String(rowIndex + 1);

      cell.innerHTML = `
        <summary class="chest" aria-label="Open clue">
          <span class="chest-lid"></span>
          <span class="chest-box"></span>
          <span class="chest-lock"></span>
        </summary>
        <article class="clue-card">
          <span class="ticket">${letters[colIndex]} clue</span>
          <h3>${clue[0]}</h3>
          <p>${clue[1]}</p>
        </article>
        <span class="open-stamp">open</span>
      `;

      boardGrid.appendChild(cell);
    });
  });
}

function updateUnlockedCount() {
  unlockedCount.textContent = revealedRows.size;
}

function showOverlay(rowIndex) {
  const row = boardData[rowIndex];

  overlayCard.classList.remove("calm", "awkward", "nostalgia", "curiosity", "joy");
  overlayCard.classList.add(row.key);

  overlayEmoji.textContent = row.emoji;
  overlayName.textContent = row.label;
  overlayMessage.textContent = row.message;

  overlay.classList.add("show");
  overlay.setAttribute("aria-hidden", "false");
}

function hideOverlay() {
  overlay.classList.remove("show");
  overlay.setAttribute("aria-hidden", "true");
}

function wireBoard() {
  for (let i = 0; i < boardData.length; i++) {
    const rowNumber = i + 1;
    const rowCells = document.querySelectorAll(`.row${rowNumber}`);
    const plaque = document.getElementById(`plaque-${rowNumber}`);

    rowCells.forEach((cell) => {
      cell.addEventListener("toggle", () => {
        const openCount = [...rowCells].filter((item) => item.open).length;

        if (openCount === 5 && !revealedRows.has(rowNumber)) {
          revealedRows.add(rowNumber);

          plaque.classList.add("revealed", `row${rowNumber}`);
          plaque.innerHTML = `
            <div class="plaque-title">${boardData[i].emoji} ${boardData[i].label}</div>
            <div class="plaque-sub">unlocked</div>
          `;

          updateUnlockedCount();
          showOverlay(i);
        }
      });
    });
  }
}

closeOverlay.addEventListener("click", hideOverlay);
overlay.addEventListener("click", (event) => {
  if (event.target === overlay) hideOverlay();
});

renderBoard();
wireBoard();
updateUnlockedCount();
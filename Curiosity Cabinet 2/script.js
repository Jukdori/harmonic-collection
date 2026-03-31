const letters = ["B", "I", "N", "G", "O"];

const boardData = [
  {
    key: "calm",
    emoji: "😌",
    label: "calm",
    message: "quiet things can still hold meaning",
    clues: [
      ["why does rain quiet everything?", "Soft rain lowers noise and slows the body."],
      ["why do quiet mornings feel expensive?", "Low stimulation makes space feel precious."],
      ["why do warm drinks feel like a reset?", "Warm routines create a small feeling of safety."],
      ["why does a window seat fix the mood?", "You can watch the world without entering it."],
      ["why do slow days feel softer?", "Less pressure makes simple moments feel softer."]
    ]
  },
  {
    key: "awkward",
    emoji: "😅",
    label: "social awkwardness",
    message: "connection often begins with discomfort",
    clues: [
      ["why do we suddenly feel too aware of ourselves?", "One small social moment can make you notice everything about yourself at once."],
      ["why does nervous laughter arrive first?", "Laughter can release tension when you freeze."],
      ["why do names disappear instantly?", "Attention goes to survival, not memory."],
      ["why does silence suddenly get louder?", "Embarrassment stretches time."],
      ["why do awkward moments replay all day?", "The mind edits awkward moments after they pass."]
    ]
  },
  {
    key: "nostalgia",
    emoji: "😭",
    label: "nostalgia",
    message: "some feelings only return when we look back",
    clues: [
      ["why do old songs hit harder at night?", "Music stores mood better than language."],
      ["why can one smell bring back everything?", "Scent reaches memory fast and deeply."],
      ["why are old texts so hard to delete?", "Old words hold versions of people and self."],
      ["why do childhood places feel unreal now?", "Growing changes both scale and memory."],
      ["why do people feel farther away after dark?", "Quiet leaves more room for feeling."]
    ]
  },
  {
    key: "curiosity",
    emoji: "🤔",
    label: "curiosity",
    message: "questions are small doors to wonder",
    clues: [
      ["why do we open the fridge just to look?", "Sometimes you want interruption, not food."],
      ["why do weird questions show up at 2 a.m.?", "Night gives random thoughts more volume."],
      ["why do we click before thinking?", "Curiosity rewards possibility before answers."],
      ["why does distraction feel more interesting?", "The brain keeps hunting novelty."],
      ["why do random thoughts arrive like that?", "Loose associations rise when the mind drifts."]
    ]
  },
  {
    key: "joy",
    emoji: "😁",
    label: "joy",
    message: "happiness grows when shared",
    clues: [
      ["why do tiny wins feel so big?", "Completion makes effort feel visible."],
      ["why does shared laughter feel louder?", "Shared joy feels bigger than private joy."],
      ["why do pets improve everything instantly?", "Softness and presence lower stress quickly."],
      ["why does sunlight change the whole day?", "Light changes mood, energy, and attention."],
      ["why do smiles spread so fast?", "Faces copy faces almost automatically."]
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
      plaque.innerHTML = `
  <div class="plaque-sub only-status">locked</div>
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
          <span class="ticket">${letters[colIndex]}</span>
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
  if (event.target === overlay) {
    hideOverlay();
  }
});

renderBoard();
wireBoard();
updateUnlockedCount();

const rows = {
  calm: {
    details: document.querySelectorAll('details[data-row="calm"]'),
    tag: document.getElementById("tag-calm"),
    status: document.getElementById("status-calm"),
    label: "😌 calm"
  },
  awkward: {
    details: document.querySelectorAll('details[data-row="awkward"]'),
    tag: document.getElementById("tag-awkward"),
    status: document.getElementById("status-awkward"),
    label: "😅 social awkwardness"
  },
  nostalgia: {
    details: document.querySelectorAll('details[data-row="nostalgia"]'),
    tag: document.getElementById("tag-nostalgia"),
    status: document.getElementById("status-nostalgia"),
    label: "😭 nostalgia"
  },
  curious: {
    details: document.querySelectorAll('details[data-row="curious"]'),
    tag: document.getElementById("tag-curious"),
    status: document.getElementById("status-curious"),
    label: "🤔 curiosity"
  },
  joy: {
    details: document.querySelectorAll('details[data-row="joy"]'),
    tag: document.getElementById("tag-joy"),
    status: document.getElementById("status-joy"),
    label: "😁 joy"
  }
};

const bingoMessage = document.getElementById("bingoMessage");

function updateRowState(rowName) {
  const row = rows[rowName];
  const openCount = Array.from(row.details).filter((item) => item.open).length;
  const completed = openCount === row.details.length;

  row.tag.classList.toggle("completed", completed);
  row.status.classList.toggle("completed", completed);

  if (completed) {
    row.status.textContent = `${row.label} — BINGO complete ✨`;
  } else {
    row.status.textContent = `${row.label} — ${openCount}/5 open`;
  }
}

function updateAllRows() {
  const completedRows = [];

  Object.keys(rows).forEach((rowName) => {
    updateRowState(rowName);

    const row = rows[rowName];
    const openCount = Array.from(row.details).filter((item) => item.open).length;

    if (openCount === row.details.length) {
      completedRows.push(row.label);
    }
  });

  if (completedRows.length === 0) {
    bingoMessage.textContent =
      "open five cards in the same row to complete an emotional bingo.";
  } else if (completedRows.length === 1) {
    bingoMessage.textContent = `✨ ${completedRows[0]} bingo completed.`;
  } else {
    bingoMessage.textContent = `✨ completed rows: ${completedRows.join(" · ")}.`;
  }
}

document.querySelectorAll("details").forEach((detail) => {
  detail.addEventListener("toggle", updateAllRows);
});

updateAllRows();
const rowData = {
  1: {
    label: "😌 calm",
    message: "quiet things can still hold meaning"
  },
  2: {
    label: "😅 social awkwardness",
    message: "connection often begins with discomfort"
  },
  3: {
    label: "😭 nostalgia",
    message: "some feelings only return when we look back"
  },
  4: {
    label: "🤔 curiosity",
    message: "questions are small doors to wonder"
  },
  5: {
    label: "😁 joy",
    message: "happiness grows when shared"
  }
};

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
            <div>${rowData[i].label}</div>
            <div style="font-size: 0.88rem; font-weight: 500; line-height: 1.5; margin-top: 8px;">
              ${rowData[i].message}
            </div>
          </div>
        `;
      } else {
        label.className = "row-label";
        label.innerHTML = `<div class="label-inner">drawer 0${i}</div>`;
      }
    });
  });
}

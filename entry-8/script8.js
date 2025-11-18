document.addEventListener("DOMContentLoaded", () => {
  /* ====== Greeting + date ====== */

  const greetingEl = document.getElementById("greeting-text");
  const dateEl = document.getElementById("date-text");

  function updateGreeting() {
    const now = new Date();
    const hour = now.getHours();
    let greeting;

    if (hour < 12) {
      greeting = "Do the thing, then rest";
    } else if (hour < 18) {
      greeting = "Good afternoon, one task at a time.";
    } else {
      greeting = "Good evening, soft focus mode on.";
    }

    greetingEl.textContent = greeting;

    const formatted = now.toLocaleString(undefined, {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    dateEl.textContent = formatted;
  }

  updateGreeting();

  /* ====== Affirmations ====== */

  const affirmations = [
    "You don’t have to finish everything today. You just have to move a little bit forward.",
    "Done is better than perfect. Tiny progress is still progress.",
    "You’ve already done hard things before. You can do this too.",
    "Take a breath. Relax your shoulders. Then do just the next small step.",
    "Future you will be so thankful for this little bit of effort.",
    "It’s okay to study slowly. Consistency beats intensity.",
  ];

  const affirmationText = document.getElementById("affirmation-text");
  const newAffirmationBtn = document.getElementById("new-affirmation");

  function showRandomAffirmation() {
    const index = Math.floor(Math.random() * affirmations.length);
    affirmationText.textContent = affirmations[index];
    affirmationText.classList.remove("wiggle");
    // re-trigger CSS animation
    void affirmationText.offsetWidth;
    affirmationText.classList.add("wiggle");
  }

  newAffirmationBtn.addEventListener("click", showRandomAffirmation);

  // simple wiggle animation via CSS class
  const style = document.createElement("style");
  style.textContent = `
    .wiggle {
      animation: wiggle 350ms ease-out;
    }
    @keyframes wiggle {
      0% { transform: translateX(0); }
      25% { transform: translateX(-2px); }
      50% { transform: translateX(2px); }
      75% { transform: translateX(-1px); }
      100% { transform: translateX(0); }
    }
  `;
  document.head.appendChild(style);

  /* ====== To-do progress ====== */

  const checkboxes = document.querySelectorAll(".todo-checkbox");
  const progressBar = document.getElementById("progress-bar");
  const todoSummary = document.getElementById("todo-summary");

  function updateProgress() {
    const total = checkboxes.length;
    let done = 0;
    checkboxes.forEach((box) => {
      if (box.checked) done += 1;
    });

    const percent = total === 0 ? 0 : Math.round((done / total) * 100);
    progressBar.style.width = `${percent}%`;

    todoSummary.textContent = `${done} of ${total} tasks completed.`;

    // little “all done” message
    if (done === total && total > 0) {
      todoSummary.textContent = "All done for today. Nice work. 💫";
    }
  }

  checkboxes.forEach((box) => {
    box.addEventListener("change", updateProgress);
  });

  updateProgress(); // initial

  /* ====== Study timer (mm:ss) ====== */

  const timerDisplay = document.getElementById("timer-display");
  const startBtn = document.getElementById("timer-start");
  const pauseBtn = document.getElementById("timer-pause");
  const resetBtn = document.getElementById("timer-reset");

  let seconds = 0;
  let intervalId = null;

  function renderTimer() {
    const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    timerDisplay.textContent = `${mins}:${secs}`;
  }

  function startTimer() {
    if (intervalId !== null) return; // already running
    intervalId = setInterval(() => {
      seconds += 1;
      renderTimer();
    }, 1000);
  }

  function pauseTimer() {
    if (intervalId !== null) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }

  function resetTimer() {
    pauseTimer();
    seconds = 0;
    renderTimer();
  }

  startBtn.addEventListener("click", startTimer);
  pauseBtn.addEventListener("click", pauseTimer);
  resetBtn.addEventListener("click", resetTimer);

  renderTimer();

  /* ====== Theme toggle (soft / sunset) ====== */

  const themeToggleBtn = document.getElementById("theme-toggle");
  const body = document.body;
  let isSunset = false;

  function toggleTheme() {
    isSunset = !isSunset;
    body.classList.toggle("theme-sunset", isSunset);
    themeToggleBtn.textContent = isSunset
      ? "Switch back to daytime theme"
      : "Switch to sunset theme";
  }

  themeToggleBtn.addEventListener("click", toggleTheme);
});

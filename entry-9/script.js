function updateDateTime() {
  const now = new Date();
  const dateOptions = { weekday: "short", month: "short", day: "numeric" };
  const timeOptions = { hour: "2-digit", minute: "2-digit" };

  const dateEl = document.getElementById("today-date");
  const timeEl = document.getElementById("current-time");

  if (dateEl && timeEl) {
    dateEl.textContent = now.toLocaleDateString("en-US", {
      ...dateOptions,
      timeZone: "America/New_York"
    });

    timeEl.textContent = now.toLocaleTimeString("en-US", {
      ...timeOptions,
      timeZone: "America/New_York"
    });
  }
}

updateDateTime();
setInterval(updateDateTime, 30 * 1000);

// ----- VIBE SHUFFLE -----
const vibes = [
  "Slow but steady beats panicked and fast.",
  "Tiny progress still counts as progress.",
  "Soft focus, no self-bullying.",
  "Done is better than perfect.",
  "One task at a time, not all of them at once.",
  "You’re allowed to be tired and still keep going.",
];

const vibeTextEl = document.getElementById("vibe-text");
const vibeButton = document.getElementById("vibe-button");

if (vibeButton && vibeTextEl) {
  vibeButton.addEventListener("click", () => {
    const randomIndex = Math.floor(Math.random() * vibes.length);
    vibeTextEl.textContent = vibes[randomIndex];
  });
}

// ----- PANEL NAVIGATION -----
const navButtons = document.querySelectorAll(".nav-button");
const panels = document.querySelectorAll(".panel");

navButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const targetId = btn.dataset.panel;

    navButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    panels.forEach((panel) => {
      panel.classList.toggle("active", panel.id === targetId);
    });
  });
});

// ----- COURSE PILL SELECTION -----
const coursePills = document.querySelectorAll("#course-pills .pill");
const selectedCourseEl = document.getElementById("selected-course");

coursePills.forEach((pill) => {
  pill.addEventListener("click", () => {
    coursePills.forEach((p) => p.classList.remove("active"));
    pill.classList.add("active");

    if (selectedCourseEl) {
      selectedCourseEl.textContent = pill.dataset.course || pill.textContent;
    }
  });
});

// ----- STUDY TIMER -----
let timerInterval = null;
let remainingSeconds = 0;

const minutesInput = document.getElementById("timer-minutes");
const timerDisplay = document.getElementById("timer-display");
const startBtn = document.getElementById("timer-start");
const pauseBtn = document.getElementById("timer-pause");
const resetBtn = document.getElementById("timer-reset");

function formatTime(seconds) {
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

function setTimerFromInput() {
  const minutes = parseInt(minutesInput.value, 10) || 25;
  remainingSeconds = minutes * 60;
  timerDisplay.textContent = formatTime(remainingSeconds);
}

if (minutesInput && timerDisplay) {
  setTimerFromInput();
  minutesInput.addEventListener("change", setTimerFromInput);
}

if (startBtn) {
  startBtn.addEventListener("click", () => {
    if (timerInterval) return; // already running
    if (remainingSeconds <= 0) {
      setTimerFromInput();
    }
    timerInterval = setInterval(() => {
      remainingSeconds -= 1;
      if (remainingSeconds <= 0) {
        remainingSeconds = 0;
        clearInterval(timerInterval);
        timerInterval = null;
      }
      timerDisplay.textContent = formatTime(remainingSeconds);
    }, 1000);
  });
}

if (pauseBtn) {
  pauseBtn.addEventListener("click", () => {
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
  });
}

if (resetBtn) {
  resetBtn.addEventListener("click", () => {
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
    setTimerFromInput();
  });
}

// ----- TASK LIST CLICK AREA -----
const taskList = document.getElementById("task-list");
if (taskList) {
  taskList.addEventListener("click", (e) => {
    const li = e.target.closest("li");
    if (!li) return;
    const checkbox = li.querySelector('input[type="checkbox"]');
    if (checkbox && e.target !== checkbox) {
      checkbox.checked = !checkbox.checked;
    }
  });
}

// ----- NOTES CLEAR BUTTON -----
const notesArea = document.getElementById("notes-area");
const clearNotesBtn = document.getElementById("clear-notes");

if (clearNotesBtn && notesArea) {
  clearNotesBtn.addEventListener("click", () => {
    notesArea.value = "";
  });
}

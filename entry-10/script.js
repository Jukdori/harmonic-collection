// US TIME ---------------------------------
function updateUSTime() {
  const now = new Date();
  const options = { 
    timeZone: "America/New_York", 
    hour: "2-digit",
    minute: "2-digit"
  };
  document.getElementById("us-time").textContent =
    new Intl.DateTimeFormat("en-US", options).format(now);
}
setInterval(updateUSTime, 1000);
updateUSTime();


// FOCUS ------------------------------------
function setFocus(text) {
  document.getElementById("focus-display").textContent =
    "Current focus: " + text;
}


// TIMER -------------------------------------
let timerInterval;
let timeLeft = 1500; // 25 min

function startTimer() {
  clearInterval(timerInterval);

  document.getElementById("timer").classList.add("timer-active");

  timerInterval = setInterval(() => {
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      document.getElementById("timer").classList.remove("timer-active");
    } else {
      timeLeft--;
      document.getElementById("timer").textContent =
        formatTime(timeLeft);
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(timerInterval);
  document.getElementById("timer").classList.remove("timer-active");
}

function resetTimer() {
  clearInterval(timerInterval);
  timeLeft = 1500;
  document.getElementById("timer").textContent = "25:00";
  document.getElementById("timer").classList.remove("timer-active");
}

function formatTime(sec) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${s.toString().padStart(2,"0")}`;
}


// ENERGY BAR ----------------------------
let energy = 20;
function boostEnergy() {
  energy = Math.min(100, energy + 10);
  const bar = document.getElementById("energy-fill");
  bar.style.width = energy + "%";

  bar.classList.add("energy-bounce");
  setTimeout(() => bar.classList.remove("energy-bounce"), 250);
}
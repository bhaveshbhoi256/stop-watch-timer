// Select Elements
const stopwatchBtn = document.getElementById("stopwatch-btn");
const timerBtn = document.getElementById("timer-btn");
const stopwatchDiv = document.getElementById("stopwatch");
const timerDiv = document.getElementById("timer");

// Mode Switching
stopwatchBtn.addEventListener("click", () => switchMode("stopwatch"));
timerBtn.addEventListener("click", () => switchMode("timer"));

function switchMode(mode) {
    if (mode === "stopwatch") {
        stopwatchDiv.classList.remove("hidden");
        timerDiv.classList.add("hidden");
        stopwatchBtn.classList.add("active");
        timerBtn.classList.remove("active");
    } else {
        timerDiv.classList.remove("hidden");
        stopwatchDiv.classList.add("hidden");
        timerBtn.classList.add("active");
        stopwatchBtn.classList.remove("active");
    }
}

// ================= STOPWATCH ==================
let stopwatchTime = 0;
let stopwatchInterval;
let isStopwatchRunning = false;

const stopwatchDisplay = document.getElementById("stopwatch-display");
const startStopwatch = document.getElementById("start-stopwatch");
const pauseStopwatch = document.getElementById("pause-stopwatch");
const resetStopwatch = document.getElementById("reset-stopwatch");

function formatTime(time) {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function updateStopwatch() {
    stopwatchDisplay.innerText = formatTime(stopwatchTime);
}

// Start or Resume Stopwatch
startStopwatch.addEventListener("click", () => {
    if (!isStopwatchRunning) {
        isStopwatchRunning = true;
        startStopwatch.disabled = true; // Prevent multiple starts
        stopwatchInterval = setInterval(() => {
            stopwatchTime++;
            updateStopwatch();
        }, 1000);
    }
});

// Pause Stopwatch
pauseStopwatch.addEventListener("click", () => {
    clearInterval(stopwatchInterval);
    isStopwatchRunning = false;
    startStopwatch.disabled = false; // Allow resume
});

// Reset Stopwatch
resetStopwatch.addEventListener("click", () => {
    clearInterval(stopwatchInterval);
    isStopwatchRunning = false;
    stopwatchTime = 0;
    updateStopwatch();
    startStopwatch.disabled = false;
});

// Initialize Stopwatch Display
updateStopwatch();

// ================= TIMER ==================
let timerTime = 0;
let timerInterval;
let isTimerRunning = false;

const timerDisplay = document.getElementById("timer-display");
const timerMinutesInput = document.getElementById("timer-minutes");
const timerSecondsInput = document.getElementById("timer-seconds");
const startTimer = document.getElementById("start-timer");
const pauseTimer = document.getElementById("pause-timer");
const resetTimer = document.getElementById("reset-timer");

function updateTimerDisplay() {
    let minutes = Math.floor(timerTime / 60);
    let seconds = timerTime % 60;
    timerDisplay.innerText = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

// Start Timer
startTimer.addEventListener("click", () => {
    if (!isTimerRunning) {
        let minutes = parseInt(timerMinutesInput.value) || 0;
        let seconds = parseInt(timerSecondsInput.value) || 0;

        if (minutes < 0 || seconds < 0) {
            alert("Please enter valid non-negative values.");
            return;
        }

        timerTime = minutes * 60 + seconds;

        if (timerTime > 0) {
            updateTimerDisplay();
            isTimerRunning = true;
            startTimer.disabled = true; // Prevent multiple starts
            timerInterval = setInterval(() => {
                if (timerTime > 0) {
                    timerTime--;
                    updateTimerDisplay();
                } else {
                    clearInterval(timerInterval);
                    isTimerRunning = false;
                    startTimer.disabled = false;
                    alert("Time's up!");
                }
            }, 1000);
        }
    }
});

// Pause Timer
pauseTimer.addEventListener("click", () => {
    clearInterval(timerInterval);
    isTimerRunning = false;
    startTimer.disabled = false;
});

// Reset Timer
resetTimer.addEventListener("click", () => {
    clearInterval(timerInterval);
    isTimerRunning = false;
    timerTime = 0;
    updateTimerDisplay();
    timerMinutesInput.value = "";
    timerSecondsInput.value = "";
    startTimer.disabled = false;
});

// Initialize Timer Display
updateTimerDisplay();

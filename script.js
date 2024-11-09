let timer;
let isRunning = false;
let seconds = 0;
let minutes = 0;
let hours = 0;
let lapTimes = [];

const timeDisplay = document.getElementById('time-display');
const startStopBtn = document.getElementById('start-stop-btn');
const resetBtn = document.getElementById('reset-btn');
const lapList = document.getElementById('lap-list');

function updateTimeDisplay() {
  // Format time as hh:mm:ss
  const formattedTime = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;
  timeDisplay.textContent = formattedTime;
}

function formatTime(time) {
  return time < 10 ? `0${time}` : time;
}

function startStopwatch() {
  // Start or stop the stopwatch
  if (isRunning) {
    clearInterval(timer);  // Stop the timer
    startStopBtn.textContent = 'Start';  // Change button text
    recordLap();  // Record the lap time when the stopwatch is stopped
  } else {
    timer = setInterval(() => {
      seconds++;
      if (seconds === 60) {
        seconds = 0;
        minutes++;
      }
      if (minutes === 60) {
        minutes = 0;
        hours++;
      }
      updateTimeDisplay();
    }, 1000);
    startStopBtn.textContent = 'Stop';  // Change button text to 'Stop'
  }
  isRunning = !isRunning;
}

function resetStopwatch() {
  // Stop the stopwatch if running
  clearInterval(timer);
  isRunning = false;
  seconds = 0;
  minutes = 0;
  hours = 0;
  updateTimeDisplay();
  startStopBtn.textContent = 'Start';
  lapTimes = [];
  lapList.innerHTML = '';  // Clear the lap times list
}

function recordLap() {
  // Record current time as a lap when the stopwatch is stopped
  const lapTime = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;
  lapTimes.push(lapTime);  // Store the lap time in the lapTimes array

  // Display the lap time in the list
  const lapItem = document.createElement('li');
  lapItem.textContent = lapTime;
  lapList.appendChild(lapItem);
}

// Event listeners
startStopBtn.addEventListener('click', startStopwatch);
resetBtn.addEventListener('click', resetStopwatch);

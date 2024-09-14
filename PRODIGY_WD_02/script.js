let hours = 0;
let minutes = 0;
let seconds = 0;
let milliseconds = 0;
let interval;
let isRunning = false;
let laps = [];

const hoursDisplay = document.getElementById('hours');
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const millisecondsDisplay = document.getElementById('milliseconds');
const startBtn = document.getElementById('startBtn');
const lapBtn = document.getElementById('lapBtn');
const resetBtn = document.getElementById('resetBtn');
const lapsList = document.getElementById('lapsList');

startBtn.addEventListener('click', () => {
    if (!isRunning) {
        isRunning = true;
        startBtn.textContent = 'Stop';
        interval = setInterval(updateTime, 10);
    } else {
        isRunning = false;
        startBtn.textContent = 'Start';
        clearInterval(interval);
    }
});

lapBtn.addEventListener('click', () => {
    if (isRunning) {
        const currentLapTime = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}:${pad(Math.floor(milliseconds / 10))}`;
        laps.push(currentLapTime);
        displayLaps();
    }
});

resetBtn.addEventListener('click', () => {
    clearInterval(interval);
    hours = 0;
    minutes = 0;
    seconds = 0;
    milliseconds = 0;
    isRunning = false;
    laps = [];
    startBtn.textContent = 'Start';
    updateDisplay();
    lapsList.innerHTML = "";
});

function updateTime() {
    milliseconds += 10;

    if (milliseconds >= 1000) {
        milliseconds = 0;
        seconds += 1;
    }
    if (seconds >= 60) {
        seconds = 0;
        minutes += 1;
    }
    if (minutes >= 60) {
        minutes = 0;
        hours += 1;
    }

    updateDisplay();
}

function updateDisplay() {
    hoursDisplay.textContent = pad(hours);
    minutesDisplay.textContent = pad(minutes);
    secondsDisplay.textContent = pad(seconds);
    millisecondsDisplay.textContent = pad(Math.floor(milliseconds / 10));
}

function displayLaps() {
    lapsList.innerHTML = "";
    laps.forEach((lap, index) => {
        const lapItem = document.createElement("li");
        lapItem.textContent = `Lap ${index + 1}: ${lap}`;
        lapsList.appendChild(lapItem);
    });
}

function pad(number) {
    return number < 10 ? "0" + number : number;
}

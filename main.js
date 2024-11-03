let startTime, elapsedTime = 0, timerInterval;

function startStopwatch() {
  if (timerInterval) {clearInterval(timerInterval)}  //prevents multiple intervals overlapping if you press start more than once
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(() => {
    elapsedTime = Date.now() - startTime;
    updateDisplay();
  }, 10); 
}

function stopStopwatch() {
  clearInterval(timerInterval);
}

function resetStopwatch() {
  clearInterval(timerInterval);
  elapsedTime = 0;
  updateDisplay();
}

function updateDisplay() {
  const time = new Date(elapsedTime);
  const formattedTime = formatTime(time);
  document.getElementById("display").textContent = formattedTime;
}

function formatTime(time) {
  const hours = time.getUTCHours().toString().padStart(2, '0');
  const minutes = time.getUTCMinutes().toString().padStart(2, '0');
  const seconds = time.getUTCSeconds().toString().padStart(2, '0');
  const milliseconds = time.getUTCMilliseconds().toString().slice(0, 2).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

//let user define how many intervals they wish to do
//let user define the length of an interval, of potentially different lengths (rest interval, work interval)
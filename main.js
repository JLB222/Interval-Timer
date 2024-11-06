let startTime, elapsedTime = 0, timerInterval;

let userHours, userMinutes, userSeconds, userIntervals, currentInterval, totalUserTime

function chooseInterval() {
  userIntervals = document.getElementById('userChosenIntervals').value || 0
  userHours = document.getElementById('userChosenHours').value || 0
  userMinutes = document.getElementById('userChosenMinutes').value || 0
  userSeconds = document.getElementById('userChosenSeconds').value || 0
  totalUserTime = (userHours * 3600000) + (userMinutes * 60000) + (userSeconds * 1000)
  console.log(`${userIntervals} ${userIntervals == 1 ? 'interval': 'intervals'} of ${totalUserTime.toLocaleString()} milliseconds`)
}

function resetInterval() {
  userIntervals = 0
  userHours = 0
  userMinutes = 0
  userSeconds = 0
  totalUserTime = 0
  document.getElementById('userChosenIntervals').value = ""
  document.getElementById('userChosenHours').value = ""
  document.getElementById('userChosenMinutes').value = ""
  document.getElementById('userChosenSeconds').value = ""
}

function startStopwatch() {
  if (timerInterval) {clearInterval(timerInterval)}  //prevents multiple intervals overlapping if you press start more than once
  startTime = Date.now() - elapsedTime;  //a value in milliseconds
  timerInterval = setInterval(() => {
    elapsedTime = Date.now() - startTime;
    if (elapsedTime >= totalUserTime) {  //it's '>=' because '==' often failed to increment, probably due to the passed milliseconds not perfectly lining up with user defined time due to the interval() not firing EXACTLY every 10 milliseconds
      console.log('Incrementing')
      startTime = Date.now()
    };
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

//need to find a way to increment intervals.  Current setup bugs out if userTime is ever 0, which we set it to when we reset or confirm.
let startTime, elapsedTime = 0, timerInterval;
let userHours, userMinutes, userSeconds, userChosenIntervals, currentInterval = 0, totalUserTime

const beep = new Audio('sounds/beep-104060.mp3'); // Replace with your sound file path

function chooseInterval() {
  userChosenIntervals = document.getElementById('userChosenIntervals').value || 0
  userHours = document.getElementById('userChosenHours').value || 0
  userMinutes = document.getElementById('userChosenMinutes').value || 0
  userSeconds = document.getElementById('userChosenSeconds').value || 0
  totalUserTime = (userHours * 3600000) + (userMinutes * 60000) + (userSeconds * 1000) || undefined  //if all inputs are 0, set to undefined so that elapsedTime is never greater nor less than totalUserTime (so the stopwatch doesn't bug out)
  currentInterval = 0
  resetStopwatch()
  console.log(`${userChosenIntervals} ${userChosenIntervals == 1 ? 'interval': 'intervals'} of ${totalUserTime?.toLocaleString()} milliseconds`)
}

//remove?
// function resetInterval() {
//   userChosenIntervals = 0
//   userHours = 0
//   userMinutes = 0
//   userSeconds = 0
//   totalUserTime = 0
//   currentInterval = 0
//   document.getElementById('userChosenIntervals').value = ""
//   document.getElementById('userChosenHours').value = ""
//   document.getElementById('userChosenMinutes').value = ""
//   document.getElementById('userChosenSeconds').value = ""
// }


function startStopwatch() {
  if (timerInterval) {clearInterval(timerInterval)}  //prevents multiple intervals overlapping if you press start more than once
  startTime = Date.now() - elapsedTime;  //a value in milliseconds
  timerInterval = setInterval(() => {
    elapsedTime = Date.now() - startTime;
    if (elapsedTime >= totalUserTime) {  //it's '>=' because '==' often failed to increment, probably due to the passed milliseconds not perfectly lining up with user defined time due to the interval() not firing EXACTLY every 10 milliseconds
      startTime = Date.now()
      currentInterval++
      beep.play()
      console.log(`Current interval: ${currentInterval}`)
      if (currentInterval == userChosenIntervals) {
        resetStopwatch()
      }
    };
    updateDisplay();
  }, 40); 
}

function stopStopwatch() {
  clearInterval(timerInterval);
}

function resetStopwatch() {
  clearInterval(timerInterval);
  elapsedTime = 0;
  currentInterval = 0
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
  return `${currentInterval}---${hours}:${minutes}:${seconds}.${milliseconds}`;
}

//let user define how many intervals they wish to do
//let user define the length of an interval, of potentially different lengths (rest interval, work interval)

//need to find a way to increment intervals.  Current setup bugs out if userTime is ever 0, which we set it to when we reset or confirm.
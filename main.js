let startTime, elapsedTime = 0, timerInterval;
let userWorkHours, userWorkMinutes, userWorkSeconds, intervalsCompleted, totalUserWorkTime, totalUserRestTime
let workInterval = true, restInterval = false;
let userChosenWorkIntervals, userChosenRestIntervals
let userRestHours, userRestMinutes, userRestSeconds

const beep = new Audio('sounds/beep-104060.mp3'); // Replace with your sound file path

function chooseInterval() {
  userChosenWorkIntervals = document.getElementById('userChosenWorkIntervals').value || 0
  userWorkHours = document.getElementById('userChosenWorkHours').value || 0
  userWorkMinutes = document.getElementById('userChosenWorkMinutes').value || 0
  userWorkSeconds = document.getElementById('userChosenWorkSeconds').value || 0
  
  userRestHours = document.getElementById('userChosenRestHours').value || 0
  userRestMinutes = document.getElementById('userChosenRestMinutes').value || 0
  userRestSeconds = document.getElementById('userChosenRestSeconds').value || 0

  totalUserWorkTime = (userWorkHours * 3600000) + (userWorkMinutes * 60000) + (userWorkSeconds * 1000) || undefined  //if all inputs are 0, set to undefined so that elapsedTime is never greater nor less than totalUserWorkTime (so the stopwatch doesn't bug out)
  totalUserRestTime = (userRestHours * 3600000) + (userRestMinutes * 60000) + (userRestSeconds * 1000) || undefined
  intervalsCompleted = 0
  resetStopwatch()
  console.log(`${userChosenWorkIntervals} ${userChosenWorkIntervals == 1 ? 'interval': 'intervals'} of ${totalUserWorkTime?.toLocaleString()} milliseconds`)
}


function startStopwatch() {
  if (timerInterval) {clearInterval(timerInterval)}  //prevents multiple intervals overlapping if you press start more than once
  startTime = Date.now() - elapsedTime;  //a value in milliseconds
  timerInterval = setInterval(() => {
    elapsedTime = Date.now() - startTime;
    if (workInterval) {
      if (elapsedTime >= totalUserWorkTime) {  //it's '>=' because '==' often failed to increment, probably due to the passed milliseconds not perfectly lining up with user defined time due to the interval() not firing EXACTLY every 10 milliseconds
        startTime = Date.now()
        intervalsCompleted++
        beep.play()
        console.log(`Intervals Completed: ${intervalsCompleted}`)
        totalUserRestTime ? workInterval = false : null  //if user has chosen a rest interval, this will switch the code to 'rest mode' by switching workInterval to false, running the else code that does not increment the interval counter
        if (intervalsCompleted == userChosenWorkIntervals) {
          resetStopwatch()
        }
      };
    } else {
      if (elapsedTime >= totalUserRestTime) {  //it's '>=' because '==' often failed to increment, probably due to the passed milliseconds not perfectly lining up with user defined time due to the interval() not firing EXACTLY every 10 milliseconds
        startTime = Date.now()
        beep.play()
        console.log(`Rest time is over, get back to work!`)
        workInterval = true  //will end 'rest mode' by making workInterval true again, ensuring the next interval is incremented
      };
    }
    updateDisplay();
  }, 40); 
}

function stopStopwatch() {
  clearInterval(timerInterval);
}

function resetStopwatch() {
  clearInterval(timerInterval);
  elapsedTime = 0;
  intervalsCompleted = 0
  workInterval = true
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
  return `${intervalsCompleted}---${hours}:${minutes}:${seconds}.${milliseconds}`;
}

//rest beeps that are different from workout beeps, so user knows by sound where they're at
//final (different) beep for end of workout
const INITIAL_MINUTE = 0;
const INITIAL_SECOND = 5;

let mainTimer = document.querySelector('.main-timer');

function Time(minutes = INITIAL_MINUTE, seconds = INITIAL_SECOND) {
    this.initialMinutes = minutes
    this.initialSeconds = seconds    
    this.minutes = minutes;
    this.seconds = seconds;
    this.passing = false;
    this.state   = null;
}

Time.prototype.getTime = function () {
    let time = "";
    if (this.minutes < 10)
        time += '0' + this.minutes;
    else
        time += this.minutes
    time += ':';
    if (this.seconds < 10)
        time += '0' + this.seconds;
    else
        time += this.seconds;
    return time;
}
Time.prototype.setTimeUp = function () {
    this.minutes++;
}
Time.prototype.setTimeDown = function () {
    this.minutes--;
}
Time.prototype.timePass = function () {
    if (this.minutes == 0 && this.seconds == 0)
        return;
    if (this.seconds == 0) {
        this.minutes--;
        this.seconds = 59;
    }
    else
        this.seconds--;
}
Time.prototype.timePassing = function(){
    if(!this.passing)
    {
        this.state = setInterval(this.timePass.bind(time), 1000);
        this.passing = true;
    }
}
Time.prototype.stopTimer = function(){
    if(this.passing)
    {
        clearInterval(this.state);
        this.passing = false;
        this.state   = null;
        
    }
}
Time.prototype.resetTimer = function(){
    this.minutes = this.initialMinutes;
    this.seconds = this.initialSeconds;
    this.stopTimer();
}

function changeMainTime(value) {
    mainTimer.textContent = value;
}

let time = new Time(1, 1);
changeMainTime(time.getTime()); // sets times in the beginning
setInterval(()=>changeMainTime(time.getTime()) , 1000) // check the value of the time every 1 second and update it






const buttons = document.querySelectorAll('.buttons button');
buttons.forEach(button => button.addEventListener('click', (e) => {
         
    if (button.classList.value == 'start') {
        time.timePassing();
    }
    else if (button.classList.value == 'stop')
    {
        time.stopTimer();
    }
    else if (button.classList.value == 'reset')
    {    
        time.resetTimer();
    }
})
);





const INITIAL_POM_MIN = 0;
const INITIAL_POM_SEC = 7;
const INITIAL_BREAK_MIN = 0;
const INITIAL_BREAK_SEC = 5;

let mainTime  = document.querySelector('.main-timer');
let pomTime   = document.querySelector('.changer-pomodoro p');
let breakTime = document.querySelector('.changer-break p');
let title     = document.querySelector('header h1');

function Time(minutes = 0, seconds = 0) {
    this.minutes = minutes;
    this.seconds = seconds;
    this.passing = false;
    this.state = null;
    this.which = 'res';
    this.whichPaused = '';
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
Time.prototype.timePass = function () {
    if (this.minutes == 0 && this.seconds == 0)
    {
        if(this.which == 'pom')
        {
            this.minutes = pomodoro.break.minutes;
            this.seconds = pomodoro.break.seconds;
            this.which   = 'brk'
            console.log('asd');
            
        }
        else if(this.which == 'brk')
        {
            this.minutes = pomodoro.pom.minutes;
            this.seconds = pomodoro.pom.seconds;
            this.which   = 'pom'
            console.log('hue');
        }        
        return;
    }
    if (this.seconds == 0) {
        this.minutes--;
        this.seconds = 59;
    }
    else
        this.seconds--;
}

Time.prototype.timePassing = function () {
    if (!this.passing) {
        this.state = setInterval(this.timePass.bind(this), 1000);
        this.passing = true;
    }
}
Time.prototype.stopTimer = function () {
    if (this.passing) {
        clearInterval(this.state);
        this.passing = false;
        this.state = null;

    }
}
Time.prototype.resetTimer = function (initial) {
    this.minutes = initial.minutes;
    this.seconds = initial.seconds;
    this.stopTimer();
}

Time.prototype.timeUp = function(){
    if(this.minutes == 99)
        return 
    this.minutes++;
}
Time.prototype.timeDown = function(){
    if(this.minutes == 0)
        return 
    this.minutes--;
}


function Pomodoro() {
    this.text = 'Pomodoro Technique';
    this.initial = new Time(INITIAL_POM_MIN, INITIAL_POM_SEC)
    this.actual = new Time(INITIAL_POM_MIN, INITIAL_POM_SEC)

    this.break = new Time(INITIAL_BREAK_MIN, INITIAL_BREAK_SEC)
    this.pom = new Time(INITIAL_POM_MIN, INITIAL_POM_SEC)

}

function changeMainTime(value) {
    mainTime.textContent = value;
}
function changePomTime(value) {
    pomTime.textContent = value;
}
function changeBreakTime(value) {
    breakTime.textContent = value;
}
function changeTitle(pomodoro){
    if(pomodoro.actual.which == 'res'){
        pomodoro.text =  'Pomodoro Technique';
    }
    else if(pomodoro.actual.which == 'pom'){
        pomodoro.text = 'Study time!'
    }
    else if(pomodoro.actual.which == 'pau'){
        pomodoro.text =  'Paused';
    }
    else if(pomodoro.actual.which == 'brk'){
        pomodoro.text =  'Break Time!';
    }
    
    title.textContent = pomodoro.text;
}

function updateTimes(pomodoro){
    changeMainTime(pomodoro.actual.getTime())
    changePomTime(pomodoro.pom.getTime())
    changeBreakTime(pomodoro.break.getTime())
    changeTitle(pomodoro);

}

let pomodoro = new Pomodoro(1, 1);

// Sets times in the begining
changeMainTime(pomodoro.initial.getTime());
changePomTime(pomodoro.pom.getTime());
changeBreakTime(pomodoro.break.getTime());



setInterval(() => updateTimes(pomodoro), 100) // check the value of the time every 0.2 second and update it


/*************   Events  *****************/
const buttons = document.querySelectorAll('.buttons button');
buttons.forEach(button => button.addEventListener('click', (e) => {

    if (button.classList.value == 'start') {
        pomodoro.actual.timePassing();
        if(pomodoro.actual.which == 'pau')
        pomodoro.actual.which = pomodoro.actual.whichPaused;
        else 
            pomodoro.actual.which = 'pom'
    }
    else if (button.classList.value == 'stop') {
        pomodoro.actual.whichPaused = pomodoro.actual.which;
        pomodoro.actual.which = 'pau';
        pomodoro.actual.stopTimer();
    }
    else if (button.classList.value == 'reset') {
        pomodoro.actual.which = 'res'
        pomodoro.actual.resetTimer(pomodoro.pom);
    }
})
);

const changeButtons = document.querySelectorAll('.changers img')
changeButtons.forEach(change => change.addEventListener('click', (e) => {
    if (change.id == 'up-pom') {
        pomodoro.pom.timeUp();
        pomodoro.actual.resetTimer(pomodoro.pom);
    }
    else if (change.id == 'down-pom') {
        pomodoro.pom.timeDown();
        pomodoro.actual.resetTimer(pomodoro.pom);
    }
    else if (change.id == 'up-brk') {
        pomodoro.break.timeUp();
    }
    else if (change.id == 'down-brk') {
        pomodoro.break.timeDown();
    }

}))





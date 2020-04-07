const INITIAL_MINUTE = 0;
const INITIAL_SECOND = 5;


function Time(minutes=INITIAL_MINUTE, seconds=INITIAL_SECOND){
    this.minutes = minutes;
    this.seconds = seconds;
}

Time.prototype.getTime = function(){
    console.log(this.minutes+':'+this.seconds)
}
Time.prototype.setTimeUp = function(){
    this.minutes++;
}
Time.prototype.setTimeDown = function(){
    this.minutes--;
}
Time.prototype.timePass = function(){
    if(this.minutes == 0 && this.seconds == 0)
        return 
    if(this.seconds == 0)
    {
        this.minutes--;
        this.seconds = 59;
    }  
    else
        this.seconds--;
    this.getTime()
    
}

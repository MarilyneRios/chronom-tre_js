const chrono = document.getElementById("chrono");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const resetBtn = document.getElementById("resetBtn");

//Variables pour le temps qui défile
let hours = 0;
let min = 0;
let sec = 0;

let timeout;
let isStop = true;

const start = () => {
    if(isStop){
        isStop = false;
        timeRunning();
    }
}

const stop = () => {
    if(!isStop){
        isStop = true;
        clearTimeout(timeout); //annule le délai
    }
}

const timeRunning = () => {
    if(isStop) return; //protection 
    // convertir en nb entier pour avoir 00
    sec = parseInt(sec);
    min = parseInt(min);
    hours = parseInt(hours);

    sec++;

    if(sec === 60){
        min++;
        sec =0;
    }

    if(min === 60){
        hours++;
        min = 0;
    }
    // affichage 00 donc si <10 alors ajoute 0 devant
    let timeUnits = {sec, min, hours};

    for (let unit in timeUnits) {
        if (timeUnits[unit] < 10) {
            timeUnits[unit] = "0" + timeUnits[unit];
        }
    }
    
    sec = timeUnits.sec;
    min = timeUnits.min;
    hours = timeUnits.hours;

    chrono.textContent = `${hours}:${min}:${sec}`;

    timeout = setTimeout(timeRunning, 1000);
};

const reset = () => {
    chrono.textContent = "00:00:00";
    isStop = true;
    hours = 0;
    min = 0;
    sec = 0;
    clearTimeout(timeout);
};

startBtn.addEventListener("click", start);
stopBtn.addEventListener("click", stop);
resetBtn.addEventListener("click", reset);

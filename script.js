let [milliseconds,seconds,minutes,hours] = [0,0,0,0];
let timerRef = document.getElementById('timer');
let int = null;
let counter = 0;
let resetBtn = document.getElementById('resetTimer');
let splitBtn = document.getElementById('splitTimer');
splitBtn.disabled = true;
resetBtn.disabled = true;
let startBtn = document.getElementById('startTimer');
let table = document.getElementById('table');
let lastClick = document.getElementById('lastClick');
let hoursSpan = document.getElementById('hours');
let minutesSpan = document.getElementById('minutes');
let secondsSpan = document.getElementById('seconds');
let millisecondsSpan = document.getElementById('milliseconds');
let sMillisecondsSpan = document.getElementById('sMilliseconds');
/*let counting = document.getElementById('counting');
let timing = document.getElementById('timing');
let typing = document.getElementById('typing');*/
let logTable = [];
let finalResult = '';

function displayList(logTable){
    let row;
    if(logTable.length>0){ 
        let n = logTable.length-1;
        /*counting.innerHTML += "# "+logTable[n].count+'<br>';
        timing.innerHTML +=  logTable[n].time+'<br>';
        typing.innerHTML += logTable[n].type+'<br>';*/
        if(logTable[n].type==='Pause'){
            row = `<tr>
                <td style="color:#848585;"># ${logTable[n].count}&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;</td>
                <td style="color:#FA839A;">${logTable[n].time}&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;</td>
                <td style="color:#B7B7B8;">${logTable[n].type}&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;</td>
                </tr><br>`; 
        }
        else{
            row = `<tr>
                <td style="color:#848585;"># ${logTable[n].count}&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;</td>
                <td style="color:#F3B357;">${logTable[n].time}&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;</td>
                <td style="color:#B7B7B8;">${logTable[n].type}&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;</td>
                </tr><br>`;
        } 
        table.innerHTML += row;
        lastClick.innerHTML = logTable[n].time;
    }
    else{
        
        table.innerHTML = '';
        logTable = [];
        counter = 0;

    }
}
startBtn.addEventListener('click', ()=>{
    if(startBtn.innerText==='Start'){
        startBtn.innerText = 'Stop';
        startBtn.style.backgroundColor = "#FB657F";
        startBtn.style.border = "2px solid #db576d";
        splitBtn.removeAttribute("disabled");
        if(!splitBtn.disabled){
            splitBtn.style.background = "#F29E26";
            splitBtn.style.border = "2px solid #d38c28";
            splitBtn.style.color = "white";
        }
        resetBtn.setAttribute("disabled","disabled");
        
        if(resetBtn.disabled){
            resetBtn.style.backgroundColor = null;
            resetBtn.style.border = null;
            resetBtn.style.color = null;
        }
        if(int!==null){
            clearInterval(int);
        }
        int = setInterval(displayTimer,10);
    }
    else if(startBtn.innerText==='Stop'){
        splitBtn.setAttribute("disabled","disabled");
        
        if(splitBtn.disabled){
            splitBtn.style.backgroundColor = null;
            splitBtn.style.border = null;
            splitBtn.style.color = null;
        }
        resetBtn.removeAttribute("disabled");
        if(!resetBtn.disabled){
            resetBtn.style.background = "#4487D0";
            resetBtn.style.border = "2px solid #3d77b5";
            resetBtn.style.color = "white";
        }
        startBtn.innerText = 'Start';
        startBtn.style.backgroundColor = "#18A69D";
        startBtn.style.border = "2px solid #1b847d";
        clearInterval(int);
        counter++;
        logTable.push({
            time: finalResult,
            count: counter,
            type: 'Pause'
        });
        displayList(logTable);
        
         
          
    }
});

splitBtn.addEventListener('click', ()=>{
    counter++;
    logTable.push({
        time: finalResult,
        count: counter,
        type: 'Split'
    });
    
    displayList(logTable);
});

resetBtn.addEventListener('click', ()=>{
    clearInterval(int);
    resetBtn.setAttribute("disabled","disbaled");
    splitBtn.setAttribute("disabled","disbaled");
    if(resetBtn.disabled){
        resetBtn.style.backgroundColor = null;
        resetBtn.style.border = null;
        resetBtn.style.color = null;
    }
    if(splitBtn.disabled){
        splitBtn.style.backgroundColor = null;
        splitBtn.style.border = null;
        splitBtn.style.color = null;
    }
    [milliseconds,seconds,minutes,hours] = [0,0,0,0];
    hoursSpan.innerHTML = '00';
    minutesSpan.innerHTML = '00';
    secondsSpan.innerHTML = '00';
    millisecondsSpan.innerHTML = '0';
    sMillisecondsSpan.innerHTML = '00';
    lastClick.innerHTML = 'SPLIT TIME';
    logTable = [];
    displayList(logTable);
});

function displayTimer(){
    milliseconds+=10;
    if(milliseconds == 1000){
        milliseconds = 0;
        seconds++;
        if(seconds == 60){
            seconds = 0;
            minutes++;
            if(minutes == 60){
                minutes = 0;
                hours++;
            }
        }
    }

 let h = hours < 10 ? "0" + hours : hours;
 let m = minutes < 10 ? "0" + minutes : minutes;
 let s = seconds < 10 ? "0" + seconds : seconds;
 let ms = milliseconds < 10 ? "00" + milliseconds : milliseconds < 100 ? "0" + milliseconds : milliseconds;
 
 let msTemp = JSON.stringify(ms);
 if(ms.length===3)
    msTemp = "100";
 

 hoursSpan.innerHTML = h;
 minutesSpan.innerHTML = m;
 secondsSpan.innerHTML = s;
 millisecondsSpan.innerHTML = msTemp[0];
 sMillisecondsSpan.innerHTML = msTemp[1]+msTemp[2];
 finalResult = `${h}:${m}:${s}.${ms}`;
 //timerRef.innerHTML = finalResult;
 
}
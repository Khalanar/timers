var ss = {
  "oldParams": true,
  "wave_type": 0,
  "p_env_attack": 0,
  "p_env_sustain": 0.19999998807907104,
  "p_env_punch": 0.5095768570899963,
  "p_env_decay": 0.4309997260570526,
  "p_base_freq": 0.47534438967704773,
  "p_freq_limit": 0,
  "p_freq_ramp": 0,
  "p_freq_dramp": 0,
  "p_vib_strength": 0,
  "p_vib_speed": 0,
  "p_arp_mod": 0.5110872387886047,
  "p_arp_speed": 0.5925410389900208,
  "p_duty": 0,
  "p_duty_ramp": 0,
  "p_repeat_speed": 0,
  "p_pha_offset": 0,
  "p_pha_ramp": 0,
  "p_lpf_freq": 1,
  "p_lpf_ramp": 0,
  "p_lpf_resonance": 0,
  "p_hpf_freq": 0,
  "p_hpf_ramp": 0,
  "sound_vol": 0.08,
  "sample_rate": 44100,
  "sample_size": 8
}

var s = new SoundEffect(ss).generate();

function formattedDate(){
    const d = new Date()
    let hh = d.getHours()
    let mm = d.getMinutes()
    let ss = d.getSeconds()
    
    document.getElementById("hh").innerHTML = leadingZero(hh)
    document.getElementById("mm").innerHTML = leadingZero(mm)
    document.getElementById("ss").innerHTML = leadingZero(ss)
}

function leadingZero(n){
    let formattedN = n < 10 ? `0${n.toString()}` : n.toString()
    return formattedN
}

var alertTime
var clockTime

var timerActive = [false, false]

var monthName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"]

function start(){

}

function triggerAlarm(){
    if ($("#clock-container").hasClass("event-triggered") == false && $("#ss").text() == "00"){
        $("#clock-container").addClass("event-triggered")
        $("#clock-container").removeClass("normal")
    }
}

function resetAlarm(){
    if ($("#clock-container").hasClass("event-triggered")){
        $("#clock-container").removeClass("event-triggered")
        $("#clock-container").addClass("normal")
    }
}

function update(){
    formattedDate()
    calculateTimerProgress()
    alertTime = $('#inputHH').val() + $('#inputMM').val()
    clockTime = $('#hh').text() + $('#mm').text()
    // console.log(`Clock: ${clockTime} ${typeof(clockTime)} - Target ${alertTime} ${typeof(alertTime)}`)
    showWeekNumber()
    showDate()
    
    if (alertTime == clockTime){
        triggerAlarm()
    }
}

function formatInputLeadingZero(ele){
    ele.value = leadingZero(ele.value)
    console.log(ele.innerText)
}

function setMessage(){
    let messages = [
        "Don’t be an asshole",
        "Put the company first",
        "Show humility, not entitlement",
        "Assume positive intent",
        ]
    let randomMessageIndex = Math.floor(Math.random() * messages.length);
    document.getElementById("message").innerText = messages[randomMessageIndex]
}


function startTimer(ele){
    var child = ele.currentTarget.firstElementChild
    timerIndex = child.id.split("timer")[1]
    child.style.width = "0%";
    child.style.backgroundColor = "#009688";
    timerActive[timerIndex] = true;
    timerStartTime[timerIndex] = Date.now()
}

const timers = [
    document.getElementById("timer-container-0"),
    document.getElementById("timer-container-1"),
    document.getElementById("timer-container-2"),
]

var timerStartTime = [0, 0]

for (let i=0; i<timers.length; i++){
    timers[i].addEventListener("click", startTimer, false)
}


function calculateTimerProgress(){
    for (let i=0; i<timers.length; i++){
        var child = timers[i].firstElementChild
        if (timerActive[i]){
            let elapsed = Date.now() - timerStartTime[i]
            child.style.width = `${(Date.now() - timerStartTime[i])/2400}%`
            if ((Date.now() - timerStartTime[i])/2400 >= 100){
                timerActive[i] = false
            }else if(elapsed > 3*60*1000 && elapsed < 3*60*1000+600){
                child.style.backgroundColor = "#e53935"
                s.getAudio().play();
            }
        }
    }
}


// This script is released to the public domain and may be used, modified and
// distributed without restrictions. Attribution not necessary but appreciated.
// Source: https://weeknumber.com/how-to/javascript

// Returns the ISO week of the date.
Date.prototype.getWeek = function() {
  var date = new Date(this.getTime());
  date.setHours(0, 0, 0, 0);
  // Thursday in current week decides the year.
  date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
  // January 4 is always in week 1.
  var week1 = new Date(date.getFullYear(), 0, 4);
  // Adjust to Thursday in week 1 and count number of weeks from date to week1.
  return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000
                        - 3 + (week1.getDay() + 6) % 7) / 7);
}

// Returns the four-digit year corresponding to the ISO week of the date.
Date.prototype.getWeekYear = function() {
  var date = new Date(this.getTime());
  date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
  return date.getFullYear();
}

function showWeekNumber(){
    let date = new Date()
    let weekNumberElement = document.getElementById("week-number")
    weekNumberElement.innerText = date.getWeek()
}

function showDate(){
    let date = new Date()
    let dateMonth = document.getElementById("date-month")
    dateMonth.innerText = `${monthName[date.getMonth()]}`
    
    let dateDay = document.getElementById("date-day")
    dateDay.innerText = `${date.getDate()}`
}


start()
update()
setMessage()

var u = setInterval(update, 500)
var m = setInterval(setMessage, 600000)
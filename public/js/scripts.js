//declare global vars
var on
var off
var audio
var yellowButton
var greenButton
var redButton
//onload
document.addEventListener('DOMContentLoaded',function(event) {
  on = document.getElementsByClassName('switch-on')[0];
  off = document.getElementsByClassName('switch-off')[0];
  score = document.getElementsByClassName('score-text')[0];
  yellowButton = document.getElementsByClassName('yellow')[0];
  greenButton = document.getElementsByClassName('green')[0];
  redButton = document.getElementsByClassName('red')[0];

//add event listeners for functions that will turn things on and off
  on.addEventListener('click', toggleOn);
  off.addEventListener('click', toggleOff);

})


//functions will turn the thing on
var toggleOn = function(event) {
  if(on.style.display !== 'none') {
    event.target.style.display = 'none';
    off.style.display = 'block';
    score.style.color = '#dc0d29'
  }
}

//functions will turn the thing off
var toggleOff = function(event) {
  if(off.style.display == 'block') {
    off.style.display = 'none';
    on.style.display = 'block'
    score.style.color = '#32050c'
  }
}

//make noise on click
function playYellowSound() {
  if(off.style.display == 'block'){
    var audio = new Audio('../sounds/simonSoundYellow.mp3');
    audio.play();
    audio.addEventListener('ended',() => {
      yellowButton.style.backgroundColor = "#cba60c"
    })
    yellowButton.style.backgroundColor = "#E0B60D"
  }
}

function playGreenSound() {
  if(off.style.display == 'block') {
    var audio = new Audio('../sounds/simonSound2.mp3');
    audio.play();
    audio.addEventListener('ended', () => {
      greenButton.style.backgroundColor = "#03a64b"
    })
    greenButton.style.backgroundColor = "#03C65B"
  }
}

function playRedSound() {
  if(off.style.display == 'block') {
    var audio = new Audio('../sounds/simonSound3.mp3');
    audio.play();
    audio.addEventListener('ended', () => {
      redButton.style.backgroundColor = "#9c121c"
    })
    redButton.style.backgroundColor = "#DB1A27"
  }
}

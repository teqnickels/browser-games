//declare global vars
var on
var off

//onload
document.addEventListener('DOMContentLoaded',function(event) {
  on = document.getElementsByClassName('switch-on')[0];
  off = document.getElementsByClassName('switch-off')[0];

//add event listeners for functions that will turn things on and off
  on.addEventListener('click', toggleOn);
  off.addEventListener('click', toggleOff);
})

//functions will turn the thing on
var toggleOn = function(event) {
  if(on.style.display !== 'none') {
    event.target.style.display = 'none';
    off.style.display = 'block';
  }
}

//functions will turn the thing off
var toggleOff = function(event) {
  if(off.style.display == 'block') {
    off.style.display = 'none';
    on.style.display = 'block'
  }
}

//=====================================================================
// 2 user clicks square to play the marker
// 3 computer switches x/o
// 4 next user plays
// 5 if win, alert
// 6 user can clear board on click
//=======================================================================

document.addEventListener('DOMContentLoaded',function(event) {
  event.preventDefault()
})

document.addEventListener('click', play())


//random selector
var marker

var startGame = function() {
marker = xo[Math.floor(Math.random() * xo.length)];
document.getElementsByClassName("turn-announcer")[0].innerHTML= marker + " play"
}

function play() {
  return document.getElementsByClassName("box").inner = marker
}

function switchMarker() {
  if(marker = 'x') {
    marker = 'o'
  }
  if(marker = 'o') {
    marker = 'x'
  }
  play()
}

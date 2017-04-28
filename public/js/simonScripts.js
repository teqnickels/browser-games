//================================================================================
// 1 start the game
// 2 computer selects the color
// 3 user turn begins
// 4 user selects a color
// 5 match the user's color with computer's color
// 6a if it is match repeat step 2
// 6b if it doesnt match show the message 'you lost'
//================================================================================
// ================================= declare global vars =========================
var on
var off
var audio
var yellowButton
var greenButton
var redButton
var blueButton
var start
on = document.getElementsByClassName('switch-on')[0];
off = document.getElementsByClassName('switch-off')[0];
score = document.getElementsByClassName('score-text')[0];
yellowButton = document.getElementsByClassName('yellow')[0];
greenButton = document.getElementsByClassName('green')[0];
redButton = document.getElementsByClassName('red')[0];
blueButton = document.getElementsByClassName('blue')[0];
start = document.getElementsByClassName('start-button')[0];

//================================ onload ========================================
document.addEventListener('DOMContentLoaded',function(event) {
  event.preventDefault()

  on.addEventListener('click', toggleOn);
  off.addEventListener('click', toggleOff);
})

//=========================== Turn Game On =====================================
var toggleOn = function(event) {
  if(on.style.display !== 'none') {
    event.target.style.display = 'none';
    off.style.display = 'block';
    score.style.color = '#dc0d29'
  }
}

//========================= Turn Game Off ===========================================
var toggleOff = function(event) {
  if(off.style.display == 'block') {
    off.style.display = 'none';
    on.style.display = 'block'
    score.style.color = '#32050c'
    // *** pop off anything in the gamesPattern Array ***
  }
}
//===================== Store Patterns & Score ==============================
var playersPattern = [];
var gamesPattern = [];
var playersScore = 0
//====================== Game Buttons ===============================
sounds = {
  yellow : function(player) {
    console.log('PLAYERS PATTERN', playersPattern.length);
    console.log('GAMES PATTERN', gamesPattern.length);
    console.log('arguments::', arguments);

    if(off.style.display == 'block'){
      var audio = new Audio('../sounds/simonSoundYellow.mp3');
      audio.play();
      audio.addEventListener('ended',() => {
        yellowButton.style.backgroundColor = "#cba60c"
      })
      yellowButton.style.backgroundColor = "#F9D339"
    }
    if(player) {
      playersPattern.push('yellow')//*trying this*
      processPlayersTurn()
    }
  },

  green: function(player) {
    console.log('PLAYERS PATTERN', playersPattern.length);
    console.log('GAMES PATTERN', gamesPattern.length);
    console.log('arguments::', arguments);

    if(off.style.display == 'block') {
      var audio = new Audio('../sounds/simonSound2.mp3');
      audio.play();
      audio.addEventListener('ended', () => {
        greenButton.style.backgroundColor = "#03a64b"
      })
      greenButton.style.backgroundColor = "#03C65B"
    }
    if(player) {
      playersPattern.push('green')//*trying this*
      processPlayersTurn()
    }
  },

  red: function(player) {
    console.log('PLAYERS PATTERN', playersPattern.length);
    console.log('GAMES PATTERN', gamesPattern.length);
    console.log('arguments::', arguments);
    console.log('')

    if(off.style.display == 'block') {
      var audio = new Audio('../sounds/simonSound3.mp3');
      audio.play();
      audio.addEventListener('ended', () => {
        redButton.style.backgroundColor = "#9c121c"
      })
      redButton.style.backgroundColor = "#DB1A27"
    }
    if(player) {
      playersPattern.push('red')//*trying this*
      processPlayersTurn()
    }
  },

  blue: function(player) {
    console.log('PLAYERS PATTERN', playersPattern.length);
    console.log('GAMES PATTERN', gamesPattern.length);
    console.log('arguments::', arguments);

    if(off.style.display == 'block') {
      var audio = new Audio('../sounds/simonSound4.mp3');
      audio.play();
      audio.addEventListener('ended', () => {
        blueButton.style.backgroundColor = "#1d8cff"
      })
      blueButton.style.backgroundColor = "#72B6FF"
    }
    if(player) {
      playersPattern.push('blue')//*trying this*
      processPlayersTurn()
    }
  }
}

//============================= Start the Game ==================================

var gamesTurn = function() {
  if(off.style.display == 'block') {
    computerPicksColor()
    for(let i = 0; i < gamesPattern.length; i++) {
      // document.getElementsByClassName("score-text")[0].innerHTML = "- -"
      let colors = gamesPattern[i]
      let soundFunction = functionLookUp[colors]
      setTimeout( soundFunction.bind(null, gamesPattern), i*500 );
    }
  }
}
//================================ Game Picks ===============================================

var functionLookUp = {
  yellow: function() {console.log("RUNNING YELLOW", Date.now());return sounds.yellow()},
  blue: function() {console.log("RUNNING BLUE", Date.now());return sounds.blue()},
  green: function() {console.log("RUNNING GREEN", Date.now());return sounds.green()},
  red: function() {console.log("RUNNING RED");return sounds.red()}
}


var gamesPattern = [];
var colors = ['red', 'yellow', 'green', 'blue'];
var isGameComplete = false



var computerPicksColor = function() {
  var result = colors[Math.floor(Math.random() * colors.length)];
  gamesPattern.push(result)
}

//================================= Did the Player Win or Lose ===============================
var processPlayersTurn = function() {
  for(let i=0; i < playersPattern.length; i++) {
    if(playersPattern[i] !== gamesPattern[i]) {
      document.getElementsByClassName("score-text")[0].innerHTML = " ! ! "
      gamesPattern = []
      playersPattern = []
      playersScore = 0
      document.getElementsByClassName("score-text")[0].innerHTML = "- -"
      setTimeout( function() {
        alert("╭∩╮(-_-)╭∩╮ Simon Says You Suck.... Click start button to play a new game")
      }, 1000 )

      return false
    }
  }

  if(playersPattern.length >= gamesPattern.length) {
    playersScore++
    document.getElementsByClassName("score-text")[0].innerHTML = playersScore
    setTimeout( function() {
      playersPattern = []
      gamesTurn()
    }, 1000 )
  }
}

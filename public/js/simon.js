//=============================================================================
// Players - Computer vs human
// Computer plays a turn, store the computers choice in an array
// Player plays a turn, store the players choice in players array
// Everytime a player plays a turn we check to see if the game still continues. IF it doesnt then alert saying 'game over'.
//=============================================================================

// (function() {
  var colors = ['green', 'red', 'yellow', 'blue']
  var playAudioByColor = function(color) {
    ({
      "green": (function() {
        var audioObj = new Audio('../sounds/simonSound1.mp3')
        audioObj.volume = 1
        audioObj.play()
        var greenButton = document.getElementsByClassName('green')[0]
        greenButton.style.backgroundColor = "#0dc701"
        audioObj.addEventListener('ended', function ()  {
          return greenButton.style.background = "#03a64b"
        })
      }),
      "red": (function() {
        var audioObj = new Audio('../sounds/simonSound2.mp3')
        audioObj.volume = 1
        audioObj.play()
        var redButton = document.getElementsByClassName('red')[0]
        redButton.style.backgroundColor = "#ff0518"
        audioObj.addEventListener('ended', function() {
         redButton.style.backgroundColor = "#9c121c"
        })
      }),
      "yellow": (function() {
        var audioObj = new Audio('../sounds/simonSound4.mp3')
        audioObj.volume = 1
        audioObj.play()
        var yellowButton = document.getElementsByClassName('red')[0]
        yellowButton.style.backgroundColor = "#ffce00"
        audioObj.addEventListener('ended', function() {
         yellowButton.style.backgroundColor = '#cba60c'
        })
      }),
      "blue": (function() {
        var audioObj = new Audio('../sounds/simonSound3.mp3')
        audioObj.volume = 1
        audioObj.play()
        var blueButton = document.getElementsByClassName('blue')[0]
        blueButton.style.backgroundColor = "#1dacff"
        audioObj.addEventListener('ended', function() {
         blueButton.style.backgroundColor = "#1d8cff"
        })
      })
    })[color]()
  }

  var Player = function(isComputer) {
    this.keysPressed = []
    this.isComputer = isComputer
  }

  Player.prototype.isPlayerComputer = function() {
    return this.isComputer
  }

  var pickRandomColor = function() {
    return colors[Math.floor(Math.random() * colors.length)]
  }

  Player.prototype.playTurn = function(color) {
    if(!color) { // If this is the computer!
      color = pickRandomColor()
      var self = this
      setTimeout( function() {
        self.keysPressed.forEach( function(key, i) {
          setTimeout( function() {
            console.log('Im playing:', key)
            playAudioByColor(key)
          }, 1000*i)
        })
      }, 1000)
    }
    console.log('player playturn color::', color);//REMOVE THIS BEFORE FINAL MERGE

    return this.keysPressed.push(color)
  }

  Player.prototype.resetTurns = function() {
    this.keysPressed = []
  }


//==============================================================================
//  2. ADD SOUND AND HOVER COLOR TO CLICKED AND COMPUTER PICKS
//  3. ADD COUNTER TO SCORE FOR EACH SUCCESSFUL HUMAN PLAY
//  4. REMOVE CONSOLE LOGS
//==============================================================================

  var Game = function(player1, player2) {
    this.computer = player1
    this.human = player2
    this.currentPlayer = player2
    this.computer.playTurn()
  }

  Game.prototype.isRoundComplete = function() {
    var computerColors = this.computer.keysPressed
    var humanColors = this.human.keysPressed
    return computerColors.length === humanColors.length
  }

  Game.prototype.isHumanCorrectSoFar = function() {
    var computerColors = this.computer.keysPressed
    var humanColors = this.human.keysPressed
    for(var i=0; i < humanColors.length; i++) {
      if(humanColors[i] !== computerColors[i]) {
        return false
      }
    }
    return true
  }

  Game.prototype.stopGame = function() {
    // stop the game
  }

  Game.prototype.startGame = function() {
    return this
  }

  Game.prototype.playTurn = function(color) {
    // console.log('before computer keys::', this.computer.keysPressed);
    // console.log('before human keys::', this.human.keysPressed);
    // console.log('color::', color);
    this.human.playTurn(color)
    // console.log('isRoundComplete::', this.isRoundComplete());
    if(!this.isHumanCorrectSoFar()) {
      alert('you selected the wrong color. Game over')
      this.stopGame()
    } else if(this.isRoundComplete()) {
      this.computer.playTurn()
      this.human.resetTurns()
    }
    console.log('after computer keys::', this.computer.keysPressed);//REMOVE THIS BEFORE FINAL MERGE
    console.log('after human keys::', this.human.keysPressed);//REMOVE THIS BEFORE FINAL MERGE
  }

  // var computer = new Player(true)
  // var human = new Player(false)
  // var game = new Game(computer, human)
  var game

  // console.log('init computer keys::', game.computer.keysPressed);//REMOVE THIS BEFORE FINAL MERGE


  document.getElementsByClassName('start-button')[0].addEventListener('click', function() {
    var computer = new Player(true)
    var human = new Player(false)
    game = new Game(computer, human)
  });

  document.getElementsByClassName('green')[0].addEventListener('click', function() {
    game.playTurn('green')
    var audio = new Audio('../sounds/simonSound1.mp3');
    audio.play();
  })

  document.getElementsByClassName('red')[0].addEventListener('click', function() {
    game.playTurn('red')
    var audio = new Audio('../sounds/simonSound2.mp3');
    audio.play();
  })

  document.getElementsByClassName('blue')[0].addEventListener('click', function() {
    game.playTurn('blue')
    var audio = new Audio('../sounds/simonSound3.mp3');
    audio.play();
  })

  document.getElementsByClassName('yellow')[0].addEventListener('click', function() {
    game.playTurn('yellow')
    var audio = new Audio('../sounds/simonSound4.mp3');
    audio.play();
  })

// })()

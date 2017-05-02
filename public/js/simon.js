//=============================================================================
// Players - Computer vs human
// Computer plays a turn, store the computers choice in an array
// Player plays a turn, store the players choice in players array
// Everytime a player plays a turn we check to see if the game still continues. IF it doesnt then alert saying 'game over'.
//=============================================================================
(function() {
  var colors = ['green', 'red', 'yellow', 'blue']

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
    if(!color) {
      color = pickRandomColor()
    }
    console.log('player playturn color::', color);
    return this.keysPressed.push(color)
  }

  Player.prototype.resetTurns = function() {
    this.keysPressed = []
  }

  var Game = function(player1, player2) {
    this.computer = player1
    this.human = player2
    // hack to start immediately
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

  Game.prototype.playTurn = function(color) {
    // console.log('before computer keys::', this.computer.keysPressed);
    // console.log('before human keys::', this.human.keysPressed);
    // console.log('color::', color);
    this.human.playTurn(color)
    console.log('isRoundComplete::', this.isRoundComplete());
    if(!this.isHumanCorrectSoFar()) {
      alert('you selected the wrong color. Game over')
      this.stopGame()
    } else if(this.isRoundComplete()) {
      this.computer.playTurn()
      this.human.resetTurns()
    }
    console.log('after computer keys::', this.computer.keysPressed);
    console.log('after human keys::', this.human.keysPressed);

  }


  var computer = new Player(true)
  var human = new Player(false)

  var game = new Game(computer, human)

  console.log('init computer keys::', game.computer.keysPressed);

  document.getElementsByClassName('green')[0].addEventListener('click', function() {
    game.playTurn('green')
  })

  document.getElementsByClassName('red')[0].addEventListener('click', function() {
    game.playTurn('red')
  })

  document.getElementsByClassName('blue')[0].addEventListener('click', function() {
      game.playTurn('blue')
    })

  document.getElementsByClassName('yellow')[0].addEventListener('click', function() {
        game.playTurn('yellow')
  })

})()

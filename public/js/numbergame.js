/**
 * TODOS:
 * - Rewrite the game.reset()
 * - Change check obj to helper functions ob
 * - Add the random number function to the helper obj
 * - Display msg to the user when we can't add
 * - Remove 'Play!' from displaying to the user when clicked
 *
 *   */

//VARIABLES
(function () {
  // STATE OF THE GAME
  let state = {
    userNumbers: [],
    buttons: document.getElementsByClassName("buttons")[0],
    play: document.getElementsByClassName("play-button")[0],
    inputBox: document.getElementsByClassName("user-input-block")[0],
    matchedNumbers: [],
    gameNumbers: [],
    computerPickedNumbers: []
  };

  // MESSAGES THAT THE USER WILL NEED TO PLAY THE GAME
  let messages = {
    pickFive: " Pick 5 numbers to play", 
    clickPlay: "Click Play to see if you have matching numbers!", 
    yourCurrentNumbers: "You Picked: " + state.userNumbers, 
    sorry: "You didn't have any matches :( Try again."
  }
  
  // THESE ARE FUNCTIONS THAT DON'T DO GAME OPERATIONS BUT OFFER SMALLER HELPFUL FUNCTIONALITY
  let helper = {
    canAddNumber: function(button) {
      if (state.userNumbers.includes(button.innerText)) {
        console.log("Number already in arr, so lets delete it!")
        return false;
      } else if(state.userNumbers.length == 5) {
        return false;
      } else {
        return true;
      }
    },
    randomNumber: function() {
      var index = state.gameNumbers[Math.floor(Math.random() * state.gameNumbers.length)];
      return index
    }, 
    displayToUser: function(msg) {
      state.inputBox.innerHTML = messages.msg;
    }
  }

   
  // GAME FUNCTIONS
  let game = {
    changeTheState: function (event) {
      this.updateTheUser();
      state.trigger = event || window.event;
      state.target = event.target || event.srcElement,
      state.currentNum = state.target.innerText;
    },     
    toggleOff: function (button) {
        button.dataset.set = "off";
        button.style.backgroundColor = "coral";
        this.deleteUserNum(button.innerText);
        this.updateTheUser()
      },
    toggleOn: function (button) {
      console.log("BUTTON", button)
      console.log("Turning button ON");
      button.dataset.set = "on";       
      button.style.backgroundColor = "red";
      this.saveUserNum(button.innerText);
      this.updateTheUser();
      },

    saveUserNum: function (num) {
      if(this.checkTheState()) {
        if(state.userNumbers.length > 1) {
        }
        state.userNumbers.push(num)
        this.updateTheUser();
      }
    },
    deleteUserNum: function(num) {
      console.log ("Length of state.userNumbers", state.userNumbers.length)
      if(state.userNumbers.length < 2 && num == state.userNumbers[0]) {
        console.log("REMOVING THE LAST NUMBER", state.userNumbers)
        state.userNumbers.pop()
        console.log("REMOVED THE LAST NUMBER", state.userNumbers);
      } else {
        for(let i = 0; i <= state.userNumbers.length; i++) {
          if(state.userNumbers.length > 1) {
            if(state.userNumbers[i] == num) {
              state.userNumbers.splice(i, 1);
              this.updateTheUser();
            }
          }
        }
      }
    },
    checkTheState: function() {
      if(state.userNumbers.length <= 5) {
        return true;
      } else {
        return false;
      }
    },
    updateTheUser: function() {
      state.inputBox.innerHTML = state.userNumbers
    }, 

    picker: function() {
      let i = 1;
      while(state.gameNumbers.length <= 39) {
        state.gameNumbers.push(i);
        i++;  
      }
      console.log("GAME NUMBERS",state.gameNumbers)
      for(let i = 0; i <= 4; i++) {
        helper.randomNumber()
        if(state.computerPickedNumbers.includes(state.gameNumbers[helper.randomNumber()])) {
          i--;
          helper.randomNumber();
        } else {
          state.computerPickedNumbers.push(state.gameNumbers[helper.randomNumber()])
        }
        console.log("The computer picked numbers: ", state.computerPickedNumbers)
      }
    }, 
    compare: function() {
      for(let i = 0; i < state.computerPickedNumbers.length; i++) {
        if(state.userNumbers.includes(state.computerPickedNumbers[i])){
          state.matchedNumbers.push(state.computerPickedNumbers[i])
        }
      }
      console.log("HERE ARE YOUR MATCHING PICS! ", state.matchedNumbers)
    }

  }

    
    //   if (userNumber > 10) {
    //     throw "Pick a number between 1 - 10"
    //   } else if (userNumber < 1) {
    //     throw "Pick a number between 1 - 10"
    //   } else if (index == userNumber) {
    //     console.log("CONGRATULATIONS! You picked " + userNumber + " and the random number is " + index + " YOU WON!YOU WON!")
    //   } else if (isNaN(userNumber))
    //     throw "This is not a number. Please pick a number between 1 - 10 and try again."
    //   else {
    //     console.log("You picked " + userNumber + " and the random number is " + index + " SORRY  =( ")
    //   }
    // }

  //EVENT LISTENER
  state.buttons.addEventListener('click', function (event) {
    console.log("The button that was clicked", event.target)

    game.changeTheState(event)
    if(event.target.innerText == "Reset") {
      game.resetTheState()
    }

    if(helper.canAddNumber(event.target) == true) {
      if(event.target.dataset.set = "off") {
        game.toggleOn(state.target);
      } 
    } else if(helper.canAddNumber(event.target) == false) {
        game.toggleOff(state.target);
        game.deleteUserNum(state.target);
        console.log("Current User Numbers ", state.userNumbers)
        return;
    }
  })    

    state.play.addEventListener('click', function(event) {
      game.picker()
      game.compare()
    })


  
  // try {
  //   picker(5)
  // } catch (e) {
  //   console.log("Uh Oh! " + e);
  // }
})();
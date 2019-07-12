/**
 * TODOS:
 * - Rewrite the game.reset()
 * - Display msg to the user when we can't add
 * - Computer numbers CANNOT be dupes
 * - Change event listener to querySelector()
 * - Limit randomizer from running more than ONCE at a time. 
 * - Eliminate undefined picks from randomizer
 * - If store.userNumbers.length==5, don't pick, don't compare, alert('Reset to start new game')
 * */

//VARIABLES
(function () {
  // STATE OF THE GAME
  let state = {
    buttons: document.getElementsByClassName("buttons")[0],
    play: document.getElementsByClassName("play-button")[0],
    reset: document.getElementsByClassName("reset-button")[0],
    inputBox: document.getElementsByClassName("user-input-block")[0],
    userNumbers: [],
    matchedNumbers: [],
    gameNumbers: [],
    computerPickedNumbers: [], 
    clickedButtons: []

  };

  
  // THESE ARE FUNCTIONS THAT DON'T DO GAME OPERATIONS BUT OFFER SMALLER HELPFUL FUNCTIONALITY
  let helper = {
    canAddNumber: function(button) {
      if (state.userNumbers.includes(button.innerText)) {
        return false;
      } else if(state.userNumbers.length == 5) {
        return false;
      } else {
        return true;
      }
    },

    randomNumber: function(caller) {
      console.log("CALLED BY: ", caller)
      console.log("RANDOMIZING");
      let newIndex = state.gameNumbers[Math.floor(Math.random() * state.gameNumbers.length)];
      if(state.index === newIndex) {
        console.log("OOPS, DUPE! Running again!")
        this.randomNumber("Within the function")
      } else {
        state.index = newIndex
        state.computerPickedNumbers.push(state.gameNumbers[state.index])
      }
      console.log("HERE ARE OUR PICKS", state.computerPickedNumbers)
    }, 
  }

   
  // GAME FUNCTIONS
  let game = {
    changeTheState: function (event) {
      state.trigger = event || window.event;
      state.target = event.target || event.srcElement,
      state.currentNum = state.target.innerText;
    },     
    toggleOff: function (button) {
      if(state.clickedButtons.length > 1) {
        for(let i = 0; i < state.clickedButtons.length; i++) {
          if(button.innerText == state.clickedButtons[i]) {
            state.clickedButtons.splice(state.clickedButtons[i], 1);
          }
        }
      }
      button.dataset.set = "off";
      button.style.backgroundColor = "coral";
      this.deleteUserNum(button.innerText);
      },
    toggleOn: function (button) {
      state.clickedButtons.push(button)
      button.dataset.set = "on";       
      button.style.backgroundColor = "red";
      this.saveUserNum(button.innerText);
      },

    saveUserNum: function (num) {
      if(this.checkTheState()) {
        // if(state.userNumbers.length > 1) {
        // }
        state.userNumbers.push(num)
        this.updateTheUser("numbers");
      }
    },
    deleteUserNum: function(num) {
      if(state.userNumbers.length < 2 && num == state.userNumbers[0]) {
        state.userNumbers.pop();
        this.updateTheUser("pick");
      } else {
        for(let i = 0; i <= state.userNumbers.length; i++) {
          if(state.userNumbers.length > 1) {
            if(state.userNumbers[i] == num) {
              state.userNumbers.splice(i, 1);
              this.updateTheUser("numbers");
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

    updateTheUser: function(msg) {
      console.log("UPDATING USER")
      switch (msg) {
        case "numbers":
          state.inputBox.innerHTML = "You Picked: " + state.userNumbers;
          break;
        case "pick":
          state.inputBox.innerHTML = "Pick 5 numbers to play!";
          break;
        default:
          state.inputBox.innerHTML = "Pick 5 numbers to play!";
      }
    }, 

    picker: function() {
      let j = 1;
      while(state.gameNumbers.length <= 39) {
        state.gameNumbers.push(j);
        j++;  
      }

      console.log("LENGTH OF USER NUMBERS", state.userNumbers.length)
      for(let i = 0; i < 5; i++) {
        helper.randomNumber("picker")
      }
    }, 

    compare: function() {
      for(let i = 0; i < state.computerPickedNumbers.length; i++) {
        for(let j = 0; j < state.userNumbers.length; j++) {
          if(state.computerPickedNumbers[i] == state.userNumbers[j]){
            state.matchedNumbers.push(state.computerPickedNumbers[i])
          }
        }
      }
      if(state.matchedNumbers.length > 0) {
        alert("CONGRATULATIONS!! \n You matched " + state.matchedNumbers.length + " OF THE NUMBERS! \n We Picked "  + state.computerPickedNumbers + " \n The Matching Number(s): " + state.matchedNumbers);
      } else {
        alert("SORRY\n You don't have any matches. =( Try again.\n We picked:  " + state.computerPickedNumbers)
      }
    }, 
    resetTheState: function() {
      state.userNumbers = [];
      state.matchedNumbers = [];
      state.gameNumbers = [];
      state.computerPickedNumbers = [];
      if(state.clickedButtons.length > 0) {
        for(let i = 0; i < state.clickedButtons.length; i++) {
          this.toggleOff(state.clickedButtons[i]) // THIS IS WHERE I STOPPED 
        }
      }
      this.updateTheUser("pick")
    }
  }

  //EVENT LISTENERS 
  state.buttons.addEventListener('click', function (event) {
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
      console.log(event)
      // if(event.target.innerText =="Play!") {
        state.computerPickedNumbers = [];
        game.picker()
        game.compare()
      // }
    })

    state.reset.addEventListener('click', function(event) {
      if(state.userNumbers.length > 0) {
        console.log("START OVER")
        game.resetTheState()

      } 
    })
})();
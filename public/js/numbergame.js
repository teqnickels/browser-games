/**
 * TODOS:
 * - Rewrite the game.reset()
 * - Display msg to the user when we can't add
 * - Computer numbers CANNOT be dupes
 * - Change event listener to querySelector()
 * - Limit randomizer from running more than ONCE at a time. 
 * - Eliminate undefined picks from randomizer
 * */

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
  let notes = {
    clickPlay: "Click Play to see if you have matching numbers!", 
    sorry: "You didn't have any matches :( Try again."
  }
  
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

    randomNumber: function() {
      console.log("RANDOMIZING");
      var index = state.gameNumbers[Math.floor(Math.random() * state.gameNumbers.length)];
      console.log("HERES THE INDEX!",index)
      return index
    }, 
  }

   
  // GAME FUNCTIONS
  let game = {
    changeTheState: function (event) {
      console.log("Changing the state")
      console.log("From Change the state", notes.yourPicks)
      state.trigger = event || window.event;
      state.target = event.target || event.srcElement,
      state.currentNum = state.target.innerText;
    },     
    toggleOff: function (button) {
        button.dataset.set = "off";
        button.style.backgroundColor = "coral";
        this.deleteUserNum(button.innerText);
      },
    toggleOn: function (button) {
      button.dataset.set = "on";       
      button.style.backgroundColor = "red";
      this.saveUserNum(button.innerText);
      },

    saveUserNum: function (num) {
      if(this.checkTheState()) {
        if(state.userNumbers.length > 1) {
        }
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
      for(let i = 0; i <= state.userNumbers.length; i++) {
        helper.randomNumber()
        if(state.computerPickedNumbers.includes(state.gameNumbers[helper.randomNumber()]) == true || state.computerPickedNumbers.includes(state.gameNumbers[helper.randomNumber()] == undefined)) {
          console.log("OOPS, dupe")
          i--;
          state.computerPickedNumbers.pop()
          helper.randomNumber();
        } else {
          state.computerPickedNumbers.push(state.gameNumbers[helper.randomNumber()])
        }
        console.log("The computer picked numbers: ", state.computerPickedNumbers)
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
      }
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
      state.computerPickedNumbers = [];
      game.picker()
      game.compare()
    })
})();
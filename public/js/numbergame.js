/**
 * TODOS:
 * - Rewrite the game.reset()
 * - Change check obj to helper functions ob
 * - Add the random number function to the helper obj
 * - Fix color changing on numbers we can't add
 * - Display msg to the user when we can't add
  */

//VARIABLES
(function () {
  //STATE OF THE GAME
  let state = {
    userNumbers: [],
    numberButtons: document.getElementsByClassName("on")[0],
    inputBox: document.getElementsByClassName("user-input-block")[0],
    gameNumbers: [],
    computerPickedNumbers: []
  };

  // HELPER
  let check = { 
    canAddNumber: function(button) {
      if (state.userNumbers.includes(button.innerText)) {
          return false;
      } else if(state.userNumbers.length == 5) {
        return false;
      } else {
        return true;
      }
    }
  }

  //GAME FUNCTIONS
  let game = {
    changeTheState: function (event) {
    if(state.userNumbers.length == 1 && event.target.innerText == state.userNumbers[0]) {
      this.deleteUserNum();
      this.updateTheUser();
      } else {
        state.trigger = event || window.event;
        state.target = event.target || event.srcElement,
        state.currentNum = state.target.innerText;
      }
    },     
    toggleOff: function (button) {
        console.log("Turning button on");
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
      for(let i = 0; i <= state.userNumbers.length; i++) {
        if(state.userNumbers[i] == num) {
          state.userNumbers.splice(i, 1);
          this.updateTheUser();
        }
      }
    },
    resetTheState: function() {
      state = {
        userNumbers: [],
        numberButtons: document.getElementsByClassName('on')[0],
        inputBox: document.getElementsByClassName("user-input-block")[0]
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

    picker: function (userNumber) {
      let i = 1;
      while(state.gameNumbers.length <= 41) {
        state.gameNumbers.push(i);
        i++;
      }
      
      for(let i = 0; i <= 5; i++) {
        this.randomNumber()
        if(state.computerPickedNumbers.includes(state.gameNumbers[this.randomNumber()])) {
          i--;
          this.randomNumber();
        } else {
          state.computerPickedNumbers.push(state.gameNumbers[this.randomNumber])
        }
      }
    }, 
    
    randomNumber: function() {
      var index = numbers[Math.floor(Math.random() * numbers.length)];
      return index
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
  state.numberButtons.addEventListener('click', function (event) {
    game.changeTheState(event)
    if(event.target.innerText == "Reset") {
      game.resetTheState()
    }

    if(check.canAddNumber(event.target) == true) {
      console.log("WE CAN ADD")
      if(event.target.dataset.set = "off") {
        game.toggleOn(state.target);
      } 
    } else if(check.canAddNumber(event.target) == false) {
        console.log("Remove number")
        game.toggleOff(state.target);
        game.deleteUserNum(state.target);
        console.log("Current User Numbers ", state.userNumbers)
        return;
      }

    
    if (event.target.innerText == "Play!") {
      //userNumbers.length == 5; else, throw an error, print to user console
      // else, run:
      // picker()
      // matchFinder()
    }    
      });

  
  // try {
  //   picker(5)
  // } catch (e) {
  //   console.log("Uh Oh! " + e);
  // }
})();
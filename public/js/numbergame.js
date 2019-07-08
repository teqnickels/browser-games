/**
 * TODOS:
 * - Rewrite the game.reset()
 * - fix duplicate of push
  */

//VARIABLES
(function () {
  //STATE OF THE GAME
  let state = {
    userNumbers:[],
    numberButtons: document.getElementsByClassName('on')[0],
    inputBox: document.getElementsByClassName("user-input-block")[0],
  }

  // HANDLING
  let check = { 
    canAddNumber: function(button) {
      if (state.userNumbers.includes(button.innerText)) {
        console.log("We already added this number!")
          return false;

      } else{
        console.log("We can add this number")

        return true;
      }
    }
  }

  //GAME FUNCTIONS
  let game = {
    changeTheState: function (event) {
      console.log("TRIGGERED changeTheState");
    if(state.userNumbers.length == 1 && event.target.innerText == state.userNumbers[0]) {
      console.log("DELETING EVERYTHING FROM USER NUMS")
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
      console.log("This is the number the user picked "+ num)
      console.log("TRIGGERED saveUserNum");
      if(this.checkTheState()) {
        console.log("checked the state, now we are going to push the number into the array!")
        if(state.userNumbers.length > 1) {
          console.log("SOMETHING HAPPENED HERE!!!")
        }
        state.userNumbers.push(num)
        console.log("WE PUSHED! Here is the new array " + state.userNumbers)
        console.log("This is the length of the new Array "+ state.userNumbers.length)
        console.log("Is state.userNumbers an array? "+ Array.isArray(state.userNumbers))

        this.updateTheUser();
        console.log(state)
      }
    },
    deleteUserNum: function(num) {
      console.log("TRIGGERED deleteUserNum")
      for(let i = 0; i <= state.userNumbers.length; i++) {
        if(state.userNumbers[i] == num) {
          state.userNumbers.splice(i, 1);
          this.updateTheUser();
        }
      }
    },
    resetTheState: function() {
      console.log("TRIGGERED resetTheState")
      state = {
        userNumbers: [],
        numberButtons: document.getElementsByClassName('on')[0],
        inputBox: document.getElementsByClassName("user-input-block")[0]
      }
    },
    checkTheState: function() {
      console.log("TRIGGERED checkTheState")
      console.log("Length of array", state.userNumbers.length);
      if(state.userNumbers.length <= 5) {
        return true;
      } else {
        return false;
      }
    },
    updateTheUser: function() {
      console.log("TRIGGERED updateTheUser")
      console.log("THIS IS THE NEW ARRAY FROM UPDATE USER", state.userNumbers)
      state.inputBox.innerHTML = state.userNumbers
    }
  }

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
        return;
        }    
      });

  // let picker = (userNumber) => {
  //   let numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
  //   var index = numbers[Math.floor(Math.random() * numbers.length)];
  
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
  
  // try {
  //   picker(5)
  // } catch (e) {
  //   console.log("Uh Oh! " + e);
  // }
})();
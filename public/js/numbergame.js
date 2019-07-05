/**
 * TODOS:
 *    write a function that manages the state of the userNumbers array. 
 *  
 *
  */

//VARIABLES
(function () {
  //STATE OF THE GAME
  let state = {
    userNumbers:[],
    numberButtons: document.getElementsByClassName('on')[0],
  }

  //GAME FUNCTIONS
  let game = {
    changeTheState: function (event) {
      state.trigger = event || window.event;
      state.target = event.target || event.srcElement,
      state.num = state.target.innerText;
    },
    setButtonColor: function (buttonPushed) {
      if (buttonPushed.style.backgroundColor == "") {
        state.buttonColor = "coral"
      } else if (buttonPushed.style.backgroundColor = "coral") {
        state.buttonColor = "red";
      } else {
        state.buttonColor == "coral";
      }
    },     
    toggleButton: function (button, color) {
      if (color == "red") {
        this.toggleOff(button)
      } else {
        this.toggleOn(button)
      }
    },
    toggleOn: function (button) {
      button.style.backgroundColor = "red";
    },
    toggleOff: function (button) {
      button.style.backgroundColor = "coral";
    },
    saveUserNum: function (num) {
      if (state.userNumbers.length <= 5) {
        state.userNumbers.push(num)
      }
    },
    resetTheState: function() {
      state = {
        userNumbers: [],
        numberButtons: document.getElementsByClassName('on')[0],
      }
    }
  }

  //EVENT LISTENER
  state.numberButtons.addEventListener('click', function (event) {
    if(event.target.innerText == "Reset"){
      game.resetTheState
    }
    
    game.changeTheState(event)
    game.setButtonColor(state.target)
    game.toggleButton(state.target, state.buttonColor)
    game.saveUserNum(state.num)
}, false);



  
  let picker = (userNumber) => {
    let numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
    var index = numbers[Math.floor(Math.random() * numbers.length)];
  
    if (userNumber > 10) {
      throw "Pick a number between 1 - 10"
    } else if (userNumber < 1) {
      throw "Pick a number between 1 - 10"
    } else if (index == userNumber) {
      console.log("CONGRATULATIONS! You picked " + userNumber + " and the random number is " + index + " YOU WON!YOU WON!")
    } else if (isNaN(userNumber))
      throw "This is not a number. Please pick a number between 1 - 10 and try again."
    else {
      console.log("You picked " + userNumber + " and the random number is " + index + " SORRY  =( ")
    }
  }
  
  try {
    picker(5)
  } catch (e) {
    console.log("Uh Oh! " + e);
  }
})();
/**
 * Wrap game in IFFE
 * 
 * create event listener that listens for button clicks and
 * push number selections into an array until length=3
 * 
 * create event listener that listens for click on play button
 * run picker on click
 * 
 *  
 *
  */

//VARIABLES
(function () {
  let buttonColor;

  let state = {
    userNumbers:[],
    numberButtons: document.getElementsByClassName('on')[0],
    buttonColor: "",
    event:"",
    target: "",

  }
  //EVENT LISTENER
  state.numberButtons.addEventListener('click', function (event) {
    event = event || window.event;
    state.target = event.target || event.srcElement,
    num = target.innerText;

    setButtonColor(target)
    toggleButton(target, state.buttonColor)
    saveUserNum(num)
}, false);

//GAME FUNCTIONS
  let setButtonColor = function(buttonPushed) {
    if (buttonPushed.style.backgroundColor=="") {
      console.log("1. INSIDE EVENT LISTENER, buttonPushed == ''")
      console.log("2. SETTING COLOR TO CORAL")
      state.buttonColor = "coral"
    } else if (buttonPushed.style.backgroundColor="coral") {
      console.log("1. INSIDE EVENT LISTENER, buttonPushed == CORAL")
      console.log("2. SETTING COLOR TO RED")
      state.buttonColor = "red";
    } else {
      console.log("1. INSIDE EVENT LISTENER, buttonPushed == RED")
      console.log("2. SETTING COLOR TO CORAL")
      state.buttonColor == "coral"; //if its red
    }
  }

  let toggleButton = function(button, color) {
    if(color == "red") {
      toggleOff(button)
    } else {
      toggleOn(button)
    }
  }

  let toggleOn = function(button) {
    button.style.backgroundColor="red";
  }

  let toggleOff = (button) => {
    button.style.backgroundColor = "coral";
  }

  let saveUserNum = (num) => {
    if(state.userNumbers.length <= 5) {
      state.userNumbers.push(num)
    }
  }
  
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
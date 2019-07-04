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

let numberButtons = document.getElementsByClassName('on')[0].children;
console.log("buttons", numberButtons)

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
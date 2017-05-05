//====================================
//  1. X goes first
//  2. user chooses x or o
//  3. player1 (x)  plays
//  4. check for win
//  5. player2 plays
//  6. repeat step 4
//  7. repeat  step 3
//  8. repeat step 4
//=====================================

(function() {

  var helperArray = [];
  var human
  var computer
  var marker = "X"


  var listOfboxes = document.querySelectorAll(".box")
  for(let box of listOfboxes) {
    box.addEventListener('click', handleClick.bind(this, box))
  }

  for(let i = 1; i <= 9; i++) {
    helperArray[i] = false
  }


  var xClicked = document.getElementsByClassName("x")[0]
  xClicked.addEventListener('click', markerPrompt.bind(this, xClicked))

  var oClicked = document.getElementsByClassName("o")[0]
  oClicked.addEventListener('click', markerPrompt.bind(this, oClicked))

  function markerPrompt(clicked) {
   if(clicked == xClicked) {
     alert("You Chose X. X plays first")
     marker = 'X'
   }else{
     alert("You Chose O. X plays first")
     marker = 'O'
   }
  }


  function handleClick(box, mark) {
    if(helperArray[getClassNumberFromDomItem(box)]=== false) {
      var pTag = document.createElement("p")
      pTag.innerText = marker
      position(pTag)
      box.appendChild(pTag)
      helperArray[getClassNumberFromDomItem(box)] = true
      switchMarker(marker)
      console.log(box.getAttribute('class'));
    }
    checkForWin()
  }

  function position(div) {
    div.style.position = "relative";
    div.style.left = "34px"
    div.style.top = "-98px"
  }

  function getClassNumberFromDomItem(box) {
    return box.getAttribute('class').match(/\d/)[0]
  }

  var wins = [
    [ document.getElementsByClassName("1")[0], document.getElementsByClassName("2")[0], document.getElementsByClassName("3")[0] ],
    [ document.getElementsByClassName("3")[0], document.getElementsByClassName("2")[0], document.getElementsByClassName("1")[0] ],
    [ document.getElementsByClassName("4")[0], document.getElementsByClassName("5")[0], document.getElementsByClassName("6")[0] ],
    [ document.getElementsByClassName("6")[0], document.getElementsByClassName("5")[0], document.getElementsByClassName("4")[0] ],
    [ document.getElementsByClassName("7")[0], document.getElementsByClassName("8")[0], document.getElementsByClassName("9")[0] ],
    [ document.getElementsByClassName("9")[0], document.getElementsByClassName("8")[0], document.getElementsByClassName("7")[0] ],
    [ document.getElementsByClassName("1")[0], document.getElementsByClassName("4")[0], document.getElementsByClassName("7")[0] ],
    [ document.getElementsByClassName("7")[0], document.getElementsByClassName("4")[0], document.getElementsByClassName("1")[0] ],
    [ document.getElementsByClassName("2")[0], document.getElementsByClassName("5")[0], document.getElementsByClassName("8")[0] ],
    [ document.getElementsByClassName("8")[0], document.getElementsByClassName("5")[0], document.getElementsByClassName("2")[0] ],
    [ document.getElementsByClassName("3")[0], document.getElementsByClassName("6")[0], document.getElementsByClassName("9")[0] ],
    [ document.getElementsByClassName("9")[0], document.getElementsByClassName("6")[0], document.getElementsByClassName("3")[0] ],
    [ document.getElementsByClassName("1")[0], document.getElementsByClassName("5")[0], document.getElementsByClassName("9")[0] ],
    [ document.getElementsByClassName("9")[0], document.getElementsByClassName("5")[0], document.getElementsByClassName("1")[0] ],
    [ document.getElementsByClassName("3")[0], document.getElementsByClassName("5")[0], document.getElementsByClassName("7")[0] ],
    [ document.getElementsByClassName("7")[0], document.getElementsByClassName("5")[0], document.getElementsByClassName("3")[0]]];

  function checkForWin() {
    wins.forEach( function(win) {
      let countOfX = 0
      let countOfY = 0
      win.forEach( function(box) {
        let characterInBox = box.innerText.replace(/[\n\s]+/, '')
        if(characterInBox === 'X') countOfX++
        if(characterInBox === 'O') countOfY++
      })
      if(countOfX === 3) {
        winFunction('X')
      } else if (countOfY === 3) {
        winFunction('O')
      }
    })
  }

  function switchMarker(mark) {
    if(mark == "X") {
      marker = "O"
    }else{
      marker = "X"
    }
  }



  function winFunction(whoWon) {
    alert('Congrats ' + whoWon + ' you win!')
    clearBoard()
  }

  function clearBoard() {
    for(let box of listOfboxes) {
      box.innerText = ' '
      // box.removeChild(box.firstChild)
    }
  }



})()

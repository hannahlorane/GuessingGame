/* **** Global Variables **** */
// try to elminate these global variables in your project, these are here just to start.

var playerGuess,
    winningNumber;

var guessesArray = [10];

/* **** Guessing Game Functions **** */

// Generate the Winning Number

function generateWinningNumber(){
	return 1 + Math.floor(100*Math.random());
}

winningNumber = generateWinningNumber();
console.log(winningNumber); //DELENDUM

// Fetch the Player's Guess

function playerGuessSubmission() {
  playerGuess = +document.getElementById('number').value;
  console.log(playerGuess); //DELENDUM
  document.getElementById('number').value = '';
  checkGuess();
  lowerOrHigher(); //DELENDUM
}

// Determine if the next guess should be a lower or higher number

function lowerOrHigher(){
  if (winningNumber > playerGuess) {var direction = "high";}
  else {var direction = "low";}
  $('.result p:last-child').text("Aim " + direction + "er");
}

// Determines how far the player's guess is from the winning number
// and displays the appropriate message
function updateTemperature () {
    //TODO
}

// Ends the game, once the player has used up his or her guesses
function gameOver() {
  //TODO
}

// Check if the Player's Guess is the winning number

function checkGuess(){
  if (playerGuess === winningNumber) {
    $('.result').find('p').text("Congratulations! You won the Game!");
  }
  else {
    if (guessesArray[playerGuess] === true) {
      // this number has already been guessed
      $('.left').find('p').text("You already guessed that!" + "\n" + "You still have "
                            + guessesArray[0] + " guesses left");
    }
    else {
      // this is a brand new guess
      guessesArray[playerGuess] = true;
      guessesArray[0]--;
      $('.left').find('p').text("You have " + guessesArray[0] + " guesses left");
      if (guessesArray[0] === 0) {gameOver();}
      // tell player to try again / respond to the guess
    }
  }
}

// Create a provide hint button that provides additional clues to the "Player"

function provideHint(){
	// add code here
}

// Allow the "Player" to Play Again

function playAgain(){
	// add code here
}


/* **** Event Listeners/Handlers ****  */

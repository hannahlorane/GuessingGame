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

// Determine if the next guess should be a lower or higher number

function lowerOrHigher(){
  var heightAffiche = $('.result p:last-child');
  if (winningNumber === playerGuess) {heightAffiche.css({"display" : "none"});}
  else if (winningNumber > playerGuess) {heightAffiche.text("Aim heigher");}
  else {heightAffiche.text("Aim lower");}
}

// Determines how far the player's guess is from the winning number
// and displays the appropriate message
function updateTemperature () {
  var breakpoints = [0, 2, 5, 10, 30, 50, 75, 100];
  var tempDictionary = {100 : "Absolutely freezing",
                        75 : "Very cold",
                        50 : "Cold",
                        30 : "Lukewarm",
                        10 : "Warm",
                        5 : "Very warm",
                        2 : "Super duper warm",
                        0 : "Congratulations! You won the Game!"};
  var tempAffiche = $('.result p:first-child');
  var diff = Math.abs(playerGuess - winningNumber);
  for (var i = 0; i < breakpoints.length; i++) {
    if (diff <= breakpoints[i]) {
      tempAffiche.text(tempDictionary[breakpoints[i]]);
      break;
    }
  }
}

// Ends the game, once the player has used up his or her guesses
// or has won the game
function gameOver(won) { // TODO
  //Makes all of the buttons stop working
  if (won) {gameWon();}
  else {gameLost();}
}

function gameWon() {
  //TODO
}

function gameLost() {
  //TODO
}

// Check if the Player's Guess is the winning number
function checkGuess(){
  if (guessesArray[playerGuess] === true) {
    // this number has already been guessed
    $('.left').find('p:first-child').text("You already guessed that!" + "\n" + "You still have "
                          + guessesArray[0] + " guesses left");
  }
  else {
    // this is a brand new guess
    guessesArray[playerGuess] = true;
    guessesArray[0]--;
    $('.left').find('p').text("You have " + guessesArray[0] + " guesses left");
  }
  // if the user has exhausted all of her guesses, the game is over
  if (guessesArray[0] === 0) {gameOver(false);}
  else {
    lowerOrHigher();
    updateTemperature();
  }
}


// Allow the "Player" to Play Again
function playAgain(){
	location.reload();
}

/* If there are two or fewer guesses left, hint gives
   the decade of the winning number; otherwise, it picks
   a random number between 1-10 and tells the user whether
   the winning number is divisible by it */
function generateHint() {
  if (guessesArray[0] < 3) {
    var h = "The number is between ";
    h += 10 * Math.floor(winningNumber/10);
    h += " and ";
    h += 10 * (Math.floor(winningNumber/10)) + 9;
  }
  else {
    var n = Math.floor(Math.random()*10 + 1);
    var divisBool = winningNumber % n === 0;
    var h = "The number is ";
    h += (divisBool) ? "" : "not";
    h += " divisible by ";
    h += n;
  }
  return h;
}


/* **** Event Listeners/Handlers ****  */

// Fetch the Player's Guess
function playerGuessSubmission() {
  playerGuess = +document.getElementById('number').value;
  console.log(playerGuess); //DELENDUM
  document.getElementById('number').value = '';
  checkGuess();
}

// Create a provide hint button that provides additional clues to the "Player"
function provideHint(){
  var hintText = $('#hintText');
  hintText.text(generateHint());
  hintText.show();
}

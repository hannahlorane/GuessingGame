/* **** Global Variables **** */
// try to elminate these global variables in your project, these are here just to start.
$(document).ready(function() {

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
    else if (winningNumber > playerGuess) {heightAffiche.text("Aim Higher");}
    else {heightAffiche.text("Aim Lower");}
  }

  // Determines how far the player's guess is from the winning number
  // and displays the appropriate message
  function updateTemperature () {
    var tempAffiche = $('.result p:first-child');
    if (playerGuess > 100 || playerGuess < 1) {
      tempAffiche.text("Out of Range!");
      return;
    }
    var breakpoints = [0, 2, 5, 10, 30, 50, 75, 100];
    var tempDictionary = {100 : "Absolutely freezing",
                          75 : "Very cold",
                          50 : "Cold",
                          30 : "Lukewarm",
                          10 : "Warm",
                          5 : "Very warm",
                          2 : "Super duper warm",
                          0 : "Congratulations! You won the Game!"};
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
  function gameOver(won) {
    $('#hintText').hide();

    // turn off buttons aside from the resent button
    $('#submit').off('click', playerGuessSubmission);
    $('#number').off('keypress', handleKeyPress);
    $('#hint').off('click', provideHint);

    // specializes into gameWon or gameLost
    if (won) {gameWon();}
    else {gameLost();}
  }

  function gameWon() {
    $('.left p').hide();
    $('.result p:first-child').text("Congratulations! You Won the Game!");
    $('.result p:last-child').text("But you're still not the Overman");
    var purpleBorder = function (element) {
      element.css({
        'background-image' : 'url("liontest.jpg")',
        'border' : 'thick double purple'});
    }
    purpleBorder($('h1'));
    purpleBorder($('body'));
    purpleBorder($('.resetGame'));
    purpleBorder($('.guess'));
  }

  function gameLost() {
    $('.left p').text("You are out of guesses!");
    $('body').css(
      {'background-image' : 'url("nietzsche.jpg")',
       'background-repeat' : 'no-repeat',
       'background-position' : 'center',
       'webkit-text-stroke' : '.3px #ffe0d8'});
    $('.result p:first-child').text("You lost the game!");
    $('.result p:last-child').text("But at least you still have the Will to Power!");
  }

  // Check if the Player's Guess is the winning number
  function checkGuess(){
    if (playerGuess === winningNumber) {gameOver(true); return;}
    else if (guessesArray[playerGuess] === true) {
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
  $('#submit').on('click', playerGuessSubmission);

  // Fetch the Player's Guess
  function playerGuessSubmission() {
    playerGuess = +document.getElementById('number').value;
    console.log(playerGuess); //DELENDUM
    document.getElementById('number').value = '';
    checkGuess();
  }

  $('#number').on('keypress', handleKeyPress);

  // Calls playerGuessSubmission when the enter key is pressed
  function handleKeyPress(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      playerGuessSubmission();
    }
  }

  $('#reset').on('click', playAgain);

  // Allows the "Player" to Play Again
  function playAgain(){
  	location.reload();
  }

  $('#hint').on('click', provideHint);

  // Create a provide hint button that provides additional clues to the "Player"
  function provideHint(){
    var hintText = $('#hintText');
    hintText.text(generateHint());
    hintText.show();
  }
})

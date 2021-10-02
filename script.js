'use strict';
// ****** Selecet the Elements *****

// Selecting BIG score Elements
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');

// Selecting the buttons Elements
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//Selecting the dice element
const diceEl = document.querySelector('.dice');

// Selecting the Small Current score Elemetns
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

//Selecting Elements for the toggle effect
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

// apply hidden class to dice to hide the dice from the page
//classList is CSS Manipulation
diceEl.classList.add('hidden');

//*****Staring conditions ***** */
//setting The BIG Scores to 0
score0El.textContent = 0;
score1El.textContent = 0;

//Switch player function
const switchPlayer = function () {
  // if dice is one then switch player
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  //currentScore = 0;
  // switch players from zero to one and vice versa
  activePlayer = activePlayer === 0 ? 1 : 0;
  // Toggle between player 1 and player 2
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// state of game to stop button being pressed if false
let playing, activePlayer, currentScore, scores;

//create a funciton to start the game and reset all values
const init = function () {
  // Required elements to initialize the game

  //****************************************//
  //Storing the BIG score in array to sroe 0 positoin and 1 positon in index array
  scores = [0, 0];
  // Storing Current score we need to be defined
  currentScore = 0;
  /*We need to know which player is active by
  assigning the first active player to zero the second to 1 */
  activePlayer = 0;
  // state of game true and kill game buttons if false
  playing = true;
  // to store the big scores in an array for player 0 and 1
  scores = [0, 0];

  // Assigning class values and manipulate CSS elements
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player1El.classList.remove('player--active');
  player0El.classList.add('player--active');
};

//-------------------------

// ***** Create Event Listener for the roll button *****
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1. Generate a random dice
    const dice = Math.trunc(Math.random() * 6) + 1;
    //console.log(dice);
    // 2.  Display the dice
    diceEl.classList.remove('hidden');

    diceEl.src = `dice-${dice}.png`;
    //3. is it 1 logice
    if (dice !== 1) {
      // Add dice to the current score
      currentScore = currentScore + dice;

      //Choose the active player Dynamically
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch Player function to be called
      switchPlayer();
    }
  }
});
// Calling the function
init();

// The hold button handler *****************
btnHold.addEventListener('click', function () {
  if (playing) {
    //Add current score to the active player
    scores[activePlayer] = scores[activePlayer] + currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // Check socre if >= 100
    if (scores[activePlayer] >= 50) {
      //finish the game if ture
      playing = false;
      // Add the hidden calss to remove the dice
      diceEl.classList.add('hidden');
      // Apply class CSS 'player--winner' to the active player
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      // Apply CSS class 'player--active-- to the active player
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    }
    // switch to other player if false
    switchPlayer();
  }
});

//Resetting the Game Function
btnNew.addEventListener('click', init);
//to reset the game
// Set all scores to Zero

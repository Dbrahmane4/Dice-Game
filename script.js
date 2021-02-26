"use strict";
// selecting elements
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");

const score0El = document.querySelector("#score--0");
const score1El = document.querySelector("#score--1");

const currentScore0El = document.querySelector("#current--0");
const currentScore1El = document.querySelector("#current--1");

const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

let activePlayer, playing, currentScore, scores;
// initial conditions

function init() {
  scores = [0, 0];
  activePlayer = 0;
  playing = true;
  currentScore = 0;

  score0El.textContent = 0;
  score1El.textContent = 0;
  currentScore0El.textContent = 0;
  currentScore1El.textContent = 0;

  diceEl.classList.add("hidden");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
}
init();

function switchPlayer(){
      currentScore = 0;
      document.querySelector(`#current--${activePlayer}`).textContent =0;
      if(activePlayer === 0){
        activePlayer= 1;
       player0El.classList.remove('player--active');
       player1El.classList.add('player--active');    
      }
      else if(activePlayer ===1){
        activePlayer=0;
        player0El.classList.add('player--active');
        player1El.classList.remove('player--active');
      }

}


// rolling event
btnRoll.addEventListener("click", function () {
  // generate a random dice roll
  const dice = Math.trunc(Math.random() * 6) + 1;
  // display the dice
  diceEl.classList.remove("hidden");

  diceEl.src = `dice-${dice}.png`;
  // it should add the rolled to current score
  if(dice !== 1){
    currentScore = currentScore + dice;
//   displaying current score
    document.querySelector(`#current--${activePlayer}`).textContent = currentScore;    
  }
  else{ 
      switchPlayer();
  }

});
// holding event
btnHold.addEventListener("click",function(){
  // adding current to active players score
    scores[activePlayer] += currentScore;

    document.querySelector(`#score--${activePlayer}`).textContent = scores[activePlayer];
  // check if players score i greater than 100
    if(scores[activePlayer] >= 100){
        // end the game
        diceEl.classList.add("hidden");

        document.querySelector(`.player--${activePlayer}`).classList.add("player--winner");
        document.querySelector(`.player--${activePlayer}`).classList.remove("player--active");

    }
    else{
        // switch player
        switchPlayer();
    }
    
})




// events

// new game
btnNew.addEventListener("click", init);

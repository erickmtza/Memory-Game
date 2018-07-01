//Create a list that holds all of your cards
let openCards = [];

const cards = document.getElementsByClassName('card');
const deck = document.getElementsByClassName('deck');

let moves = 0;

let timerOff = true;
let timer = 0;

//  Shuffles the deck
function reorderDeck() {
  //  getElementsByTagName returns a NodeList, so we use the Array.from method to create a copy in array form
    let reorderCards = Array.from(document.querySelectorAll('.deck li'));
    let randomizeCards = shuffle(reorderCards);
    randomizeCards.forEach(function (card) {
      //  getElementsByClassName returns HTMLcollection (NodeList), so target a specific index
      deck[0].appendChild(card);
    });
};
reorderDeck();

//  getElementsByClassName returns HTMLcollection (NodeList), so to add event Listener to an element, target a specific index
deck[0].addEventListener('click', function(event) {
  const card = event.target;

  //  Starts timer on first click
  if (timerOff === true) {
    timerOff = false; //  Allows the timer to continue uninterrupted by each click
    timeClock();
  }

//  Operating the game
  if (card.classList.contains('card')  //  Using logical operators to set conditions for what cards can flip
  && !card.classList.contains('open') && !card.classList.contains('match')  //  <--Don't want these as expressed through the use of the !
  && openCards.length < 2) {
      console.log("Clicked card");
      cardFlip(card);
      addFlippedCard(card);
      if (openCards.length === 2) {
        matchCheck();
        movecounter();  //  Placed it here to keep count for pair attempts
        starPerformance();
      }
  }
});

//  Keeps count of the moves taken when selecting cards
function movecounter() {
    moves++
    let movesCount = document.getElementsByClassName('moves');
    movesCount[0].innerHTML = moves;  //  Remember to use the index due to the HTMLcollection (NodeList)
};

//  flips the card
function cardFlip(display) {
    display.classList.toggle('open')
    display.classList.toggle('show');
};

//  Add, or Push, card to openCards array to hold on to flipped card
function addFlippedCard(add) {
    openCards.push(add);
    console.log(openCards);
};

//  Checks to see if cards are a match
function matchCheck() {
  if (openCards[0].firstElementChild.className === openCards[1].firstElementChild.className) {
    openCards[0].classList.add('match');
    openCards[1].classList.add('match');
    openCards = [];
    console.log(openCards);
  } else {
    //  Delays the execution of the function by the time set in ms
    setTimeout (function hide() {
        cardFlip(openCards[0]);
        cardFlip(openCards[1]);
        openCards = [];
        console.log(openCards);
    }, 500);
  }
};

//  Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//  This will remove a star
function removeStar() {
    let max = document.getElementsByClassName('stars');
    let stars = document.querySelectorAll('.stars li')
    max[0].removeChild(stars[0]);
};

//  This establishes at what point in the game a star will be removed
function starPerformance() {
    if (moves === 15 || moves === 24) {
        removeStar();
    }
};

//  Timer
function timeClock() {
    let time = document.getElementsByClassName('time');

    function startTime() {
        timer++;
        let min = Math.floor(timer / 60);
        let seconds = timer % 60;
        if (seconds < 10) {
          time[0].innerHTML = `${min}:0${seconds}`;
        } else {
          time[0].innerHTML = `${min}:${seconds}`;
        }
    };
    setInterval(startTime, 1000);
};

//  This will display the modal window which shows the stats of the endgame
function endgameModal () {
    gameStats ();
    const modal = document.getElementsByClassName('modalBackground');
    modal[0].classList.toggle('hide');
};

//  This prints the stats on to the modal
function gameStats () {
    const timeStat = document.getElementsByClassName('modalTime');
    const stampTime = document.querySelector('.time').innerHTML;  //  The querySelector does NOT return HTMLcollection
    const movesStat = document.getElementsByClassName('modalMoves');
    const starStat = document.getElementsByClassName('modelStars');
    const starStamp = document.querySelectorAll('.stars .fa-star').length;

    timeStat[0].innerHTML = `Time: ${stampTime}`;
    starStat[0].innerHTML = `Stars: ${starStamp}`;
    movesStat[0].innerHTML = `Moves: ${moves}`;
};

document.querySelector('.modalReplay').addEventListener('click', resetGame);


function resetGame() {
    document.location.reload(false);
}

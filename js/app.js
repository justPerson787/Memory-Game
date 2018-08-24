/*
 * Create a list that holds all of your cards
 */
let cards = ['fa-paper-plane-o','fa-diamond','fa-anchor','fa-bolt','fa-bomb','fa-leaf','fa-bicycle','fa-cube', 'fa-paper-plane-o','fa-diamond','fa-anchor','fa-bolt','fa-bomb','fa-leaf','fa-bicycle','fa-cube'];
let openCards = [];
let matchedCards = [];
let moves = 0;
let stars = document.querySelectorAll(".stars li"); // stars for star rating
let block= false; // var block disables opening more than 2 cards simultaneously
let earnedStars = 3; //stars assigned to a player

// Shuffle function from http://stackoverflow.com/a/2450976
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

//Initiating a game
function new_deck() {
    openCards = [];
    timer();
    let ul = document.querySelectorAll(".deck i");
    for (let n = 0; n < ul.length; n++) {
        ul[n].classList.remove("fa");
        ul[n].classList.remove(cards[n]);
    }
    shuffle(cards);
    for (let n = 0; n < ul.length; n++) {
        ul[n].classList.add("fa");
        ul[n].classList.add(cards[n]);
    }
}

new_deck();

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

 function moveCounter() {
     moves += 1;
     document.getElementById("moves").textContent = moves;
     starRating(moves);
 }

 // function to open cards
function open_card(c) {
    c.classList.add("open");
    c.classList.add("show");
    openCards.push(c);
}

// to display matched cards
function matched() {
    openCards[0].classList.add('match');
    openCards[1].classList.add('match');
    openCards = []; 
    moveCounter();   
}

//to hide back unmatched cards
function unmatched() {
    //openCards[1].style.backgroundColor = "pink";
    block = true;
    setTimeout(function(){
        openCards[0].classList.remove('open', 'show');
        openCards[1].classList.remove('open', 'show');
        openCards = [];
        block = false;
    }, 700);
    moveCounter();
}

//changing star rating
function starRating(moves) {
    const maxMoves =[27, 17, 12];
    for (let i = 0; i < stars.length; i++) {
        if(moves == maxMoves[i]){
            stars[i].style.visibility= 'hidden'
            earnedStars -= 1;
        };
    };
}

//

//reset star rating back to ***
function resetStars(){
    for (let i = 0; i < stars.length; i++){
        stars[i].style.visibility= 'initial';
        earnedStars = 3;
    }
}

// Modal function
var modal = document.getElementById('modal');
// <span> element that closes the modal
var exitModal = document.getElementsByClassName("closeModal")[0];
// This function close the modal when the user clicks on X
exitModal.onclick = function() {
    modal.style.display = "none";
}

//Timer function
function timer() {
    let seconds =0;
    let timer2 = setInterval(function() {
        let sec = checkTime(seconds % 60);
        let m = Math.floor(seconds / 60);
        let min = checkTime(m);
        document.getElementById("timer").textContent = min + ":" + sec;
        seconds +=1;
    }, 1000);
}
timer();

function checkTime(i) {
    if (i < 10) {i = "0" + i};  // make two digits format for min and sec
    return i;
}

// restarting game
function restart() {
    matchedCards.forEach(function(element) {
        element.classList.remove('open', 'show', 'match');
    });
    if(openCards != 0) {
        openCards[0].classList.remove('open', 'show');
    }
    new_deck();
    matchedCards = [];
    resetStars(); // reset starrating back to ***
    moves = 0; // reset move counter
    document.getElementById("moves").textContent = moves;   
    modal.style.display = "none"; 
}

// the eventlistener for a clicked card to open
document.querySelector('.deck').addEventListener('click', function (evt) {
    if (!block) {
        if (event.target.nodeName === "LI"){
            open_card(event.target)
        };
        if (openCards.length == 2 && openCards[0].innerHTML == openCards[1].innerHTML) {
            matchedCards.push(openCards[0], openCards[1]);
            matched()        
        }; 
        if (openCards.length == 2 && openCards[0].innerHTML != openCards[1].innerHTML) {
            unmatched()
        }
        // end of game. Display modal with the final score
        if (matchedCards.length == 16) {
            document.getElementById('score').innerHTML = moves;
            clearTimeout(time);
            earnedStars == 1? document.getElementById('earnedStars').innerHTML = earnedStars + " star.": document.getElementById('earnedStars').innerHTML = earnedStars + " stars.";
            modal.style.display = "block";
        }
    }
});



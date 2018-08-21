/*
 * Create a list that holds all of your cards
 */
let cards = ['fa-paper-plane-o','fa-diamond','fa-anchor','fa-bolt','fa-bomb','fa-leaf','fa-bicycle','fa-cube', 'fa-paper-plane-o','fa-diamond','fa-anchor','fa-bolt','fa-bomb','fa-leaf','fa-bicycle','fa-cube'];
let openCards = [];
let matchedCards = [];
let moves = 0;
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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

 }

 // function to open cards
function open_card(c) {
    c.classList.add("open");
    c.classList.add("show");
    openCards.push(c);
}

function matched() {
    openCards[0].classList.add('match');
    openCards[1].classList.add('match');
    openCards = []; 
    moveCounter();   
}

function unmatched() {
    //openCards[1].style.backgroundColor = "pink";
    setTimeout(function(){
        openCards[0].classList.remove('open', 'show');
        openCards[1].classList.remove('open', 'show');
        openCards = [];
    }, 700);
    moveCounter();
}

function restart() {
    matchedCards.forEach(function(element) {
        element.classList.remove('open', 'show', 'match');
    });
    new_deck();
    matchedCards = [];
    // reset move counter
    moves = 0;
    document.getElementById("moves").textContent = moves;
}

document.querySelector('.deck').addEventListener('click', function (evt) {
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

    
});



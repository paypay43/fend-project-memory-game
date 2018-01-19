/*
 * Create a list that holds all of your cards
 */
let pairs = 0;
let lastCard = {};
let lastCardId;
let cards = [
			   {'symbol' : 'diamond', 'flipped' : false },
			   {'symbol' : 'diamond', 'flipped' : false } ,
			   {'symbol' : 'paper-plane-o', 'flipped' : false },
			   {'symbol' : 'paper-plane-o', 'flipped' : false },
			   {'symbol' : 'anchor', 'flipped' : false } ,
			   {'symbol' : 'anchor', 'flipped' : false },
			   {'symbol' : 'bolt', 'flipped' : false },
			   {'symbol' : 'bolt', 'flipped' : false },
			   {'symbol' : 'cube', 'flipped' : false },
			   {'symbol' : 'cube', 'flipped' : false },
			   {'symbol' : 'leaf', 'flipped' : false },
			   {'symbol' : 'leaf', 'flipped' : false },
			   {'symbol' : 'bicycle', 'flipped' : false },
			   {'symbol' : 'bicycle', 'flipped' : false },
			   {'symbol' : 'bomb', 'flipped' : false },
			   {'symbol' : 'bomb', 'flipped' : false },
		   	];



//initialize board, shuffles cards, recreates grid of cards
cards = shuffle(cards);
const deckEl = document.querySelector('.deck');
let deckHTML = '';
for(let i= 0; i<cards.length; i++) {
	deckHTML += `<li data-id="${i}" class="card"><i class="fa fa-${cards[i].symbol}"></i></li>`;
}
deckEl.innerHTML = deckHTML;


document.querySelector('.deck').addEventListener('click', function(e){
	if(e.target.tagName === 'LI') {
		e.target.classList.add('show');
		e.target.classList.add('open');
		let index = e.target.dataset.id;
		let card = cards[index];
		card.flipped = true;
		if(lastCard.symbol === undefined) {
			lastCard = card;
			lastCardId = index;
		} else {
			//if there's already a card that has been flipped then check if they are a match
			if(lastCard.symbol === card.symbol) {
				
			//no match reset last card
			} else {
				let lastCardEl = document.querySelector('.card[data-id="' + lastCardId + '"]');
				lastCard = {};
				//resetCards(lastCardEl, e.target);
			}
		}
	}
});


			
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

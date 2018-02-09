
let cards = [
			   {'symbol' : 'diamond'},
			   {'symbol' : 'diamond'},
			   {'symbol' : 'paper-plane-o'},
			   {'symbol' : 'paper-plane-o'},
			   {'symbol' : 'anchor'},
			   {'symbol' : 'anchor'},
			   {'symbol' : 'bolt'},
			   {'symbol' : 'bolt'},
			   {'symbol' : 'cube'},
			   {'symbol' : 'cube'},
			   {'symbol' : 'leaf'},
			   {'symbol' : 'leaf'}, 
			   {'symbol' : 'bicycle'},
			   {'symbol' : 'bicycle'},
			   {'symbol' : 'bomb'},
			   {'symbol' : 'bomb'}
		   	];
let starEl = document.querySelectorAll('.stars li');
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
let showCard = function(card) {
	card.classList.toggle('show');
	card.classList.toggle('open');
};

let resetCards = function(cardOne, cardTwo) {
	//simulates animation to show the fail status by showing red
	cardOne.classList.toggle('open');
	cardTwo.classList.toggle('open');
	cardTwo.classList.toggle('fail');
	cardOne.classList.toggle('fail');

	//after a second of them seeing the failure the cards will turn back over 
	setTimeout(function() {
	    cardOne.classList.toggle('fail');
	    cardTwo.classList.toggle('fail');
	    cardOne.classList.toggle('show');
	    cardTwo.classList.toggle('show');
	}, 1000);
};

let matchCards = function(cardOne, cardTwo) {
	cardOne.classList.toggle('open');
	cardTwo.classList.toggle('open');
	cardOne.classList.toggle('match');
	cardTwo.classList.toggle('match');
};

let getTime = function(time) {
		time = new Date(time);
		const hours = time.getUTCHours();
		const minutes = time.getUTCMinutes();
		const seconds = time.getUTCSeconds();
		timeString = (hours > 0 ? (hours === 1 ? hours + ' hour and ' : hours + ' hours and ') : '') + (minutes > 0 ? (minutes === 1 ? minutes + ' minute and ' : minutes + ' minutes and ') : '') + (seconds > 0 ? (seconds === 1 ? seconds + ' second' : seconds + ' seconds') : '');
		return timeString;
}




function runGame() {
	var moves;
	var stars;
	var pairs;
	var lastCard;
	var lastCardId;
	var startTime;
	var timer;
	const moveEl = document.querySelector('.moves');

	document.querySelector('.restart').addEventListener('click', restartGame);

	function restartGame(){
		if(document.querySelector('.winModal')!==null) {
			document.querySelector('.winModal').remove();
		}
		starEl.forEach(function(star){
			star.classList.remove('hide');
		});
		initializeGame();
	};

	function increaseMoveCounter(){
		moves++;
		moveEl.innerHTML = moves;
		switch(moves) {
			case 12:
				starEl[2].classList.toggle('hide');
				stars = 2;
				break;
			case 24:
				starEl[1].classList.toggle('hide');
				stars = 1;
				break;
			case 48:
				starEl[0].classList.toggle('hide');
				stars = 0;
				break;
		}
	}

	//function for card click 
	function clickCard(e){
		if(e.target.tagName === 'LI' && !e.target.classList.contains('show')) {
			//changes css of card to show that it's been flipped over
			showCard(e.target);
			let index = e.target.dataset.id;
			let card = cards[index];
			if(lastCard.symbol === undefined) {
				increaseMoveCounter();
				//sets last card if there wasnt previously one (one card is turned over)
				lastCard = card;
				lastCardId = index;
			} else {
				let lastCardEl = document.querySelector('.card[data-id="' + lastCardId + '"]');

				//if there's already a card that has been flipped then check if they are a match
				//by checking the symbols
				if(lastCard.symbol === card.symbol) {
					matchCards(lastCardEl, e.target);
					pairs++;
					if(pairs===8) {
						debugger;
						winGame();
					}
					lastCard = {};
				//no match reset last card
				} else {
					lastCard = {};
					resetCards(lastCardEl, e.target);
				}
			}
		}
	};
	//stops timer, and sends win message to user
	function winGame() {
		clearInterval(timer);
		let time = performance.now() - startTime;
		timeString = getTime(time);
		let modalHTML = '<div class="winModal"><div class="winMessage">Congratulations! You won! Your game time was ' + (timeString) + ' with a ' + stars + ' star rating!<br><button class="modal-restart">Play Again?</button></div></div>';
		document.querySelector('body').insertAdjacentHTML('afterbegin', modalHTML);
		document.querySelector('.modal-restart').addEventListener('click', restartGame);
	}

	function initializeGame(){
		//resets variables to 0 for a new game
		pairs = 0;
		lastCard = {};
		moves = 0;
		stars = 3;

		//shuffles cards and creates the grid
		cards = shuffle(cards);
		const deckEl = document.querySelector('.deck');
		moveEl.innerHTML = moves;
		let deckHTML = '';
		for(let i= 0; i<cards.length; i++) {
			deckHTML += `<li data-id="${i}" class="card"><i class="fa fa-${cards[i].symbol}"></i></li>`;
		}
		deckEl.innerHTML = deckHTML;

		//sets the event listener for the card click
		document.querySelector('.deck').addEventListener('click', clickCard);
		startTime = performance.now();

		//timer that will update every second showing the user how long they've been playing for
		timer = setInterval(function() { 
			let time = performance.now() - startTime;
			timeString = getTime(time);
			document.querySelector('.timer').innerHTML = timeString;
		}, 1000);

 	}
 	//runs game 
 	initializeGame();
};


runGame();




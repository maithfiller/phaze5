import Card from './Deck';

class Player {

  constructor(name) {
    this.name = name;
    // holds Player's current phase
    this.phase = 1;
    // holds Player's hand of cards
    this.hand = [];
    // holds the board of Cards laid down
    this.board1 = [];
    this.board2 = [];
    // holds if the Player is skipped for a turn
    this.skipped = false;
    // player's points
    this.points = 0;
  }

  /* takeTurn() function will allow a Player to
  decide whether they wish to draw from the Deck or
  from the discard pile. Player will then have to
  evaluate if they wish to try to complete a phase
  (must be their current phase). Lastly, a Player
  will choose a card from their hand to discard */
  takeTurn(deck, discard_pile) {

  }

  get phase() {
    return this.phase;
  }

  get name() {
    return this.name;
  }

  get isSkipped() {
    let temp = this.skipped;
    this.skipped = false;
    return temp;
  }

  get handSize() {
    return this.hand.length;
  }

  get points() {
    return this.points;
  }

  addPhase() {
    this.phase++;
  }

  moveCardsToBoard1(cardsToMove) {
    cardsToMove.sort();
    for (let i = cardsToMove.length - 1; i >= 0; i--) {
      this.board1.push(this.hand.pop(cardsToMove[i]));
    }
  }

  moveCardsToBoard2(cardsToMove) {
    cardsToMove.sort();
    for (let i = cardsToMove.length - 1; i >= 0; i--) {
      this.board2.push(this.hand.pop(cardsToMove[i]));
    }
  }

  draw(decc, discard_pile, choice) {
    // temp is Card on top of discard discard_pile
    let temp;

    if (decc.length === 0) {
      temp = discard_pile.pop();
      // shuffle the discard_pile
      // make deck = discard_pile
      // discard_pile = empty array
      discard_pile.push(temp);
    }

    temp = discard_pile.pop();

    // if temp is a skip
    if (temp.number == 13) {
      // put temp back in the discard_pile
      discard_pile.push(temp);
      // ignore user choice, user must draw from deck
      this.hand.push(decc.dealCard());
      return;
    }
    // else, temp is not a skip
    else {
      // put temp card back on the discard_pile
      discard_pile.push(temp);
      // if choice is 1, draw from deck
      if (choice == 1) {
        this.hand.push(decc.pop());
      }
      // else, pick up from discard_pile
      else {
        this.hand.push(discard_pile.pop());
      }
    }
    // end of draw()
    return;
  }

  sortHand() {
    // selection sort performs fewer swaps than bubble sort
    let i, j, min_idx, len = this.hand.length;
    let temp;
    // one by one move boundary of unsorted subarray
    for (i = 0; i < len; i++) {
      // find the minimum element in unsorted array
      min_idx = i;
      for (j = i + 1; j < len; j++)
        if (this.hand[j].number < this.hand[min_idx].number)
          min_idx = j;
      // swap the found minimum element with the first element
      temp = this.hand[i];
      this.hand[i] = this.hand[min_idx];
      this.hand[min_idx] = temp;
    }
  }

  addUpPoints() {
    let number, total = 0;

    for (let i = 0; i < this.hand.length; i++) {
      number = this.hand[i].number();

      if (number >= 1 && number <= 9) {
        total += 5;
      }

      else if (number >= 10 && number <= 12) {
        total += 10;
      }

      else if (number == 13 || number == 14) {
        total += 25;
      }
    }

    this.points += total;
  }
}

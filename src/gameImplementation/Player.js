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

  get board1() {
    return this.board1;
  }

  get board2() {
    return this.board2;
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

  isBoardEmpty() {
    return this.board1.length == 0 && this.board2.length == 0;
  }

  draw(decc, discard_pile, choice) {

    let temp1, temp2;

    // if we run out of cards to draw from decc
    if (decc.length == 0) {
      // save top card in the discard pile
      temp1 = discard_pile.pop();

      // push all cards from discard pile back into decc
      while (discard_pile.length > 0) {
        decc.push(discard_pile.pop());
      }

      // swap two random cards 500 times
      for (let i = 0; i < 500; i++) {
        // generate two random indices
        let rand1 = (Math.ceil(Math.random() * decc.length)) - 1;
        let rand2 = (Math.ceil(Math.random() * decc.length)) - 1;
        // save Card at position 'rand1'
        temp2 = decc[rand1];
        // swap Cards at positions 'rand1' and 'rand2'
        decc[rand1] = decc[rand2];
        decc[rand2] = temp2;
      }
    }

    temp1 = discard_pile.pop();

    // if temp1 is a skip
    if (temp1.number() == 13) {
      // put temp1 back in the discard_pile
      discard_pile.push(temp1);
      // ignore user choice, user must draw from deck
      this.hand.push(decc.dealCard());
      return;
    }
    // else, temp1 is not a skip
    else {
      // put temp1 card back on the discard_pile
      discard_pile.push(temp1);
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

  clearBoard() {
    // clear both boards of a player
    this.board1 = [];
    this.board2 = [];
  }

  clearHand() {
    // clear a player's hand
    this.hand = [];
  }

  showBoards() {
    console.log(this.name + "'s" + " board:");

    // printing board 1
    let printStr = "";
    for (let i = 0; i < this.board1.length; i++) {
      printStr += "|  "
      printStr += this.board1[i].number
      printStr += "  |"
    }
    console.log(printStr)

    // printing board 2
    printStr = "";
    for (let i = 0; i < this.board2.length; i++) {
      printStr += "|  "
      printStr += this.board2[i].number
      printStr += "  |"
    }
    console.log(printStr)
  }

  showHand() {
    console.log(this.name + "'s" + " hand:");

    let printStr = "";
    for (let i = 0; i < this.hand.length; i++) {
      printStr += "|  "
      printStr += this.hand[i].number
      printStr += "  |"
    }
    console.log(printStr)

  }

  makeSkipTrue() {
    this.skipped = true;
  }

  dropCard(index) {
    // removes one item from the hand array at specified index
    let temp = this.hand.splice(index, 1);
    return temp;
  }

}

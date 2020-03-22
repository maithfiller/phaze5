class Card {
  // number is 13 for skip and 14 for wild
  constructor(number, color) {
    this.number = number;
    this.color = color;
    this.used = false;
    this.dealt = false;
  }

  get number() {
    return this.number;
  }

  get color() {
    return this.color;
  }

  get isUsed() {
    return this.used;
  }

  get isDealt() {
    return this.dealt;
  }
}

export class Deck {

  constructor() {
    // array of type Card
    this.deck = [];
    // array of possible colors
    let colors = ["Blue", "Green", "Yellow", "Red"];

    for (let run = 0; run < 8; run++) {
      for (let i = 1; i <= 12; i++) {
        // push a new Card of number 'i' and color from 'colors' array
        this.deck.push(new Card(i, colors[run % 4]));
      }
    }

    // push 4 skip Cards onto the deck
    for (let i = 0; i < 4; i++) {
      this.deck.push(new Card(13, "Black"));
    }
    // push 8 wild Cards onto the deck
    for (let i = 0; i < 8; i++) {
      this.deck.push(new Card(14, "Black"));
    }

    // shuffle the deck
    shuffle();
  }

  get Card(index) {

    // if index is out of bounds, return null
    if (index < 0 || index >= this.deck.length) {
      return NULL;
    }

    // else, return card @ index
    return this.deck[index];
  }

  shuffle() {

    // 500 times
    for (let i = 0; i < 500; i++) {
      // generate two random indices
      let rand1 = (Math.ceil(Math.random() * this.deck.length)) - 1;
      let rand2 = (Math.ceil(Math.random() * this.deck.length)) - 1;
      // save Card at position 'rand1'
      let temp = this.deck[rand1];
      // swap Cards at positions 'rand1' and 'rand2'
      this.deck[rand1] = this.deck[rand2];
      this.deck[rand2] = temp;
    }
  }

  dealCard() {
    if (this.deck.length == 0) {
      // add functionality to shuffle discard pile if Cards run out
      console.log("Ran out of cards!\n");
      return NULL;
    }

    let temp = this.deck.pop();
    // temp holds a Card
    temp.dealt = true;
    return temp;
  }
}

export default Card;

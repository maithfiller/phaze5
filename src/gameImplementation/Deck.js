class Card {
  // number is 13 for skip and 14 for wild
  constructor (number, color){
    this.number = number;
    this.color = color;
    this.used = false;
    this.dealt = false;
  }

  get number () {
    return this.number;
  }

  get color () {
    return this.color;
  }

  get isUsed () {
    return this.used;
  }

  get isDealt () {
    return this.dealt;
  }
}

export class Deck {

  constructor() {
    // array of type Card
    let deck = [];
    // array of possible colors
    let colors = ["Blue", "Green", "Yellow", "Red"];
    // 'top' holds index of Card at the top of the deck
    let top = 0;

    for (let run = 0; run < 8; run ++) {
      for (let i = 1; i <= 12; i ++) {
        // push a new Card of number 'i' and color from 'colors' array
        deck.push(new Card(i, colors[run % 4]));
      }
    }

    // push 4 skip Cards onto the deck
    for (let i = 0; i < 4; i ++) {
      deck.push(new Card(13, "Black"));
    }
    // push 8 wild Cards onto the deck
    for (let i = 0; i < 8; i ++) {
      deck.push(new Card(14, "Black"));
    }

    top = deck.length;

    // shuffle the deck
    shuffle();
  }

  shuffle () {

    // 500 times
    for (let i = 0; i < 500; i ++) {
      // generate two random indices
      let rand1 = (Math.round(Math.random() * deck.length));
      let rand2 = (Math.round(Math.random() * deck.length));
      // save Card at position 'rand1'
      let temp = deck[rand1];
      // swap Cards at positions 'rand1' and 'rand2'
      deck[rand1] = deck[rand2];
      deck[rand2] = temp;
    }
  }

  deal () {
    if (top == 0) {
      // add functionality to shuffle discard pile if Cards run out
      console.log("Ran out of cards!\n");
      return NULL;
    }

    Card temp = deck[top - 1];
    deck[top - 1].dealt = true;
    top --;
    return temp;
  }
}

export default Card;

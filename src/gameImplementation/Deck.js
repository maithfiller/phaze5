class Card {
  // number is 13 for skip and 14 for wild
  constructor(number, color) {
    this._number = number;
    this._color = color;
    this.used = false;
    this.dealt = false;
  }

  get number() {
    return this._number;
  }

  set number(num){
    this._number = num;
  }

  get color() {
    return this._color;
  }
  set color(c){
    this._color = c;
  }
  get isUsed() {
    return this.used;
  }

  get isDealt() {
    return this.dealt;
  }
}



class Deck {

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
    this.shuffle();
  }

  pop(){
    return this.deck.pop();
  }

  push(x){
    this.deck.push(x);
  }

  shuffle() {

    let rand1, rand2;
    let temp;
    // 500 times
    for (let i = 0; i < 500; i++) {
      // generate two random indices
      rand1 = (Math.ceil(Math.random() * this.deck.length)) - 1;
      rand2 = (Math.ceil(Math.random() * this.deck.length)) - 1;
      // save Card at position 'rand1'
      temp = this.deck[rand1];
      // swap Cards at positions 'rand1' and 'rand2'
      this.deck[rand1] = this.deck[rand2];
      this.deck[rand2] = temp;
    }
  }

  dealCard() {
    if (this.deck.length == 0) {
      // add functionality to shuffle discard pile if Cards run out
      console.log("Ran out of cards!\n");
      return;
      //return null
    }

    let temp = this.deck.pop();
    // temp holds a Card
    temp.dealt = true;
    return temp;
  }
}

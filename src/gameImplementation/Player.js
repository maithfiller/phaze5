class Player {

  constructor(name) {
    this._name = name;
    // holds Player's current phase
    this._phase = 1;
    // holds Player's hand of cards
    this._hand = [];
    // holds the board of Cards laid down
    this._board1 = [];
    this._board2 = [];
    // holds if the Player is skipped for a turn
    this.skipped = false;
    // player's points
    this._points = 0;
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
    return this._phase;
  }
  set phase(p) {
    this._phase = p;
  }
  get name() {
    return this._name;
  }
  
  set name(n) {
    this._name = n;
  }
  
  get hand(){
  return this._hand;
  }
  set hand(h) {
    this._hand = h;
  }
  get board1(){
  return this._board1;
  }
  set board1(b) {
    this._board1 = b;
  }
  get board2(){
  return this._board2;
  }
  set board2(b) {
    this._board2 = b;
  }
  get isSkipped() {
    let temp = this.skipped;
    this.skipped = false;
    return temp;
  }

  get handSize() {
    return this._hand.length;
  }

  get points() {
    return this._points;
  }
  set points(p) {
    this._points = p;
  }
  addPhase() {
    this._phase++;
  }

  valueOf(i){
  return this._hand[i];
  }
  
  moveCardsToBoard1(cardsToMove, origin_array) {
    for (let i = cardsToMove.length - 1; i >= 0; i--) {
      if(Number(cardsToMove[i]) == origin_array.length - 1){
        this._board1.push(origin_array.pop());
      }
      else{
        this._board1.push(...origin_array.splice(cardsToMove[i], 1));
      }
    }
  }

  moveCardsToBoard2(cardsToMove, boardOneIndex, origin_array) {
    if(boardOneIndex[0] == -1){
     for (let i = cardsToMove.length - 1; i >= 0; i--) {
      if(Number(cardsToMove[i]) == origin_array.length - 1){
        this._board2.push(origin_array.pop());
      }
      else{
        this._board2.push(...origin_array.splice(cardsToMove[i], 1));
      }
    }
    }
    else{
      cardsToMove.sort();
      let newIndex = [];
      for(let i = 0; i < cardsToMove.length; i++){
       let counter = 0;
        for(let k = 0; k < boardOneIndex.length; k++){
          if(boardOneIndex[k] < Number(cardsToMove[i]))
            counter++;
        } 
        newIndex.push(cardsToMove[i] - counter);
      }
      newIndex.sort();
      for (let i = newIndex.length - 1; i >= 0; i--) {
        if(newIndex[i] == origin_array.length - 1){
         this._board2.push(origin_array.pop());
        }
        else{
          this._board2.push(...origin_array.splice(newIndex[i], 1));
        }
     }
    }
  }

  isBoardEmpty() {
    return this._board1.length == 0 && this._board2.length == 0;
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
    if (temp1._number() == 13) {
      // put temp1 back in the discard_pile
      discard_pile.push(temp1);
      // ignore user choice, user must draw from deck
      this._hand.push(decc.dealCard());
      return;
    }
    // else, temp1 is not a skip
    else {
      // put temp1 card back on the discard_pile
      discard_pile.push(temp1);
      // if choice is 1, draw from deck
      if (choice == 1) {
        this._hand.push(decc.pop());
      }
      // else, pick up from discard_pile
      else {
        this._hand.push(discard_pile.pop());
      }
    }
    // end of draw()
  }

  sortHand() {
    // selection sort performs fewer swaps than bubble sort
    let i, j, min_idx, len = this._hand.length;
    let temp;
    // one by one move boundary of unsorted subarray
    for (i = 0; i < len; i++) {
      // find the minimum element in unsorted array
      min_idx = i;
      for (j = i + 1; j < len; j++)
        if (this._hand[j]._number < this._hand[min_idx]._number)
          min_idx = j;
      // swap the found minimum element with the first element
      temp = this._hand[i];
      this._hand[i] = this._hand[min_idx];
      this._hand[min_idx] = temp;
    }
  }
  clearBoard() {
    // clear both boards of a player
    this._board1 = [];
    this._board2 = [];
  }

  clearHand() {
    // clear a player's hand
    this._hand = [];
  }
  addUpPoints() {
    let number, total = 0;

    for (let i = 0; i < this._hand.length; i++) {
      number = this._hand[i]._number();

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

    this._points += total;
  }

  showBoards() {
    // board 1
    let printStr = this._name + "'s" + " boards: ";
    for (let i = 0; i < this._board1.length; i++) {
      printStr += "|  ";
      printStr += this._board1[i]._number;
      printStr += "  |";
    }
    // board 2
    printStr += "  &  ";
    for (let i = 0; i < this._board2.length; i++) {
      printStr += "|  ";
      printStr += this._board2[i]._number;
      printStr += "  |";
    }
    alert(printStr);
  }

  showHand() {
    let printStr = this._name + "'s" + " hand: ";
    for (let i = 0; i < this._hand.length; i++) {
      printStr += "|  ";
      printStr += this._hand[i]._number;
      printStr += "  |";
    }
    alert(printStr);
  }
  
  makeSkipTrue() {
    this.skipped = true;
  }
  dropCard(index) {
    // removes one item from the hand array at specified index
    let temp = this._hand.splice(index, 1);
    return temp;
  }

}

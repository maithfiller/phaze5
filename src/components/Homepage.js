import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './home.css';
import Modal1 from '../components/Modal/PlayGameModal';
import Modal2 from '../components/Modal/PickUpModal';

class Homepage extends Component {

  testBoi(){
    for (let i = 0; i < this.playerArr.length;i++){
      alert(this.playerArr[i].name)
    }
  }

  componentDidMount() {
      // Call our fetch function below once the component mounts
    this.callBackendAPI()
      .then(res => this.setState({ data: res.express }))
      .catch(err => console.log(err));
  }
    // Fetches our GET route from the Express server. Note the route we are fetching matches the GET route from server.js
  callBackendAPI = async () => {
    const response = await fetch('/express_backend');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message)
    }
    return body;
  };

  constructor(props){
    super(props);
    this.state = {numplayers: '',
                  p1: '',
                  p2: '',
                  p3: '',
                  //p4: '',
                  //p5: '',
                  //p6: '',
                  isShowing: false};
    this.x = 0; // all of the variables will be in here
    this.playerArr = [];
    this.p = 0;

    // controlling the state of number of players and the usernames for each player
  }

/* to update the numebr of players entered in the textbox*/
submitFormHandler = event => {
  event.preventDefault();
this.setState({numplayers: this.refs.players.value});
console.log(this.refs.players.value);
                // updating the state of the number of players and each players username
}

playGameHandler = event => {
  event.preventDefault();
  this.setState({p1: this.refs.user1.value, p2: this.refs.user2.value, p3: this.refs.user3.value});
  //p2: this.refs.user2.value, p3: this.refs.user3.value,
                //  p4: this.refs.user4.value, p5: this.refs.user5.value, p6: this.refs.user6.value
}

openModalHandler = () => {
        this.setState({
            isShowing: true
        });
    }

    openModal2Handler = () => {
            this.setState({
                isShowing2: true
            });
        }

closeModalHandler = () => {
        this.setState({
            isShowing: false
        });
        this.setState({p1: this.refs.user1.value, p2: this.refs.user2.value, p3: this.refs.user3.value });

        this.p = new Player(this.refs.user1.value);
        this.playerArr.push(this.p);
        this.p = new Player(this.refs.user2.value);
        this.playerArr.push(this.p);
        this.p = new Player(this.refs.user3.value);
        this.playerArr.push(this.p);
        this.testBoi();
    }

closeModal2Handler = () => {
            this.setState({
                isShowing2: false
            });
            this.setState({p1: this.refs.user1.value});
        }

  render(){

    return (

      <div>

                { this.state.isShowing ? <div onClick={this.closeModalHandler} className="back-drop"></div> : null }
                { this.state.isShowing2 ? <div onClick={this.closeModal2Handler} className="back-drop"></div> : null }

                <button className="open-modal-btn" onClick={this.openModalHandler}>Play Game</button>
                <div>
                <text className="button"> <button><Link to="/howtoplay">How to Play!</Link></button> </text>
            {/* WHAT IS UPPPPPP THIS IS A COMMENT :) */}
                <Modal1
                    className="modal"
                    show={this.state.isShowing}
                    close={this.closeModalHandler}>

                    <form onSubmit={this.submitFormHandler}>
                      <div>
                      <text className="text">How many players: </text>
                      <input type="number" min="3" max="3" name="players" ref="players" style={{width: "250px"}}/>
                      <button> Submit </button>
                      </div>

                      {this.state.numplayers === '1' &&
                        <div>
                          <text>Player #1 Username: </text>
                          <input type="text" name="user1" ref="user1" style={{width: "205px"}}/>
                          </div>
                      }

                      {this.state.numplayers === '2' &&
                        <div>
                          <text>Player #1 Username: </text>
                          <input type="text" name="user1" ref="user1" style={{width: "205px"}}/>
                      <br></br>
                        <text>Player #2 Username: </text>
                        <input type="text" name="user2" ref="user2" style={{width: "205px"}}/>
                        </div>
                      }


                      {this.state.numplayers === '3' &&
                        <div>
                          <text>Player #1 Username: </text>
                          <input type="text" name="user1" ref="user1" style={{width: "205px"}}/>
                      <br></br>
                        <text>Player #2 Username: </text>
                        <input type="text" name="user2" ref="user2" style={{width: "205px"}}/>
                      <br></br>
                        <text>Player #3 Username: </text>
                        <input type="text" name="user3" ref="user3" style={{width: "205px"}}/>
                        </div>
                      }


                      {this.state.numplayers === '4' &&
                        <div>
                          <text>Player #1 Username: </text>
                          <input type="text" name="user1" ref="user1" style={{width: "205px"}}/>
                      <br></br>
                        <text>Player #2 Username: </text>
                        <input type="text" name="user2" ref="user2" style={{width: "205px"}}/>
                      <br></br>
                        <text>Player #3 Username: </text>
                        <input type="text" name="user3" ref="user3" style={{width: "205px"}}/>
                      <br></br>
                        <text>Player #4 Username: </text>
                        <input type="text" name="user4" ref="user4" style={{width: "205px"}}/>
                        </div>
                      }

                      {this.state.numplayers === '5' &&
                        <div>
                          <text>Player #1 Username: </text>
                          <input type="text" name="user1" ref="user1" style={{width: "205px"}}/>
                      <br></br>
                        <text>Player #2 Username: </text>
                        <input type="text" name="user2" ref="user2" style={{width: "205px"}}/>
                      <br></br>
                        <text>Player #3 Username: </text>
                        <input type="text" name="user3" ref="user3" style={{width: "205px"}}/>
                      <br></br>
                        <text>Player #4 Username: </text>
                        <input type="text" name="user4" ref="user4" style={{width: "205px"}}/>
                      <br></br>
                        <text>Player #5 Username: </text>
                        <input type="text" name="user5" ref="user5" style={{width: "205px"}}/>
                        </div>
                      }

                      {this.state.numplayers === '6' &&
                        <div>
                          <text>Player #1 Username: </text>
                          <input type="text" name="user1" ref="user1" style={{width: "205px"}}/>
                      <br></br>
                        <text>Player #2 Username: </text>
                        <input type="text" name="user2" ref="user2" style={{width: "205px"}}/>
                      <br></br>
                        <text>Player #3 Username: </text>
                        <input type="text" name="user3" ref="user3" style={{width: "205px"}}/>
                      <br></br>
                        <text>Player #4 Username: </text>
                        <input type="text" name="user4" ref="user4" style={{width: "205px"}}/>
                      <br></br>
                        <text>Player #5 Username: </text>
                        <input type="text" name="user5" ref="user5" style={{width: "205px"}}/>
                      <br></br>
                        <text>Player #6 Username: </text>
                        <input type="text" name="user6" ref="user6" style={{width: "205px"}}/>
                      </div>
                    }

                      </form>

                </Modal1>
                <button className="open-modal-btn" onClick={this.openModal2Handler}>PickUpModal</button>
                <Modal2
                className="modal"
                show={this.state.isShowing2}
                close={this.closeModal2Handler}>
                </Modal2>
                </div>



          {/*}<img src={logo}  className="logo" alt="logo" />*/}
      <text className="create"> Created by: Faith Miller, Mackenzie Knight, Tristan Garcia, Eduardo Antonini, and Katie Rombeiro </text>

      </div>


    );
  }
}

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
    if (temp1._number == 13) {
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
  addPoints() {
    let number, total = 0;

    for (let i = 0; i < this._hand.length; i++) {
      number = this._hand[i]._number;

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
} // end of class Player

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
} // end of class Deck

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
} // end of class Card

export {Homepage};

import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './home.css';
import Modal1 from '../components/Modal/PlayGameModal';
import PickUpModal from '../components/Modal/PickUpModal';

class Homepage extends Component {

  setGameInfo(){
    this.currentPlayer = 0; // sets current player
    this.gameDeck = new Deck(); // creates game deck
    this.discardPile.push(this.gameDeck.dealCard()); // places a card on discard pile
    // deal 10 cards to all players
    for(let i = 0; i < 10; i++){
      for(let k = 0; k < this.playerArr.length; k++){
        this.playerArr[k].draw(this.gameDeck, this.discardPile, 1)
      }
    }
    // sort all player's hands initially
    for (let i = 0; i < this.playerArr.length; i++){
      this.playerArr[i].sortHand();
    }
  }

  drawFromDeck(){
    this.playerArr[this.currentPlayer].draw(this.gameDeck, this.discardPile, 1)
    this.playerArr[this.currentPlayer].sortHand();
    this.handStr = this.playerArr[this.currentPlayer].showHand();
  }

  drawFromDP(){
    this.playerArr[this.currentPlayer].draw(this.gameDeck, this.discardPile, 2)
    this.playerArr[this.currentPlayer].sortHand();
    this.handStr = this.playerArr[this.currentPlayer].showHand();
  }

  checkPhase(ff,fs,ft,sf,ss,st){
    //if currently trying for phaze 1
    // returns 0 for success, -1 for invalid phase
    if(this.playerArr[this.currentPlayer]._phase == 1){
      let set1 =[];
      let set2 =[];
      // pushing card index values
      set1.push(ff);
      set1.push(fs);
      set1.push(ft);

      //send the indexes of those cards to a function that returns whether its a true set or not
      if(this.isASet(set1, this.playerArr[this.currentPlayer]._hand) == true){
        //if your first set was verifies, go on and repeat the same steps for second set
        // pushing card index values
        set2.push(sf);
        set2.push(ss);
        set2.push(st);
        //test validity of second set
        if(this.isASet(set2, this.playerArr[this.currentPlayer]._hand) == true){
          //those sets will be sent to "board" array only if both sets are verified as true sets
          //assuming we have function that takes an array of indexes, and the hand of the current player's cards and moves those cards to the "board" array
          this.playerArr[this.currentPlayer].moveCardsToBoard1(set1, this.playerArr[this.currentPlayer]._hand);
          this.playerArr[this.currentPlayer].moveCardsToBoard2(set2, set1, this.playerArr[this.currentPlayer]._hand);
        //  this.playerArr[this.currentPlayer].showBoards();
          this.playerArr[this.currentPlayer].addPhase();
          return 0;
        }
        else{
          let printStr = "Sorry! That doesn't qualify. Time to discard!\n";
          alert(printStr);
          return -1;
        }
      }
      else{
          let printStr = "Sorry! That doesn't qualify. Time to discard!\n";
          alert(printStr);
          return -1;
      }
    }
    //repeat same set of steps for each other phaze
    else // player is on phase 2
    {
      let set1 =[];
      let run2 =[];

      set1.push(ff);
      set1.push(fs);
      set1.push(ft);

        if(this.isASet(set1, this.playerArr[this.currentPlayer].hand) == true){
          run2.push(sf);
          run2.push(ss);
          run2.push(st);

          if(this.isARun(run2, this.playerArr[this.currentPlayer]._hand) == true){
            this.playerArr[this.currentPlayer].moveCardsToBoard1(set1,this.playerArr[this.currentPlayer]._hand);
            this.playerArr[this.currentPlayer].moveCardsToBoard2(run2, set1, this.playerArr[this.currentPlayer]._hand);
            this.playerArr[this.currentPlayer].addPhase();
            return 0;
          }

          else{
            let printStr = "Sorry! That doesn't qualify. Time to discard!\n";
            alert(printStr);
            return -1;
          }
        }
        else{
          let printStr = "Sorry! That doesn't qualify. Time to discard!\n";
          alert(printStr);
          return -1;
        }
    }
  }

  finalDiscard(discardChoice){
    let temp = this.playerArr[this.currentPlayer].valueOf(discardChoice);
    if(temp._number === 13){
      // skip the next player
      if (this.currentPlayer === this.playerArr.length - 1)
        this.playerArr[0].makeSkipTrue();
      else
        this.playerArr[this.currentPlayer + 1].makeSkipTrue();

    }
    this.discardPile.push(...(this.playerArr[this.currentPlayer].dropCard(discardChoice)));
    this.endOfTurn();
  }

  endOfTurn(){
    // check if the current player still has cards left
    if (this.isAnyHandEmpty(this.playerArr))
      this.endOfRound();

    // else, increment the current player
    // check for a skip
    if (this.currentPlayer === this.playerArr.length - 1)
      this.currentPlayer = 0;
    else
      this.currentPlayer++;
      // update handStr with new player
      this.handStr = this.playerArr[this.currentPlayer].showHand();
      this.topDis = this.discardPile[this.discardPile.length - 1]._number;

    this.state.thepickups='';
    this.state.thediscardmove='';
    this.state.thediscardmove2='';
    this.state.thediscard='';

    this.openModal2Handler(); // restart the modal sequence
  }

  endOfRound(){
    // check to see if any player has completed phase 2
    // if so, print scoreboard and declare a winner
    // else, call setGameInfo
    if (this.checkPhaze2(this.playerArr)){

    }
    else{
      //Someone has an empty hand, round is over
      //calculate points for people who still have hands
      for(let k = 0; k < this.playerArr.length; k++){
        if(this.playerArr[k]._handSize != 0)
          this.playerArr[k].addPoints();
      }
      //print score to screen
      //assumes we have "point" getter function
      let printStr = "Scoreboard: \n";
      for(let k = 0; k < this.playerArr.length; k++){
        let m = k+1;
        printStr = printStr + "Player " + m + ": " + this.playerArr[k]._points + "\n";
      }
      alert(printStr);
      //go through player clear hand and board
      for(let k = 0; k < this.playerArr.length; k++){
        this.playerArr[k].clearHand();
        this.playerArr[k].clearBoard();
      }
      this.gameDeck = new Deck();
      this.discardPile = [];
      this.discardPile.push(this.gameDeck.dealCard());
      for(let p = 0; p < 10; p++){
        for(let k = 0; k < this.playerArr.length; k++){
          this.playerArr[k].draw(this.gameDeck, this.discardPile, 1)
          }
      }
    }
  }

  checkPhaze2(playerArr){
     for(let i = 0; i < playerArr.length; i++){
       //assumes we have a get phase() function
         if(playerArr[i].phase === 3)
           return true;
      }
     return false;
   }

  //return true if any player's hand is empty, used to tell when round is over
   isAnyHandEmpty(playerArr){
     for(let i = 0; i < playerArr.length; i++){
       //assumes we have function that returns size of a player's hand
       if(playerArr[i].handSize === 0)
        return true;
     }
   return false;
  }

  //first array is array of indexes to check
  //second array is hand of cards
  isASet(arr1, arr2){
    if(arr1[0] !== -1){
       let initialNum;
       let counter = 0;
      for(let i = 0; i < arr1.length; i++){
           if(arr2[arr1[i]].number !== 14 && counter === 0){
              initialNum = arr2[arr1[i]].number;
              counter++;
           }
           if(counter > 0){
             if(initialNum !== arr2[arr1[i]].number && arr2[arr1[i]].number !== 14){
               return false;
             }
           }
      }
       return true;
    }
    else{
      let initialNum;
      let counter = 0;
      for(let i = 0; i < arr2.length; i++){
           if(arr2[i]._number !== 14 && counter === 0){
              initialNum = arr2[i]._number;
              counter++;
           }
           if(counter > 0){
             if(initialNum !== arr2[i]._number && arr2[i]._number !== 14){
               return false;
             }
           }
      }
       return true;
    }
  }

  isARun(arr1, arr2){
    if(arr1[0] !== -1){
      let tempArr =[];
      //push each card number into an array to be sorted by
      for(let i = 0; i < arr1.length; i++)
        tempArr.push(arr2[arr1[i]].number);
        //sort array in ascending order
        tempArr.sort(function(a, b){return a - b});
        //same method used in isASet, grab the number of the first card of hand
        let initialNum = tempArr[0];
        for(let i = 1; i < tempArr.length; i++){
          let nextNum = tempArr[i];
          //verify the next number is one greater then the last, a run
          if(nextNum !== (initialNum + i) && nextNum !== 14)
            return false;
        }
      return true;
    }
    else{
      let tempArr =[];
      //push each card number into an array to be sorted by
      for(let i = 0; i < arr2.length; i++)
        tempArr.push(arr2[i]._number);
        //sort array in ascending order
        tempArr.sort(function(a, b){return a - b});
        //same method used in isASet, grab the number of the first card of hand
        let initialNum = tempArr[0];
        for(let i = 1; i < tempArr.length; i++){
          let nextNum = tempArr[i];
          //verify the next number is one greater then the last, a run
          if(nextNum !== (initialNum + i) && nextNum !== 14)
            return false;
        }
      return true;
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
                  isShowing: false,
                  thepickups: '',
                  thediscardmove: '',
                  thediscardmove2:'',
                  thediscard: '',
                  firstfirst: '', //first part of phase first card
                  secondfirst: '',  // second part of phase first card
                  firstsecond: '',  //first part of phase second card
                  secondsecond: '', //second part of phase second card
                  firstthird: '', //first part of phase third card
                  secondthird: '', //second part of phase third card
                  nextquestion: ''
                };
    // member data
    this.playerArr = [];
    this.gameDeck = 0;
    this.discardPile = [];
    this.currentPlayer = 0; // keeps track globally of which player is up next
    this.p = 0; // temp variable
    this.topDis = 0;
    this.handStr = 0;
    // this.tempRes = 0;
    // controlling the state of number of players and the usernames for each player
  }

/* to update the numebr of players entered in the textbox*/
submitFormHandler = event => {
  event.preventDefault();
this.setState({numplayers: this.refs.players.value});
console.log(this.state.p1.value);
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
        this.setGameInfo();
        this.handStr = this.playerArr[this.currentPlayer].showHand();
        this.topDis = this.discardPile[this.discardPile.length - 1]._number;
        this.openModal2Handler(); // opening next modal
    }

closeModal2Handler = () => {
            this.setState({
                isShowing2: false
            });

            //this.setState({p1: this.refs.user1.value});
        }
        submitHandler = event => {
        this.setState({thepickups: this.refs.pickups.value});
        // updating the state of the number of players and each players username
        }
        submitHandler2 = event => {
          this.setState({thediscardmove: this.refs.discardmove.value});

        }

        submitHandler3 = event => {
          this.setState({thediscardmove2: this.refs.discardmove2.value});
        }
        discardsubmitHandler = event => {
          this.setState({thediscard: this.refs.discard.value});
          this.finalDiscard(this.refs.discard.value)
        }

        indexcardHandler = event => {
          this.setState({index1: this.refs.firstfirst.value, index2: this.refs.secondfirst.value, index3: this.refs.firstsecond.value,
                          index4: this.refs.secondsecond.value, index5: this.refs.firstthird.value, index6: this.refs.secondthird.value})
          this.checkPhase(this.refs.firstfirst.value,this.refs.firstsecond.value,this.refs.firstthird.value,this.refs.secondfirst.value, this.refs.secondsecond.value, this.refs.secondthird.value)
          this.state.nextquestion = 1;
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
                {/*}<button className="open-modal-btn" onClick={this.openModal2Handler}>PickUpModal</button>*/}
                <PickUpModal
                className="modal"
                show={this.state.isShowing2}
                close={this.closeModal2Handler}>

                <div>




                        <div>

                                 <text className="text"> {this.handStr} </text>
                                 <text className = "text"> Top of discard pile: {this.topDis} </text>
                                <br></br>
                                <text className="text">Would you like to pick up from the deck or the discard pile? </text>
                                <text className="text">Enter 0 for deck and 1 for discard pile. </text>
                                <input type="number" min="0" max="1" name="pickups" ref="pickups" id="pickupsId" style={{width: "250px"}}/>
                                <button onClick={this.submitHandler}> Submit </button>

                        </div>


                                {/* in the below if statement, we will show the newly picked up card from the deck and then ask the following question */}
                                {this.state.thepickups === '0' &&
                                  <div>
                                  {this.drawFromDeck()}
                                  {this.state.thepickups=''}
                                    <text className="text"> {this.handStr} </text>
                                    <text> <text className="text">Would you like to put down cards (discard/another board) or add cards to your game board? </text>
                                    <text className="text">Enter 1 to lay down cards to your game board and 0 to put down cards. </text>
                                    <input type="number" min="0" max="1" name="discardmove" ref="discardmove" id="discardmoveId"style={{width: "250px"}}/>
                                    <button onClick={this.submitHandler2}> Submit </button> </text>

                                    </div>
                                }

                                {/* in the below if statement, we will show the newly picked up card from the discard and then ask the following question */}
                                {this.state.thepickups === '1' &&
                                  <div>
                                  {this.drawFromDP()}
                                  {this.state.thepickups=''}
                                  <text className="text"> {this.handStr} </text>

                                    <text> <text className="text">Would you like to put down cards (discard/another board) or add cards to your game board? </text>
                                    <text className="text">Enter 1 to lay down cards to your game board and 0 to put down cards. </text>
                                    <input type="number" min="0" max="1" name="discardmove" ref="discardmove" id="discardmoveId" style={{width: "250px"}}/>
                                    <button onClick={this.submitHandler2}> Submit </button> </text>

                                    </div>
                                }


                                {/* Technically Modal 4*/}
                                {this.state.thediscardmove === '1' &&
                                <div>

                                {/* cardnumber(index of card).phasenumber(1,2).cardofphasepart(1,2,3)*/}
                                  <text> <text className="text"> Enter the indices of the cards for the first and second parts of the phase? </text>
                                  <br></br>
                                  <text className="text"> Card index for 1st card for first part of phase: </text>
                                  <input type="number" min="0" max="10" name="firstfirst" ref="firstfirst" style={{width: "50px"}}/>

                                  <text className="text2"> Card index for 1st card for second part of phase: </text>
                                  <input type="number" min="0" max="10" name="secondfirst" ref="secondfirst" style={{width: "50px"}}/>

                            <br></br>
                            <text className="text"> Card index for 2nd for first part of phase: </text>
                            <input type="number" min="0" max="10" name="firstsecond" ref="firstsecond" style={{width: "50px"}}/>

                            <text className="text2"> Card index for 2nd card for second part of phase: </text>
                            <input type="number" min="0" max="10" name="secondsecond" ref="secondsecond" style={{width: "50px"}}/>
                            <br></br>

                            <text className="text"> Card index for 3rd card for first part of phase: </text>
                            <input type="number" min="0" max="10" name="firstthird" ref="firstthird" style={{width: "50px"}}/>

                            <text className="text2"> Card index for 3rd card for second part of phase: </text>
                            <input type="number" min="0" max="10" name="secondthird" ref="secondthird" style={{width: "50px"}}/>

                            <button onClick={this.indexcardHandler}> Submit </button>

                                  </text>
                            {/*}{this.state.nextquestion === '1' &&
                            <div>
                            <text> <text className="text">Would you like to discard or add cards to another players game board? </text>
                            <text className="text">Enter 1 to discard and 2 to lay down cards to another board. </text>
                            <input type="number" min="1" max="2" name="discardmove2" ref="discardmove2" id="discardmove2Id" style={{width: "250px"}}/>
                            <button onClick={this.submitHandler3}> Submit </button> </text>
                            </div>
                          }*/}

                                  </div>
                                  }
                          {/*Technically Modal 5 */}
                          {this.state.thediscardmove === '0' &&
                          <div>

                          <text> <text className="text">Would you like to discard or add cards to another players game board? </text>
                          <text className="text">Enter 1 to discard and 2 to lay down cards to another board. </text>
                          <input type="number" min="1" max="2" name="discardmove2" ref="discardmove2" id="discardmove2Id" style={{width: "250px"}}/>
                          <button onClick={this.submitHandler3}> Submit </button> </text>

                          </div>
                          }

                          {/* Technically modal 6*/}
                          {this.state.thediscardmove2 === '1' &&
                          <div>

                          <text> <text className="text"> Enter the index of the card you want to discard. </text>
                          <input type="number" min="0" max="10" name="discard" ref="discard" id="discardId" style={{width: "50px"}}/>
                          <button onClick={this.discardsubmitHandler}> Submit </button>
                              </text>

                          </div>
                        }

                        {/* Technically Modal 7/8 and this needs to show other players hands!*/}
                        {this.state.thediscardmove2 === '2' &&
                        <div>

                        <text> <text className="text"> Enter the player number you wish to discard your cards on. </text>
                        <input type="text"  name="discardname" ref="discardname" style={{width: "100px"}}/>
                        <button onClick={this.discardnameHandler}> Submit </button>
                            </text>

                        </div>
                      }

                      {/* Still must do modal 9 which is showing other players hand */}

                      </div>




                </PickUpModal>

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
      if(Number(cardsToMove[i]) === origin_array.length - 1){
        this._board1.push(origin_array.pop());
      }
      else{
        this._board1.push(...origin_array.splice(cardsToMove[i], 1));
      }
    }
  }

  moveCardsToBoard2(cardsToMove, boardOneIndex, origin_array) {
    if(boardOneIndex[0] === -1){
     for (let i = cardsToMove.length - 1; i >= 0; i--) {
      if(Number(cardsToMove[i]) === origin_array.length - 1){
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
        if(newIndex[i] === origin_array.length - 1){
         this._board2.push(origin_array.pop());
        }
        else{
          this._board2.push(...origin_array.splice(newIndex[i], 1));
        }
     }
    }
  }

  isBoardEmpty() {
    return this._board1.length === 0 && this._board2.length === 0;
  }

  draw(decc, discard_pile, choice) {
    let temp1, temp2;

    // if we run out of cards to draw from decc
    if (decc.length === 0) {
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
    if (temp1._number === 13) {
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
      if (choice === 1) {
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
  //  alert(this._hand.length);
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

      else if (number === 13 || number === 14) {
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
    return printStr;
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
    if (this.deck.length === 0) {
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

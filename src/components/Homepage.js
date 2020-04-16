import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './home.css';
import Modal1 from '../components/Modal/PlayGameModal';
import Modal2 from '../components/Modal/PickUpModal';

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
  get name() {
    return this._name;
  }

  set name(n) {
    this._name = n;
  }
}

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

export {Homepage};

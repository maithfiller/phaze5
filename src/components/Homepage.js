import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './home.css';
import Modal from '../components/Modal/PlayGameModal';

class Homepage extends Component {

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
                  p4: '',
                  p5: '',
                  p6: '',
                  isShowing: false};
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
  this.setState({p1: this.refs.user1.value});
  //p2: this.refs.user2.value, p3: this.refs.user3.value,
                //  p4: this.refs.user4.value, p5: this.refs.user5.value, p6: this.refs.user6.value
}

openModalHandler = () => {
        this.setState({
            isShowing: true
        });
    }

closeModalHandler = () => {
        this.setState({
            isShowing: false
        });
        this.setState({p1: this.refs.user1.value});
    }

  render(){

    return (

      <div>

                { this.state.isShowing ? <div onClick={this.closeModalHandler} className="back-drop"></div> : null }

                <button className="open-modal-btn" onClick={this.openModalHandler}>Play Game</button>
                <div>
                <text className="button"> <button><Link to="/howtoplay">How to Play!</Link></button> </text>
                <Modal
                    className="modal"
                    show={this.state.isShowing}
                    close={this.closeModalHandler}>

                    <form onSubmit={this.submitFormHandler}>
                      <div>
                      <text className="text">How many players: </text>
                      <input type="number" min="1" max="6" name="players" ref="players" style={{width: "250px"}}/>
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

                </Modal>
                </div>
          {/*}<img src={logo}  className="logo" alt="logo" />*/}
      <text className="create"> Created by: Faith Miller, Mackenzie Knight, Tristan Garcia, Eduardo Antonini, and Katie Rombeiro </text>

      </div>


    );
  }
}

export {Homepage};

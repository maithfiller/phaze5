import React, { Component } from 'react';
import { Route, Link } from "react-router-dom";
import {PlayGame} from "./PlayGame";
import logo from './phase10.jpg';
import './home.css';


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
    this.state = {numplayers: '', p1: '', p2: '', p3: '', p4: '', p5: '', p6: ''};
    // controlling the state of number of players and the usernames for each player
  }

/* to update the numebr of players entered in the textbox*/
submitFormHandler = event => {
  event.preventDefault();
this.setState({numplayers: this.refs.players.value});
                // updating the state of the number of players and each players username
}

playGameHandler = event => {
  event.preventDefault();
  this.setState({p1: this.refs.user1.value});
  //p2: this.refs.user2.value, p3: this.refs.user3.value,
                //  p4: this.refs.user4.value, p5: this.refs.user5.value, p6: this.refs.user6.value
}



  render(){

    return (
      <div className="homeBackground">
          <img src={logo}  className="logo" alt="logo" />
          <text className="header"> Welcome to Phaze 5</text>
          <form className="form" onSubmit={this.submitFormHandler}>
            <div>
            <text className="text">How many players: </text>
            <input type="number" min="1" max="6" name="players" ref="players" style={{width: "250px"}}/>
            <button> Submit </button>
            </div>

            {this.state.numplayers === '1' &&
              <div>
                <text className="text">Player #1 Username: </text>
                <input type="text" name="user1" ref="user1" style={{width: "235.5px"}}/>
              <br></br>
              <form onSubmit={this.playGameHandler}>
                <button className="button"> <Link  to="/playgame"> Play Game </Link> </button>
                </form>
                </div>
            }

            {this.state.numplayers === '2' &&
              <div>
                <text className="text">Player #1 Username: </text>
                <input type="text" name="user1" ref="user1" style={{width: "235.5px"}}/>
            <br></br>
              <text className="text">Player #2 Username: </text>
              <input type="text" name="user2" ref="user2" style={{width: "235.5px"}}/>
            <br></br>
              <button className="button"> <Link  to="/playgame"> Play Game </Link> </button>
              </div>
            }


            {this.state.numplayers === '3' &&
              <div>
                <text className="text">Player #1 Username: </text>
                <input type="text" name="user1" ref="user1" style={{width: "235.5px"}}/>
            <br></br>
              <text className="text">Player #2 Username: </text>
              <input type="text" name="user2" ref="user2" style={{width: "235.5px"}}/>
            <br></br>
              <text className="text">Player #3 Username: </text>
              <input type="text" name="user3" ref="user3" style={{width: "235.5px"}}/>
            <br></br>
              <button className="button"> <Link  to="/playgame"> Play Game </Link> </button>
              </div>
            }


            {this.state.numplayers === '4' &&
              <div>
                <text className="text">Player #1 Username: </text>
                <input type="text" name="user1" ref="user1" style={{width: "235.5px"}}/>
            <br></br>
              <text className="text">Player #2 Username: </text>
              <input type="text" name="user2" ref="user2" style={{width: "235.5px"}}/>
            <br></br>
              <text className="text">Player #3 Username: </text>
              <input type="text" name="user3" ref="user3" style={{width: "235.5px"}}/>
            <br></br>
              <text className="text">Player #4 Username: </text>
              <input type="text" name="user4" ref="user4" style={{width: "235.5px"}}/>
            <br></br>
              <button className="button"> <Link  to="/playgame"> Play Game </Link> </button>
              </div>
            }

            {this.state.numplayers === '5' &&
              <div>
                <text className="text">Player #1 Username: </text>
                <input type="text" name="user1" ref="user1" style={{width: "235.5px"}}/>
            <br></br>
              <text className="text">Player #2 Username: </text>
              <input type="text" name="user2" ref="user2" style={{width: "235.5px"}}/>
            <br></br>
              <text className="text">Player #3 Username: </text>
              <input type="text" name="user3" ref="user3" style={{width: "235.5px"}}/>
            <br></br>
              <text className="text">Player #4 Username: </text>
              <input type="text" name="user4" ref="user4" style={{width: "235.5px"}}/>
            <br></br>
              <text className="text">Player #5 Username: </text>
              <input type="text" name="user5" ref="user5" style={{width: "235.5px"}}/>
            <br></br>
              <button className="button"> <Link  to="/playgame"> Play Game </Link> </button>
              </div>
            }

            {this.state.numplayers === '6' &&
              <div>
                <text className="text">Player #1 Username: </text>
                <input type="text" name="user1" ref="user1" style={{width: "235.5px"}}/>
            <br></br>
              <text className="text">Player #2 Username: </text>
              <input type="text" name="user2" ref="user2" style={{width: "235.5px"}}/>
            <br></br>
              <text className="text">Player #3 Username: </text>
              <input type="text" name="user3" ref="user3" style={{width: "235.5px"}}/>
            <br></br>
              <text className="text">Player #4 Username: </text>
              <input type="text" name="user4" ref="user4" style={{width: "235.5px"}}/>
            <br></br>
              <text className="text">Player #5 Username: </text>
              <input type="text" name="user5" ref="user5" style={{width: "235.5px"}}/>
            <br></br>
              <text className="text">Player #6 Username: </text>
              <input type="text" name="user6" ref="user6" style={{width: "235.5px"}}/>
            <br></br>
            <button className="button"> <Link  to="/playgame"> Play Game </Link> </button>
            </div>
          }

            </form>
          <div>
          <button><Link to="/howtoplay">How to Play!</Link></button>
          </div>
        <p>{this.state.data}</p>
      <div>
      <text className="create"> Created by: Faith Miller, Mackenzie Knight, Tristan Garcia, Eduardo Antonini, and Katie Rombeiro </text>
      </div>
      </div>


    );
  }
}

export {Homepage};

import React, { Component } from 'react';
import { Route, Link } from "react-router-dom"
import logo from './phase10.jpg';
import './home.css';


class Homepage extends Component {
state = {
    data: null
  };

  componentDidMount() {
      // Call our fetch function below once the component mounts
    this.callBackendAPI()
      .then(res => this.setState({ data: res.express }))
      .catch(err => console.log(err));
  }
    // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
  callBackendAPI = async () => {
    const response = await fetch('/express_backend');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message)
    }
    return body;
  };


submitFormHandler = event => {
  event.preventDefault();

  let numplayer = console.dir(this.refs.players.value); //will give us the name value
}

  render() {
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
            <div>
            <text className="text">Player #1 Username: </text>
            <input type="text" name="user1" ref="user1" style={{width: "235.5px"}}/>
            </div>
            <div>
            <text className="text">Player #2 Username: </text>
            <input type="text" name="user2" ref="user2" style={{width: "235.5px"}}/>
            </div>
            <div>
            <text className="text">Player #3 Username: </text>
            <input type="text" name="user3" ref="user3" style={{width: "235.5px"}}/>
            </div>
            <div>
            <text className="text">Player #4 Username: </text>
            <input type="text" name="user4" ref="user4" style={{width: "235.5px"}}/>
            </div>
            <div>
            <text className="text">Player #5 Username: </text>
            <input type="text" name="user5" ref="user5" style={{width: "235.5px"}}/>
            </div>
            <div>
            <text className="text">Player #6 Username: </text>
            <input type="text" name="user6" ref="user6" style={{width: "235.5px"}}/>
            </div>
            <button className="button"> <Link  to="/playgame"> Play Game </Link> </button>
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

import React, { Component } from 'react';
import { Homepage } from "./Homepage"
import './playgame.css';
import Box from '@material-ui/core/Box';

class PlayGame extends Component {
render (){
 return(
<div>
  <div className="playerbox"> Player Name: </div>
  <div className= "pickupbox"> Pick-Up Pile </div>
</div>
);
}
}

export {PlayGame};

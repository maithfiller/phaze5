import React, { Component } from 'react';
import { Homepage } from "./Homepage"
import './playgame.css';
import { Button } from '@material-ui/core';


class PlayGame extends Component {
render (){
 return(
<div>
  <div className="playerbox"> Player Name: </div>
  <div className= "pickupbox"> Pick-Up Pile </div>
  <div className="buttonbottom"><Button variant="contained">Make a Move</Button></div>

</div>
);
}
}

export {PlayGame};

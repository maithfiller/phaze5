import React, {Component} from 'react';
import './PlayGameModal.css';
import '../home.css';

class PickUpModal extends Component {
  constructor(props){
    super(props)
    this.state = {thepickups: '',
                  thediscardmove: ''}
  }
  submitHandler = event => {
  this.setState({thepickups: this.refs.pickups.value});
  console.log(this.refs.pickups.value);
                  // updating the state of the number of players and each players username
  }
  submitHandler2 = event => {
    this.setState({thediscardmove: this.refs.discardmove.value});
    console.log(this.refs.discardmove.value);
  }
  render(){
    return (
        <div>
            <div className="modal-wrapper"
                style={{
                    transform: this.props.show ? 'translateY(0vh)' : 'translateY(-100vh)',
                    opacity: this.props.show ? '1' : '0'
                }}>
                <div className="modal-header">
                    <h3>Pick Up Modal</h3>
                </div>
                <div className="modal-body">


                <div>
                        <text className="text">Would you like to pick up from the deck or the discard pile? </text>
                        <text className="text">Enter 0 for deck and 1 for discard pile. </text>
                        <input type="number" min="0" max="1" name="pickups" ref="pickups" style={{width: "250px"}}/>
                        <button onClick={this.submitHandler}> Submit </button>
                </div>


                        {/* in the below if statement, we will show the newly picked up card from the deck and then ask the following question */}
                        {this.state.thepickups === '0' &&
                          <div>
                            <text> <text className="text">Would you like to discard or add cards to your game board? </text>
                            <text className="text">Enter 0 to lay down cards to your game board and 1 to discard. </text>
                            <input type="number" min="0" max="1" name="discardmove" ref="discardmove" style={{width: "250px"}}/>
                            <button onClick={this.submitHandler2}> Submit </button> </text>
                            </div>
                        }

                        {/* in the below if statement, we will show the newly picked up card from the discard and then ask the following question */}
                        {this.state.thepickups === '1' &&
                          <div>
                            <text> <text className="text">Would you like to discard or add cards to your game board? </text>
                            <text className="text">Enter 0 to lay down cards to your game board and 1 to discard. </text>
                            <input type="number" min="0" max="1" name="discardmove" ref="discardmove" style={{width: "250px"}}/>
                            <button onClick={this.submitHandler2}> Submit </button> </text>
                            </div>
                        }

                        {this.state.thediscardmove === '0' &&
                        <div>
                        {/* cardnumber(index of card).phasenumber(1,2).cardofphasepart(1,2,3)*/}
                          <text> <text className="text"> Enter the indices of the cards for the first and second parts of the phase? </text>
                          <br></br>
                          <text className="text"> Card 1 for first part of phase: </text>
                          <select>
                              <option value="0.1.1">0</option>
                              <option value="1.1.1">1</option>
                              <option value="2.1.1">2</option>
                              <option value="3.1.1">3</option>
                              <option value="4.1.1">4</option>
                              <option value="5.1.1">5</option>
                              <option value="6.1.1">6</option>
                              <option value="7.1.1">7</option>
                              </select>
                    <br></br>
                    <text className="text"> Card 2 for first part of phase: </text>
                    <select>
                              <option value="0.1.2">0</option>
                              <option value="1.1.2">1</option>
                              <option value="2.1.2">2</option>
                              <option value="3.1.2">3</option>
                              <option value="4.1.2">4</option>
                              <option value="5.1.2">5</option>
                              <option value="6.1.2">6</option>
                              <option value="7.1.2">7</option>
                    </select>
                    <br></br>
                    <text className="text"> Card 3 for first part of phase: </text>
                    <select>
                              <option value="0.1.3">0</option>
                              <option value="1.1.3">1</option>
                              <option value="2.1.3">2</option>
                              <option value="3.1.3">3</option>
                              <option value="4.1.3">4</option>
                              <option value="5.1.3">5</option>
                              <option value="6.1.3">6</option>
                              <option value="7.1.3">7</option>
                    </select>
                    <br></br>
                    <text className="text"> Card 1 for second part of phase: </text>
                    <select>
                              <option value="0.2.1">0</option>
                              <option value="1.2.1">1</option>
                              <option value="2.2.1">2</option>
                              <option value="3.2.1">3</option>
                              <option value="4.2.1">4</option>
                              <option value="5.2.1">5</option>
                              <option value="6.2.1">6</option>
                              <option value="7.2.1">7</option>
                    </select>
                    <br></br>
                    <text className="text"> Card 2 for second part of phase: </text>
                    <select>
                              <option value="0.2.2">0</option>
                              <option value="1.2.2">1</option>
                              <option value="2.2.2">2</option>
                              <option value="3.2.2">3</option>
                              <option value="4.2.2">4</option>
                              <option value="5.2.2">5</option>
                              <option value="6.2.2">6</option>
                              <option value="7.2.2">7</option>
                    </select>
                    <br></br>
                    <text className="text"> Card 3 for second part of phase: </text>
                    <select>
                              <option value="0.2.3">0</option>
                              <option value="1.2.3">1</option>
                              <option value="2.2.3">2</option>
                              <option value="3.2.3">3</option>
                              <option value="4.2.3">4</option>
                              <option value="5.2.3">5</option>
                              <option value="6.2.3">6</option>
                              <option value="7.2.3">7</option>
                    </select>
                          </text>
                        </div>
                        }

                </div>
                <div className="modal-footer">
                    <button className="btn-cancel" onClick={this.props.close}>CLOSE</button>
                    <button className="btn-continue" onClick={this.props.close}>SUBMIT</button>
                </div>
            </div>
        </div>
    )
}
}
export {PickUpModal};

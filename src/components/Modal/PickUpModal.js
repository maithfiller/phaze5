import React, {Component} from 'react';
import './PlayGameModal.css';
import '../home.css';

class PickUpModal extends Component {
  constructor(props){
    super(props)
    this.state = {thepickups: '',
                  thediscardmove: '',
                  thediscardmove2:'',
                  thediscard: '',
                  firstfirst: '', //first part of phase first card
                  secondfirst: '',  // second part of phase first card
                  firstsecond: '',  //first part of phase second card
                  secondsecond: '', //second part of phase second card
                  firstthird: '', //first part of phase third card
                  secondthird: '' //second part of phase third card
                  }
  }
  submitHandler = event => {
  this.setState({thepickups: this.refs.pickups.value});
  console.log(this.refs.pickups.value);
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
    console.log(this.refs.discard.value);
  }

  indexcardHandler = event => {
    this.setState({index1: this.refs.firstfirst.value, index2: this.refs.secondfirst.value, index3: this.refs.firstsecond.value,
                    index4: this.refs.secondsecond.value, index5: this.refs.firstthird.value, index6: this.refs.secondthird.value})
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
                            <text> <text className="text">Would you like to put down cards (discard/another board) or add cards to your game board? </text>
                            <text className="text">Enter 1 to lay down cards to your game board and 0 to put down cards. </text>
                            <input type="number" min="0" max="1" name="discardmove" ref="discardmove" style={{width: "250px"}}/>
                            <button onClick={this.submitHandler2}> Submit </button> </text>
                            </div>
                        }

                        {/* in the below if statement, we will show the newly picked up card from the discard and then ask the following question */}
                        {this.state.thepickups === '1' &&
                          <div>
                            <text> <text className="text">Would you like to put down cards (discard/another board) or add cards to your game board? </text>
                            <text className="text">Enter 1 to lay down cards to your game board and 0 to put down cards. </text>
                            <input type="number" min="0" max="1" name="discardmove" ref="discardmove" style={{width: "250px"}}/>
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
                          </div>
                          }
                  {/*Technically Modal 5 */}
                  {this.state.thediscardmove === '0' &&
                  <div>
                  <text> <text className="text">Would you like to discard or add cards to another players game board? </text>
                  <text className="text">Enter 1 to discard and 2 to lay down cards to another board. </text>
                  <input type="number" min="1" max="2" name="discardmove2" ref="discardmove2" style={{width: "250px"}}/>
                  <button onClick={this.submitHandler3}> Submit </button> </text>
                  </div>
                  }

                  {/* Technically modal 6*/}
                  {this.state.thediscardmove2 === '1' &&
                  <div>
                  <text> <text className="text"> Enter the index of the card you want to discard. </text>
                  <input type="number" min="0" max="10" name="discard" ref="discard" style={{width: "50px"}}/>
                  <button onClick={this.discardsubmitHandler}> Submit </button>
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

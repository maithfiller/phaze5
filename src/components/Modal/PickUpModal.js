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

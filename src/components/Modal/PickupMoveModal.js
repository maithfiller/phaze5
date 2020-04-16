import React from 'react';

import './PlayGameModal.css';
import '../home.css';

const modal = (props) => {
    return (
        <div>
            <div className="modal-wrapper"
                style={{
                    transform: props.show ? 'translateY(0vh)' : 'translateY(-100vh)',
                    opacity: props.show ? '1' : '0'
                }}>
                <div className="modal-header">
                    <h3>Pick Up Move Modal</h3>
                </div>
                <div className="modal-body">
                    <p>
                        <text className="text">Would you like to discard or add cards to your game board? </text>
                        <text className="text">Enter 0 to lay down cards to your game board and 1 to discard. </text>
                        <input type="number" min="0" max="1" name="discardmove" refs="discardmove" style={{width: "250px"}}/>
                        <button> Submit </button>

                    </p>
                </div>
                <div className="modal-footer">
                    <button className="btn-cancel" onClick={props.close}>CLOSE</button>
                    <button className="btn-continue" onClick={props.close}>SUBMIT</button>
                </div>
            </div>
        </div>
    )
}

export default modal;

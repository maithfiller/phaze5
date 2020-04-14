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
                    <h3>Pick Up Modal</h3>
                </div>
                <div className="modal-body">
                    <p>
                        <text className="text">Would you like to pick up from the deck or the discard pile? </text>
                        <text className="text">Enter 0 for deck and 1 for discard pile. </text>
                        <input type="number" min="0" max="1" name="pickup" refs="pickups" style={{width: "250px"}}/>
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

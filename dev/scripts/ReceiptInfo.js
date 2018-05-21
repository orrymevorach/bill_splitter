import React from 'react';

const ReceiptInfo = (props) => {
    return (
        <section className = "receiptInfo" >

            <div className="location-title">
                <h2> {props.location} </h2>
            </div>

            <div className="bill-info-top clearfix">
                <p className="amounts">Your Total Is:</p>

                <p className="numbers">${props.dollar}</p>
            </div>

            <div className="bill-info-middle clearfix">
                {/* <p className="date">Date: </p> */}
                <p className="amounts">Split this many ways:</p>

                <p className="numbers">{props.people}</p>
            </div>

            <div className="bill-info-middle clearfix">
                <p className="amounts">Total Per Person With:</p>
            </div>

            <div className="bill-info-middle clearfix">
                <p className="amounts"><span>No Tip:</span></p>

                <p className="numbers">${props.newTotal}</p>
            </div>

            <div className="bill-info-middle clearfix">
                <p className="amounts"><span>15% Tip:</span></p>

                <p className="numbers">${props.tipFifteen}</p>
            </div>

            <div className="bill-info-middle clearfix">
                <p className="amounts"><span>20% Tip:</span></p>

                <p className="numbers">${props.tipTwenty}</p>
            </div>

            <div className="bill-info-bottom clearfix">
                <p className="amounts"><span>25% Tip:</span></p>

                <p className="numbers">${props.tipTwentyFive}</p>
                
            </div>

            <button className="reset-button" onClick={props.reset}>RESET</button>

        </section >
    )
}

export default ReceiptInfo;
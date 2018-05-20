import React from 'react';

const ReceiptInfo = (props) => {
    return (
        <section className = "receiptInfo" >

            <div className = "bill-info-title" >
                <div className="info-style-left"></div>
                <p className="info">info</p>
                <div className="info-style-right"></div>
            </div >

            <div className="location-title">
                
                {/* change map to filter, and set if statements */}
                {/* if selected = true, return selected storedLocation */}
                {/* if selected = false, return nothing */}
                {/* go into populate function, and onClick, toggle selected from false to true */}
                {props.receipts.map((receipts) => {
                    return ( 
                        <h2> {receipts.storedLocation} </h2>
                    )
                })}
            </div>

            <div className="bill-info-top clearfix">
                <p className="amounts">This is the total amount</p>

                <p className="numbers">{props.dollar}</p>
            </div>

            <div className="bill-info-middle clearfix">
                {/* <p className="date">Date: </p> */}
                <p className="amounts">Split this many ways:</p>

                <p className="numbers">{props.people}</p>
            </div>

            <div className="bill-info-middle clearfix">
                <p className="amounts">Amount Per Person With No Tip:</p>

                <p className="numbers">${props.newTotal}</p>
            </div>

            <div className="bill-info-middle clearfix">
                <p className="amounts">Amount Per Person Plus 15% Tip:</p>

                <p className="numbers">${props.tipFifteen}</p>
            </div>

            <div className="bill-info-middle clearfix">
                <p className="amounts">Amount Per Person Plus 20% Tip:</p>

                <p className="numbers">${props.tipTwenty}</p>
            </div>

            <div className="bill-info-bottom clearfix">
                <p className="amounts">Amount Per Person Plus 25% Tip:</p>

                <p className="numbers">${props.tipTwentyFive}</p>
            </div>

        </section >
    )
}

export default ReceiptInfo;
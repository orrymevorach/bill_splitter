import React from 'react';

const ReceiptInfo = (props) => {
    return (
        <section className = "receiptInfo" >

            {/* Restaurant Name */}
            <div className="location-title">
                <h2>{props.location}</h2>
            </div>

            {/* Your Total Is: */}
            <div className="bill-info clearfix">
                <p className="amounts">{props.stringTotal}</p>

                <p className="numbers">{props.dollarSign}{props.dollar}</p>
            </div>

            {/* Split By: */}
            <div className="bill-info split-by clearfix">
                <p className="amounts">{props.stringSplitBy}</p>

                <p className="numbers">{props.people} {props.stringPeople}</p>
            </div>

            {/* Total Per Person With: */}
            <div className="bill-info clearfix">
                <p className="amounts">{props.stringTotalPerPerson}</p>
            </div>

            {/* No Tip */}
            <div className="bill-info clearfix">
                <p className="amounts tip"><span>{props.stringNoTip}</span></p>

                <p className="numbers">{props.dollarSign}{props.newTotal}</p>
            </div>

            {/* FIfteen % */}
            <div className="bill-info clearfix">
                <p className="amounts tip"><span>{props.stringTipFifteen}</span></p>

                <p className="numbers">{props.dollarSign}{props.tipFifteen}</p>
            </div>

            {/* Twenty % */}
            <div className="bill-info clearfix">
                <p className="amounts tip"><span>{props.stringTipTwenty}</span></p>

                <p className="numbers">{props.dollarSign}{props.tipTwenty}</p>
            </div>

            {/* Twenty Five Percent */}
            <div className="bill-info bill-info-bottom clearfix">
                <p className="amounts tip"><span>{props.stringTipTwentyFive}</span></p>

                <p className="numbers">{props.dollarSign}{props.tipTwentyFive}</p>
            </div>

        </section >
    )
}

export default ReceiptInfo;
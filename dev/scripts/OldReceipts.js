import React from 'react';

const OldReceipts = (props) => {
    return (
        <section className="oldReceipts">
            
            {/* List Items that will hold each old bill */}
            <li className="clearfix"> 
                <span className="restaurant-name">{props.storedLocation}</span> 
                <span className="date"> ({props.todaysDate})</span>
                <button onClick={() => props.remove(props.firebasekey)} className="remove-button" >❌</button> 
                <button onClick={() => props.populate(props.storedLocation, props.dollarAmount, props.peopleAmount)} className="review-button">Review!</button>
            </li>

        </section>
    )
}

export default OldReceipts;
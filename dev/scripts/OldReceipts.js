import React from 'react';

const OldReceipts = (props) => {
    return (
        <section className="oldReceipts">
            
            <li className="clearfix"> {props.storedLocation} <span className="date" >({props.todaysDate})</span>
                <button onClick={() => props.remove(props.firebasekey)} >❌</button> 
                <button onClick={() => props.populate(props.storedLocation, props.dollarAmount, props.peopleAmount)}>Review!</button>
            </li>
            
        </section>
    )
}

export default OldReceipts;